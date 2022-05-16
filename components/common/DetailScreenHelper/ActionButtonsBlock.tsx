import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import ReadMore from '@fawazahmed/react-native-read-more';

interface Props {
    onPressFavorite: any;
    onPressGetMoreInfo: any;
    onPressShare: Promise<void>;
    isFavorite: bool;
}

export const ActionButtonsBlock = ({
    onPressTour,
    onPressShare,
    onPressFavorite,
    isFavorite
}: Props) => {
    return (
      <View style={[styles.sectionContainer, styles.buttonsContainer]}>
        <TouchableOpacity onPress={onPressFavorite} style={styles.buttonEmpty}>
          <Text style={styles.buttonEmptyText}>{isFavorite ? 'Favorite' : 'Unfavorite'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressShare} style={styles.buttonFilled}>
          <Text style={styles.buttonFilledText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTour} style={styles.buttonFilled}>
          <Text style={styles.buttonFilledText}>Book Tour</Text>
        </TouchableOpacity>
      </View>
    );
};

export const styles = StyleSheet.create({
  sectionContainer: {
    position: 'relative'
  },
  buttonsContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonFilled: {
    minWidth: 100,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#39bea3',
    borderWidth: 1,
    borderColor: '#39bea3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonEmpty: {
    minWidth: 100,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#39bea3',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonEmptyText: {
   fontFamily: 'CircularStd-Bold',
   fontSize: 16,
   color: '#39bea3',
  },
   buttonFilledText: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 16,
    color: '#fff',
  },
});
