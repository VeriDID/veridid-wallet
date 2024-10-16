//fetching data (attributes) + designing upper modal
import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
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
  const [, setOverlay] = useState<CredentialOverlay<BrandingOverlay>>({
    bundle: undefined,
    presentationFields: [],
    metaOverlay: undefined,
    brandingOverlay: undefined,
  })
  const [, setAttributes] = useState<Attribute[]>([])

  const [logoBase64, setLogoBase64] = useState<string | null>(null) // New state for logo

  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER])

  const issuerName = useCredentialConnectionLabel(credential) ?? t('Credentials.UnknownIssuer')

  const firstName = credential.credentialAttributes?.find((attr) => attr.name === 'First')?.value || ''
  const lastName = credential.credentialAttributes?.find((attr) => attr.name === 'Last')?.value || ''
  const studentId = credential.credentialAttributes?.find((attr) => attr.name === 'StudentID')?.value || ''
  const issueDate = new Date(credential.createdAt).toLocaleDateString()

  // const creationDate = credential?.createdAt
  //   ? new Date(credential.createdAt).toLocaleDateString()
  //   : t('Credentials.UnknownDate')

  useEffect(() => {
    if (logoUrl) {
      const fetchLogo = async () => {
        try {
          const response = await fetch(logoUrl)
          const blob = await response.blob()

          const reader = new FileReader()
          reader.onloadend = () => {
            const base64data = reader.result as string
            setLogoBase64(base64data)
          }
          reader.readAsDataURL(blob)
        } catch (error) {
          console.error('Error fetching logo image:', error)
        }
      }

      fetchLogo()
    } else {
      // Use a default logo if logoUrl is not provided
      setLogoBase64(null)
    }
  }, [logoUrl])

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
        style={styles.card}
        width="100%"
        firstName={firstName}
        lastName={lastName}
        studentId={studentId}
        issueDate={issueDate}
        logoImage={logoBase64 || ''}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    aspectRatio: 381 / 203, // Maintain the aspect ratio of the SVG
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingLeft: 15,
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
