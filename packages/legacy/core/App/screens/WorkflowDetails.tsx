import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useTheme } from '../contexts/theme'
import IconButton, { ButtonLocation } from '../components/buttons/IconButton'
import CustomButton, { ButtonType } from '../components/buttons/Button' // Renamed to avoid conflict
//import { Stacks, Screens } from '../types/navigators'
import { useConnectionByOutOfBandId, useOutOfBandById } from '../hooks/connections'
import { testIdWithKey } from '../utils/testable'
//import { useServices, TOKENS } from '../container-api'
import { useWorkflow } from '../contexts/workflow' // Import useWorkflow

// Define route params type
type WorkflowDetailsParam = {
  oobRecordId: string
}

const WorkflowDetails: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<Record<string, WorkflowDetailsParam>, string>>()
  const { t } = useTranslation()
  const { TextTheme, ColorPallet } = useTheme()
  //const [logger] = useServices([TOKENS.UTIL_LOGGER])

  const { display } = useWorkflow()
  const [displayData, setDisplayData] = useState<any>(null)

  // Get connection details using the oobRecordId
  const oobRecord = useOutOfBandById(route.params?.oobRecordId)
  const connection = useConnectionByOutOfBandId(route.params?.oobRecordId)

  // State for connection details
  const [connectionDetails, setConnectionDetails] = useState({
    invitationType: '',
    goalCode: '',
    state: '',
    label: '',
  })

  // Update connection details when data is available
  useEffect(() => {
    if (oobRecord) {
      setConnectionDetails({
        invitationType: oobRecord.outOfBandInvitation.type || 'Unknown',
        goalCode: oobRecord.outOfBandInvitation.goalCode || 'No goal code',
        state: oobRecord.state || 'Unknown state',
        label: oobRecord.outOfBandInvitation.label || 'No label',
      })
    }
  }, [oobRecord])

  // Fetch displayData when connection changes
  useEffect(() => {
    if (connection) {
      setDisplayData(display.get(connection.id))
    }
  }, [display, connection])

  // Handle action button presses from displayData
  const handleAction = (actionID: string) => {
    // Implement your action handling logic here
    console.log('Button pressed with actionID:', actionID)
    // For example, navigate to another state or screen
  }

  // Handle continue button press
  const handleContinue = () => {
    if (route.params?.oobRecordId) {
      return
    }
  }

  // Header configuration
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: connectionDetails.label,
      headerLeft: () => (
        <IconButton
          buttonLocation={ButtonLocation.Left}
          accessibilityLabel={t('Global.Back')}
          testID="BackButton"
          icon="arrow-left"
          onPress={() => {
            navigation.goBack()
            navigation.goBack()
          }}
        />
      ),
    })
  }, [navigation, t])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorPallet.brand.modalPrimaryBackground,
    },
    scrollContent: {
      padding: 20,
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    detailsContainer: {
      backgroundColor: ColorPallet.brand.secondaryBackground,
      borderRadius: 8,
      padding: 16,
      marginTop: 10,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.brand.primaryBackground,
    },
    lastDetailRow: {
      borderBottomWidth: 0,
    },
    label: {
      ...TextTheme.normal,
      opacity: 0.8,
    },
    value: {
      ...TextTheme.normal,
      fontWeight: 'bold',
    },
    infoText: {
      ...TextTheme.normal,
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    buttonContainer: {
      padding: 20,
      paddingBottom: 40,
    },
    image: {
      width: '100%',
      height: 200,
      marginBottom: 20,
    },
    title: {
      ...TextTheme.headingTwo,
      textAlign: 'center',
      marginBottom: 10,
    },
    text: {
      ...TextTheme.normal,
      marginBottom: 10,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        {displayData && displayData.length > 0 ? (
          // Render displayData
          displayData.map((item: any, index: number) => {
            switch (item.type) {
              case 'image':
                return <Image key={index} source={{ uri: item.url }} style={styles.image} resizeMode="contain" />
              case 'title':
                return (
                  <Text key={index} style={styles.title}>
                    {item.text}
                  </Text>
                )
              case 'text':
                return (
                  <Text key={index} style={styles.text}>
                    {item.text}
                  </Text>
                )
              case 'button':
                return <Button key={index} title={item.label} onPress={() => handleAction(item.actionID)} />
              default:
                return null
            }
          })
        ) : (
          // Render existing content if displayData is not available
          <>
            <View style={styles.headerContainer}>
              <Text style={TextTheme.headingTwo} testID={testIdWithKey('NewConnection')}>
                New Connection
              </Text>
            </View>

            <Text style={styles.infoText}>Connection Details</Text>

            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Connection Type:</Text>
                <Text style={styles.value}>{connectionDetails.invitationType}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Connection Goal Code</Text>
                <Text style={styles.value}>{connectionDetails.goalCode}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Connection State:</Text>
                <Text style={styles.value}>{connectionDetails.state}</Text>
              </View>
              <View style={[styles.detailRow, styles.lastDetailRow]}>
                <Text style={styles.label}>Connection Label:</Text>
                <Text style={styles.value}>{connectionDetails.label}</Text>
              </View>
            </View>

            <Text style={styles.infoText}>Connection proceed message</Text>
          </>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        {/* Show the 'Continue' button only if displayData is not present */}
        {!displayData && (
          <CustomButton
            title={t('Global.Continue')}
            accessibilityLabel={t('Global.Continue')}
            testID={testIdWithKey('Continue')}
            onPress={handleContinue}
            buttonType={ButtonType.Primary}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default WorkflowDetails
