import React, { useState, useEffect } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import heart from '@icons/heart.png';
import heart_active from '@icons/heart_active.png';
import {
    setFavoriteById,
    setUnFavoriteById,
    getFavoriteListings,
    getFavoriteListingIds
} from '@actions/favoritesActions';
import { getPostAmp } from "../../actions/blogAction"
import { getLocation } from "../../actions/exploreActions/exploreLocationsActions"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { getProfile } from "../../actions/usersActions"
import { get } from 'lodash';


const HeartButton = (props: any) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.users.user);
    const favorites = useSelector((state: any) => state.favoritesReducer.favorites);
    const favoriteIds = useSelector((state: any) => state.favoritesReducer.favoritesID);
    const navigation = useNavigation()
    const { listing } = props
    const [isFavorite, setFavorite] = useState(false)

    const currentPropertyId = listing._id
    // const exep =
    useEffect(() => {
        if (user) {
            // const isFavorite = favoriteIds.some((id) => id === currentPropertyId)
            // console.log("isFavorite",isFavorite)
            // console.log("FAVORITE", favoriteIds)
            if (favoriteIds && favoriteIds.includes) {
              setFavorite(favoriteIds.includes(currentPropertyId))
            }
            // favoriteIds.forEach(element => setFavorite(element.listing === CurrentPropertyId));
        }

    }, [listing, favoriteIds])


    const onPressHeart = async (listing: any) => {
        if (!user || !user._id) {
            await navigation.navigate('LoginModal', { subtitle: 'You must be logged in to have add favorites' })
        }
        if (user && user._id) {
            setFavorite(true)
            await dispatch(setFavoriteById({ item: listing }));
            setTimeout(async () => {
                await dispatch(getFavoriteListings())
                await dispatch(getFavoriteListingIds())
            }, 2000)

        }

    }

    return <TouchableOpacity onPress={() => onPressHeart(listing)}>
        <Image
            source={
                isFavorite
                    ? heart_active
                    : heart
            }
            style={props.style}
        />
    </TouchableOpacity>
}

const mapStateToProps = (state: any) => (
    {
        favorites: state.favoritesReducer.favorites
    }
)
export default connect(mapStateToProps)(HeartButton)
