import React, { useCallback, useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '@components/common/Loader';
import HouseCard from '../../components/common/HouseCard';
import { searchMyListings } from '@actions/listingsActions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { LightButtonFilled } from '../../components/common/LightButton';
import _ from 'lodash';

const ListingsScreen = (props) => {
    useState(() => {
        props.searchMyListings();
        
    }, []);
    const listings = useSelector((state) =>
        _.values(state.listingsReducer.listing)
    );

    console.log(" listings.length", listings.length)
    const insets = useSafeAreaInsets();
    const { loading } = props;
  
   
    const renderFlatListItem = useCallback(({ item: { listing } }) => {
        return <HouseCard item={listing} />;
    }, []);
    const flatListKeyExtractor = useCallback(
        (item, index) => `${item.id}_${index}`,
        []
    );
    return (
        <View
            style={[styles.container, { paddingTop: Math.max(insets.top, 30) }]}
        >
            {/* <LightButtonFilled
                onPress={() => {
                    props.searchMyListings();
                }}
                title="reload"
            /> */}
            <Text style={styles.title}>Your Listings ({listings.length})</Text>
            {!loading ? (
                listings.length ? (
                    <FlatList
                        data={listings}
                        renderItem={renderFlatListItem}
                        keyExtractor={flatListKeyExtractor}
                    />
                ) : (
                    <Text style={styles.title}>No Listings</Text>
                )
            ) : (
                <Loader />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        marginVertical: 10,
        color: '#4A4A4A',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default connect(null, {
    searchMyListings,
})(ListingsScreen);
