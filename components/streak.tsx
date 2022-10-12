import React from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import { colors } from '../constants'
import { HeavyText } from './text'

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingBottom: 16,
        alignItems: 'center',
        borderBottomWidth: 2,
        overflow: 'hidden',
    },
    ripple: {
        backgroundColor: colors.green,
        borderRadius: 50,
        position: 'absolute',
    }
})

export const StreakHeader = (props: { count: number, isStreakActive: boolean }) => {
    const color = props.isStreakActive ? colors.green : colors.red

    // TODO: Do not animate on launch with isStreak == true
    const timing = 300
    const fadeAnim = React.useRef(new Animated.Value(0)).current
    React.useEffect(() => {
        if (props.isStreakActive) {
            Animated.sequence([
                Animated.timing(fadeAnim,
                    {
                        useNativeDriver: true,
                        toValue: 0.5,
                        duration: timing,
                    }),
                Animated.timing(fadeAnim,
                    {
                        delay: 50,
                        useNativeDriver: true,
                        toValue: 0,
                        duration: timing / 2,
                    }),
            ]).start();
        }
    }, [fadeAnim, props.isStreakActive])

    return (
        <View style={{ ...styles.container, borderBottomColor: color }}>
            {props.isStreakActive && <Animated.View style={{ ...styles.ripple, opacity: fadeAnim, width: 700, height: 100 }} />}
            <HeavyText color={color}>{props.count}</HeavyText>
        </View>
    )
}