import React from 'react'
import { SvgProps } from 'react-native-svg'
import VDCardSvg from '../../assets/img/VDCardSvg'
import { SvgXml } from 'react-native-svg'

interface VDCardProps extends SvgProps {
  firstName?: string
  lastName?: string
  studentId?: string
  issueDate?: string
  logoImage?: string
}

const VDCard: React.FC<VDCardProps> = ({ firstName, lastName, studentId, issueDate, logoImage, ...props }) => {
  const filledSvg = VDCardSvg.replace('{firstName}', firstName || '')
    .replace('{lastName}', lastName || '')
    .replace('{studentId}', studentId || '')
    .replace('{issueDate}', issueDate || '')
    .replace('{logoImage}', logoImage || '')

  return <SvgXml xml={filledSvg} {...props} />
}

export default VDCard
