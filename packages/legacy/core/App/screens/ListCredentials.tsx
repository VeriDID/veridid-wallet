import { AnonCredsCredentialMetadataKey } from '@credo-ts/anoncreds'
import { CredentialState, ConnectionRecord, CredentialExchangeRecord } from '@credo-ts/core'
import { useCredentialByState, useConnections } from '@credo-ts/react-hooks'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Modal,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native'

import CredentialCardCustom from '../components/misc/CredentialCardCustom'

import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { useTheme } from '../contexts/theme'
import { useTour } from '../contexts/tour/tour-context'
import { Screens, TabStackParams, TabStacks, CredentialStackParams } from '../types/navigators'
import { TourID } from '../types/tour'
import { TOKENS, useServices } from '../container-api'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CredentialDetailsCustom from '../components/misc/CredentialDetailsCustom'
import { StackNavigationProp } from '@react-navigation/stack'
import CredentialConnectionInfo from '../components/misc/CredentialConnectionInfo'

//import { set } from 'mockdate'

const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  joinButtonIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  joinButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f324c6', // Your pink color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center', // Centers the button within its parent
    marginTop: 30, // Adjust as needed for spacing
    position: 'absolute',
    bottom: 90, // Adjust to position above the navigation bar
    width: '80%',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8, // Adds space between the text and icon
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000, // This makes the view a circle
  },
  whiteCircleContainer: {
    width: 300,
    height: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 150, // Make it a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    top: '25%', // Adjust position as needed
  },
  greenCircle: {
    width: 250,
    height: 250,
    backgroundColor: '#00FF00',
    top: '20%',
    left: '-25%',
  },
  orangeCircle: {
    width: 250,
    height: 250,
    backgroundColor: '#ffa41e',
    bottom: '25%',
    right: '-20%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent', // Updated for full transparency
  },
  emptyLogo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
    position: 'absolute', // Absolute positioning
    top: '5%', // Position above the circles
    zIndex: 2, // Higher than the circles
  },
  textContainer: {
    width: '85%', // Make the width less than 100% to start and end earlier
    alignSelf: 'center', // Center the text container horizontally within the parent
    paddingHorizontal: 10, // Add padding to further offset the start and end points
    paddingVertical: 20, // Add vertical padding if needed for spacing
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,

    // Styling for the main title in the empty state
  },

  emptyDescription: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666', // Lighter color for the description text
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: windowHeight * 0.55, // 60% of screen height
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    height: windowHeight * 0.35, // 50% of screen height
    marginBottom: 10,
  },
  menuModalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    height: windowHeight * 0.25, // 15% of screen height
  },
  menuOption: {
    paddingVertical: 15,
  },
  menuOptionText: {
    fontSize: 18,
    color: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: -40,
    right: 10,
    zIndex: 1,
  },
  closeIcon: {
    fontSize: 25,
    color: '#FFF',
  },
  modalContent: {
    padding: 20,
  },
})

const ListCredentials: React.FC = () => {
  const { t } = useTranslation()
  const [store, dispatch] = useStore()
  const [, , { enableTours: enableToursConfig, credentialHideList }] = useServices([
    TOKENS.COMPONENT_CRED_LIST_OPTIONS,
    TOKENS.COMPONENT_CRED_EMPTY_LIST,
    TOKENS.CONFIG,
  ])

  const stackNavigation = useNavigation<StackNavigationProp<CredentialStackParams>>()
  const tabNavigation = useNavigation<BottomTabNavigationProp<TabStackParams>>()
  const { ColorPallet } = useTheme()
  const { start } = useTour()
  const screenIsFocused = useIsFocused()

  const [connectionsMap, setConnectionsMap] = useState<Record<string, ConnectionRecord>>({})
  const [credentialModalVisible, setCredentialModalVisible] = useState(false)
  const [menuModalVisible, setMenuModalVisible] = useState(false)
  const [selectedCredential, setSelectedCredential] = useState<CredentialExchangeRecord | null>(null)
  const [selectedLogoUrl, setSelectedLogoUrl] = useState<string | undefined>(undefined)

  let credentials = [
    ...useCredentialByState(CredentialState.CredentialReceived),
    ...useCredentialByState(CredentialState.Done),
  ]

  const { records: connections } = useConnections()

  useEffect(() => {
    const newConnectionsMap: Record<string, ConnectionRecord> = {}
    connections.forEach((connection) => {
      if (connection.id) {
        newConnectionsMap[connection.id] = connection
      }
    })
    setConnectionsMap(newConnectionsMap)
  }, [connections])

  if (!store.preferences.developerModeEnabled) {
    credentials = credentials.filter((r) => {
      const credDefId = r.metadata.get(AnonCredsCredentialMetadataKey)?.credentialDefinitionId
      return !credentialHideList?.includes(credDefId)
    })
  }

  useEffect(() => {
    const shouldShowTour = enableToursConfig && store.tours.enableTours && !store.tours.seenCredentialsTour

    if (shouldShowTour && screenIsFocused) {
      start(TourID.CredentialsTour)
      dispatch({
        type: DispatchAction.UPDATE_SEEN_CREDENTIALS_TOUR,
        payload: [true],
      })
    }
    stackNavigation.setOptions({
      headerShown: credentials.length > 0,
    })
  }, [
    enableToursConfig,
    store.tours.enableTours,
    store.tours.seenCredentialsTour,
    screenIsFocused,
    start,
    dispatch,
    credentials.length,
    stackNavigation,
  ])

  const navigateToChannels = () => {
    tabNavigation.navigate(TabStacks.ContactStack, {
      screen: Screens.Contacts,
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: ColorPallet.brand.primaryBackground }}>
        {credentials.length === 0 ? (
          // Empty state view when there are no credentials
          <View style={styles.emptyContainer}>
            <View style={[styles.circle, styles.greenCircle]} />
            <View style={[styles.circle, styles.orangeCircle]} />

            <Image source={require('../assets/img/veridid-logo.png')} style={styles.emptyLogo} />
            {/* Centered logo with adjusted size */}
            <View style={styles.whiteCircleContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.emptyTitle}>{t('Credentials.VeriDIDWallet')}</Text>
                {/* Updated title based on Figma design */}

                <Text style={styles.emptyDescription}>{t('Credentials.AddYourFirstCredential')}</Text>
                {/* Description message matching the design */}
              </View>
            </View>
            <TouchableOpacity style={styles.joinButton} onPress={navigateToChannels}>
              <Text style={styles.joinButtonText}>{t('Credentials.JoinChannel')}</Text>
              <Icon name="plus-circle-outline" style={styles.joinButtonIcon} />
            </TouchableOpacity>
            {/* Join Channel button with an icon */}
          </View>
        ) : (
          <FlatList
            data={credentials.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())}
            keyExtractor={(credential) => credential.id}
            renderItem={({ item: credential }) => {
              const connection = connectionsMap[credential.connectionId ?? '']
              const logoUrl = connection?.imageUrl

              return (
                <CredentialCardCustom
                  credential={credential}
                  onPress={() => {
                    setSelectedCredential(credential)
                    setSelectedLogoUrl(logoUrl)
                    setCredentialModalVisible(true)
                    setMenuModalVisible(true)
                  }}
                  logoUrl={logoUrl}
                  proof={false}
                />
              )
            }}
          />
        )}
      </View>
      {(credentialModalVisible || menuModalVisible) && selectedCredential && (
        <Modal animationType="fade" transparent={true} visible={credentialModalVisible || menuModalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalWrapper}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setCredentialModalVisible(false)
                  setMenuModalVisible(false)
                }}
              >
                <Icon name="close" size={30} color="#FFF" />
              </TouchableOpacity>

              <View style={styles.modalContainer}>
                <ScrollView contentContainerStyle={styles.modalContent}>
                  <CredentialDetailsCustom credential={selectedCredential} logoUrl={selectedLogoUrl} />
                </ScrollView>
              </View>
              <CredentialConnectionInfo credential={selectedCredential} />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  )
}

export default ListCredentials
