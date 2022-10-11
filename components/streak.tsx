import React from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import { HeavyText } from './text'

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom: 8,
        alignItems: 'center',
        borderBottomWidth: 2,
        overflow: 'hidden',
    },
    ripple: {
        backgroundColor: '#61C9A8',
        borderRadius: 50,
        position: 'absolute',
    }
})

export const StreakHeader = (props: { count: number, isStreak: boolean }) => {
    const color = props.isStreak ? '#61C9A8' : '#BA3B46'

    // TODO: Do not animate on launch with isStreak == true
    const timing = 300
    const fadeAnim = React.useRef(new Animated.Value(0)).current
    React.useEffect(() => {
        if (props.isStreak) {
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
    }, [fadeAnim, props.isStreak])

    return (
        <View style={{ ...styles.container, borderBottomColor: color }}>
            {props.isStreak && <Animated.View style={{ ...styles.ripple, opacity: fadeAnim, width: 700, height: 100 }} />}
            <HeavyText color={color}>{props.count}</HeavyText>
        </View>
    )
}