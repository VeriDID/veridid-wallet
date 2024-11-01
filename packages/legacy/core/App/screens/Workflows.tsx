import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { useWorkflow } from '../contexts/workflow'
import { useTheme } from '../contexts/theme'
import { StackNavigationProp } from '@react-navigation/stack'
import { ContactStackParams, Screens } from '../types/navigators'
import { useConnectionByOutOfBandId, useOutOfBandById } from '../hooks/connections'
import { useTranslation } from 'react-i18next'
import IconButton, { ButtonLocation } from '../components/buttons/IconButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//import { render } from '@testing-library/react-native'
//import CustomButton, { ButtonType } from '../components/buttons/Button' // Renamed to avoid conflict

//import { ColorPallet, TextTheme } from 'theme'

type WorkflowsScreenNavigationProp = StackNavigationProp<ContactStackParams, Screens.Workflows>
type WorkflowsRouteProp = RouteProp<ContactStackParams, Screens.Workflows>

const Workflows: React.FC = () => {
  const navigation = useNavigation<WorkflowsScreenNavigationProp>()
  const route = useRoute<WorkflowsRouteProp>()

  const { workflows } = useWorkflow()
  const { TextTheme, ColorPallet } = useTheme()
  const { t } = useTranslation()
  const { oobRecordId } = route.params

  // Get the connection using oobRecordId
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

  // Set the header title and back button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: connectionDetails.label,
      headerLeft: () => (
        <IconButton
          buttonLocation={ButtonLocation.Left}
          accessibilityLabel={t('Global.Back')}
          testID="BackButton"
          icon="arrow-left"
          onPress={() => {
            //navigation.goBack() instead of going back to the previous screen, navigate to list of contacts
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: Screens.Contacts,
                },
              ],
            })
          }}
        />
      ),
    })
  }, [navigation, t, connectionDetails.label])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorPallet.brand.primaryBackground,
      padding: 16,
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
          status: 'pending', // You'll need to implement actual status tracking
        }))
      }
    }
    return []
  }, [workflows, connection, oobRecordId])

  const renderWorkflowCard = ({ item }: { item: any }) => {
    const status = getWorkflowStatus(item)
    const isComplete = status === 'complete'

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate(Screens.WorkflowDetails, {
            oobRecordId: item.oobRecordId,
            workflowId: item.workflowId,
          })
        }
      >
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{isComplete ? 'Workflow completed' : 'Waiting for your action'}</Text>
          <Text style={styles.timestamp}>2h ago</Text>
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

  //   const renderItem = ({ item }: { item: any }) => (
  //     <TouchableOpacity
  //       style={styles.card}
  //       onPress={() =>
  //         navigation.navigate(Screens.WorkflowDetails, {
  //           oobRecordId: item.oobRecordId,
  //           workflowId: item.workflowId,
  //         })
  //       }
  //     >
  //       <Text style={styles.title}>{item.name}</Text>
  //       <Text style={styles.subtitle}>Placeholder subtitle text</Text>
  //     </TouchableOpacity>
  //   )

  return (
    <View style={styles.container}>
      <FlatList
        data={workflowsForConnection}
        keyExtractor={(item) => item.workflowId}
        renderItem={renderWorkflowCard}
        ListEmptyComponent={() => <Text style={styles.emptyText}>{t('Workflows.NoWorkflowsAvailable')}</Text>}
      />
    </View>
  )
}

export default Workflows
