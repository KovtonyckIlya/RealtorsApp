import { View } from 'native-base';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import HouseCard from '@components/common/HouseCard';
import Loader from '@components/common/Loader';
import { Button } from 'react-native';
import { getListingsListFromBounds } from '@app/actions/exploreActions/exploreListingsActions';
import { ScrollView } from 'react-native';
import { LightButtonFilled } from '../../common/LightButton';

const ExploreListingsList = (props) => {
    if (!props.listings) return null;

    const renderFlatListItem = useCallback(
        ({ item }) =>
            item ? <HouseCard item={item} isMainPage={true} /> : null,
        []
    );

    const onClickNextPage = () => {
        console.log('onClickNextPage');
        props.getListingsListFromBounds({
            page: props.page + 1,
            bounds: props.mapBounds,
            pageSize: props.pageSize,
        });
    };

    const onClickPrevPage = () => {
        console.log('onClickPrevPage');
        props.getListingsListFromBounds({
            page: props.page - 1,
            bounds: props.mapBounds,
            pageSize: props.pageSize,
        });
    };

    const flatListKeyExtractor = useCallback((item, index) => `${item.addressId}_${index}`, []);

    let hasMore = props.page * props.pageSize < props.total;
    let hasPrev = props.page > 1;

    return (
        <FlatList
            ListHeaderComponent={
                <>
                    {props.loading && (
                        <View style={styles.loaderContainer}>
                            <Loader />
                        </View>
                    )}
                    {!props.loading && hasPrev && (
                        <LightButtonFilled
                            title="Load Previous"
                            onPress={onClickPrevPage}
                        />
                    )}
                </>
            }
            data={props.listings}
            renderItem={renderFlatListItem}
            keyExtractor={flatListKeyExtractor}
            ListFooterComponent={
                !props.loading &&
                hasMore && (
                    <View style={styles.containerLoadMore}>
                        <LightButtonFilled
                            title="Load More"
                            onPress={onClickNextPage}
                        />
                    </View>
                )
            }
        />
    );
};

const mapStateToProps = (state) => {
    return {
        listings: _.values(state.explore.exploreListings.listings),
        page: state.explore.exploreListings.page,
        total: state.explore.exploreListings.total,
        pageSize: state.explore.exploreListings.pageSize,
        mapBounds: state.explore.exploreMap.bounds,
        loading: state.explore.exploreListings.loading,
    };
};
export default connect(mapStateToProps, { getListingsListFromBounds })(
    ExploreListingsList
);

export const styles = StyleSheet.create({
    containerLoadMore: {
        width: '100%',
        marginBottom: 60,
        flex: 1,
    },
    loaderContainer: {
        flex: 1,
        padding: 20,
    },
});
