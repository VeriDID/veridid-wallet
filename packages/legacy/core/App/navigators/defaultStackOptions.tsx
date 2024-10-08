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
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
    },
    logoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 8, // Space between logo and title
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleContainer: {
      width: '100%',
      alignItems: 'flex-start', // Align the title to the left
      paddingLeft: 0, // Left padding for the title
    },
  })

  return (
    globalScreenOptions ?? {
      headerTintColor: '#ffffff', //ColorPallet.brand.headerIcon,
      headerShown: true,
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: 'white', //ColorPallet.brand.headerBackground,
        elevation: 0,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 6,
        shadowColor: 'white', //ColorPallet.grayscale.black,
        shadowOpacity: 0.15,
        borderBottomWidth: 0,
        height: 160, // Increase header height to accommodate logo and title
      },
      headerTitleAlign: 'left' as 'center' | 'left',
      headerTitle: (props: { children: React.ReactNode }) => (
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </View>
          <View style={styles.titleContainer}>
            <HeaderTitle {...props} />
          </View>
        </View>
      ),
      headerBackAccessibilityLabel: t('Global.Back'),
    }
  )
}
