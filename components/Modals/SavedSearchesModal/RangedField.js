import React from 'react';
import { SectionList } from 'react-native';
import { Text, StyleSheet } from 'react-native';
import { cancelRed, primaryColor } from '@constants/Colors';
import { formatPrice } from '@components/common/Helpers';

const RangedField = (props) => {
    const { item, section } = props;
    let min = section.min == undefined ? undefined : item[section.min];
    let max = section.max == undefined ? undefined : item[section.max];
    const isAreaText = section.name == 'area' ? ' sqft' : '';

    if (section.name == 'price') {
        min ? (min = formatPrice(min)) : null;
        max ? (max = formatPrice(max)) : null;
    }

    if (max == undefined) {
        return <Text style={styles.searchText}>{`${min}+${isAreaText}`}</Text>;
    } else if (min == undefined) {
        return <Text style={styles.searchText}>{`<${max}${isAreaText}`}</Text>;
    } else {
        return (
            <Text style={styles.searchText}>
                {`${min}-${max}${isAreaText}`}
            </Text>
        );
    }
};

export default RangedField;

const styles = StyleSheet.create({
    searchText: {
        flex: 1,
        fontSize: 13,
        fontWeight: 'bold',
        color: primaryColor,
        marginHorizontal: 5,
    },
});
