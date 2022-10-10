import { StyleSheet, Text, TextProps, View } from "react-native";

const fontSize = 16
const textStyle = StyleSheet.create({
    regular: {
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
    }
});

export const HeavyText = (props: TextProps) => (
    <Text style={textStyle.bold} {...props}/>
)

export const NormalText = (props: TextProps) => (
    <Text style={textStyle.regular} {...props}/>
)

export const LightText = (props: TextProps) => (
    <Text style={textStyle.light} {...props}/>
)