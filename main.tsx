import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton, ButtonContainer } from "./components/button_components";
import { HeavyText, LightText, NormalText } from "./components/text";

const styles = StyleSheet.create({
    container: {
        marginTop: 56,
        backgroundColor: '#fff',
    },
});

export function MainView() {
    return (
        <View style={styles.container}>
            <HeavyText>October 5, 2022</HeavyText>
            <LightText>5:04pm</LightText>
            <NormalText>Exerted enterence focus hear him</NormalText>
            <ButtonContainer>
                <PrimaryButton onPress={() => { } } text="Journal" />
                <PrimaryButton onPress={() => { } } text="Gratitude" />
            </ButtonContainer>
        </View>
    );
}
