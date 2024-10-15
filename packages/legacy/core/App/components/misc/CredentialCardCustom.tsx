import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, Image, StyleSheet, Linking } from 'react-native'
import { CredentialExchangeRecord } from '@credo-ts/core'
import { useTranslation } from 'react-i18next'
import { useCredentialConnectionLabel } from '../../utils/helpers'
import { getCredentialIdentifiers } from '../../utils/credential'
import { BrandingOverlay } from '@hyperledger/aries-oca'
import { TOKENS, useServices } from '../../container-api'
import { GenericFn } from 'types/fn'
import { useNavigation } from '@react-navigation/core'
import { CredentialOverlay } from '@hyperledger/aries-oca/build/legacy'

interface CustomCredentialCardProps {
  credential: CredentialExchangeRecord
  onPress: () => void
  logoUrl?: string
  credName?: string
  credDefId?: string
  schemaId?: string
  proof: boolean
}

const CustomCredentialCard: React.FC<CustomCredentialCardProps> = ({
  credential,
  onPress,
  logoUrl,
  credName,
  schemaId,
  proof,
  credDefId,
}) => {
  const { i18n, t } = useTranslation()

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
    <View style={styles.emptyContainer}>
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
            <Text style={styles.walletDescription}>{resolvedCredName}</Text>
          </View>
          <Text style={styles.dateText}>{creationDate}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  boxContainer: {
    flexDirection: 'row',
    width: '95%',
    height: 106,
    backgroundColor: '#D9D9D9',
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  darkRectangle: {
    width: '30%',
    height: '100%',
    backgroundColor: '#fea41c',
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
