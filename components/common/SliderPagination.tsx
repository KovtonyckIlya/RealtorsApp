import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import paginationActive from '@icons/slider_pagination_active.png';
import pagination from '@icons/slider_pagination.png';

interface PaginationProps {
    showTitles?: boolean;
    index: number;
    length: number;
    // onPress: () => void;
}

export default function SliderPagination(props: PaginationProps) {
    const { showTitles, index, length } = props;
    return (
        <View style={paginationStyles.paginationWrapper}>
            {showTitles ? (
                <Text style={paginationStyles.title}>
                    {+index + 1}/{length}
                </Text>
            ) : null}
            <View style={paginationStyles.paginationEllipseWrapper}>
                <Image
                    key={1}
                    source={index == 0 ? paginationActive : pagination}
                    style={[
                        paginationStyles.item,
                        index == 0 ? paginationStyles.itemActive : {},
                    ]}
                />
                {length >= 2 ? (
                    <Image
                        key={2}
                        source={index == 1 ? paginationActive : pagination}
                        style={[
                            paginationStyles.item,
                            index == 1 ? paginationStyles.itemActive : {},
                        ]}
                    />
                ) : null}
                {length >= 3 ? (
                    <Image
                        key={3}
                        source={index >= 2 ? paginationActive : pagination}
                        style={[
                            paginationStyles.item,
                            index >= 2 ? paginationStyles.itemActive : {},
                        ]}
                    />
                ) : null}
            </View>
        </View>
    );
}

const paginationStyles = StyleSheet.create({
    paginationWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationEllipseWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    item: {
        width: 15,
        height: 5,
        resizeMode: 'contain',
        marginHorizontal: 2,
    },
    itemActive: {
        height: 8,
        width: 18,
    },
});
