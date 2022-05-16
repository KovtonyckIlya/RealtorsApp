import React, { useState, useEffect } from 'react';
import { Picker } from 'native-base';
import { View, Text, Platform } from 'react-native';
import { Octicons } from '@expo/vector-icons';
const OS = Platform.OS;

const Component = (props) => {
    const { initialValue } = props;
    const [selected, setSelected] = useState(initialValue ?? undefined);
    const [width, setWidth] = useState(120);
    const onChange = (value) => {
        props?.onChange(value);
        setSelected(value);
    };
    useEffect(() => {
        let width = 70;
        const maxWidth = 150;
        const selectedTitle =
            props.items.find((el) => el.value == selected)?.title ?? 'Sort';
        // if (undefined == selectedTitle) return;
        if (selectedTitle.length < 5) {
            if (OS === 'ios') {
                width = 70;
            } else {
                width = 100;
            }
        } else if (selectedTitle.length < 10) {
            width = 100;
        } else if (selectedTitle.length > 10) {
            width = 120;
        }
        const final = Math.min(maxWidth, width);
        // console.log({ final });
        setWidth(final);
    }, [selected]);
    // const getWidth = () => {
    //     let width = 70;
    //     const maxWidth = 150;
    //     const selectedTitle = props.items.find((el) => el.value == selected)
    //         ?.title;
    //     if (props.items?.selected?.title?.length < 100) {
    //         width = 70;
    //     } else if (props.items?.selected?.title?.length > 10) {
    //         width = 170;
    //     }
    //     return Math.min(maxWidth, width);
    // };
    useEffect(() => {
        setSelected(initialValue ?? 0);
    }, [initialValue]);
    return (
        <View
            style={
                props?.inline
                    ? {}
                    : {
                          flex: 1,
                          alignItems: 'flex-end',
                      }
            }
        >
            <Picker
                note // ANDROID !!!
                mode="dialog"
                iosHeader={props.iosHeader ?? 'Select One'}
                iosIcon={
                    <Octicons
                        name={props.icons ?? 'chevron-right'}
                        size={24}
                        color={props.color ?? 'rgba(0,0,0,0.6)'}
                    />
                }
                style={[
                    props?.inline ? { paddingVertical: 10 } : {},
                    Platform.OS === 'ios' ? {} : { width: 150 },
                ]}
                placeholder={props.placeholder ?? 'Select One'}
                placeholderStyle={{
                    color: props.color ?? 'grey',
                    // color: props.color ?? '#007aff',
                    fontSize: 17,
                }}
                placeholderIconColor={props.color ?? 'grey'}
                // placeholderIconColor={props.color ?? '#007aff'}
                selectedValue={selected}
                onValueChange={onChange}
            >
                {props.items.map((el, key) => {
                    return (
                        <Picker.Item
                            key={key}
                            label={el.title}
                            value={el.value}
                        />
                    );
                })}
            </Picker>
        </View>
    );
};

export default Component;
