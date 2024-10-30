import * as React from 'react'
import { createContext, useContext, useState } from 'react'

export interface WorkflowContext {
    saveWorkflows: (connectionId: string, flows: any) => void
    saveCurrentWorkflows: (connectionId: string, flows: any) => void
    getCurrentWorkflows: (connectionId: string) => any
}

export const WorkflowContext = createContext<WorkflowContext>(null as unknown as WorkflowContext)

export const WorkflowProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [workflows, setWorkflows] = useState(new Map())
    const [current, setCurrent] = useState(new Map())

    const saveWorkflows = (connectionId: string, flows: any) => {
        setWorkflows(workflows.set(connectionId, flows));
    }

    const saveCurrentWorkflows = (connectionId: string, instanceId: string) => {
      setCurrent(current.set(connectionId, instanceId));
    }

    const getCurrentWorkflows = (connectionId: string) => {
      return current.get(connectionId);
    }


    return (
        <WorkflowContext.Provider
          value={{
            saveWorkflows,
            saveCurrentWorkflows,
            getCurrentWorkflows
          }}
        >
          {children}
        </WorkflowContext.Provider>
    )
}

export const useWorkflow = () => useContext(WorkflowContext)





