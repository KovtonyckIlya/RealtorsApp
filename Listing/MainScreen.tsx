import React, { useEffect, useState, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList, Alert, Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import WithNavigation from '@app/hocs/WithNavigation';
import HouseCard from '@components/common/HouseCard';
import Loader from '@components/common/Loader';
import listingActions from '@actions/Listing';
import filterActions from '@actions/Filter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Explore from '@components/Explore';
import * as Font from 'expo-font';
import { customFonts } from '../../assets/fonts';
import map from '@icons/map.png';
import { clearError } from '../../actions/authActions';
import { setShowMap } from '../../actions/exploreActions/exploreMapActions';
import { primaryColor } from '../../constants/Colors';
import { LightButtonFilled } from '../../components/common/LightButton';



function MainScreen(props) {
    const _loadFontsAsync = async () => {
        await Font.loadAsync(customFonts);
        // this.setState({ fontsLoaded: true });
    };

    const error = useSelector((state) => state.users.error);
    const { navigation, listings, actions, loading } = props;
    console.log("listing",listings)

    const [data, setData] = useState([]);
    // console.log(actions);
    useEffect(() => {
        if (!!error) {
            Alert.alert(
                "Error",
                error,
                [
                    { text: "OK", onPress: () => dispatch(clearError()) }
                ]
            );
        }
    }, [error]);
    useEffect(() => {
        _loadFontsAsync();
        async function fetchData() {
            actions.getListings();
        }

        fetchData();
        return function cleanup() {
            setData([]);
        };
    }, []);
    const dispatch = useDispatch();
    const counter = useSelector((state) => state.counterReducer);
    const showMap = useSelector((state) => state.explore.exploreMap.showMap);
    const renderFlatListItem = useCallback(
        ({ item }) => <HouseCard item={item} isMainPage={true} />,
        []
    );
    // const flatListKeyExtractor = useCallback((item) => `${item._id}`, []);
    const flatListKeyExtractor = useCallback(
        (item, index) => `${item._id}_${index}`,
        []
    );

    const onPressMapView = () => {
        dispatch(setShowMap(!showMap))
    }

    return (
        <View style={styles.container}>
            {!loading ? (
                <>
                    {listings?.length ? (
                        <>
                            <FlatList
                                data={listings}
                                renderItem={renderFlatListItem}
                                keyExtractor={flatListKeyExtractor}
                            />

                            <LightButtonFilled style={[styles.shadow, styles.buttonDown]}
                                isLeftIcon={false}
                                onPress={onPressMapView}
                                title={showMap ? 'List View' : 'Map View'}
                                styleText={styles.textMap}
                                icon={<Image style={styles.icon} source={map} />}
                            />
                        </>
                    ) : (
                        <View >
                            <Text
                                onPress={() => {
                                    navigation.push('ListingDetailScreen', { null });
                                }}
                                style={styles.errorMessage}
                            >
                                Nothing found
                            </Text>
                        </View>
                    )}
                </>
            ) : (
                <Loader />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDown: {
        position: 'absolute',
        bottom: 10,
        borderRadius: 20,
        width: 150,
        height: 40,
        backgroundColor: '#fff',
        borderWidth: 0,
    },
    shadow: {
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    errorMessage: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 40,
    },
    textMap: {
        // fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: primaryColor,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    icon: { height: 18, width: 20, marginLeft: 10 },
});

const mapStateToProps = (state) => ({
    listings: state.listingsReducer.listings,
    loading: state.listingsReducer.loading,
});

const ActionCreators = Object.assign({}, listingActions, filterActions);
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

// export default WithNavigation(MainScreen, true, false);

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(WithNavigation(MainScreen, true));

/*
    Explore component for feed
*/
export default connect(
    mapStateToProps,
    mapDispatchToProps

)(WithNavigation(Explore, true));
//)(WithNavigation(MainScreen, true));
