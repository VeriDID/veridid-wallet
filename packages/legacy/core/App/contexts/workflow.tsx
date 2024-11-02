import * as React from 'react'
import { createContext, useContext, useState } from 'react'

export interface WorkflowContext {
  saveWorkflows: (connectionId: string, flows: any) => void
  saveCurrentWorkflows: (connectionId: string, flows: any) => void
  getCurrentWorkflows: (connectionId: string) => any
  saveDisplay: (connectionId: string, displayData: any) => void
  getDisplay: (connectionId: string) => any
  workflows: Map<string, any>
  //current: Map<string, any>
  display: Map<string, any>
}

export const WorkflowContext = createContext<WorkflowContext>(null as unknown as WorkflowContext)

export const WorkflowProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [workflows, setWorkflows] = useState<Map<string, any>>(new Map())
  //const [current, setCurrent] = useState<Map<string, any>>(new Map())
  const [display, setDisplay] = useState<Map<string, any>>(new Map())

  const saveWorkflows = (connectionId: string, flows: any) => {
    setWorkflows((prevWorkflows) => {
      const newWorkflows = new Map(prevWorkflows)
      newWorkflows.set(connectionId, flows)
      return newWorkflows
    })
  }

  // const saveCurrentWorkflows = (connectionId: string, instanceId: any) => {
  //   setCurrent((prevCurrent) => {
  //     const newCurrent = new Map(prevCurrent)
  //     newCurrent.set(connectionId, instanceId)
  //     return newCurrent
  //   })
  // }

  //to list all existing workflows
  const saveCurrentWorkflows = (connectionId: string, flows: any) => {
    setWorkflows((prevWorkflows) => {
      const newWorkflows = new Map(prevWorkflows)
      // Preserve existing workflows and add new one
      const existingFlows = newWorkflows.get(connectionId) || { workflows: [] }
      newWorkflows.set(connectionId, {
        ...flows,
        workflows: [...existingFlows.workflows, ...flows.workflows],
      })
      return newWorkflows
    })
  }

  const saveDisplay = (connectionId: string, displayData: any) => {
    setDisplay((prevDisplay) => {
      const newDisplay = new Map(prevDisplay)
      newDisplay.set(connectionId, displayData)
      return newDisplay
    })
  }

  const getDisplay = (connectionId: string) => {
    return display.get(connectionId)
  }

  const getCurrentWorkflows = (connectionId: string) => {
    return workflows.get(connectionId)
  }

  return (
    <WorkflowContext.Provider
      value={{
        saveWorkflows,
        saveCurrentWorkflows,
        getCurrentWorkflows,
        saveDisplay,
        getDisplay,
        workflows,
        //current: workflows, //there is no reference to current commented will be deleted after testing
        display,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  )
}

export const useWorkflow = () => useContext(WorkflowContext)
