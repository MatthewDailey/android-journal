import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton, ButtonContainer } from "./components/button";
import { GratitudeListItem } from "./components/list_items";
import { HeavyText, LightText, NormalText } from "./components/text";

const styles = StyleSheet.create({
    container: {
        marginTop: 56,
        backgroundColor: '#fff',
    },
});

export function ComponentDemoView() {
    return (
        <View style={styles.container}>
            <HeavyText>October 5, 2022</HeavyText>
            <LightText>5:04pm</LightText>
            <NormalText>Exerted enterence focus hear him</NormalText>
            <GratitudeListItem text="amazing wife" dateMs={1665553993440} />
            <ButtonContainer>
                <PrimaryButton onPress={() => { } } text="Journal" />
                <PrimaryButton onPress={() => { } } text="Gratitude" />
            </ButtonContainer>
        </View>
    );
}
