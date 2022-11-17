import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { HeavyText, LightText, NormalText, NormalTextInput } from "./text";

const styles = StyleSheet.create({
    listItem: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
    },
    focussed: {
        backgroundColor: "#FFEEDB",
    }
});

function dateMsToHoursAndMinutesString(dateMs: number) {
    const date = new Date(dateMs);
    const hours = (date.getHours() % 12);
    return `${hours || 12}:${date.getMinutes()}${date.getHours() > 12 ? "pm" : "am"}`;
}

const TextListItem = (props: { text: string, header: string }) => {
    const [expanded, setExpanded] = React.useState(true);
    const toggleExpanded = () => setExpanded(!expanded);

    return (
        <TouchableWithoutFeedback onPress={toggleExpanded}>
            <View style={styles.listItem}>
                <LightText>{props.header}</LightText>
                <NormalText numberOfLines={expanded ? 2 : undefined}>{props.text}</NormalText>
            </View>
        </TouchableWithoutFeedback>
    )
}

export const GratitudeListItem = (props: { text: string, dateMs: number }) => (
    <TextListItem text={props.text} header={`${dateMsToHoursAndMinutesString(props.dateMs)} • I'm grateful for...`} />
)

export const JournalListItem = (props: { text: string, dateMs: number }) => (
    <TextListItem text={props.text} header={dateMsToHoursAndMinutesString(props.dateMs)} />
)

// Note this is janky because of an issues with date.toLocaleDateString() https://github.com/facebook/react-native/issues/19410
function getMonthName(date: Date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[date.getMonth()];
}

export const DateListItem = (props: { dateMs: number }) => {
    const date = new Date(props.dateMs);
    const monthDayYear = `${getMonthName(date)} ${date.getDate()}, ${date.getFullYear()}`;
    const today = new Date();
    const isToday = today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear();
    return (
        <View style={styles.listItem}>
            <HeavyText>{isToday? 'Today' : monthDayYear}</HeavyText>
        </View>
    )
}

export const NoEntryListItem = () => (
    <View style={styles.listItem}>
        <NormalText>NO ENTRY TODAY</NormalText>
    </View>
)

export const EditingListItem = (props: { header?: string, onChangeText: (text: string) => void }) => {
    return (
        <View style={{...styles.listItem, ...styles.focussed}}>
            {props.header && <LightText>{props.header}</LightText>}
            <NormalTextInput multiline={true} onChangeText={props.onChangeText} autoFocus testID="edit_input"/>
        </View>
    )
}