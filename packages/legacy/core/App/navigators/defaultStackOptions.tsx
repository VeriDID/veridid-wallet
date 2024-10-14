import { StackNavigationOptions } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../contexts/theme'
import { OnboardingTheme } from '../theme'
import { ScreenOptionsType, Screens } from '../types/navigators'
import { testIdWithKey } from '../utils/testable'
import { Image, Text, View } from 'react-native'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../assets/img/veridid-logo.png')

export const DefaultScreenOptionsDictionary: ScreenOptionsType = {
  [Screens.Preface]: {
    headerTintColor: OnboardingTheme.headerTintColor,
    headerLeft: () => false,
  },
  [Screens.Splash]: {
    headerShown: false,
  },
  [Screens.Onboarding]: {
    headerTintColor: OnboardingTheme.headerTintColor,
    gestureEnabled: false,
    headerLeft: () => false,
  },
  [Screens.Terms]: {
    headerTintColor: OnboardingTheme.headerTintColor,
    headerLeft: () => false,
  },
  [Screens.CreatePIN]: {
    headerLeft: () => false,
  },
  [Screens.UseBiometry]: {
    headerTintColor: OnboardingTheme.headerTintColor,
    headerLeft: () => false,
  },
  [Screens.Developer]: {
    headerTintColor: OnboardingTheme.headerTintColor,
    headerBackTestID: testIdWithKey('Back'),
  },
  [Screens.UsePushNotifications]: {
    headerTintColor: OnboardingTheme.headerTintColor,
    headerLeft: () => false,
  },
}
export function useDefaultStackOptions(): StackNavigationOptions {
  const { t } = useTranslation()
  const { HeaderTheme } = useTheme()
  const theme = useTheme()

  return {
    headerStyle: {
      ...HeaderTheme.headerStyle,
    },

    headerTitle: ({ children }: { children: React.ReactNode }) => (
      <View style={HeaderTheme.container}>
        <View style={HeaderTheme.logoContainer}>
          <Image source={logo} style={HeaderTheme.headerLogoStyle} />
        </View>
        <View style={HeaderTheme.titleRow}>
          <View style={HeaderTheme.titleContainer}>
            <Text style={theme.TextTheme.headerTitle}>{children}</Text>
          </View>
        </View>
      </View>
    ),
    headerBackAccessibilityLabel: t('Global.Back'),
}
}
