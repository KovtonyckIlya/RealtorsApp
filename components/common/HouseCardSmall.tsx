import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import heart from '@icons/heart.png';
import ellipse from '@icons/ellipse.png';
import LightButton from '@components/common/LightButton';
import { textPrimary, textDark } from '@constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import OrangeButton from '@components/common/OrangeButton';
const gradientColors = [
    'transparent',
    'transparent',
    'transparent',
    'transparent',
    'rgba(0,0,0,0.1)',
    'rgba(0,0,0,0.2)',
    'rgba(0,0,0,0.6)',
    'rgba(0,0,0,0.8)',
    '#000',
    '#000',
];
const width = Dimensions.get('window').width;
const widthCard = width * 0.75;

export const HouseCardSmall = (props) => {
    const [index, setIndex] = useState(0);
    const item = props.item;
    const isMainPage = props.isMainPage;
    const title = item?.UnparsedAddress;
   
    const photos = item?.Media;
    const price = Number((item?.ListPrice)).toFixed(1).toLocaleString();
    const bedRooms = item?.BedroomsTotal;
    const bathRooms = item?.BathroomsTotalDecimal;
    const area = item?.LivingArea;

    const navigation = useNavigation();
    const navigate = () => {
        navigation.navigate('ListingDetailScreen', { item });
    };

    return (
        <>
            {photos?.length ? (
                <View style={[styles.mainWrapper, styles.shadow]}>
                    <View>
                        <View style={styles.topWrapper}>
                            <OrangeButton
                                title="Featured"
                                fontSize={{ fontSize: 11 }}
                                width={{ width: 90 }}
                            />
                            <View style={styles.heartWrapper}>
                                <TouchableOpacity>
                                    <Image
                                        style={styles.heartImg}
                                        source={heart}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.sliderWrapper}>
                            <TouchableOpacity onPress={navigate}>
                                <Image
                                    source={{ uri: photos[0].url }}
                                    style={styles.sliderImage}
                                />
                                <LinearGradient
                                    pointerEvents="none"
                                    colors={gradientColors}
                                    style={styles.gradient}
                                />
                            </TouchableOpacity>
                        </View>
                        <View pointerEvents="none" style={styles.bottomWrapper}>
                            <View>
                                <View>
                                    <Text style={styles.bottomHeading}>
                                        {title}
                                    </Text>
                                </View>
                                <View style={styles.bottomDetailsWrapper}>
                                    <View
                                        style={styles.bottomDetailsTextWrapper}
                                    >
                                        <Text style={styles.bottomDetailsText}>
                                            {bedRooms}bd
                                        </Text>
                                        <Image source={ellipse} />
                                    </View>
                                    <View
                                        style={styles.bottomDetailsTextWrapper}
                                    >
                                        <Text style={styles.bottomDetailsText}>
                                            {bathRooms} ba
                                        </Text>
                                        <Image source={ellipse} />
                                    </View>
                                    <View
                                        style={styles.bottomDetailsTextWrapper}
                                    >
                                        <Text style={styles.bottomDetailsText}>
                                            {area} Sq ft
                                        </Text>
                                        <Image source={ellipse} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <BottomOuterDetails
                        price={`$${price}`}
                        isMainPage={isMainPage}
                        item={item}
                    />
                </View>
            ) : null}
        </>
    );
};
const BottomOuterDetails = React.memo(function BottomOuterDetails(props) {
    const { price, item } = props;
    const navigation = useNavigation();
    const navigate = () => {
        navigation.push('ListingDetailScreen', { item });
    };

    return (
        <View
            style={[bottomOuterStyle.wrapper, bottomOuterStyle.wrapperMainPage]}
        >
            <View style={bottomOuterStyle.priceWrapper}>
                <Text style={bottomOuterStyle.priceText}>{price}</Text>
            </View>
            <View style={bottomOuterStyle.rightWrapper}>
                <LightButton
                    onPress={navigate}
                    style={{ backgroundColor: '#fff' }}
                    styleText={{ fontSize: 14 }}
                    title="Book Showing"
                />
            </View>
        </View>
    );
});

// export React.memo(HouseCardSmall);
const bottomOuterStyle = StyleSheet.create({
    wrapper: {
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        paddingVertical: 10,
    },
    wrapperMainPage: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    priceWrapper: {
        flex: 1,
        marginRight: 10,
    },
    rightWrapper: {
        flex: 1,
        marginLeft: 10,
    },
    priceText: {
        fontSize: 18,
        fontFamily: 'CircularStd-Medium',
        color: textDark,
        fontWeight: 'bold',
    },
});

const styles = StyleSheet.create({
    mainWrapper: {
        width: widthCard,
        marginRight: 15,
        marginVertical: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    shadow: {
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    cardImage: {
        height: 240,
        resizeMode: 'cover',
        width: '100%',
        borderRadius: 10,
    },
    sliderWrapper: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    gradient: {
        height: (widthCard * 0.55) / 1.4,
        opacity: 0.9,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    sliderImage: {
        height: widthCard * 0.55,
        width: widthCard,
        borderRadius: 15,
        resizeMode: 'cover',
    },
    topWrapper: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30,
        paddingHorizontal: 15,
        top: 10,
        zIndex: 20,
    },
    heartWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    heartImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    bottomWrapper: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        bottom: 10,
        zIndex: 20,
    },
    bottomHeading: {
        fontSize: 13,
        fontFamily: 'Montserrat-Regular',
        lineHeight: 16,
        color: '#fff',
    },
    bottomDetailsWrapper: {
        flexDirection: 'row',
    },
    bottomDetailsTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 2,
        paddingVertical: 3,
    },
    bottomDetailsText: {
        color: '#fff',
        fontSize: 13,
        fontFamily: 'Montserrat-Regular',
        lineHeight: 16,
        marginRight: 2,
    },
});
