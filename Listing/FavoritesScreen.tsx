import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '@components/common/Loader';
import FavoritesCard from '@components/common/FavoritesCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFavoriteListings } from '@actions/favoritesActions';

export const FavoritesScreen = (props) => {
    const favorites = useSelector((state) => state.favoritesReducer.favorites);
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const { loading } = props;


    useEffect(() => {
         dispatch(getFavoriteListings())
        console.log("favoritesScrenn",favorites)
    }, [])
    const renderFlatListItem = useCallback(({ item }) => {
        return <FavoritesCard item={item.itemFavorites} />;
    }, []);
    const flatListKeyExtractor = useCallback(
        (item, index) => `${item.itemFavorites.addressId}_${index}`,
        []
    );
    const array = Object.keys(favorites).map((item) => {
        
        return { itemFavorites: favorites[item] };
    });
    return (
        <View
            style={[styles.container, { paddingTop: Math.max(insets.top, 30) }]}
        >
            {!loading ? (
                array.length ? (
                    <FlatList
                        data={array}
                        renderItem={renderFlatListItem}
                        keyExtractor={flatListKeyExtractor}
                    />
                ) : (
                    <Text style={styles.title}>There is nothing</Text>
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
