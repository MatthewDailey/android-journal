import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton, ButtonContainer } from "./components/button";
import { DateListItem, EditingListItem, GratitudeListItem, NoEntryListItem } from "./components/list_items";
import { StreakHeader } from "./components/streak";
import { HeavyText, LightText, NormalText } from "./components/text";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});

export function ComponentDemoView() {
    const [streakCount, setStreakCount] = React.useState(0);

    return (
        <View style={styles.container}>
            <StreakHeader count={streakCount} isStreak={streakCount > 1} />
            <DateListItem dateMs={new Date().getTime()}/>
            <EditingListItem header="I'm grateful for..." onChangeText={function (text: string): void {} } />
            <DateListItem dateMs={new Date().getTime()}/>
            <NoEntryListItem />
            <DateListItem dateMs={new Date().getTime() - 1000 * 60 * 60 * 24}/>
            <GratitudeListItem text="This is a long string that will wrap to many lines that needs to be truncated so that this element does not take up too much space." dateMs={1665553993440} />
            <ButtonContainer>
                <PrimaryButton onPress={() => { setStreakCount(streakCount + 1)} } text="Increment" />
                <PrimaryButton onPress={() => { setStreakCount(streakCount - 1)} } text="Decrement" />
            </ButtonContainer>
        </View>
    );
}
