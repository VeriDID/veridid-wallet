import { StyleSheet } from 'react-native'
import { SvgProps } from 'react-native-svg'

import Arrow from './assets/icons/large-arrow.svg'
import ActivityIndicator from './assets/img/activity-indicator-circle.svg'
import AppLockout from './assets/img/app-lockout.svg'
import Biometrics from './assets/img/biometrics.svg'
import ContactBook from './assets/img/contact-book.svg'
import CredentialDeclined from './assets/img/credential-declined.svg'
import DeleteNotification from './assets/img/delete-notification.svg'
import EmptyWallet from './assets/img/empty-wallet.svg'
import IconCredentialOfferDark from './assets/img/icon-credential-offer-dark.svg'
import IconCredentialOfferLight from './assets/img/icon-credential-offer-light.svg'
import IconInfoRecievedDark from './assets/img/icon-info-recieved-dark.svg'
import IconInfoRecievedLight from './assets/img/icon-info-recieved-light.svg'
import IconInfoSentDark from './assets/img/icon-info-sent-dark.svg'
import IconInfoSentLight from './assets/img/icon-info-sent-light.svg'
import IconProofRequestDark from './assets/img/icon-proof-request-dark.svg'
import IconProofRequestLight from './assets/img/icon-proof-request-light.svg'
import Logo from './assets/img/logo.svg'
import NoInfoShared from './assets/img/no_information_shared.svg'
import Preface from './assets/img/preface.svg'
import ProofRequestDeclined from './assets/img/proof-declined.svg'
import VerifierRequestDeclined from './assets/img/verifier-request-declined.svg'
import Wallet from './assets/img/wallet.svg'
import CheckInCircle from './assets/img/check-in-circle.svg'
import CredentialCard from './assets/img/credential-card.svg'
import WalletBack from './assets/img/wallet-back.svg'
import WalletFront from './assets/img/wallet-front.svg'
import CredentialInHand from './assets/img/credential-in-hand.svg'
import CredentialList from './assets/img/credential-list.svg'
import ScanShare from './assets/img/scan-share.svg'
import SecureImage from './assets/img/secure-image.svg'
import InformationReceived from './assets/img/information-received.svg'
import PushNotificationImg from './assets/img/push-notifications.svg'
import ChatLoading from './assets/img/chat-loading.svg'
import HistoryCardAcceptedIcon from './assets/img/HistoryCardAcceptedIcon.svg'
import HistoryCardExpiredIcon from './assets/img/HistoryCardExpiredIcon.svg'
import HistoryCardRevokedIcon from './assets/img/HistoryCardRevokedIcon.svg'
import HistoryInformationSentIcon from './assets/img/HistoryInformationSentIcon.svg'
import HistoryPinUpdatedIcon from './assets/img/HistoryPinUpdatedIcon.svg'
import IconChevronRight from './assets/img/IconChevronRight.svg'

export interface ISVGAssets {
  activityIndicator: React.FC<SvgProps>
  appLockout: React.FC<SvgProps>
  biometrics: React.FC<SvgProps>
  contactBook: React.FC<SvgProps>
  credentialDeclined: React.FC<SvgProps>
  deleteNotification: React.FC<SvgProps>
  emptyWallet: React.FC<SvgProps>
  logo: React.FC<SvgProps>
  proofRequestDeclined: React.FC<SvgProps>
  arrow: React.FC<SvgProps>
  iconCredentialOfferDark: React.FC<SvgProps>
  iconCredentialOfferLight: React.FC<SvgProps>
  iconInfoRecievedDark: React.FC<SvgProps>
  iconInfoRecievedLight: React.FC<SvgProps>
  iconInfoSentDark: React.FC<SvgProps>
  iconInfoSentLight: React.FC<SvgProps>
  iconProofRequestDark: React.FC<SvgProps>
  iconProofRequestLight: React.FC<SvgProps>
  preface: React.FC<SvgProps>
  verifierRequestDeclined: React.FC<SvgProps>
  noInfoShared: React.FC<SvgProps>
  wallet: React.FC<SvgProps>
  checkInCircle: React.FC<SvgProps>
  credentialCard: React.FC<SvgProps>
  walletBack: React.FC<SvgProps>
  walletFront: React.FC<SvgProps>
  credentialInHand: React.FC<SvgProps>
  credentialList: React.FC<SvgProps>
  scanShare: React.FC<SvgProps>
  secureImage: React.FC<SvgProps>
  informationReceived: React.FC<SvgProps>
  pushNotificationImg: React.FC<SvgProps>
  chatLoading: React.FC<SvgProps>
  historyCardAcceptedIcon: React.FC<SvgProps>
  historyCardExpiredIcon: React.FC<SvgProps>
  historyCardRevokedIcon: React.FC<SvgProps>
  historyInformationSentIcon: React.FC<SvgProps>
  historyPinUpdatedIcon: React.FC<SvgProps>
  iconChevronRight: React.FC<SvgProps>
}

export interface IFontAttributes {
  fontFamily?: string
  fontStyle?: 'normal' | 'italic'
  fontSize: number
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  color: string
}

export interface IInputAttributes {
  padding?: number
  borderRadius?: number
  fontSize?: number
  backgroundColor?: string
  color?: string
  borderWidth?: number
  borderColor?: string
}

export interface IInputs {
  label: IFontAttributes
  textInput: IInputAttributes
  inputSelected: IInputAttributes
  singleSelect: IInputAttributes
  singleSelectText: IFontAttributes
  singleSelectIcon: IInputAttributes
  checkBoxColor: IInputAttributes
  checkBoxText: IFontAttributes
}

export interface ITextTheme {
  headingOne: IFontAttributes
  headingTwo: IFontAttributes
  headingThree: IFontAttributes
  headingFour: IFontAttributes
  normal: IFontAttributes
  bold: IFontAttributes
  label: IFontAttributes
  labelTitle: IFontAttributes
  labelSubtitle: IFontAttributes
  labelText: IFontAttributes
  caption: IFontAttributes
  title: IFontAttributes
  headerTitle: IFontAttributes
  modalNormal: IFontAttributes
  modalTitle: IFontAttributes
  popupModalText: IFontAttributes
  modalHeadingOne: IFontAttributes
  modalHeadingThree: IFontAttributes
  settingsText: IFontAttributes
}

export interface IBrandColors {
  primary: string
  primaryDisabled: string
  secondary: string
  secondaryDisabled: string
  primaryLight: string
  highlight: string
  primaryBackground: string
  secondaryBackground: string
  modalPrimary: string
  modalSecondary: string
  modalPrimaryBackground: string
  modalSecondaryBackground: string
  modalIcon: string
  link: string
  text: string
  icon: string
  headerText: string
  headerIcon: string
  buttonText: string
  tabBarInactive: string
  unorderedList: string
  unorderedListModal: string
  verididGreen: string
  verididOrange: string
  verididPink: string
}

export interface ISemanticColors {
  error: string
  success: string
  focus: string
}

export interface INotificationColors {
  success: string
  successBorder: string
  successIcon: string
  successText: string
  info: string
  infoBorder: string
  infoIcon: string
  infoText: string
  warn: string
  warnBorder: string
  warnIcon: string
  warnText: string
  error: string
  errorBorder: string
  errorIcon: string
  errorText: string
  popupOverlay: string
}

export interface IGrayscaleColors {
  black: string
  darkGrey: string
  mediumGrey: string
  lightGrey: string
  veryLightGrey: string
  white: string
}

export interface IColorPallet {
  brand: IBrandColors
  semantic: ISemanticColors
  notification: INotificationColors
  grayscale: IGrayscaleColors
}

export interface IAssets {
  svg: ISVGAssets
  img: {
    logoPrimary: any
    logoSecondary: any
  }
}

export const borderRadius = 4
export const heavyOpacity = 0.7
export const mediumOpacity = 0.5
export const lightOpacity = 0.35
export const zeroOpacity = 0.0
export const borderWidth = 2

const GrayscaleColors: IGrayscaleColors = {
  black: '#000000',
  darkGrey: '#313132',
  mediumGrey: '#606060',
  lightGrey: '#D3D3D3',
  veryLightGrey: '#F2F2F2',
  white: '#FFFFFF',
}

// const BrandColors: IBrandColors = {
//   //primary: '#ffffff', // veridid white
//   primary: '#30c640', // veridid green
//   primaryDisabled: `rgba(53, 130, 63, ${lightOpacity})`,
//   secondary: '#b8b8b8',
//   secondaryDisabled: `rgba(53, 130, 63, ${heavyOpacity})`,
//   primaryLight: `rgba(53, 130, 63, ${lightOpacity})`,
//   highlight: '#FCBA19',
//   primaryBackground: '#fff', // veridid white
//   secondaryBackground: '#D3D3D3',
//   modalPrimary: '#42803E',
//   modalSecondary: '#30c640',
//   modalPrimaryBackground: '#D3D3D3',
//   modalSecondaryBackground: '#D3D3D3',
//   modalIcon: GrayscaleColors.white,
//   unorderedList: GrayscaleColors.white,
//   unorderedListModal: GrayscaleColors.white,
//   link: GrayscaleColors.darkGrey,
//   text: GrayscaleColors.darkGrey,
//   icon: GrayscaleColors.white,
//   headerIcon: GrayscaleColors.white,
//   headerText: GrayscaleColors.white,
//   buttonText: GrayscaleColors.white,
//   tabBarInactive: GrayscaleColors.white,
// }

const BrandColors: IBrandColors = {
  primary: '#30c640', // veridid green
  primaryDisabled: `rgba(53, 130, 63, ${heavyOpacity})`,
  secondary: '#b8b8b8',
  secondaryDisabled: `rgba(255, 20, 147, ${heavyOpacity})`,// Disabled state for pink
  primaryLight: `rgba(53, 130, 63, ${lightOpacity})`,
  highlight: '#FCBA19', // yellow highlight (can align with an accent or CTA buttons)
  verididGreen: '#30c640', // veridid green
  verididOrange: '#FFA500', // Orange for one of the "D"s
  verididPink: '#FF1493', // Pink for the other "D"
  primaryBackground: '#fff', // veridid white
  secondaryBackground: '#D3D3D3',
  modalPrimary: '#42803E',
  modalSecondary: '#30c640', // veridid green for modals
  modalPrimaryBackground: '#D3D3D3',
  modalSecondaryBackground: '#D3D3D3',
  modalIcon: GrayscaleColors.white,
  unorderedList: GrayscaleColors.white,
  unorderedListModal: GrayscaleColors.white,
  link: GrayscaleColors.darkGrey, // Dark gray for link text
  text: GrayscaleColors.darkGrey, // Dark gray text to contrast with the white background
  icon: GrayscaleColors.darkGrey, // Dark gray icons
  headerIcon: GrayscaleColors.darkGrey, // Consistent icon color for headers
  headerText: GrayscaleColors.darkGrey, // Consistent text color for headers
  buttonText: GrayscaleColors.white, // White text on buttons for contrast
  tabBarInactive: GrayscaleColors.lightGrey, // Lighter gray for inactive tab bar elements
};

const SemanticColors: ISemanticColors = {
  error: '#D8292F',
  success: '#2E8540',
  focus: '#3399FF',
}

const NotificationColors: INotificationColors = {
  success: '#313132',
  successBorder: '#2E8540',
  successIcon: '#2E8540',
  successText: '#FFFFFF',
  info: '#313132',
  infoBorder: '#0099FF',
  infoIcon: '#0099FF',
  infoText: '#FFFFFF',
  warn: '#313132',
  warnBorder: '#FCBA19',
  warnIcon: '#FCBA19',
  warnText: '#FFFFFF',
  error: '#313132',
  errorBorder: '#D8292F',
  errorIcon: '#D8292F',
  errorText: '#FFFFFF',
  popupOverlay: `rgba(0, 0, 0, ${mediumOpacity})`,
}

export const ColorPallet: IColorPallet = {
  brand: BrandColors,
  semantic: SemanticColors,
  notification: NotificationColors,
  grayscale: GrayscaleColors,
}

export const TextTheme: ITextTheme = {
  headingOne: {
    fontSize: 38,
    fontWeight: 'bold',
    color: ColorPallet.brand.text,
  },
  headingTwo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: ColorPallet.brand.text,
  },
  headingThree: {
    fontSize: 26,
    fontWeight: 'bold',
    color: ColorPallet.brand.text,
  },
  headingFour: {
    fontSize: 21,
    fontWeight: 'bold',
    color: ColorPallet.brand.text,
  },
  normal: {
    fontSize: 18,
    fontWeight: 'normal',
    color: ColorPallet.brand.text,
  },
  bold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ColorPallet.brand.text,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: ColorPallet.brand.text,
  },
  labelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ColorPallet.brand.text,
  },
  labelSubtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: ColorPallet.brand.text,
  },
  labelText: {
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'italic',
    color: ColorPallet.brand.text,
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal',
    color: ColorPallet.brand.text,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ColorPallet.brand.text,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: ColorPallet.brand.headerText,//header title color
  },
  modalNormal: {
    fontSize: 18,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.darkGrey,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  modalHeadingOne: {
    fontSize: 38,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  modalHeadingThree: {
    fontSize: 26,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  popupModalText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.white,
  },
  settingsText: {
    fontSize: 21,
    fontWeight: 'normal',
    color: ColorPallet.brand.text,
  },
}

export const Inputs: IInputs = StyleSheet.create({
  label: {
    ...TextTheme.label,
  },
  textInput: {
    padding: 10,
    borderRadius,
    fontSize: 16,
    backgroundColor: ColorPallet.brand.primaryBackground,
    color: ColorPallet.brand.primary,
    borderWidth: 2,
    borderColor: ColorPallet.brand.secondary,
  },
  inputSelected: {
    borderColor: ColorPallet.brand.primary,
  },
  singleSelect: {
    padding: 12,
    borderRadius: borderRadius * 2,
    backgroundColor: ColorPallet.brand.secondaryBackground,
  },
  singleSelectText: {
    ...TextTheme.normal,
  },
  singleSelectIcon: {
    color: ColorPallet.grayscale.white,
  },
  checkBoxColor: {
    color: ColorPallet.brand.primary,
  },
  checkBoxText: {
    ...TextTheme.normal,
  },
})

export const Buttons = StyleSheet.create({
  verididPink: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: ColorPallet.brand.verididPink,
  },
  critical: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: ColorPallet.brand.primary,
  },
  primary: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: ColorPallet.brand.verididPink,
  },
  primaryDisabled: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: ColorPallet.brand.secondaryDisabled,
  },
  primaryText: {
    ...TextTheme.bold,
    color: ColorPallet.brand.buttonText,
    textAlign: 'center',
  },
  primaryTextDisabled: {
    ...TextTheme.bold,
    textAlign: 'center',
  },
  secondary: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: ColorPallet.brand.primary,
  },
  secondaryDisabled: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: ColorPallet.brand.secondaryDisabled,
  },
  secondaryText: {
    ...TextTheme.bold,
    color: ColorPallet.brand.primary,
    textAlign: 'center',
  },
  secondaryTextDisabled: {
    ...TextTheme.bold,
    color: ColorPallet.brand.secondaryDisabled,
    textAlign: 'center',
  },
  modalCritical: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: ColorPallet.brand.primary,
  },
  modalPrimary: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: ColorPallet.brand.modalPrimary,
  },
  modalPrimaryText: {
    ...TextTheme.bold,
    color: ColorPallet.grayscale.white,
    textAlign: 'center',
  },
  modalSecondary: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: ColorPallet.brand.verididPink,
  },
  modalSecondaryText: {
    ...TextTheme.bold,
    color:  ColorPallet.brand.text,
    textAlign: 'center',
  },
})

export const ListItems = StyleSheet.create({
  credentialBackground: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
  },
  credentialTitle: {
    ...TextTheme.headingFour,
  },
  credentialDetails: {
    ...TextTheme.caption,
  },
  credentialOfferBackground: {
    // backgroundColor: ColorPallet.brand.modalPrimaryBackground,
    backgroundColor: ColorPallet.grayscale.white,
  },
  credentialOfferTitle: {
    ...TextTheme.modalHeadingThree,
    fontWeight: 'normal',
  },
  credentialOfferDetails: {
    ...TextTheme.normal,
  },
  revoked: {
    backgroundColor: ColorPallet.notification.error,
    borderColor: ColorPallet.notification.errorBorder,
  },
  contactBackground: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
  },
  credentialIconColor: {
    color: ColorPallet.notification.infoText,
  },
  contactTitle: {
    color: ColorPallet.brand.text,
  },
  contactDate: {
    color: ColorPallet.brand.text,
    marginTop: 10,
  },
  contactIconBackground: {
    backgroundColor: ColorPallet.brand.primary,
  },
  contactIcon: {
    color: ColorPallet.grayscale.white,
  },
  recordAttributeLabel: {
    ...TextTheme.bold,
  },
  recordContainer: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
  },
  recordBorder: {
    borderBottomColor: ColorPallet.brand.primaryBackground,
  },
  recordLink: {
    color: ColorPallet.brand.link,
  },
  recordAttributeText: {
    ...TextTheme.normal,
  },
  proofIcon: {
    ...TextTheme.headingOne,
  },
  proofError: {
    color: ColorPallet.semantic.error,
  },
  avatarText: {
    ...TextTheme.headingTwo,
    fontWeight: 'normal',
  },
  avatarCircle: {
    borderRadius: TextTheme.headingTwo.fontSize,
    borderColor: TextTheme.headingTwo.color,
    width: TextTheme.headingTwo.fontSize * 2,
    height: TextTheme.headingTwo.fontSize * 2,
  },
  emptyList: {
    ...TextTheme.normal,
  },
  requestTemplateBackground: {
    backgroundColor: ColorPallet.grayscale.white,
  },
  requestTemplateIconColor: {
    color: ColorPallet.notification.infoText,
  },
  requestTemplateTitle: {
    color: ColorPallet.grayscale.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  requestTemplateDetails: {
    color: ColorPallet.grayscale.black,
    fontWeight: 'normal',
    fontSize: 16,
  },
  requestTemplateZkpLabel: {
    color: ColorPallet.grayscale.mediumGrey,
    fontSize: 12,
  },
  requestTemplateIcon: {
    color: ColorPallet.grayscale.black,
    fontSize: 36,
  },
  requestTemplateDate: {
    color: ColorPallet.grayscale.mediumGrey,
    fontSize: 10,
  },
})

export const TabTheme = {
  tabBarStyle: {
    height: 60,
    backgroundColor: ColorPallet.brand.secondaryBackground,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
    shadowColor: ColorPallet.grayscale.black,
    shadowOpacity: 0.1,
    borderTopWidth: 0,
    paddingBottom: 0,
    paddingTop: 0,
    borderRadius: 30, // This creates rounded corners on all sides
    position: 'absolute', // Keep it absolute for overlay
    bottom: 10, // Move it up slightly to show bottom rounded corners
    left: 5, // Add some space on the left
    right: 5, // Add some space on the right
    marginHorizontal: 10,
  },
  tabBarContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarActiveTintColor: '#f324c6', //ColorPallet.brand.primary,//veridid pink
  tabBarInactiveTintColor: 'black', //ColorPallet.brand.tabBarInactive,
  tabBarTextStyle: {
    ...TextTheme.labelSubtitle,
    paddingBottom: 0,
  },
  tabBarButtonIconStyle: {
    color: ColorPallet.brand.headerIcon,
  },
  focusTabIconStyle: {
    height: 60,
    width: 60,
    backgroundColor: ColorPallet.brand.primaryBackground,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusTabActiveTintColor: {
    backgroundColor: ColorPallet.brand.secondary,
  },
}

export const NavigationTheme = {
  dark: true,
  colors: {
    primary: ColorPallet.brand.primary,
    background: ColorPallet.brand.primaryBackground,
    card: ColorPallet.brand.primaryBackground,
    text: ColorPallet.grayscale.black,
    border: ColorPallet.grayscale.white,
    notification: ColorPallet.grayscale.white,
  },
}

export const HomeTheme = StyleSheet.create({
  welcomeHeader: {
    ...TextTheme.headingOne,
  },
  credentialMsg: {
    ...TextTheme.normal,
  },
  notificationsHeader: {
    ...TextTheme.headingThree,
  },
  noNewUpdatesText: {
    ...TextTheme.normal,
    color: ColorPallet.notification.infoText,
  },
  link: {
    ...TextTheme.normal,
    color: ColorPallet.brand.link,
  },
})

export const HeaderTheme = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  headerStyle: {
    height: 180,
  },
  headerLogoStyle: {
    width: 120,
    height: 120,
    top: '10%',
    resizeMode: 'contain',
  },

  logoContainer: {
    marginBottom: 8,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  titleContainer: {
    flex: 1,
  },
})

export const SettingsTheme = {
  groupHeader: {
    ...TextTheme.normal,
    marginBottom: 8,
  },
  groupBackground: ColorPallet.brand.secondaryBackground,
  iconColor: TextTheme.normal.color,
  text: {
    ...TextTheme.caption,
    color: ColorPallet.grayscale.white,
  },
}

export const ChatTheme = {
  containerStyle: {
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
  },
  leftBubble: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
    borderRadius: 4,
    padding: 16,
    marginLeft: 16,
  },
  rightBubble: {
    backgroundColor: ColorPallet.brand.primaryLight,
    borderRadius: 4,
    padding: 16,
    marginRight: 16,
  },
  timeStyleLeft: {
    color: ColorPallet.grayscale.white,
    fontSize: 12,
    marginTop: 8,
  },
  timeStyleRight: {
    color: ColorPallet.grayscale.white,
    fontSize: 12,
    marginTop: 8,
  },
  leftText: {
    color: ColorPallet.grayscale.white,
    fontSize: TextTheme.normal.fontSize,
  },
  leftTextHighlighted: {
    ...TextTheme.bold,
    color: ColorPallet.grayscale.white,
  },
  rightText: {
    color: ColorPallet.grayscale.white,
    fontSize: TextTheme.normal.fontSize,
  },
  rightTextHighlighted: {
    ...TextTheme.bold,
    color: ColorPallet.grayscale.white,
  },
  inputToolbar: {
    backgroundColor: ColorPallet.brand.secondary,
    shadowColor: ColorPallet.brand.primaryDisabled,
    borderRadius: 10,
  },
  inputText: {
    lineHeight: undefined,
    fontWeight: '500',
    fontSize: TextTheme.normal.fontSize,
  },
  placeholderText: ColorPallet.grayscale.white,
  sendContainer: {
    marginBottom: 4,
    paddingHorizontal: 4,
    justifyContent: 'center',
  },
  sendEnabled: ColorPallet.brand.primary,
  sendDisabled: ColorPallet.brand.primaryDisabled,
  options: ColorPallet.brand.primary,
  optionsText: ColorPallet.grayscale.black,
  openButtonStyle: {
    borderRadius: 32,
    backgroundColor: ColorPallet.brand.secondary,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16,
  },
  openButtonTextStyle: {
    fontSize: TextTheme.normal.fontSize,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  documentIconContainer: {
    backgroundColor: ColorPallet.brand.primary,
    alignSelf: 'flex-start',
    borderRadius: 4,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  documentIcon: {
    color: ColorPallet.grayscale.white,
  },
}

export const OnboardingTheme = {
  container: {
    backgroundColor: ColorPallet.brand.primaryBackground,
  },
  carouselContainer: {
    backgroundColor: ColorPallet.brand.primaryBackground,
  },
  pagerDot: {
    borderColor: ColorPallet.brand.secondary,
  },
  pagerDotActive: {
    color: ColorPallet.brand.secondaryBackground,
  },
  pagerDotInactive: {
    color: ColorPallet.brand.primary,
  },
  pagerNavigationButton: {
    color: ColorPallet.brand.secondary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerTintColor: ColorPallet.grayscale.white,
  headerText: {
    ...TextTheme.bold,
  },
  bodyText: {
    ...TextTheme.normal,
  },
  imageDisplayOptions: {
    fill: ColorPallet.notification.infoText,
  },
}

export const DialogTheme = {
  modalView: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
  },
  titleText: {
    color: ColorPallet.grayscale.white,
  },
  description: {
    color: ColorPallet.grayscale.white,
  },
  closeButtonIcon: {
    color: ColorPallet.grayscale.white,
  },
  carouselButtonText: {
    color: ColorPallet.grayscale.white,
  },
}

const LoadingTheme = {
  backgroundColor: ColorPallet.brand.modalPrimaryBackground,
}
const PINEnterTheme = {
  image: {
    alignSelf: 'center',
    marginBottom: 20,
  },
}
const PINInputTheme = {
  cell: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
    borderColor: ColorPallet.brand.secondary,
    borderWidth: 1,
  },
  focussedCell: {
    borderColor: ColorPallet.brand.headerIcon,
  },
  cellText: {
    color: ColorPallet.brand.text,
  },
  icon: {
    color: ColorPallet.brand.text,
  },
}

export const Assets = {
  svg: {
    activityIndicator: ActivityIndicator,
    appLockout: AppLockout,
    biometrics: Biometrics,
    credentialDeclined: CredentialDeclined,
    deleteNotification: DeleteNotification,
    emptyWallet: EmptyWallet,
    contactBook: ContactBook,
    logo: Logo,
    proofRequestDeclined: ProofRequestDeclined,
    arrow: Arrow,
    iconCredentialOfferDark: IconCredentialOfferDark,
    iconCredentialOfferLight: IconCredentialOfferLight,
    iconInfoRecievedDark: IconInfoRecievedDark,
    iconInfoRecievedLight: IconInfoRecievedLight,
    iconInfoSentDark: IconInfoSentDark,
    iconInfoSentLight: IconInfoSentLight,
    iconProofRequestDark: IconProofRequestDark,
    iconProofRequestLight: IconProofRequestLight,
    preface: Preface,
    verifierRequestDeclined: VerifierRequestDeclined,
    noInfoShared: NoInfoShared,
    wallet: Wallet,
    checkInCircle: CheckInCircle,
    credentialCard: CredentialCard,
    walletBack: WalletBack,
    walletFront: WalletFront,
    credentialInHand: CredentialInHand,
    credentialList: CredentialList,
    scanShare: ScanShare,
    secureImage: SecureImage,
    informationReceived: InformationReceived,
    pushNotificationImg: PushNotificationImg,
    chatLoading: ChatLoading,
    historyCardAcceptedIcon: HistoryCardAcceptedIcon,
    historyCardExpiredIcon: HistoryCardExpiredIcon,
    historyCardRevokedIcon: HistoryCardRevokedIcon,
    historyInformationSentIcon: HistoryInformationSentIcon,
    historyPinUpdatedIcon: HistoryPinUpdatedIcon,
    iconChevronRight: IconChevronRight,
  },
  img: {
    logoPrimary: {
      src: require('./assets/img/veridid-logo.png'),
      aspectRatio: 1,
      height: '33%',
      width: '33%',
      resizeMode: 'contain',
    },
    logoSecondary: {
      src: require('./assets/img/veridid-logo.png'),
      aspectRatio: 1,
      height: 120,
      width: 120,
      resizeMode: 'contain',
    },
  },
}

export interface ITheme {
  ColorPallet: IColorPallet
  TextTheme: ITextTheme
  Inputs: IInputs
  Buttons: any
  ListItems: any
  TabTheme: any
  NavigationTheme: any
  HomeTheme: any
  SettingsTheme: any
  ChatTheme: any
  OnboardingTheme: any
  DialogTheme: any
  LoadingTheme: any
  PINEnterTheme: any
  PINInputTheme: any
  heavyOpacity: any
  borderRadius: any
  borderWidth: typeof borderWidth
  Assets: IAssets,
  HeaderTheme: any
}

export const theme: ITheme = {
  ColorPallet,
  TextTheme,
  Inputs,
  Buttons,
  ListItems,
  TabTheme,
  NavigationTheme,
  HomeTheme,
  SettingsTheme,
  ChatTheme,
  OnboardingTheme,
  DialogTheme,
  LoadingTheme,
  PINEnterTheme,
  PINInputTheme,
  heavyOpacity,
  borderRadius,
  borderWidth,
  Assets,
  HeaderTheme,
}
