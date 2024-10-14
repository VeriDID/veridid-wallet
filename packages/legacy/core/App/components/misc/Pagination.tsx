import React from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { ScalingDot } from 'react-native-animated-pagination-dots'

import { hitSlop } from '../../constants'
import { testIdWithKey } from '../../utils/testable'

interface IPaginationStyleSheet {
  pagerContainer: Record<string, any>
  pagerDot: Record<string, any>
  pagerDotActive: Record<string, any>
  pagerDotInactive: Record<string, any>
  pagerPosition: Record<string, any>
  pagerNavigationButton: Record<string, any>
}

interface IPaginationProps {
  pages: Array<Element>
  activeIndex: number
  scrollX: Animated.Value
  next: () => void
  nextButtonText?: string
  previous: () => void
  previousButtonText?: string
  style: IPaginationStyleSheet
}

export const Pagination: React.FC<IPaginationProps> = ({
  pages,
  activeIndex,
  scrollX,
  style,
  next,
  nextButtonText,
  previous,
  previousButtonText,
}) => {
  const { t } = useTranslation()

  const shouldHideBack = (): boolean => {
    return activeIndex === 0
  }

  const shouldHideNext = (): boolean => {
    return activeIndex === pages.length - 1
  }

  const styles = StyleSheet.create({
    buttonText: {
      ...style.pagerNavigationButton,
      color: '#FF1493', 
    },
    backButton: {
      paddingRight: 20,
    },
    nextButton: {
      paddingLeft: 20,
    },
    pagerDotActive: {
      color: '#333333', 
    },
    pagerDotInactive: {
      color: '#B0B0B0', 
    },
  })

  return (
    <View style={style.pagerContainer}>
      <TouchableOpacity
        accessible={true}
        accessibilityLabel={t('Global.Back')}
        accessibilityRole={'button'}
        testID={testIdWithKey('Back')}
        onPress={previous}
        accessibilityElementsHidden={shouldHideBack()}
        importantForAccessibility={shouldHideBack() ? 'no-hide-descendants' : 'auto'}
        hitSlop={hitSlop}
      >
        <Text
          style={[
            styles.buttonText,
            styles.backButton,
            { opacity: shouldHideBack() ? 0 : 1 },
          ]}
        >
          {previousButtonText}
        </Text>
      </TouchableOpacity>
      <ScalingDot
        data={pages}
        scrollX={scrollX}
        inActiveDotColor={styles.pagerDotInactive.color}
        inActiveDotOpacity={1}
        activeDotColor={styles.pagerDotActive.color}
        activeDotScale={1}
        dotStyle={style.pagerDot}
        containerStyle={style.pagerPosition}
      />
      <TouchableOpacity
        accessible={true}
        accessibilityLabel={t('Global.Next')}
        accessibilityRole={'button'}
        testID={testIdWithKey('Next')}
        onPress={next}
        accessibilityElementsHidden={shouldHideNext()}
        importantForAccessibility={shouldHideNext() ? 'no-hide-descendants' : 'auto'}
        hitSlop={hitSlop}
      >
        <Text
          style={[
            styles.buttonText,
            styles.nextButton,
            { opacity: shouldHideNext() ? 0 : 1 },
          ]}
        >
          {nextButtonText}
        </Text>
      </TouchableOpacity>
    </View>
  )
}