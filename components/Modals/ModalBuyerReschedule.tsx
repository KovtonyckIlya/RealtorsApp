import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';
import group from '@icons/group.png';
import x from '@icons/x.png';
import HouseCard from '@components/common/HouseCard';
import OrangeButton from '@components/common/OrangeButton';
import SliderPagination from '@components/common/SliderPagination';
import { colorPrimary, textPrimary } from '@constants/Colors';
import ScrollDays from '@components/common/ScrollDate/ScrollDays';
import ScrollHours from '@components/common/ScrollDate/ScrollHour';
import Horizontal from '@components/common/Horizontal';
import Footer from '@components/common/Footer';
import Modal from 'react-native-modal';
import { DarkButtonFilled } from '@components/common/DarkButton';
import { buyerReschedule } from '@actions/showingsActions';
import moment, { Moment } from 'moment';


const { width, height } = Dimensions.get('window');

type modalTypes = {
    chooseDate: boolean;
    item: Object;
    onPressClose: Function;
};

function ModalBuyerReschedule({ chooseDate, showing, onPressClose }: modalTypes) {
    const [confirmDate, setConfirmDate] = useState<number>(NaN)
    const [startTime, setStartTime] = useState<number>(NaN);
    const [endTime, setEndTime] = useState<number>(NaN);
    const dispatch = useDispatch();

    const getDate = (time): Moment => {
        const day = moment(confirmDate).format('YYYY-MM-DD');
        const hoursTime = moment(time).format('HH:mm:ss');
        return moment(`${day} ${hoursTime}`, 'YYYY-MM-DD HH:mm:ss');
    };

    const onPress = () => {
        dispatch(
            buyerReschedule(showing._id, getDate(startTime), getDate(endTime))
        );
        onPressClose(false);
    };


    return (
        <Modal
            isVisible={!!chooseDate}
            backdropTransitionOutTiming={0}
            style={{ margin: 0 }}
        >
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.titleText}>RESCHEDULE TIME</Text>
                    <View>
                        <TouchableOpacity
                            style={styles.sliderGoBackButton}
                            onPress={() => onPressClose(false)}
                        >
                            <Image style={[styles.closeIcon]} source={x} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <ScrollDays setValueSelect={setConfirmDate} />
                    <ScrollHours maxSelects={2} setValueSelect={(arr) => {
                        console.log('select scroll hours', arr)
                        if (arr.length < 2) return

                        setEndTime(arr[0])
                        setStartTime(arr[1])
                    }} />


                    <Horizontal style={styles.horizontalLine} />
                    <HouseCard item={showing.listing} isMainPage={false} />
                </ScrollView>

                <Footer>
                    <DarkButtonFilled disabled={!startTime || !endTime || !confirmDate} onPress={onPress} title="Confirm" />
                </Footer>
            </View>
        </Modal>
    );
}

export default ModalBuyerReschedule;

export const styles = StyleSheet.create({
    textNote: { paddingLeft: 20 },
    horizontalLine: { marginVertical: 5, marginHorizontal: 20 },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        paddingTop: 30,
        alignItems: 'center',
    },
    viewNote: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 20,
        // padding: 5,
    },
    viewCountHomeAddHome: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    addHome: {
        flex: 1,
        alignItems: 'flex-end',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    textAddHome: {
        color: textPrimary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        // alignContent: 'flex-end',
    },
    container: {
        marginTop: 100,
        flex: 1,
        width: width,
        backgroundColor: 'white',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        margin: 0,
    },
    sliderGoBackButton: {
        // padding: 10,
        // right:10,
    },

    heartImg: {
        height: 40,
        width: 40,
        margin: 10,
    },
    closeIcon: {
        height: 20,
        width: 20,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    shadowImage: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        // elevation: 5,
    },
});
