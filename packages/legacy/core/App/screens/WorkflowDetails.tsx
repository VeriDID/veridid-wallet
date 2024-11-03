import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native'
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
import CustomWorkflowHeader from '../navigators/components/CustomWorkflowHearder'

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

  const { display, workflows } = useWorkflow()
  const [displayData, setDisplayData] = useState<any>(null)
  const [workflowName, setWorkflowName] = useState<string>('')
  const [modalWorkflows, setModalWorkflows] = useState<Array<any>>([])
  const [iconColor, setIconColor] = useState('black')

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

  const handleBackPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

   // Optional: Add button handler if needed
   const handleAddPress = useCallback(() => {
    // Your add logic here
  }, [])

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => (
          <CustomWorkflowHeader
            title={connectionDetails.label || modalWorkflows[0]?.name || t('Screens.Channels')}
            onBackPress={handleBackPress}
          />
        ),
        gestureEnabled: false,
      })
    }, [navigation, connectionDetails.label, modalWorkflows, t, handleBackPress, handleAddPress])
  )

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

  // Get workflows when connection changes
  useEffect(() => {
    if (connection?.id) {
      const flows = workflows.get(connection.id)
      if (flows && flows.workflows && Array.isArray(flows.workflows)) {
        // Filter unique workflows by workflowid
        const uniqueWorkflows = flows.workflows.reduce((acc: any[], curr: any) => {
          const exists = acc.find((w) => w.workflowid === curr.workflowid)
          if (!exists) {
            acc.push(curr)
          }
          return acc
        }, [])

        setModalWorkflows(uniqueWorkflows)
      }
    }
  }, [workflows, connection])
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
      headerTitle: modalWorkflows[0]?.name,
      headerLeft: () => (
        <IconButton
          buttonLocation={ButtonLocation.Left}
          accessibilityLabel={t('Global.Back')}
          testID="BackButton"
          icon="arrow-left"
          onPress={() => {
            navigation.goBack()
          }}
        />
      ),
    })
  }, [navigation, t])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF', // White background
    },
    scrollContent: {
      padding: 20,
    },
    workflowContainer: {
      backgroundColor: '#FFFFFF', // White background for workflow content
      borderRadius: 12,
      padding: 16,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    detailsContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      padding: 16,
      marginTop: 10,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0', // Light gray border
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
    image: {
      width: '100%',
      height: 200,
      marginBottom: 20,
      borderRadius: 8, 
    },
    title: {
      ...TextTheme.headingTwo,
      textAlign: 'center',
      marginBottom: 10,
      color: '#333333', 
    },
    text: {
      ...TextTheme.normal,
      marginBottom: 10,
      color: '#666666', 
    },
    buttonContainer: {
      padding: 20,
      paddingBottom: 40,
    },
    actionButton: {
      backgroundColor: '#FF69B4', // Pink background for buttons
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      marginVertical: 8,
    },
    buttonText: {
      color: '#FFFFFF', // White text for buttons
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    infoText: {
      ...TextTheme.normal,
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 10,
      color: '#666666',
    },
  })

  const ActionButton: React.FC<{ title: string; onPress: () => void }> = ({ title, onPress }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        {displayData && displayData.length > 0 ? (
          <View style={styles.workflowContainer}>
            {displayData.map((item: any, index: number) => {
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
                  return <ActionButton key={index} title={item.label} onPress={() => handleAction(item.actionID)} />
                default:
                  return null
              }
            })}
          </View>
        ) : (
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
        {!displayData && <ActionButton title={t('Global.Continue')} onPress={handleContinue} />}
      </View>
    </SafeAreaView>
  )
}

export default WorkflowDetails
