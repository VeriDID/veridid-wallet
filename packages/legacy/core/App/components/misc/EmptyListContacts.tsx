import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../contexts/theme'
import { ContactStackParams, Screens, Stacks } from '../../types/navigators'
import Link from '../texts/Link'

export interface EmptyListProps {
  navigation: StackNavigationProp<ContactStackParams, Screens.Contacts>
}

const EmptyListContacts: React.FC<EmptyListProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { ListItems, Assets, ColorPallet, TextTheme } = useTheme()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
      paddingTop: 100,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    text: {
      textAlign: 'center',
      marginTop: 10,
    },
    link: {
      textAlign: 'center',
      marginTop: 10,
      alignSelf: 'center',
    },
    svg: {
      color: ColorPallet.brand.secondaryDisabled
    }
  })

  const navigateToWhatAreContacts = () => {
    navigation.getParent()?.navigate(Stacks.ContactStack, { screen: Screens.WhatAreContacts })
  }

  return (
    <View style={styles.container}>
      <Assets.svg.contactBook fill={ListItems.emptyList.color} height={100} />
      <Text style={[TextTheme.headingFour, styles.text, { marginTop: 30 }]}>{t('Contacts.EmptyList')}</Text>
      <Text style={[ListItems.emptyList, styles.text]}>{t('Contacts.PeopleAndOrganizations')}</Text>
    </View>
  )
}

export default EmptyListContacts
