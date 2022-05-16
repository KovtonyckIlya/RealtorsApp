import React, { useRef, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { setSelectedListing } from '../../actions/exploreActions/exploreListingsActions';
import { onIdle } from '../../actions/exploreActions/exploreMapActions';
import { connect } from 'react-redux';
import ExplorePins from './ExplorePins';

const ExploreMap = (props) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!props.searchLocation) {
            return;
        }

        const bounds =
            props.searchLocation.geometry.bounds ||
            props.searchLocation.geometry.viewport;

        const longitudeDelta = Math.abs(
            bounds.northeast.lng - bounds.southwest.lng
        );
        const latitudeDelta = Math.abs(
            bounds.northeast.lat - bounds.southwest.lat
        );
        let lat = (bounds.southwest.lat + bounds.northeast.lat) / 2;
        let lng = (bounds.southwest.lng + bounds.northeast.lng) / 2;

        mapRef.current.animateToRegion({
            longitude: lng,
            latitude: lat,
            latitudeDelta,
            longitudeDelta,
        });
    }, [props.searchLocation]);

    const onClickMap = () => {
        props.setSelectedListing(null);
    };

    return (
        <MapView
            onPress={onClickMap}
            ref={mapRef}
            onRegionChangeComplete={async (e) => {
                let camera = await mapRef.current.getCamera();
                let bounds = {
                    sw: {
                        lat: e.latitude - e.latitudeDelta / 2,
                        lng: e.longitude - e.longitudeDelta / 2,
                    },
                    ne: {
                        lat: e.latitude + e.latitudeDelta / 2,
                        lng: e.longitude + e.longitudeDelta / 2,
                    },
                };
                props.onIdle(bounds, Math.floor(camera.zoom + 1 || 11));
            }}
            style={{ width: '100%', height: '100%' }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            initialRegion={{
                latitude: 34.139893,
                longitude: -84.072956,
                latitudeDelta: 0.135,
                longitudeDelta: 0.06315,
            }}
        >
            <ExplorePins mapRef={mapRef} />
        </MapView>
    );
};

const mapStateToProps = (state) => {
    return {
        searchLocation: state.explore.exploreMap.searchLocation,
    };
};
export default connect(mapStateToProps, {
    onIdle,
    setSelectedListing,
})(ExploreMap);
