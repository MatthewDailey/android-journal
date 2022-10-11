import { StyleSheet, Text, TextProps, TextInput, TextInputProps } from "react-native";

const fontSize = 16
const textStyle = StyleSheet.create({
    normal: {
        fontWeight: "normal",
        fontSize,
    },
    bold: { 
        fontWeight: "bold",
        fontSize,
    },
    light: {
        fontWeight: "normal",
        fontSize: 12,
        opacity: 0.5,
    },
    normalInput: {
        fontWeight: "normal",
        fontSize,
        borderWidth: 0,
    }
});

export const HeavyText = (props: TextProps) => (
    <Text style={textStyle.bold} {...props}/>
)

export const NormalText = (props: TextProps) => (
    <Text style={textStyle.normal} {...props}/>
)

export const LightText = (props: TextProps) => (
    <Text style={textStyle.light} {...props}/>
)

export const NormalTextInput = (props: TextInputProps) => (
    <TextInput style={textStyle.normalInput} {...props}/>
)