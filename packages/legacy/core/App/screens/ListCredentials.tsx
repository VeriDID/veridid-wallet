import { AnonCredsCredentialMetadataKey } from '@credo-ts/anoncreds'
import { CredentialState, ConnectionRecord } from '@credo-ts/core'
import { useCredentialByState, useConnections } from '@credo-ts/react-hooks'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import CredentialCardCustom from '../components/misc/CredentialCardCustom'

import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { useTheme } from '../contexts/theme'
import { useTour } from '../contexts/tour/tour-context'
import { CredentialStackParams, Screens, TabStackParams, TabStacks } from '../types/navigators'
import { TourID } from '../types/tour'
import { TOKENS, useServices } from '../container-api'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ListCredentials: React.FC = () => {
  const { t } = useTranslation()
  const [store, dispatch] = useStore()
  const [, , { enableTours: enableToursConfig, credentialHideList }] = useServices([
    TOKENS.COMPONENT_CRED_LIST_OPTIONS,
    TOKENS.COMPONENT_CRED_EMPTY_LIST,
    TOKENS.CONFIG,
  ])

  const tabNavigation = useNavigation<BottomTabNavigationProp<TabStackParams>>()
  const stackNavigation = useNavigation<StackNavigationProp<CredentialStackParams>>()
  const { ColorPallet } = useTheme()
  const { start } = useTour()
  const screenIsFocused = useIsFocused()

  // State for connections
  const [connectionsMap, setConnectionsMap] = useState<Record<string, ConnectionRecord>>({})

  let credentials = [
    ...useCredentialByState(CredentialState.CredentialReceived),
    ...useCredentialByState(CredentialState.Done),
  ]

  // Fetch all connections and store in state
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

  // Filter out hidden credentials when not in dev mode
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
          <View style={styles.emptyContainer}>
            <View style={styles.boxContainer}>
              <View style={styles.darkRectangle}>
                <Image source={require('../assets/img/veridid-logo.png')} style={styles.logo} />
              </View>
              <View style={styles.lightRectangle}>
                <Text style={styles.walletText}>{t('Credentials.VeriDIDWallet')}</Text>
                <Text style={styles.walletDescription}>{t('Credentials.AddYourFirstCredential')}</Text>
                <TouchableOpacity style={styles.addIconContainer} onPress={navigateToChannels}>
                  <Icon name="plus-circle-outline" style={styles.addIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <FlatList
            data={credentials.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())}
            keyExtractor={(credential) => credential.id}
            renderItem={({ item: credential }) => {
              const connection = connectionsMap[credential.connectionId ?? '']
              const logoUrl = connection?.imageUrl

              return (
                <View style={styles.credentialContainer}>
                  <CredentialCardCustom
                    credential={credential}
                    onPress={() => stackNavigation.navigate(Screens.CredentialDetails, { credential })}
                    logoUrl={logoUrl}
                  />
                </View>
              )
            }}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  boxContainer: {
    flexDirection: 'row',
    width: '95%',
    height: 106,
    backgroundColor: '#D9D9D9',
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  darkRectangle: {
    width: '30%',
    height: '100%',
    backgroundColor: '#616161',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightRectangle: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo: {
    width: '70%',
    height: '70%',
  },
  walletText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 0,
    marginBottom: 5,
  },
  walletDescription: {
    fontSize: 15,
    color: '#000',
    flexWrap: 'wrap',
    width: '80%',
  },
  addIconContainer: {
    position: 'absolute',
    right: 15,
    top: '30%',
    transform: [{ translateY: -12 }],
    backgroundColor: 'transparent',
    padding: 0,
  },
  addIcon: {
    fontSize: 30,
    color: '#000',
  },
  credentialContainer: {
    marginHorizontal: '5%',
    marginTop: 15,
    marginBottom: 45,
  },
})

export default ListCredentials
