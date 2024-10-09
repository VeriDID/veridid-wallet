import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Linking } from 'react-native'
import { CredentialExchangeRecord } from '@credo-ts/core'
import { useTranslation } from 'react-i18next'
import { useCredentialConnectionLabel } from '../../utils/helpers'
import { getCredentialIdentifiers } from '../../utils/credential'
import { BrandingOverlay } from '@hyperledger/aries-oca'
import { TOKENS, useServices } from '../../container-api'
import { GenericFn } from 'types/fn'
import { useNavigation } from '@react-navigation/core'
import { CredentialOverlay } from '@hyperledger/aries-oca/build/legacy'

interface CredentialDetailsCustomProps {
  credential: CredentialExchangeRecord
  //onPress: () => void
  logoUrl?: string
  credName?: string
  credDefId?: string
  schemaId?: string
  proof?: boolean
}

const CredentialDetailsCustom: React.FC<CredentialDetailsCustomProps> = ({
  credential,
  //onPress,
  logoUrl,
  credName,
  schemaId,
  proof,
  credDefId,
}) => {
  const { i18n, t } = useTranslation()

  // Get the issuer name using the helper function
  const issuerName = useCredentialConnectionLabel(credential) ?? t('Credentials.UnknownIssuer')

  // Extract and format the creation date
  const creationDate = credential?.createdAt
    ? new Date(credential.createdAt).toLocaleDateString()
    : t('Credentials.UnknownDate')

  const [bundleResolver, credHelpActionOverrides] = useServices([
    TOKENS.UTIL_OCA_RESOLVER,
    TOKENS.CRED_HELP_ACTION_OVERRIDES,
  ])

  const [, setHelpAction] = useState<GenericFn>()
  const navigation = useNavigation()
  const [, setFlaggedAttributes] = useState<string[]>()
  const [, setOverlay] = useState<CredentialOverlay<BrandingOverlay>>({})
  const [resolvedCredName, setResolvedCredName] = useState<string>(t('Credentials.UnknownCredential'))

  useEffect(() => {
    const params = {
      identifiers: credential ? getCredentialIdentifiers(credential) : { schemaId, credentialDefinitionId: credDefId },
      attributes: proof ? [] : credential?.credentialAttributes,
      meta: {
        credName,
        credConnectionId: credential?.connectionId,
        //alias: credentialConnectionLabel,
      },
      language: i18n.language,
    }
    bundleResolver.resolveAllBundles(params).then((bundle: any) => {
      if (proof) {
        setFlaggedAttributes((bundle as any).bundle.bundle.flaggedAttributes.map((attr: any) => attr.name))
        const credHelpUrl =
          (bundle as any).bundle.bundle.metadata.credentialSupportUrl[params.language] ??
          Object.values((bundle as any).bundle.bundle.metadata.credentialSupportUrl)?.[0]

        // Check if there is a help action override for this credential
        const override = credHelpActionOverrides?.find(
          (override) =>
            (credDefId && override.credDefIds.includes(credDefId)) ||
            (schemaId && override.schemaIds.includes(schemaId))
        )
        if (override) {
          setHelpAction(() => () => {
            override.action(navigation)
          })
        } else if (credHelpUrl) {
          setHelpAction(() => () => {
            Linking.openURL(credHelpUrl)
          })
        }
      }
      setOverlay((o) => ({
        ...o,
        ...bundle,
        brandingOverlay: bundle.brandingOverlay as BrandingOverlay,
      }))
      // Extract the credential name from the meta overlay
      const nameFromOverlay = bundle?.metaOverlay?.name
      if (nameFromOverlay) {
        setResolvedCredName(nameFromOverlay)
      }
    })
  }, [
    credential,
    credName,
    i18n.language,
    bundleResolver,
    credHelpActionOverrides,
    navigation,
    schemaId,
    credDefId,
    proof,
  ])

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {logoUrl ? (
          <Image source={{ uri: logoUrl }} style={styles.logo} />
        ) : (
          <Image source={require('../../assets/img/veridid-logo.png')} style={styles.logo} />
        )}
      </View>
      <Text style={styles.institutionName}>{issuerName}</Text>
      <Text style={styles.credentialType}>{resolvedCredName}</Text>
      <Text style={styles.date}>{creationDate}</Text>
      {/* Placeholder for attributes */}
      <Text style={styles.attributesPlaceholder}>Attributes Placeholder</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  logoContainer: {
    width: '100%', // Take the full width of the container
    justifyContent: 'flex-start', // Move the logo towards the top
    alignItems: 'center', // Center horizontally
    marginBottom: 10, // Reduce the space below the logo
    marginTop: -20, // Move the logo further up
  },
  logo: {
    width: 80, // Maintain the size of the logo
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
  attributesPlaceholder: {
    fontSize: 14,
    color: '#999',
    textAlign: 'left',
  },
})

export default CredentialDetailsCustom
