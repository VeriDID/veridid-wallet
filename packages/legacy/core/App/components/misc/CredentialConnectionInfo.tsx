//lower modal design for credential
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '../../contexts/theme'

const CredentialConnectionInfo: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false)
  const { ColorPallet } = useTheme()

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={toggleMenu}>
          <Icon name="dots-vertical" size={24} color={menuVisible ? ColorPallet.brand.verididPink : '#000'} />
        </TouchableOpacity>
      </View>
      {menuVisible && (
        <View style={[styles.menu, { borderColor: ColorPallet.brand.verididPink }]}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Delete Credential</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Hide Information</Text>
          </TouchableOpacity>
        </View>
      )}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'visible',
    width: '100%',
  },
  header: {
    alignItems: 'flex-end',
    padding: 10,
  },
  headerButton: {
    padding: 5,
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
    zIndex: 1,
  },
  menuItem: {
    padding: 10,
  },
  menuItemText: {
    fontSize: 14,
  },
})

export default CredentialConnectionInfo
