import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton, ButtonContainer } from "./components/button";
import { DateListItem, GratitudeListItem, NoEntryListItem } from "./components/list_items";
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
            <DateListItem dateMs={new Date().getTime()}/>
            <NoEntryListItem />
            <DateListItem dateMs={new Date().getTime() - 1000 * 60 * 60 * 24}/>
            <GratitudeListItem text="This is a long string that will wrap to many lines that needs to be truncated so that this element does not take up too much space." dateMs={1665553993440} />
            <ButtonContainer>
                <PrimaryButton onPress={() => { } } text="Journal" />
                <PrimaryButton onPress={() => { } } text="Gratitude" />
            </ButtonContainer>
        </View>
    );
}
