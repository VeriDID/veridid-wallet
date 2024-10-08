import React from 'react'
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native'
import { CredentialExchangeRecord } from '@credo-ts/core'
import { useTranslation } from 'react-i18next'
import { useCredentialConnectionLabel } from '../../utils/helpers'
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface CustomCredentialCardProps {
  credential: CredentialExchangeRecord
  onPress: () => void
  logoUrl?: string
}

const CustomCredentialCard: React.FC<CustomCredentialCardProps> = ({ credential, onPress, logoUrl }) => {
  const { t } = useTranslation()
  //const connection = useConnectionById(credential.connectionId ?? '')
  const issuerName = useCredentialConnectionLabel(credential) ?? t('Credentials.UnknownIssuer')

  // Attempt to extract the credential name from the credential's attributes does not work tbc
  const credentialName =
    credential?.credentialAttributes?.find((attr) => attr.name.toLowerCase() === 'name')?.value ??
    t('Credentials.UnknownCredential')

  // Extract and format the creation date
  const creationDate = credential?.createdAt
    ? new Date(credential.createdAt).toLocaleDateString()
    : t('Credentials.UnknownDate')

  return (
    <TouchableOpacity style={styles.boxContainer} onPress={onPress}>
      <View style={styles.darkRectangle}>
        {logoUrl ? (
          <Image source={{ uri: logoUrl }} style={styles.logo} />
        ) : (
          <Image source={require('../../assets/img/veridid-logo.png')} style={styles.logo} />
        )}
      </View>
      <View style={styles.lightRectangle}>
        <View>
          <Text style={styles.walletText}>{issuerName}</Text>
          <Text style={styles.walletDescription}>{credentialName}</Text>
        </View>
        <Text style={styles.dateText}>{creationDate}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: 'row',
    width: '95%',
    height: 106,
    backgroundColor: '#D9D9D9',
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  darkRectangle: {
    width: '30%',
    height: '100%',
    backgroundColor: '#616161',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightRectangle: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo: {
    width: '70%',
    height: '70%',
  },
  walletText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 0,
    marginBottom: 5,
  },
  walletDescription: {
    fontSize: 15,
    color: '#000',
    flexWrap: 'wrap',
    width: '80%',
    marginBottom: 22,
  },
  dateText: {
    fontSize: 14,
    color: '#000',
    alignSelf: 'flex-start', // Align date at the bottom left
  },
})

export default CustomCredentialCard
