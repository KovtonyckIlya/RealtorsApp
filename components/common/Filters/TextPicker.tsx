import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import React from 'react';
import Picker from '@components/common/Filters/Picker';

type item = {
    value: string;
    title: string;
};

interface Props {
    title: string;
    initialValue?: boolean;
    onChange: Function;
    styleText?: StyleProp<TextStyle>;
    styleContainer?: StyleProp<TextStyle>;
    placeholder: string;
    items: [item];
}

export const TextPicker = ({
    title,
    initialValue,
    onChange,
    styleContainer,
    styleText,
    placeholder,
    items,
}: Props) => {
    return (
        <View style={[styles.container, styleContainer]}>
            <Text style={[styles.text, styleText]}>{title}</Text>
            <View style={styles.positionBlock}>
                <Picker
                    onChange={onChange}
                    iosHeader="Property Type"
                    placeholder={placeholder}
                    initialValue={initialValue}
                    items={items}
                    color="#4A4A4A"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 20,
        justifyContent: 'space-between',
        // padding: 10,
    },
    positionBlock: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        // marginBottom: 5,
        // marginTop: 15,
    },
    title: { fontSize: 15 },
});
