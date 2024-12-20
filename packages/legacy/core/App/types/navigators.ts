import { CredentialExchangeRecord, SdJwtVcRecord, W3cCredentialRecord } from '@credo-ts/core'
import { NavigatorScreenParams } from '@react-navigation/native'
import { StackNavigationOptions } from '@react-navigation/stack'

export enum Screens {
  AttemptLockout = 'Temporarily Locked',
  Splash = 'Splash',
  Onboarding = 'Onboarding',
  Terms = 'Terms',
  Preface = 'Preface',
  CreatePIN = 'Create a PIN',
  EnterPIN = 'Enter PIN',
  Home = 'Home',
  Scan = 'Scan',
  PasteUrl = 'Paste URL',
  Credentials = 'Credentials',
  CredentialDetails = 'Credential Details',
  CredentialOffer = 'Credential Offer',
  OpenIDCredentialDetails = 'Open ID Credential details',
  ProofRequest = 'Proof Request',
  ProofRequestDetails = 'Proof Request Details',
  ProofRequestUsageHistory = 'Proof Request Usage History',
  Settings = 'Settings',
  Language = 'Language',
  DataRetention = 'Data Retention',
  Tours = 'Tours',
  Contacts = 'Contacts',
  ContactDetails = 'Contact Details',
  WhatAreContacts = 'What Are Contacts',
  Chat = 'Chat',
  Connection = 'Connection',
  MobileVerifierLoading = 'Mobile Verifier Loading',
  OnTheWay = 'On The Way',
  Declined = 'Declined',
  UseBiometry = 'Use Biometry',
  UsePushNotifications = 'Use Push Notifications',
  Developer = 'Developer',
  CustomNotification = 'Custom Notification',
  ProofChangeCredential = 'Choose a credential',
  ProofRequests = 'Proof Requests',
  ProofRequesting = 'Proof Requesting',
  ProofDetails = 'Proof Details',
  NameWallet = 'Name Wallet',
  RenameContact = 'Rename Contact',
  ScanHelp = 'Scan Help',
  HistorySettings = 'History Settings',
  HistoryPage = 'History',
  HistoryDetails = 'History details',
  Workflows = 'Workflows',
  WorkflowDetails = 'WorkflowDetails',
  ListContacts = 'ListContacts',
}

export enum Stacks {
  TabStack = 'Tab Stack',
  HomeStack = 'Home Stack',
  ConnectStack = 'Connect Stack',
  CredentialStack = 'Credentials Stack',
  SettingStack = 'Settings Stack',
  ContactStack = 'Contacts Stack',
  ProofRequestsStack = 'Proof Requests Stack',
  NotificationStack = 'Notifications Stack',
  ConnectionStack = 'Connection Stack',
  HistoryStack = 'History Stack',
}

export enum TabStacks {
  HomeStack = 'Tab Home Stack',
  ConnectStack = 'Tab Connect Stack',
  CredentialStack = 'Tab Credential Stack',
  ContactStack = 'Tab Contact Stack',
  SettingStack = 'Tab Setting Stack',
}

export type RootStackParams = {
  [Screens.Splash]: undefined
  [Stacks.TabStack]: NavigatorScreenParams<TabStackParams>
  [Screens.Chat]: { connectionId: string }
  [Stacks.ConnectStack]: NavigatorScreenParams<ConnectStackParams>
  [Stacks.SettingStack]: NavigatorScreenParams<SettingStackParams>
  [Stacks.ContactStack]: NavigatorScreenParams<ContactStackParams>
  [Stacks.ProofRequestsStack]: NavigatorScreenParams<ProofRequestsStackParams>
  [Stacks.NotificationStack]: NavigatorScreenParams<NotificationStackParams>
  [Stacks.HistoryStack]: NavigatorScreenParams<HistoryStackParams>
}

export type TabStackParams = {
  [TabStacks.HomeStack]: NavigatorScreenParams<HomeStackParams>
  [TabStacks.ConnectStack]: NavigatorScreenParams<ConnectStackParams>
  [TabStacks.CredentialStack]: NavigatorScreenParams<CredentialStackParams>
  [TabStacks.SettingStack]: NavigatorScreenParams<SettingStackParams>
  [TabStacks.ContactStack]: NavigatorScreenParams<ContactStackParams>
}

export type AuthenticateStackParams = {
  [Screens.Preface]: undefined
  [Screens.Onboarding]: undefined
  [Screens.Terms]: undefined
  [Screens.AttemptLockout]: undefined
  [Screens.CreatePIN]: { setAuthenticated: (status: boolean) => void } | undefined
  [Screens.EnterPIN]: { setAuthenticated: (status: boolean) => void } | undefined
  [Screens.UseBiometry]: undefined
  [Screens.NameWallet]: undefined
  [Screens.UsePushNotifications]: undefined
}

export type OnboardingStackParams = {
  [Screens.Onboarding]: undefined
  [Screens.Developer]: undefined
}

export type ContactStackParams = {
  [Screens.Contacts]: undefined
  [Screens.Chat]: { connectionId: string }
  [Screens.ContactDetails]: { connectionId: string }
  [Screens.RenameContact]: { connectionId: string }
  [Screens.WhatAreContacts]: undefined
  [Screens.CredentialDetails]: { credentialId: string }
  [Screens.CredentialOffer]: { credentialId: string }
  [Screens.ProofDetails]: { recordId: string; isHistory?: boolean }
  [Screens.ProofRequest]: { proofId: string }
  [Screens.Scan]: undefined
  [Screens.WorkflowDetails]: { oobRecordId: string; workflowId: string; instanceId?: string } // not sure to use connectionId or oobRecordId
  [Screens.Workflows]: { oobRecordId: string }
  [Screens.ListContacts]: undefined
}

export type ProofRequestsStackParams = {
  [Screens.ProofRequests]: { connectionId?: string }
  [Screens.ProofRequesting]: { templateId: string; predicateValues?: Record<string, Record<string, number>> }
  [Screens.ProofDetails]: { recordId: string; isHistory?: boolean; senderReview?: boolean }
  [Screens.ProofRequestDetails]: { templateId: string; connectionId?: string }
  [Screens.MobileVerifierLoading]: { proofId: string; connectionId: string }
  [Screens.ProofRequestUsageHistory]: { templateId: string }
  [Screens.ProofChangeCredential]: {
    selectedCred: string
    altCredentials: string[]
    proofId: string
    onCredChange: (arg: string) => void
  }
}

export type CredentialStackParams = {
  [Screens.Credentials]: undefined
  [Screens.CredentialDetails]: { credential: CredentialExchangeRecord }
}

export type HomeStackParams = {
  [Screens.Home]: undefined
}

export type ConnectStackParams = {
  [Screens.Scan]: undefined
  [Screens.NameWallet]: undefined
  [Screens.ScanHelp]: undefined
  [Screens.PasteUrl]: undefined
  [Screens.Workflows]: { oobRecordId: string }
}

export type SettingStackParams = {
  [Screens.NameWallet]: undefined
  [Screens.Settings]: undefined
  [Screens.Language]: undefined
  [Screens.DataRetention]: undefined
  [Screens.Tours]: undefined
  [Screens.UseBiometry]: undefined
  [Screens.CreatePIN]: undefined
  [Screens.Terms]: undefined
  [Screens.Onboarding]: undefined
  [Screens.Developer]: undefined
  [Screens.UsePushNotifications]: { isMenu?: boolean }
  [Screens.HistorySettings]: undefined
}

export type NotificationStackParams = {
  [Screens.CredentialDetails]: { credentialId: string }
  [Screens.CredentialOffer]: { credentialId: string }
  [Screens.ProofRequest]: { proofId: string }
  [Screens.CustomNotification]: undefined
  [Screens.ProofDetails]: { recordId: string }
}

export type DeliveryStackParams = {
  [Screens.Connection]: { oobRecordId: string; openIDUri?: string }
  [Screens.MobileVerifierLoading]: { proofId: string; connectionId: string }
  [Screens.ProofDetails]: { recordId: string }
  [Screens.CredentialOffer]: { credentialId: string }
  [Screens.ProofRequest]: { proofId: string }
  [Screens.OnTheWay]: { credentialId: string }
  [Screens.Declined]: { credentialId: string }
  [Screens.Chat]: { connectionId: string }
  [Screens.OpenIDCredentialDetails]: { credential: SdJwtVcRecord | W3cCredentialRecord }
}

export type HistoryStackParams = {
  [Screens.HistoryPage]: undefined
}

export type ScreenOptionsType = Partial<Record<Screens, StackNavigationOptions>>
