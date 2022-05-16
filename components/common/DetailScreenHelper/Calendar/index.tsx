import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import styles from './styles';
import moment from 'moment';
import ScrollDays from '../../ScrollDate/ScrollDays';
import ScrollHours from '../../ScrollDate/ScrollHour';

import navLeft from '@icons/chevron_icon.png';
import navRight from '@icons/chevron_right.png';

type props = {
  setSelectedDayIndex: Function
}

export default function Calendar ({ setSelectedDayIndex }: props) {
  const [value, setValue] = useState<number>(NaN);
  return (
    <View style={styles.container}>
      <Text style={styles.calendarTitle}>Go Tour This Home</Text>
      <View style={styles.content}>
        <ScrollDays
          withNavButtons
          itemHeight={75}
          containerStyle={{
            paddingLeft: 0
          }}
          renderDay={(item, index, selectedIndex, selectItem) => {
          return (
            <TouchableOpacity onPress={() => {
              selectItem({ item, index })
              setSelectedDayIndex(index)
            }} key={`day-${index}`} style={[
              styles.day,
              selectedIndex === index && styles.activeDay
            ]}>
              <Text style={[styles.weekday, selectedIndex === index && styles.activeDayText]}>{moment(item).format('dddd').toUpperCase()}</Text>
              <Text style={[styles.dayNumber, selectedIndex === index && styles.activeDayText]}>{ moment(item).format('DD')}</Text>
              <Text style={[styles.month, selectedIndex === index && styles.activeDayText]}>{ moment(item).format('MMM')}</Text>
            </TouchableOpacity>
          )
        }}
        dayStyle={styles.day}
        setValueSelect={setValue}
        />
      {
        /*
        <TouchableOpacity style={styles.day}>
          <Text style={styles.weekday}>TUESDAY</Text>
          <Text style={styles.dayNumber}>9</Text>
          <Text style={styles.month}>NOV</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.day}>
          <Text style={styles.weekday}>WEDNESDAY</Text>
          <Text style={styles.dayNumber}>10</Text>
          <Text style={styles.month}>NOV</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.day}>
          <Text style={styles.weekday}>THURSDAY</Text>
          <Text style={styles.dayNumber}>11</Text>
          <Text style={styles.month}>NOV</Text>
        </TouchableOpacity>*/
      }

      </View>
      <Text style={styles.calendarFootnote}>It’s free, with no obligation - cancel anytime</Text>
    </View>
  )
}
