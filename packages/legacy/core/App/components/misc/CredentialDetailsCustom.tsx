//fetching data (attributes) + upper modal
import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { CredentialExchangeRecord } from '@credo-ts/core'
import { useTranslation } from 'react-i18next'
import { useCredentialConnectionLabel } from '../../utils/helpers'
import { BrandingOverlay } from '@hyperledger/aries-oca'
import { Attribute, CredentialOverlay } from '@hyperledger/aries-oca/build/legacy'
import { TOKENS, useServices } from '../../container-api'
import { buildFieldsFromAnonCredsCredential } from '../../utils/oca'
import { getCredentialIdentifiers } from '../../utils/credential'
import VDCard from './VDCard'

interface CredentialDetailsCustomProps {
  credential: CredentialExchangeRecord
  logoUrl?: string
}

const CredentialDetailsCustom: React.FC<CredentialDetailsCustomProps> = ({ credential, logoUrl }) => {
  const { t, i18n } = useTranslation()
  const [overlay, setOverlay] = useState<CredentialOverlay<BrandingOverlay>>({
    bundle: undefined,
    presentationFields: [],
    metaOverlay: undefined,
    brandingOverlay: undefined,
  })
  const [, setAttributes] = useState<Attribute[]>([])

  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER])

  const issuerName = useCredentialConnectionLabel(credential) ?? t('Credentials.UnknownIssuer')

  const firstName = credential.credentialAttributes?.find((attr) => attr.name === 'First')?.value || ''
  const lastName = credential.credentialAttributes?.find((attr) => attr.name === 'Last')?.value || ''
  const studentId = credential.credentialAttributes?.find((attr) => attr.name === 'StudentID')?.value || ''
  const issueDate = new Date(credential.createdAt).toLocaleDateString()

  const creationDate = credential?.createdAt
    ? new Date(credential.createdAt).toLocaleDateString()
    : t('Credentials.UnknownDate')

  useEffect(() => {
    if (!credential) {
      return
    }

    const params = {
      identifiers: credential ? getCredentialIdentifiers(credential) : {},
      meta: {
        alias: issuerName,
        credConnectionId: credential.connectionId,
      },
      attributes: buildFieldsFromAnonCredsCredential(credential),
      language: i18n.language,
    }

    bundleResolver.resolveAllBundles(params).then((bundle) => {
      setOverlay((o) => ({
        ...o,
        ...(bundle as CredentialOverlay<BrandingOverlay>),
        presentationFields: bundle.presentationFields?.filter((field) => (field as Attribute).value),
      }))
      setAttributes(bundle.presentationFields?.filter((field) => (field as Attribute).value) as Attribute[])
    })
  }, [credential, bundleResolver, i18n.language, issuerName])

  return (
    <View style={styles.container}>
      <VDCard
        width="100%"
        height={200} // Adjust this value as needed
        firstName={firstName}
        lastName={lastName}
        studentId={studentId}
        issueDate={issueDate}
      />
      {/* <View style={styles.logoContainer}>
        {logoUrl ? (
          <Image source={{ uri: logoUrl }} style={styles.logo} />
        ) : (
          <Image source={require('../../assets/img/veridid-logo.png')} style={styles.logo} />
        )}
      </View>
      <Text style={styles.institutionName}>{issuerName}</Text>
      <Text style={styles.credentialType}>{overlay.metaOverlay?.name || t('Credentials.UnknownCredential')}</Text>
      <Text style={styles.date}>{creationDate}</Text> */}
      {/* <View style={styles.attributesContainer}>
        {attributes.length > 0 ? (
          attributes.map((attr, index) => (
            <Text key={index} style={styles.attributeText}>
              {attr.name}: {attr.value}
            </Text>
          ))
        ) : (
          <Text style={styles.attributesPlaceholder}>{t('Attributes.Placeholder')}</Text>
        )}
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: 'transparent',
    borderRadius: 10,
    height: '100%',
  },
  logoContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  institutionName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  credentialType: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    textAlign: 'left',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    textAlign: 'left',
  },
  attributesContainer: {
    marginTop: 10,
  },
  attributeText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
    marginBottom: 5,
  },
  attributesPlaceholder: {
    fontSize: 14,
    color: '#999',
    textAlign: 'left',
  },
})

export default CredentialDetailsCustom
