import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { LightText, NormalText } from "./text";

const styles = StyleSheet.create({
    gratitude: {},
});

export const GratitudeListItem = (props: { text: string, dateMs: number }) => {
    const date = new Date(props.dateMs);
    const hoursAndMinutesString = `${date.getHours() % 12}:${date.getMinutes()}${date.getHours() > 12 ? "pm" : "am"}`;

    const [expanded, setExpanded] = React.useState(true);
    const toggleExpanded = () => setExpanded(!expanded);

    return (
        <TouchableWithoutFeedback onPress={toggleExpanded}>
            <View style={styles.gratitude}>
                <LightText>{hoursAndMinutesString} • I'm grateful for...</LightText>
                <NormalText numberOfLines={expanded ? 2 : undefined}>{props.text}</NormalText>
            </View>
        </TouchableWithoutFeedback>
    )
}