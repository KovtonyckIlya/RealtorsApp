import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, View, Share } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ModalChooseDate from '../ModalChooseDate';
import * as Font from 'expo-font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHouseInfo } from '../../actions/listingsActions';
import { setFavoriteById, setUnFavoriteById,getFavoriteListings,getFavoriteListingIds } from '../../actions/favoritesActions';
import { customFonts } from '../../assets/fonts';
import { IconsBlock } from '../../components/common/DetailScreenHelper/IconsBlock';
import { HeaderButtons } from '../../components/common/DetailScreenHelper/HeaderButtons';
import { SliderWithIcons } from '../../components/common/DetailScreenHelper/SliderWithIcons';
import { AddressPriceBlock } from '../../components/common/DetailScreenHelper/AddressPriceBlock';
import { DescriptionBlock } from '../../components/common/DetailScreenHelper/DescriptionBlock';
import { InteriorFeatures } from '../../components/common/DetailScreenHelper/InteriorFeatures';
import { ActionButtonsBlock } from '../../components/common/DetailScreenHelper/ActionButtonsBlock';
import Horizontal from '../../components/common/Horizontal';
import { PropertyDetails } from '../../components/common/DetailScreenHelper/PropertyDetails';
import { Schools } from '../../components/common/DetailScreenHelper/Schools';
import { SimilarListings } from '../../components/common/DetailScreenHelper/SimilarListings';
import { MapShowPin } from '../../components/common/MapShowPin';
import { BookingButton } from '../../components/common/DetailScreenHelper/BookingButton';
import { InfoForm } from '../../components/common/DetailScreenHelper/InfoForm';
import Calendar from '../../components/common/DetailScreenHelper/Calendar';
import { useNavigation } from '@react-navigation/native';
import {omit} from 'lodash'

function Main(props) {
    const [selectedDayIndex, setSelectedDayIndex] = useState(null);
    const navigation = useNavigation();
    const [isChecked,setChecked] = useState(true)
    const listing = useSelector(
        (state) => state.listingsReducer.detailsHome
    );
    const isLoadingDetails = useSelector(
        (state) => state.listingsReducer.isLoadingDetails
    );
    const user = useSelector((state) => state.users.user);
    const favorites = useSelector((state) => state.favoritesReducer.favorites);
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const _loadFontsAsync = async () => {
        await Font.loadAsync(customFonts);
        // this.setState({ fontsLoaded: true });
    };
    const { goBack } = props.navigation;
    const favoritesId  = useSelector((state:any) => state.favoritesReducer.favoritesID);
    const { item } = props.route.params;
    const [index, setIndex] = useState(0);
    const [chooseDate, setChooseDate] = useState(false);
    const [isShowGetMoreInfo, setIsShowGetMoreInfo] = useState(false);
    const re = /\s*(?:,|$)\s*/;
    const addressArray = item?.UnparsedAddress && item?.UnparsedAddress?.split(re);
    // const CurrentPropertyId = listing._id
    // useEffect(() => {
    //     if(user){
    //         [...favoritesId].forEach(element => element.listing === CurrentPropertyId ? setChecked(true) : setChecked(false));
    //     }
    // },[listing,favoritesId])

    const onPressFavorite = async (listing:any) => {
        setChecked(true)
        console.log("listing",listing)
      if (!user || !user._id) {
          return props.navigation.navigate('LoginModal', { subtitle: 'You must be logged in to favorite a listing' })
      
      }
      if (favorites && !favorites?.[listing.addressId]) {
       
          await dispatch(setFavoriteById({ item: listing }));
          setTimeout(async() => {
            await dispatch(getFavoriteListings())
            await dispatch(getFavoriteListingIds())
          },2000)
      } else {
          await dispatch(setUnFavoriteById({ item: listing }));
          setTimeout(async() => {
            await dispatch(getFavoriteListings())
          },5000)
         
      }
    }

    const onPressShare = async () => {
        try {
            const result = await Share.share({
                // https://listings.tourahome.com/listing/
                message: `${global.API_ADDRESS}/${item.addressId}`,
                url: `${global.API_ADDRESS}/${item.addressId}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };  
    useEffect(() => {
        dispatch(getHouseInfo({ addressId: item._id }));
        
        _loadFontsAsync();
    }, []);

    const onPressTour = () => {
      if (!user || !user._id) {
          return navigation.navigate('LoginModal', {
              subtitle: 'You must be logged in to book showings'
          })
      }
      setChooseDate(true);
    }

    const isFavorite = favorites && !favorites?.[listing?.addressId];
    return (
        <>
            <KeyboardAwareScrollView
                bounces={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                style={{
                  paddingBottom: Math.max(insets.bottom, 30),
                  backgroundColor: '#fff',
                }}
            >

                <View>
                    <HeaderButtons listing={listing} onPressLeft={goBack} onPressRight={goBack} />

                    <SliderWithIcons
                        item={
                            !isLoadingDetails && !!listing
                                ? listing
                                : // : null
                                item
                        }
                        isLoading={isLoadingDetails}
                    />
                </View>
                <View style={{ paddingHorizontal: 28 }}>
                    {!!item && (
                        <>
                            <AddressPriceBlock listPrice={item?.ListPrice} daysOnMarket={item?.DaysOnMarket} addressArray={addressArray} />
                            <ActionButtonsBlock
                                isFavorite={isFavorite}
                                onPressTour={onPressTour}
                                onPressShare={onPressShare}
                                onPressFavorite={() => onPressFavorite(listing)}
                            />
                            <IconsBlock
                                bedroomsTotal={item?.BedroomsTotal}
                                bathroomsTotalDecimal={
                                    item?.BathroomsTotalDecimal
                                }
                                livingArea={item?.LivingArea}
                            />
                        </>
                    )}
                    {!isLoadingDetails && !!listing && (
                        <>
                            <DescriptionBlock text={listing?.PublicRemarks} />
                            <PropertyDetails details={listing} />
                            <MapShowPin
                              useGreen
                              latitude={listing?.lat}
                              longitude={listing?.lng}
                            />
                            <InteriorFeatures items={listing?.InteriorFeatures}/>
                            <Schools
                                elementarySchool={listing.ElementarySchool}
                                highSchool={listing.HighSchool}
                                middleOrJuniorSchool={
                                    listing.MiddleOrJuniorSchool
                                }
                            />
                            <Calendar setSelectedDayIndex={setSelectedDayIndex} />
                            <BookingButton setChooseDate={setChooseDate} />
                            <InfoForm address={listing.address} />
                        </>
                    )}
                </View>
                {/* <SimilarListings onPressFavorite={onPressFavorite} favorites={favorites} /> */}
            </KeyboardAwareScrollView>
            <ModalChooseDate
                chooseDate={chooseDate}
                listing={item}
                defaultSelectedDayIndex={selectedDayIndex}
                onPressClose={setChooseDate}
            />
        </>
    );
}

export default Main;

export const styles = StyleSheet.create({
    horizontalLine: {
        marginVertical: 5,
        backgroundColor: '#ECF1F1',
    },
    mapView: {
        height: 300,
        flex: 1,
        marginBottom: 30,
        borderRadius: 10,
        overflow: 'hidden',
    },
});
