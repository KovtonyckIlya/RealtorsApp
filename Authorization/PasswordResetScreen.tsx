import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    ScrollView,
    Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { InputCustom } from '../../components/common/Authorization/InputCustom';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LightButtonFilled } from '../../components/common/LightButton';
import { primaryColor } from '../../constants/Colors';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthParamList } from '../../../types';
import { clearMessage, forgotPassword } from '../../actions/authActions';
import * as yup from 'yup';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';

const INITIAL_VALUES = {
    email: '',
};
type Props = StackScreenProps<AuthParamList, 'PasswordReset'>;

export default function PasswordResetScreen({ navigation }: Props) {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const navigate = () => {
        navigation.goBack();
    };
    const message = useSelector((state) => state.users.message);

    useEffect(() => {
        if (!!message) {
            Alert.alert('', message, [
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(clearMessage());
                        navigate();
                    },
                },
            ]);
        }
    }, [message]);

    const validation = useMemo(
        () =>
            yup.object().shape({
                email: yup
                    .string()
                    .required('Email is Required')
                    .email('Invalid email')
                    .label('Labels.Email'),
            }),
        []
    );

    const OnPressSendNewPassword = (value) => {
        dispatch(forgotPassword({ email: value.email }));
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                enabled
                style={[
                    styles.background,
                    { paddingTop: Math.max(insets.top, 30) },
                ]}
            >
                <ScrollView style={{ flex: 1 }}>
                    <Text style={styles.title}>Password Reset</Text>
                    <Text style={styles.subTitle}>
                        Send us the e-mail you signed up with, and we'll send
                        you a link to reset your password
                    </Text>

                    <Formik
                        initialValues={INITIAL_VALUES}
                        validationSchema={validation}
                        validateOnBlur={true}
                        onSubmit={OnPressSendNewPassword}
                    >
                        {({ handleChange, handleSubmit, values, errors }) => (
                            <View>
                                <InputCustom
                                    placeholder="Email Address (Required)"
                                    value={values.email}
                                    setValue={handleChange('email')}
                                    type="emailAddress"
                                    errorMessage={errors.email}
                                />

                                <LightButtonFilled
                                    disabled={!isEmpty(errors)}
                                    styleText={[
                                        !isEmpty(errors)
                                            ? styles.testStyleDisabled
                                            : styles.testStyle,
                                    ]}
                                    style={[
                                        styles.button,
                                        !isEmpty(errors)
                                            ? styles.buttonDisable
                                            : styles.button,
                                    ]}
                                    title="SEND"
                                    onPress={handleSubmit}
                                />
                            </View>
                        )}
                    </Formik>

                    <Text style={styles.linkText} onPress={navigate}>
                        Actually, I remember my password after all
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: primaryColor,
        borderWidth: 0,
    },
    buttonDisable: {
        backgroundColor: '#EAEAEA',
    },
    buttonActive: {
        backgroundColor: primaryColor,
    },
    testStyle: { color: '#fff' },
    testStyleDisabled: { color: '#AAAAAA' },
    linkText: {
        flex: 1,
        marginTop: 30,
        color: primaryColor,
        fontSize: 14,
        lineHeight: 28,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#050404',
    },
    background: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 20,
        color: '#4A4A4A',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subTitle: {
        marginVertical: 15,
        fontSize: 16,
        color: '#4A4A4A',
        // textAlign: 'center',
    },
    text: {
        marginVertical: 15,
        fontSize: 14,
        color: '#4A4A4A',
        textAlign: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
