//design of lower modal
import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, DeviceEventEmitter } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CredentialExchangeRecord } from '@credo-ts/core'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/theme'
import { useCredentialConnectionLabel } from '../../utils/helpers'
import { BrandingOverlay } from '@hyperledger/aries-oca'
import { Attribute, CredentialOverlay } from '@hyperledger/aries-oca/build/legacy'
import { TOKENS, useServices } from '../../container-api'
import { buildFieldsFromAnonCredsCredential } from '../../utils/oca'
import { getCredentialIdentifiers } from '../../utils/credential'
import { useAgent } from '@credo-ts/react-hooks'
import Toast from 'react-native-toast-message'
import CommonRemoveModal from '../modals/CommonRemoveModal'
import { ModalUsage } from '../../types/remove'
import { BifoldError } from '../../types/error'
import { EventTypes } from '../../constants'
import { GenericFn } from '../../types/fn'

interface CredentialConnectionInfoProps {
  credential: CredentialExchangeRecord
  onRemove?: GenericFn
}

const CredentialConnectionInfo: React.FC<CredentialConnectionInfoProps> = ({ credential, onRemove = () => null }) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false)
  const { ColorPallet } = useTheme()
  const { agent } = useAgent()
  const { t, i18n } = useTranslation()
  const [, setOverlay] = useState<CredentialOverlay<BrandingOverlay>>({
    bundle: undefined,
    presentationFields: [],
    metaOverlay: undefined,
    brandingOverlay: undefined,
  })
  const [attributes, setAttributes] = useState<Attribute[]>([])
  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER])
  const issuerName = useCredentialConnectionLabel(credential) ?? t('Credentials.UnknownIssuer')

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  const callOnRemove = useCallback(() => {
    setIsRemoveModalVisible(true)
    setMenuVisible(false)
  }, [])

  const callSubmitRemove = useCallback(async () => {
    try {
      if (!(agent && credential)) {
        return
      }

      await agent.credentials.deleteById(credential.id)

      // Close modals and perform any additional actions
      setIsRemoveModalVisible(false)
      onRemove()

      // Show success toast after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      Toast.show({
        type: 'success',
        text1: t('CredentialDetails.CredentialRemoved'),
      })
    } catch (err: unknown) {
      const error = new BifoldError(
        t('Error.Title1032'),
        t('Error.Message1032'),
        (err as Error)?.message ?? String(err),
        1032
      )
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error)
    }
  }, [agent, credential, onRemove, t])

  const callCancelRemove = useCallback(() => {
    setIsRemoveModalVisible(false)
  }, [])

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
      <TouchableOpacity style={styles.headerButton} onPress={toggleMenu}>
        <Icon name="dots-vertical" size={24} color={menuVisible ? ColorPallet.brand.verididPink : '#000'} />
      </TouchableOpacity>
      {menuVisible && (
        <View style={[styles.menu, { borderColor: ColorPallet.brand.verididPink }]}>
          <TouchableOpacity style={styles.menuItem} onPress={callOnRemove}>
            <Text style={styles.menuItemText}>Delete Credential</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Hide Information</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView style={styles.scrollableContainer}>
        <View style={styles.attributesContainer}>
          {attributes.map((attr, index) => (
            <Text key={index} style={styles.attributeText}>
              {attr.name}: {attr.value}
            </Text>
          ))}
        </View>
      </ScrollView>
      <View style={styles.content}>
        <View style={styles.infoItem}>
          <Icon name="link-variant" size={28} color="#000" />
          <Text style={styles.infoText}>Connected 2024</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="sticker-check-outline" size={28} color="#000" />
          <Text style={styles.infoText}>1 Credential</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="chat-outline" size={28} color="#000" />
          <Text style={styles.infoText}>31 Discussions</Text>
        </View>
      </View>
      <CommonRemoveModal
        usage={ModalUsage.CredentialRemove}
        visible={isRemoveModalVisible}
        onSubmit={callSubmitRemove}
        onCancel={callCancelRemove}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'visible',
    width: '100%',
  },
  headerButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    padding: 5,
  },
  scrollableContainer: {
    flex: 1,
    marginTop: 0,
  },
  attributesContainer: {
    paddingRight: 15,
    paddingTop: 15, // Adjust this value to align with the menu icon
    marginBottom: 10,
  },
  attributeText: {
    paddingLeft: 20,
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
    marginBottom: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    margin: 10,
    padding: 10,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  menu: {
    position: 'absolute',
    right: 10,
    top: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 3,
  },
  menuItem: {
    padding: 10,
  },
  menuItemText: {
    fontSize: 14,
  },
})

export default CredentialConnectionInfo
