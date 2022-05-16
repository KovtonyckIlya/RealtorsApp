import React from 'react';
import { Alert, Dimensions } from 'react-native';
// import { AsyncStorage } from '@react-native-community/async-storage';

global.API_ADDRESS = 'https://www.toura.co/api';
// 'https://listings.tourahome.com/listing';
// global.API_ADDRESS = 'https://simpleshowing.com';
// global.API_ADDRESS = 'https://dev.simpleshowing.com';

global.smallSize = () => {
    let width = Dimensions.get('window').width;
    // console.log(width)
    return width <= 375;
};

global.getHeader = async () => {
    let token = await global.getToken();
    if (!token) {
        return {};
    }
    return {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };
};

global.handleError = (error) => {
    if (undefined != error.response && undefined !== error.response.data) {
        console.log({ errrarrraaaa: error.response.data });
    }
    console.log({ handleError: error });
    let errorTexts;
    if (error.response.status == 302) {
    } else {
        try {
            if (undefined !== error.response.data.error) {
                errorTexts = generateErrors({
                    key: [error.response.data.error],
                });
            } else {
                errorTexts = generateErrors(error.response.data.errors);
            }
        } catch (e) {
            console.log('Fatal Error', e);
        }
    }
};

global.Alert = (title, type = 'error') => {
    let heading = 'There was an error!';
    if (type !== 'error') {
        heading = '';
    }
    Alert.alert(heading, title, [{ text: 'OK' }]);
};
function generateErrors(errors) {
    let errText = [];
    console.log(errors);
    for (let key in errors) {
        let err = errors[key][0].toString();
        errText.push(err + '\n');
    }
    Alert.alert('There was an error!', errText[0], [
        { text: 'OK', onPress: () => console.log('') },
    ]);
}

global.getToken = async () => {
    try {
        let token = await AsyncStorage.getItem('token');
        if (undefined == token || null == 'token' || token.length < 10) {
            return false;
        }
        return token;
    } catch (e) {
        return false;
    }
};
global.authenticated = async () => {
    try {
        let token = await AsyncStorage.getItem('token');
        if (undefined == token || null == 'token' || token.length < 10) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
};
