import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ExploreMap from './ExploreMap';
import { updateUserLocation, getUserLocation } from "../../actions/usersActions"
import { ScrollView } from 'react-native';
import ExploreHeader from './ExploreHeader';
import ExploreListingsList from './Lists/ExploreListingsList';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { LightButtonFilled } from '@components/common/LightButton';
import { setShowMap } from '@app/actions/exploreActions/exploreMapActions';
import map from '@icons/map.png';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const Explore = (props) => {
    const dispatch = useDispatch();
    const [location, setLocation] = useState(null);
    const user = useSelector((state) => state.users.user);
    const [errorMsg, setErrorMsg] = useState(null);
    const showMap = useSelector((state) => state.explore.exploreMap.showMap);
    const listings = useSelector(
        (state) => state.listingsReducer.detailsHome
    );
    const onPressMapView = () => {

        dispatch(setShowMap(!showMap));
    };
    const getLocationAsync = async () => {
        if (user || user._id) {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
            }
            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            const { latitude, longitude } = location.coords
            setLocation({ location: { latitude, longitude } });
            await dispatch(updateUserLocation(location))
        }
    };
    useEffect(() => {
        getLocationAsync()
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <ExploreHeader />
            <View
                style={{
                    flex: 1,
                    // alignItems: 'center',
                    // justifyContent: 'center',
                }}
            >
                <View
                    style={{
                        display: props.showMap ? 'none' : 'flex',
                        // display: props.showMap ? 'none' : 'block',// android doesn't work
                        flex: 1,
                    }}
                >
                    <ExploreListingsList />
                </View>

                <View
                    style={{
                        display: props.showMap ? 'flex' : 'none',
                        // display: props.showMap ? 'block' : 'none',// android doesn't work
                        flex: 1,
                        overflow: 'hidden',
                    }}
                >
                    <ExploreMap />
                </View>
            </View>
            <View style={[styles.containerButton]}>
                <LightButtonFilled
                    style={[styles.shadow, styles.buttonDown]}
                    isLeftIcon={false}
                    onPress={onPressMapView}
                    title={showMap ? 'List View' : 'Map View'}
                    styleText={styles.textMap}
                    icon={<Image style={styles.icon} source={map} />}
                />
            </View>
        </View>
    );

    return (
        <ScrollView
            contentContainerStyle={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}
            style={{ flex: 1 }}
        >
            <View style={{ height: '100%', width: '100%' }}>
                <ExploreHeader />
                <ExploreMap />
            </View>

            <View style={{ flex: 1 }}>
                <ExploreListingsList />
            </View>
        </ScrollView>
    );
};

const mapStateToProps = (state) => {
    return {
        showMap: state.explore.exploreMap.showMap,
    };
};
export default connect(mapStateToProps)(Explore);

const styles = StyleSheet.create({
    containerButton: {
        position: 'absolute',
        bottom: 10,
        flex: 1,
        left: (Dimensions.get('screen').width - 150) / 2,
        // alignItems: 'center',
    },
    buttonDown: {
        flex: 1,
        borderRadius: 20,
        width: 150,
        height: 40,
        backgroundColor: '#fff',
        borderWidth: 0,
    },
    icon: { height: 18, width: 20, marginLeft: 10 },
    shadow: {
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
});
