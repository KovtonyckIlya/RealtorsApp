import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { getListingsListFromBounds } from '../../actions/exploreActions/exploreListingsActions';
import { connect } from 'react-redux';
import SlidingUpPanel from 'rn-sliding-up-panel';
import HouseCard from '../common/HouseCard';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
const debouncedGetListingsListFromBounds = _.debounce(
    (props, settings) => props.getListingsListFromBounds(settings),
    20
);

const styles = {
    container: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        zIndex: 1,

        alignItems: 'center',
        justifyContent: 'center',
    },
    slidingView: {
        height: 300,
        backgroundColor: 'red',
    },
    dragHandler: {
        alignSelf: 'stretch',
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    listingContainer: {
        width: '100%',
        backgroundColor: 'white',
    },
};

const ExploreHeader = (props) => {
    const slidingRef = useRef(null);
    useEffect(() => {
        // if map bounds change go to first page
        if (!props.mapBounds) return;
        loadPage(1);
    }, [props.mapBounds, props.filters]);

    const loadPage = (page) => {
        // document.getElementById('list-container').scrollTop = 0;
        debouncedGetListingsListFromBounds(props, {
            page,
            bounds: props.mapBounds,
            pageSize: props.pageSize,
        });
    };

    useEffect(() => {
        props.selectedListing
            ? slidingRef.current.show()
            : slidingRef.current.hide();
    }, [props.selectedListing]);

    return (
        <View style={styles.container}>
            <SlidingUpPanel ref={slidingRef}>
                {(dragHandler) => (
                    <View style={styles.container}>
                        <View
                            style={styles.dragHandler}
                            {...dragHandler}
                        ></View>
                        <View style={styles.listingContainer}>
                            {props.selectedListing && (
                                <HouseCard item={props.selectedListing} />
                            )}
                        </View>
                    </View>
                )}
            </SlidingUpPanel>
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        listings: _.values(state.explore.exploreListings.listings),
        total: state.explore.exploreListings.total,
        pageSize: state.explore.exploreListings.pageSize,
        loading: state.explore.exploreListings.loading,
        selectedListing: state.explore.exploreListings.selectedListing,
        currentPage: state.explore.exploreListings.page,
        mapBounds: state.explore.exploreMap.bounds,
        zoom: state.explore.exploreMap.zoom,
        filters: state.explore.exploreFilters,
        showMap: state.explore.exploreMap.showMap,

    };
};

export default connect(mapStateToProps, { getListingsListFromBounds })(
    ExploreHeader
);
