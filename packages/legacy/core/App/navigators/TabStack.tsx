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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ColorPallet.brand.primary }}>
      <Tab.Navigator
        initialRouteName={TabStacks.HomeStack}
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
        /> */}
        <Tab.Screen
          name={TabStacks.CredentialStack}
          component={CredentialStack}
          options={{
            tabBarIconStyle: styles.tabBarIcon,
            tabBarIcon: ({ color, focused }) => (
              <AttachTourStep tourID={TourID.HomeTour} index={2}>
                <View style={{ ...TabTheme.tabBarContainerStyle, justifyContent: showLabels ? 'flex-end' : 'center' }}>
                  <Icon name={focused ? 'wallet' : 'wallet-outline'} color={color} size={30} />
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
        {/* <Tab.Screen
          name={TabStacks.ConnectStack}
          options={{
            tabBarIconStyle: styles.tabBarIcon,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: 'relative',
                  flex: 1,
                  width: 90,
                }}
              >
                <AttachTourStep tourID={TourID.HomeTour} index={0} fill>
                  <View
                    style={{
                      position: 'absolute',
                      flexGrow: 1,
                      width: 90,
                      bottom: 0,
                      minHeight: 90,
                      margin: 'auto',
                    }}
                  >
                    <AttachTourStep tourID={TourID.CredentialsTour} index={0} fill>
                      <View
                        style={{
                          flexGrow: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}
                      >
                        <View
                          accessible={true}
                          accessibilityRole={'button'}
                          accessibilityLabel={t('TabStack.Scan')}
                          style={{ ...TabTheme.focusTabIconStyle }}
                        >
                          <Icon
                            accessible={false}
                            name="qrcode-scan"
                            color={TabTheme.tabBarButtonIconStyle.color}
                            size={32}
                            style={{ paddingLeft: 0.5, paddingTop: 0.5 }}
                          />
                        </View>
                        <Text
                          style={{
                            ...TabTheme.tabBarTextStyle,
                            color: focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
                            marginTop: 5,
                          }}
                        >
                          {t('TabStack.Scan')}
                        </Text>
                      </View>
                    </AttachTourStep>
                  </View>
                </AttachTourStep>
              </View>
            ),
            tabBarShowLabel: false,
            tabBarAccessibilityLabel: t('TabStack.Scan'),
            tabBarTestID: testIdWithKey(t('TabStack.Scan')),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault()
              if (!assertConnectedNetwork()) {
                return
              }
              navigation.navigate(Stacks.ConnectStack, { screen: Screens.Scan })
            },
          })}
        >
          {() => <View />}
        </Tab.Screen> */}
        <Tab.Screen
          name={TabStacks.ContactStack}
          component={ContactStack}
          options={{
            tabBarIconStyle: styles.tabBarIcon,
            tabBarIcon: ({ color, focused }) => (
              <AttachTourStep tourID={TourID.HomeTour} index={4}>
                <View style={{ ...TabTheme.tabBarContainerStyle, justifyContent: showLabels ? 'flex-end' : 'center' }}>
                  <Icon name={focused ? 'chat' : 'chat-outline'} color={color} size={30} />
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
                  <Icon name={focused ? 'cog' : 'cog-outline'} color={color} size={30} />
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
