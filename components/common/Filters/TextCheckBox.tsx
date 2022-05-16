import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import React from 'react';
import CheckBox from './CheckBox';

interface Props {
    title: string;
    size?: number;
    initialValue: boolean;
    onCheck: Function;
    styleText?: StyleProp<TextStyle>;
    styleContainer?: StyleProp<TextStyle>;
}

export const TextCheckBox = ({
    title,
    initialValue,
    onCheck,
    styleContainer,
    styleText,
    size = 33,
}: Props) => {
    return (
        <View style={[styles.container, styleContainer]}>
            <Text style={[styles.title, styleText]}>{title}</Text>
            <CheckBox
                initialValue={initialValue}
                size={size}
                onCheck={onCheck}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    title: { fontSize: 15 },
});
