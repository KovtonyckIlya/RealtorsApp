import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    sliderTopWrapper: {
        position: 'absolute',
        top: 0,
        paddingTop: 10,
        width: '100%',
        zIndex: 5000,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    sliderGoBackButton: {
        padding: 10,
    },
    sliderGoBackImg: {
        height: 30,
        width: 30,
    },
    sliderBottomWrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingBottom: 20,
    },
    sliderBottomIconsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sliderBottomIcon: {
        resizeMode: 'contain',
        height: 25,
        width: 30,
        marginLeft: 10,
    },
});

export const mainInfoStyles = StyleSheet.create({
    wrapperFirstSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginTop: 20,
    },
    title: {
        // fontFamily: 'Circular Std Font',
        // fontFamily: 'Circular-Std-Font',
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
    },
    subTitle: {
        color: '#0A3444',
        fontSize: 15,
    },
});
