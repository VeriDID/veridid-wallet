import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '../../contexts/theme'

interface ContactsTitleProps {
  title: string
  onAddPress: () => void
}

const ContactsTitle: React.FC<ContactsTitleProps> = ({ title, onAddPress }) => {
  const { TextTheme, ColorPallet } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 16,
      height: 44, // Adjust as needed
    },
    title: {
      ...TextTheme.headerTitle,
      color: 'black',
    },
    iconContainer: {
      padding: 8,
    },
    icon: {
      color: ColorPallet.brand.primary,
      fontSize: 24,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.iconContainer} onPress={onAddPress}>
        <Icon name="plus-circle-outline" style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

export default ContactsTitle