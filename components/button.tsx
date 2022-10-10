import React from "react";
import { StyleSheet, View, Button, ButtonProps, Pressable } from "react-native";
import { HeavyText } from "./text";

const spacing = 16;
const styles = StyleSheet.create({
    button: {
        color: "#000",
        padding: spacing,
        borderRadius: 8,
        borderColor: "#000",
        borderWidth: 2,
        fontSize: 16,
        flexGrow: 1,
        alignItems: "center",
    },
    buttonContainer: {
        borderTopColor: "#000",
        borderTopWidth: 2,
        padding: spacing,
        display: "flex",
        flexDirection: "row",
    }
})

export const PrimaryButton = (props: { text: string, onPress: () => void }) => (
    <Pressable 
        style={({pressed}) => {
            return {
                backgroundColor: pressed ? "#ffeedb" : "#fff",
                ...styles.button
            }
        }} 
        onPress={props.onPress}>
        <HeavyText>{props.text}</HeavyText>
    </Pressable>
)

export const ButtonContainer = (props: { children: React.ReactNode[]}) => {
    const views = [];

    for (let i = 0; i < props.children.length; i++) {
        views.push(props.children[i]);
        if (i < props.children.length - 1) {
            views.push(<View style={{width: spacing / 2}} key={i}/>);
        }
    }

    return (
        <View style={styles.buttonContainer}>
            {views}
        </View>
    )
}