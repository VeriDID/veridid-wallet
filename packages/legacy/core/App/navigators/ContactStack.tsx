import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Text, Image } from 'react-native'
import type { StackHeaderProps } from '@react-navigation/stack'

import HeaderRightHome from '../components/buttons/HeaderHome'
// import { useTheme } from '../contexts/theme'
import HeaderButton, { ButtonLocation } from '../components/buttons/HeaderButton'
import Chat from '../screens/Chat'
import ContactDetails from '../screens/ContactDetails'
import CredentialDetails from '../screens/CredentialDetails'
import CredentialOffer from '../screens/CredentialOffer'
import ListContacts from '../screens/ListContacts'
import ProofDetails from '../screens/ProofDetails'
import ProofRequest from '../screens/ProofRequest'
import RenameContact from '../screens/RenameContact'
import WhatAreContacts from '../screens/WhatAreContacts'
import { ContactStackParams, Screens, Stacks } from '../types/navigators'
import { useDefaultStackOptions } from './defaultStackOptions'
import CustomContactsHeader from './components/CustomContactsHeader'
import ContactsTitle from './components/ContactsTitle'
import { useTheme } from '../contexts/theme'
import { TOKENS, useServices } from '../container-api'
import { testIdWithKey } from '../utils/testable'
import { useNetwork } from '../contexts/network'
import WorkflowDetails from '../screens/WorkflowDetails'
import Workflows from '../screens/Workflows'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../assets/img/veridid-logo.png')

const CustomHeaderTitle: React.FC<StackHeaderProps> = (props) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { HeaderTheme } = useTheme()
  const { navigation } = props
  const { assertConnectedNetwork } = useNetwork()

  const handleAddPress = () => {
    if (!assertConnectedNetwork()) {
      return
    }
    navigation.navigate(Screens.Scan)
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 16,
    },
    logoContainer: {
      marginBottom: 8,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      ...theme.TextTheme.headerTitle,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={HeaderTheme.headerLogoStyle} />
      </View>
      <View style={styles.titleRow}>
        <View style={styles.titleContainer}>
          <Text style={theme.TextTheme.headerTitle}>
            {typeof props.options.title === 'string' ? props.options.title : t('Screens.Channels')}
          </Text>
        </View>
        <HeaderButton
          buttonLocation={ButtonLocation.Right}
          accessibilityLabel={t('Contacts.AddContact')}
          testID="AddContactButton"
          onPress={handleAddPress}
          icon="plus-circle-outline"
          iconTintColor={theme.Buttons.primaryText}
        />
      </View>
    </View>
  )
}

const ContactStack: React.FC = () => {
  const Stack = createStackNavigator<ContactStackParams>()
  const theme = useTheme()
  const [scan] = useServices([TOKENS.SCREEN_SCAN])
  const { t } = useTranslation()
  const defaultStackOptions = useDefaultStackOptions()

  const styles = StyleSheet.create({
    headerContainer: {},
  })

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.Contacts}
        component={ListContacts}
        options={{
          title: t('Screens.Channels'),
          header: (props) => <CustomHeaderTitle {...props} />,
        }}
      />

      <Stack.Screen name={Screens.Scan} component={scan} options={{ headerBackTestID: testIdWithKey('Back') }} />

      <Stack.Screen
        name={Screens.ContactDetails}
        component={ContactDetails}
        options={{
          title: t('Screens.ContactDetails'),
        }}
      />
      <Stack.Screen
        name={Screens.RenameContact}
        component={RenameContact}
        options={{ title: t('Screens.RenameContact') }}
      />
      <Stack.Screen name={Screens.Chat} component={Chat} />
      <Stack.Screen name={Screens.WhatAreContacts} component={WhatAreContacts} options={{ title: '' }} />
      <Stack.Screen
        name={Screens.CredentialDetails}
        component={CredentialDetails}
        options={{ title: t('Screens.CredentialDetails') }}
      />
      <Stack.Screen
        name={Screens.CredentialOffer}
        component={CredentialOffer}
        options={{ title: t('Screens.CredentialOffer') }}
      />
      <Stack.Screen
        name={Screens.ProofDetails}
        component={ProofDetails}
        options={() => ({
          title: '',
          headerRight: () => <HeaderRightHome />,
        })}
      />
      <Stack.Screen
        name={Screens.ProofRequest}
        component={ProofRequest}
        options={{ title: t('Screens.ProofRequest') }}
      />
      {/* Workflows & details Added in here */}
      <Stack.Screen name={Screens.Workflows} component={Workflows} options={{ headerShown: true }} />
      <Stack.Screen name={Screens.WorkflowDetails} component={WorkflowDetails} options={{ headerShown: true }} />
    </Stack.Navigator>
  )
}

export default ContactStack
