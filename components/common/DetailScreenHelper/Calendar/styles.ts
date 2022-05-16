import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    // height: 205,
    width: '100%',
    backgroundColor: '#e5f3f0',
    borderRadius: 5,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navLeft: {
    position: 'absolute',
    left: -3
  },
  navRight: {
    position: 'absolute',
    right: -3
  },
  navLeftImg: {
    resizeMode: 'contain',
    height: 25,
    width: 25
  },
  navRightImg: {
    resizeMode: 'contain',
    height: 25,
    width: 25
  },
  calendarTitle: {
    color: '#00283b',
    fontSize: 20,
    fontFamily: "CircularStd-Bold",
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    top: 20
  },
  calendarFootnote: {
    color: '#62666f',
    fontSize: 14,
    fontFamily: "CircularStd-Book",
    position: 'absolute',
    bottom: 30,
    width: '100%',
    textAlign: 'center'
  },
  content: {
    height: 205,
    width: w - 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  day: {
    height: (w - 130) / 3,
    backgroundColor: '#fff',
    width: (w - 130) / 3,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#e3edec'
  },
  activeDay: {
    borderColor: '#39bea3',
    backgroundColor: '#39bea3'
  },
  activeDayText: {
    color: '#fff'
  },
  weekday: {
    color: '#62666f',
    fontFamily: "CircularStd-Bold",
    fontSize: 12
  },
  dayNumber: {
    fontSize: 30,
    color: '#00283b',
    fontFamily: "CircularStd-Bold",
  },
  month: {
    color: '#62666f',
    fontFamily: "CircularStd-Bold",
    fontSize: 12
  }
})
