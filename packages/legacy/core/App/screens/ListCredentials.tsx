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
} from 'react-native'

import CredentialCardCustom from '../components/misc/CredentialCardCustom'

import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { useTheme } from '../contexts/theme'
import { useTour } from '../contexts/tour/tour-context'
import { Screens, TabStackParams, TabStacks } from '../types/navigators'
import { TourID } from '../types/tour'
import { TOKENS, useServices } from '../container-api'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CredentialDetailsCustom from '../components/misc/CredentialDetailsCustom'

const ListCredentials: React.FC = () => {
  const { t } = useTranslation()
  const [store, dispatch] = useStore()
  const [, , { enableTours: enableToursConfig, credentialHideList }] = useServices([
    TOKENS.COMPONENT_CRED_LIST_OPTIONS,
    TOKENS.COMPONENT_CRED_EMPTY_LIST,
    TOKENS.CONFIG,
  ])

  const tabNavigation = useNavigation<BottomTabNavigationProp<TabStackParams>>()
  const { ColorPallet } = useTheme()
  const { start } = useTour()
  const screenIsFocused = useIsFocused()

  const [connectionsMap, setConnectionsMap] = useState<Record<string, ConnectionRecord>>({})
  const [modalVisible, setModalVisible] = useState(false)
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
  }, [enableToursConfig, store.tours.enableTours, store.tours.seenCredentialsTour, screenIsFocused, start, dispatch])

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
                    setModalVisible(true)
                  }}
                  logoUrl={logoUrl}
                  proof={false}
                />
              )
            }}
          />
        )}
      </View>
      {modalVisible && selectedCredential && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalWrapper}>
              {/* Close Button Positioned Above the Modal */}
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Icon name="close" size={30} style={styles.closeIcon} />
              </TouchableOpacity>

              <View style={styles.modalContainer}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.modalContent}>
                  <CredentialDetailsCustom credential={selectedCredential} logoUrl={selectedLogoUrl} />
                  {/* Passing the selected credential and logo to the details view */}
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  )
}

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    width: '95%',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    height: '75%',
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

export default ListCredentials
