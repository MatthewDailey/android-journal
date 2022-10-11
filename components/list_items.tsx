import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { LightText, NormalText } from "./text";

const styles = StyleSheet.create({
    listItem: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
    },
});

function dateMsToHoursAndMinutesString(dateMs: number) {
    const date = new Date(dateMs);
    return `${date.getHours() % 12}:${date.getMinutes()}${date.getHours() > 12 ? "pm" : "am"}`;
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
    <TextListItem text={props.text} header={`${dateMsToHoursAndMinutesString(props.dateMs)} • I'm grateful for...`}/>
)

export const JournalListItem = (props: { text: string, dateMs: number }) => (
    <TextListItem text={props.text} header={dateMsToHoursAndMinutesString(props.dateMs)}/>
)
