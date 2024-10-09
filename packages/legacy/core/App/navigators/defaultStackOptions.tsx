import { StackNavigationOptions } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import HeaderTitle from '../components/texts/HeaderTitle'
import { ITheme, OnboardingTheme } from '../theme'
import { ScreenOptionsType, Screens } from '../types/navigators'
import { testIdWithKey } from '../utils/testable'
import { TOKENS, useServices } from '../container-api'
import logo from '../assets/img/veridid-logo.png' // Import your logo
import { Image, StyleSheet, View } from 'react-native' // Import Image and View from 'react-native'

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
  [Screens.NameWallet]: {
    headerTintColor: OnboardingTheme.headerTintColor,
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

export function useDefaultStackOptions({ ColorPallet }: ITheme): StackNavigationOptions {
  const { t } = useTranslation()
  const [{ globalScreenOptions }] = useServices([TOKENS.CONFIG])

  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      width: 90,
      height: 90,
      marginLeft: 16,
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'center',
      marginLeft: 16,
    },
  })

  return (
    globalScreenOptions ?? {
      headerTintColor: ColorPallet.brand.primary,
      headerShown: true,
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: 'white',
        elevation: 0,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 6,
        shadowColor: ColorPallet.grayscale.black,
        shadowOpacity: 0.15,
        borderBottomWidth: 0,
        height: 120, // Adjust this value if needed
      },
      headerTitleAlign: 'left' as 'center' | 'left',
      headerLeft: () => <Image source={logo} style={styles.logo} resizeMode="contain" />,
      headerTitle: (props: { children: React.ReactNode }) => (
        <View style={styles.titleContainer}>
          <HeaderTitle {...props} />
        </View>
      ),
      headerBackAccessibilityLabel: t('Global.Back'),
    }
  )
}
