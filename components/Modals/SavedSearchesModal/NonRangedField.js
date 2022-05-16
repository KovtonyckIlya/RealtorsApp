import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { cancelRed, primaryColor } from '@constants/Colors';

const NonRangedField = (props) => {
    const { item, section } = props;
    return (
        <Text style={styles.searchText}>
            {`${item[section.min]}${section.name == 'propertyType' ? '' : '+'}`}
        </Text>
    );
};
export default NonRangedField;

const styles = StyleSheet.create({
    searchText: {
        flex: 1,
        fontSize: 13,
        fontWeight: 'bold',
        color: primaryColor,
        marginHorizontal: 5,
    },
});
