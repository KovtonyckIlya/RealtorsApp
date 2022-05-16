import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

interface Props {
    clearFilters: Function;
    toggleMoreFilters: Function;
}

export const HeaderSearchFilters = ({
    clearFilters,
    onPressClose,
}: Props) => {
    return (
        <View style={[styles.headerWrapper, { paddingBottom: 0 }]}>
            <Text style={styles.headerFilterText}>Search filters</Text>

            <View
                style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    top: 0,
                }}
            >
                <TouchableOpacity onPress={clearFilters}>
                    <Text style={styles.clearBtnText}>Clear all</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.closeBtnWrapper}
                    onPress={onPressClose}
                >
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    clearBtnText: { color: '#828282', fontSize: 15, fontWeight: 'bold' },
    closeBtnWrapper: {
        alignItems: 'flex-end',
    },
    headerFilterText: {
        textAlign: 'center',
        fontSize: 18,
        flex: 1,
        fontWeight: 'bold',
    },
    headerWrapper: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
