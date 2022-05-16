import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { getClusterPins } from '../../actions/exploreActions/exploreMapActions';
import { getPinFromAddressId, getPinFromGeohash, forceDeselectListings } from '../../actions/exploreActions/exploreListingsActions';
import _ from 'lodash';
import {HouseCard} from "../common/HouseCard"
import { Marker } from 'react-native-maps';
import { Text, View, StyleSheet } from 'react-native';
import { primaryColor,cancelRed } from '../../constants/Colors';
import { formatPrice } from '../common/Helpers';
import { useNavigation } from '@react-navigation/native';
const debouncedGetClusterPins = _.debounce(
    (props) => props.getClusterPins(),
    20
);
const styles = StyleSheet.create({
    pin: {
        minWidth: 20,
        padding: 5,
        alignItems: 'center',
        backgroundColor: primaryColor,
        borderRadius: 5,
    },
    pinText: {
        fontSize: 14,
        color: 'white',
    },
});

const CustomPin = connect((state) => ({
  deselectListingFlag: state.explore.exploreListings.deselectListingFlag
}), {
  getPinFromAddressId,
  getPinFromGeohash,
  forceDeselectListings,
 })((props) => {
    const { pin, mapRef } = props;
    let [listing, setListing] = useState(null);
    const [selected, selectMarker] = useState(false);
    let ref = useRef();
    // const [color, setColor] = useState(false);
    useEffect(() => {
      selectMarker(false);
    }, [props.deselectListingFlag])

    // useEffect(() => {
    //   // if (listing && props.selectedListing && listing._id === props.selectedListing._id) {
    //   //   // ref.showCallout();
    //   //   selectMarker(true);
    //   // } else {
    //   //   selectMarker(false);
    //   // }
    // }, [listing, props.selectedListing]);
    // let color = primaryColor
    // const [isActive,setActive] = useState(primaryColor);
    const navigation = useNavigation();
    const navigate = () => {
        // console.log("Listing",listing)
        navigation.push('ListingDetailScreen');
    };
    const ListingPin = (props) => {
        return (
            <View style={{ minWidth: 20,
                padding: 5,
                alignItems: 'center',
                backgroundColor: props.selected ? '#ff8c01' : (props.pin.count === 1 ? primaryColor : cancelRed),
                borderRadius: 5,}}>
                <Text style={styles.pinText}>{formatPrice(props.pin.max)}</Text>
            </View>
        );
    };

    const ClusterPin = (props) => {
        return (
            <View style={styles.pin}>
                <Text style={styles.pinText}>+{props.pin.count}</Text>
            </View>
        );
    };
    const onClickPin = async () => {
        const { latitudeDelta, longitudeDelta } = mapRef.current.__lastRegion;
        if (pin.count == 1) {

            // console.log('props.listings', listing);
          //  setListing(await props.getPinFromGeohash(pin._id, pin));
            // return setListing(await props.getPinFromAddressId(pin._id, pin));
            props.forceDeselectListings(Math.random());
            const listing = await props.getPinFromAddressId(props.listings[0]._id, pin)
            setListing(listing);
            selectMarker(true);


            // mapRef.current.animateToRegion(
            //     {
            //         latitude: pin.lat - latitudeDelta / 5,
            //         longitude: pin.lng,
            //         latitudeDelta,
            //         longitudeDelta,
            //     },
            //     100
            // );

        } else {
            mapRef.current.animateToRegion(
                {
                    latitude: pin.lat,
                    longitude: pin.lng,
                    latitudeDelta: latitudeDelta / 2,
                    longitudeDelta: longitudeDelta / 2,
                },
                100
            );
        }
    };

    return (
        <Marker
            ref={(r) => {
                ref = r;
            }}
            key={pin._id}
            onPress={onClickPin}
            coordinate={{ latitude: pin.lat, longitude: pin.lng }}
        >
            <View>
                {pin.count == 1 ? (
                    <ListingPin selected={selected} pin={pin} />
                ) : (
                    <ClusterPin pin={pin} />
                )}
            </View>

              {/*listing ? (
                  <View style={{ width: 300 }}>
                      <HouseCard item={listing} />
                  </View>
              ) : (
                  null
              )*/}

        </Marker>
    );
});



const ExplorePins = (props) => {
    useEffect(() => {
        debouncedGetClusterPins(props);
    }, [props.mapBounds, props.filters]);

    if (!props.pins) return null;

    const renderPin = (pin) => {
        return <CustomPin
          selectedListing={props.selectedListing}
          key={pin._id}
          listings={props.listings}
          pin={pin}
          mapRef={props.mapRef}
        />;
    };

    const resultPins = Object.keys(props.pins).map((key) => {
        const pin = props.pins[key];
        return renderPin(pin);
    });
    return resultPins;
};

const mapStateToProps = (state) => {
    return {
        mapBounds: state.explore.exploreMap.bounds,
        filters: state.explore.exploreFilters,
        pins: state.explore.exploreMap.pins,
        selectedListing: state.explore.exploreListings.selectedListing,
        listings: _.values(state.explore.exploreListings.listings),
    };
};
export default connect(mapStateToProps, {
    getClusterPins,
    getPinFromAddressId,
    getPinFromGeohash,
})(ExplorePins);
