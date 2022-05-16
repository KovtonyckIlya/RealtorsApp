import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Modal } from 'react-native';
import { View } from 'react-native';
import { primaryColor } from '../../constants/Colors';
import { dismissError } from '../../actions/errorActions';
import { connect } from 'react-redux';
import { LightButtonFilled } from './LightButton';

const ModalError = (props) => {
    if (!props.show) return null;

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text>{props.message}</Text>
            <LightButtonFilled
                onPress={() => {
                    console.log('dismiss');
                    props.dismissError();
                    props.navigation.pop();
                }}
                title="Dismiss"
            />
            <Modal
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{props.message}</Text>
                        <LightButtonFilled
                            onPress={() => props.dismissError()}
                            title="Dismiss"
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '80%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
const mapStateToProps = (state) => ({
    show: state.error.show,
    message: state.error.message,
});

export default connect(mapStateToProps, { dismissError })(ModalError);
