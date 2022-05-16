import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { primaryColor } from '@constants/Colors';
import { primaryLight } from '../../../constants/Colors';

const Component = (props) => {
    const { items } = props;
    const [index, setIndex] = useState(props?.initialValue ?? 0);
    const onChange = (key) => {
        setIndex(key);
        props?.onChange(key);
    };
    useEffect(() => {
        setIndex(props?.initialValue ?? 0);
    }, [props.initialValue]);
    return (
        <View
            style={{
                backgroundColor: primaryLight,
                flexDirection: 'row',
                justifyContent: 'center',
                flex: 1,
                borderRadius: 10,
            }}
        >
            {items.map((el, key) => {
                return (
                    <TouchableOpacity
                        onPress={() => onChange(key)}
                        style={{
                            flex: 1,
                            backgroundColor:
                                key == index ? primaryColor : 'transparent',
                            margin: 2,
                            borderRadius: 10,
                        }}
                        key={key}
                    >
                        <Text
                            style={{
                                marginVertical: 14,
                                color: key == index ? '#fff' : '#000',
                                fontSize: 15,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                        >
                            {el.title}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({});

export default Component;
