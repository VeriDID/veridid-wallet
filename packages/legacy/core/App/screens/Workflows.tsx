//workflows.tsx
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native'
import { useNavigation, useRoute, RouteProp, useFocusEffect, CommonActions } from '@react-navigation/native'
import { useWorkflow } from '../contexts/workflow'
import { useTheme } from '../contexts/theme'
import { StackNavigationProp } from '@react-navigation/stack'
import { ContactStackParams, Screens } from '../types/navigators'
import { useConnectionByOutOfBandId, useOutOfBandById } from '../hooks/connections'
import { useTranslation } from 'react-i18next'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomContactsHeader from '../navigators/components/CustomContactsHeader'
import { useAgent } from '@credo-ts/react-hooks'

type WorkflowsScreenNavigationProp = StackNavigationProp<ContactStackParams, Screens.Workflows>
type WorkflowsRouteProp = RouteProp<ContactStackParams, Screens.Workflows>

const Workflows: React.FC = () => {
  const navigation = useNavigation<WorkflowsScreenNavigationProp>()
  const route = useRoute<WorkflowsRouteProp>()

  const { workflows, saveCurrentWorkflows } = useWorkflow()
  const { TextTheme, ColorPallet } = useTheme()
  const { t } = useTranslation()
  const { oobRecordId } = route.params

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [iconColor, setIconColor] = useState('black') // Initialize icon color as black

  const [modalWorkflows, setModalWorkflows] = useState<Array<any>>([])

  // Get the connection using oobRecordId
  const oobRecord = useOutOfBandById(route.params?.oobRecordId)
  const connection = useConnectionByOutOfBandId(route.params?.oobRecordId)

  const { agent } = useAgent()

  // State for connection details
  const [connectionDetails, setConnectionDetails] = useState({
    invitationType: '',
    goalCode: '',
    state: '',
    label: '',
  })

  const toggleModal = useCallback(() => {
    setIsModalVisible((prevState) => !prevState)
    setIconColor((prevState) => (prevState === 'black' ? '#FF1493' : 'black'))
  }, [])

  // Add function to handle workflow selection
  const handleWorkflowSelect = useCallback(
    async (workflow: any) => {
      if (!connection?.id || !agent) return

      try {
        // Add timestamp to make each instance unique
        const instanceId = Date.now().toString()

        // Send DRPC request for the selected workflow
        if (agent) {
          await agent.modules.drpc.sendRequest(connection.id, {
            jsonrpc: '2.0',
            method: 'workflow_request',
            id: '',
            params: {
              version: '1.0',
              workflowid: workflow.workflowid,
              instance: instanceId, // New instance
              actionId: '',
            },
          })
        }

        // Add the new workflow to the list
        const newWorkflow = {
          ...workflow,
          oobRecordId,
          instanceId, // Add instance ID to track this specific instance
          status: 'pending',
          timestamp: new Date().toISOString(),
        }

        // Get existing workflows
        const currentWorkflows = workflows.get(connection.id) || { workflows: [] }

        //console.log('Current workflows:', currentWorkflows)

        // Add new workflow to existing workflows
        const updatedWorkflows = {
          ...currentWorkflows,
          workflows: [...currentWorkflows.workflows, newWorkflow],
        }

        // Save updated workflows to context
        saveCurrentWorkflows(connection.id, updatedWorkflows)

        // Close modal
        toggleModal()

        // Navigate to workflow details screen
        navigation.navigate(Screens.WorkflowDetails, {
          oobRecordId: oobRecordId,
          workflowId: workflow.workflowid,
          instanceId, // Pass instance ID to the details screen
        })
      } catch (error) {
        console.error('Error requesting workflow:', error)
      }
    },
    [connection, navigation, oobRecordId, toggleModal, agent, workflows, saveCurrentWorkflows]
  )

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

  // Update connection details when data is available, this part is trivial
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

  const handleBackPress = useCallback(() => {
    navigation.dispatch(
      CommonActions.navigate({
        name: Screens.Contacts,
      })
    )
  }, [navigation])

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => (
          <CustomContactsHeader
            title={connectionDetails.label || t('Screens.Channels')}
            onAddPress={toggleModal}
            onBackPress={handleBackPress}
            iconColor={iconColor}
          />
        ),
        gestureEnabled: false,
      })
    }, [navigation, connectionDetails.label, t, toggleModal, handleBackPress, iconColor])
  )

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorPallet.brand.primaryBackground,
      padding: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '90%', // Increase modal width
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'flex-start', // Align content to the left
    },
    closeIconContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      alignSelf: 'flex-start',
    },
    modalItem: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'left',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 4,
      backgroundColor: ColorPallet.brand.secondaryBackground,
      // Add touch feedback styles:
      touchAction: 'none',
    },
    modalItemContainer: {
      width: '100%',
      backgroundColor: ColorPallet.brand.secondaryBackground,
      borderRadius: 8,
      marginBottom: 8,
      overflow: 'hidden',
    },
    modalEmptyText: {
      fontSize: 14,
      color: ColorPallet.grayscale.mediumGrey,
      textAlign: 'center',
      marginTop: 20,
    },
    card: {
      backgroundColor: ColorPallet.brand.secondaryBackground,
      borderRadius: 6,
      marginBottom: 16,
      //overflow: 'hidden',commented because it was blocking the shadow
      // Shadow properties for iOS
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      // Elevation for Android
      elevation: 5,
    },
    cardContent: {
      padding: 16,
    },
    statusBar: {
      height: 4,
      width: '100%',
      position: 'absolute',
      bottom: 0, // Move to bottom
    },
    statusBarPending: {
      backgroundColor: '#FFA500', // Orange for pending
    },
    statusBarComplete: {
      backgroundColor: '#4CAF50', // Green for complete
    },
    title: {
      ...TextTheme.headingThree,
      marginBottom: 4,
      fontSize: 18,
      fontWeight: '600',
    },
    subtitle: {
      ...TextTheme.normal,
      color: ColorPallet.grayscale.black,
      fontSize: 14,
    },
    timestamp: {
      ...TextTheme.normal,
      color: ColorPallet.grayscale.mediumGrey,
      fontSize: 12,
      marginTop: 8,
    },
    statusIcon: {
      position: 'absolute',
      right: 16,
      top: 16,
    },
    emptyText: {
      ...TextTheme.normal,
      textAlign: 'center',
      marginTop: 20,
    },
  })

  const getWorkflowStatus = (workflow: any) => {
    // This is a placeholder - implement actual status logic based on your workflow data
    return workflow.status || 'pending'
  }

  // Collect workflows for the specific connection
  const workflowsForConnection = React.useMemo(() => {
    if (connection?.id) {
      const flows = workflows.get(connection.id)
      if (flows && flows.workflows && Array.isArray(flows.workflows)) {
        return flows.workflows.map((workflow: any) => ({
          ...workflow,
          oobRecordId,
          instanceId: workflow.instanceId || 'initial', // Track if it's initial or new instance
          status: 'pending', // You'll need to implement actual status tracking
          // Only set timestamp if it doesn't exist
          timestamp: workflow.timestamp || workflow.created || new Date().toISOString(),
        }))
      }
    }
    return []
  }, [workflows, connection, oobRecordId])

  const renderWorkflowCard = ({ item }: { item: any }) => {
    const status = getWorkflowStatus(item)
    const isComplete = status === 'complete'

    const timeAgo = item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Unknown Time'

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate(Screens.WorkflowDetails, {
            oobRecordId: item.oobRecordId,
            workflowId: item.workflowId,
            instanceId: item.instanceId,
          })
        }
      >
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{isComplete ? 'Workflow completed' : 'Waiting for your action'}</Text>
          <Text style={styles.timestamp}>{timeAgo}</Text>
          <View style={styles.statusIcon}>
            <Icon
              name={isComplete ? 'check-circle-outline' : 'timer-sand'}
              size={24}
              color={isComplete ? '#4CAF50' : '#FFA500'}
            />
          </View>
        </View>
        <View style={[styles.statusBar, isComplete ? styles.statusBarComplete : styles.statusBarPending]} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={workflowsForConnection}
        keyExtractor={(item) => item.workflowId}
        renderItem={renderWorkflowCard}
        ListEmptyComponent={() => <Text style={styles.emptyText}>{t('Workflows.NoWorkflowsAvailable')}</Text>}
      />
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={toggleModal} style={styles.closeIconContainer}>
              <Icon name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Topics</Text>
            {modalWorkflows.length > 0 ? (
              modalWorkflows.map((workflow, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalItemContainer}
                  onPress={() => handleWorkflowSelect(workflow)}
                >
                  <Text style={styles.modalItem}>{workflow.name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.modalEmptyText}>No workflows available</Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Workflows
