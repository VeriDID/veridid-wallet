import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useTheme } from '../contexts/theme'
import NameWallet from '../screens/NameWallet'
import PasteUrl from '../screens/PasteUrl'
import ScanHelp from '../screens/ScanHelp'
import { ConnectStackParams, Screens } from '../types/navigators'
import { testIdWithKey } from '../utils/testable'

import { useDefaultStackOptions } from './defaultStackOptions'
import { TOKENS, useServices } from '../container-api'
import Workflows from '../screens/Workflows'

const ConnectStack: React.FC = () => {
  const Stack = createStackNavigator<ConnectStackParams>()
  const theme = useTheme()

  const [scan] = useServices([TOKENS.SCREEN_SCAN])
  const { t } = useTranslation()

  return (
    <Stack.Navigator
    >
      <Stack.Screen name={Screens.Scan} component={scan} options={{ headerBackTestID: testIdWithKey('Back') }} />
      <Stack.Screen
        name={Screens.PasteUrl}
        component={PasteUrl}
        options={() => ({
          title: t('PasteUrl.PasteUrl'),
          headerBackTestID: testIdWithKey('Back'),
        })}
      />
      <Stack.Screen name={Screens.ScanHelp} component={ScanHelp} />
      <Stack.Screen
        name={Screens.NameWallet}
        component={NameWallet}
        options={{
          title: t('Screens.NameWallet'),
          headerBackTestID: testIdWithKey('Back'),
        }}
      />
      <Stack.Screen name={Screens.Workflows} component={Workflows} options={{ headerBackTestID: testIdWithKey('Back') }} />
    </Stack.Navigator>
  )
}

export default ConnectStack
