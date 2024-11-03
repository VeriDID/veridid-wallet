// customworkflowheader.tsx
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useTheme } from '../../contexts/theme'
import IconButton, { ButtonLocation } from '../../components/buttons/IconButton'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../../assets/img/veridid-logo.png')

interface CustomWorkflowHeaderProps {
  title: string
  onBackPress: () => void
}

const CustomWorkflowHeader: React.FC<CustomWorkflowHeaderProps> = ({ title, onBackPress }) => {
  const { TextTheme, ColorPallet, HeaderTheme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    logoContainer: {
      marginBottom: 8,
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      ...TextTheme.headerTitle,
      marginLeft: 32,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={HeaderTheme.headerLogoStyle} />
      </View>
      <View style={styles.titleRow}>
        <View style={styles.titleContainer}>
          <IconButton
            buttonLocation={ButtonLocation.Left}
            accessibilityLabel="Back"
            testID="BackButton"
            icon="arrow-left"
            onPress={onBackPress}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </View>
  )
}

export default CustomWorkflowHeader
