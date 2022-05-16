import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { primaryColor } from '@constants/Colors';
import WheelPicker from './AnimatedPicker/WheelPicker';
import { WHEEL_PICKET_ITEMS } from './constants';
import { connect } from 'react-redux';
import { updateFilter } from '@actions/exploreActions/exploreFiltersActions';

const PriceComponent = (props: { initialMin: number; updateFilter: (arg0: string, arg1: number | null) => void; initialMax: number; }) => {
    const [type, setType] = useState('property_price');
    const [minPrice, setMinPrice] = useState({ value: '' });
    return (
        <View>
            <View pointerEvents="none" style={styles.viewWithLines}>
                <View style={[styles.lineUp, styles.line]}>
                    <Text style={styles.textTo}>to</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <WheelPicker
                    data={WHEEL_PICKET_ITEMS}
                    initialValue={props.initialMin}
                    getItem={(item) => {
                        props.updateFilter(
                            'priceMin',
                            item ? item.value * 1000 : null
                        );
                        setMinPrice(item);
                    }}
                    position="left"
                />
                <WheelPicker
                    data={WHEEL_PICKET_ITEMS}
                    initialValue={props.initialMax}
                    getItem={(item) =>
                        props.updateFilter(
                            'priceMax',
                            item ? item.value * 1000 : null
                        )
                    }
                    position="right"
                    minPrice={minPrice}
                />
            </View>
        </View>
    );
};

export default connect(null, { updateFilter })(PriceComponent);

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        borderRadius: 11,
        borderWidth: 2,
        borderColor: primaryColor,
    },
    headerBtnLeft: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    headerBtnRight: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    headerBtn: {
        backgroundColor: '#fff',
        height: '102%',
        width: '50%',
        paddingVertical: 10,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    headerBtnActive: {
        backgroundColor: primaryColor,
    },
    headerBtnTextActive: {
        color: '#fff',
    },
    headerBtnText: {
        textAlign: 'center',
        fontSize: 16,
        color: primaryColor,
    },
    viewWithLines: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 8888,
    },
    line: {
        borderColor: '#8898a0',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        width: '100%',
    },
    lineDown: {
        marginTop: 0,
    },
    lineUp: {
        marginBottom: 0,
    },
    textTo: {
        fontSize: 24,
        color: '#8898a0',
        lineHeight: 24,
        textAlign: 'center',
    },
});
