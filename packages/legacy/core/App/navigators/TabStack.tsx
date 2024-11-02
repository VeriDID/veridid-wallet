import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, useWindowDimensions, View, StyleSheet } from 'react-native'
//import { isTablet } from 'react-native-device-info'
import { OrientationType, useOrientationChange } from 'react-native-orientation-locker'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { AttachTourStep } from '../components/tour/AttachTourStep'
//import { TOKENS, useServices } from '../container-api'
import { useNetwork } from '../contexts/network'
import { useTheme } from '../contexts/theme'
import { TabStackParams, TabStacks } from '../types/navigators'
import { TourID } from '../types/tour'
import { testIdWithKey } from '../utils/testable'

import CredentialStack from './CredentialStack'
import SettingStack from './SettingStack'
import ContactStack from './ContactStack'
import ConnectStack from './ConnectStack'
import HomeStack from './HomeStack'

const TabStack: React.FC = () => {
  const { fontScale } = useWindowDimensions()
  //const [] = useServices([TOKENS.NOTIFICATIONS])
  const { t } = useTranslation()
  const Tab = createBottomTabNavigator<TabStackParams>()
  useNetwork()
  const { ColorPallet, TabTheme, TextTheme } = useTheme()
  const [, setOrientation] = useState(OrientationType.PORTRAIT)
  const showLabels = fontScale * TabTheme.tabBarTextStyle.fontSize < 18
  const styles = StyleSheet.create({
    tabBarIcon: {
      flex: 1,
    },
  })

  useOrientationChange((orientationType) => {
    setOrientation(orientationType)
  })
  //2 line below color is controlling very top and very bottom footers.
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ColorPallet.brand.primaryBackground }}>
      <Tab.Navigator
        initialRouteName={TabStacks.CredentialStack}
        screenOptions={{
          unmountOnBlur: true,
          tabBarStyle: {
            ...TabTheme.tabBarStyle,
          },
          tabBarActiveTintColor: TabTheme.tabBarActiveTintColor,
          tabBarInactiveTintColor: TabTheme.tabBarInactiveTintColor,
          header: () => null,
        }}
      >
        {/* <Tab.Screen
          name={TabStacks.HomeStack}
          component={HomeStack}
          options={{
            tabBarIconStyle: styles.tabBarIcon,
            tabBarIcon: ({ color, focused }) => (
              <AttachTourStep tourID={TourID.HomeTour} index={1}>
                <View style={{ ...TabTheme.tabBarContainerStyle, justifyContent: showLabels ? 'flex-end' : 'center' }}>
                  <Icon name={focused ? 'message-text' : 'message-text-outline'} color={color} size={30} />

                  {showLabels && (
                    <Text
                      style={{
                        ...TabTheme.tabBarTextStyle,
                        color: focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
                        fontWeight: focused ? TextTheme.bold.fontWeight : TextTheme.normal.fontWeight,
                      }}
                    >
                      {t('TabStack.Home')}
                    </Text>
                  )}
                </View>
              </AttachTourStep>
            ),
            tabBarShowLabel: false,
            tabBarAccessibilityLabel: `${t('TabStack.Home')} (${notifications.length ?? 0})`,
            tabBarTestID: testIdWithKey(t('TabStack.Home')),
            tabBarBadge: notifications.length || undefined,
            tabBarBadgeStyle: {
              marginLeft: leftMarginForDevice(),
              backgroundColor: ColorPallet.semantic.error,
            },
          }}
        />   */}
        <Tab.Screen
          name={TabStacks.CredentialStack}
          component={CredentialStack}
          options={{
            tabBarIconStyle: styles.tabBarIcon,
            tabBarIcon: ({ color, focused }) => (
              <AttachTourStep tourID={TourID.HomeTour} index={2}>
                <View style={{ ...TabTheme.tabBarContainerStyle, justifyContent: showLabels ? 'flex-end' : 'center' }}>
                  <Icon name={focused ? 'wallet-outline' : 'wallet-outline'} color={color} size={30} />
                  {showLabels && (
                    <Text
                      style={{
                        ...TabTheme.tabBarTextStyle,
                        color: focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
                        fontWeight: focused ? TextTheme.bold.fontWeight : TextTheme.normal.fontWeight,
                        fontSize: 13,
                      }}
                    >
                      {/* {t('TabStack.Credentials')} */}
                    </Text>
                  )}
                </View>
              </AttachTourStep>
            ),
            tabBarShowLabel: false,
            tabBarAccessibilityLabel: t('TabStack.Credentials'),
            tabBarTestID: testIdWithKey(t('TabStack.Credentials')),
          }}
        />
        <Tab.Screen
          name={TabStacks.ContactStack}
          component={ContactStack}
          options={{
            tabBarIconStyle: styles.tabBarIcon,
            tabBarIcon: ({ color, focused }) => (
              <AttachTourStep tourID={TourID.HomeTour} index={4}>
                <View style={{ ...TabTheme.tabBarContainerStyle, justifyContent: showLabels ? 'flex-end' : 'center' }}>
                  <Icon name={focused ? 'chat-outline' : 'chat-outline'} color={color} size={30} />
                  {showLabels && (
                    <Text
                      style={{
                        ...TabTheme.tabBarTextStyle,
                        color: focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
                        fontWeight: focused ? TextTheme.bold.fontWeight : TextTheme.normal.fontWeight,
                        fontSize: 13,
                      }}
                    >
                      {/* {t('TabStack.Contacts')} */}
                    </Text>
                  )}
                </View>
              </AttachTourStep>
            ),
            tabBarShowLabel: false,
            tabBarAccessibilityLabel: t('TabStack.Contacts'),
            tabBarTestID: testIdWithKey(t('TabStack.Contacts')),
          }}
        />
        <Tab.Screen
          name={TabStacks.SettingStack}
          component={SettingStack}
          options={{
            tabBarIconStyle: styles.tabBarIcon,
            tabBarIcon: ({ color, focused }) => (
              <AttachTourStep tourID={TourID.HomeTour} index={3}>
                <View style={{ ...TabTheme.tabBarContainerStyle, justifyContent: showLabels ? 'flex-end' : 'center' }}>
                  <Icon name={focused ? 'cog-outline' : 'cog-outline'} color={color} size={30} />
                  {showLabels && (
                    <Text
                      style={{
                        ...TabTheme.tabBarTextStyle,
                        color: focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
                        fontWeight: focused ? TextTheme.bold.fontWeight : TextTheme.normal.fontWeight,
                      }}
                    >
                      {/* {t('TabStack.Settings')} */}
                    </Text>
                  )}
                </View>
              </AttachTourStep>
            ),
            tabBarShowLabel: false,
            tabBarAccessibilityLabel: t('TabStack.Settings'),
            tabBarTestID: testIdWithKey(t('TabStack.Settings')),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export default TabStack
