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
            navigation.goBack()
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
      padding: 16,
      marginBottom: 12,
      borderRadius: 8,
    },
    title: {
      ...TextTheme.headingThree,
    },
    subtitle: {
      ...TextTheme.normal,
      color: ColorPallet.brand.text, // Updated line
    },
    emptyText: {
      ...TextTheme.normal,
      textAlign: 'center',
      marginTop: 20,
    },
  })

  // Collect workflows for the specific connection
  const workflowsForConnection = React.useMemo(() => {
    if (connection?.id) {
      const flows = workflows.get(connection.id)
      if (flows && flows.workflows && Array.isArray(flows.workflows)) {
        return flows.workflows.map((workflow: any) => ({ ...workflow, oobRecordId }))
      }
    }
    return []
  }, [workflows, connection, oobRecordId])

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate(Screens.WorkflowDetails, {
          oobRecordId: item.oobRecordId,
          workflowId: item.workflowId,
        })
      }
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>Placeholder subtitle text</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={workflowsForConnection}
        keyExtractor={(item) => item.workflowId}
        renderItem={renderItem}
        ListEmptyComponent={() => <Text style={styles.emptyText}>{t('Workflows.NoWorkflowsAvailable')}</Text>}
      />
    </View>
  )
}

export default Workflows
