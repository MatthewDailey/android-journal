import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeavyText, LightText, NormalText } from "./components";

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
});

export function MainView() {
    return (
        <View style={styles.container}>
            <HeavyText>October 5, 2022</HeavyText>
            <LightText>5:04pm</LightText>
            <NormalText>Exerted enterence focus hear him</NormalText>
        </View>
    );
}
