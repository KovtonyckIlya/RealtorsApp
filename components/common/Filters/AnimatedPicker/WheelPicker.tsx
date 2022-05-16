import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, PixelRatio, NativeScrollEvent, Vibration } from 'react-native';
import Animated, { event } from 'react-native-reanimated';
import { positionPicker, arrayObjectsStringString } from '../constants';

interface Props {
    initialValue: number;
    position: positionPicker;
    getItem: (label: string) => void;
    data: arrayObjectsStringString;
    minPrice?: number | string;
}

const ITEM_HEIGHT = PixelRatio.roundToNearestPixel(25);
const WheelPickerM = ({
    initialValue,
    getItem,
    position,
    data,
    minPrice,
}: Props) => {
    const offsetY = new Animated.Value(0);
    const [value, setValue] = useState({ value: 0 });
    const refScroll = useRef();
    const _onScroll = event(
        [
            {
                nativeEvent: {
                    contentOffset: {
                        y: offsetY,
                    },
                },
            },
        ],
        { useNativeDriver: true }
    );

    useEffect(() => {
        setTimeout(() => {
          if (!!initialValue) {
              const item = data.findIndex((item) => {
                  // console.log('item.value', item.value);
                  return item.value === (initialValue / 1000).toString();
              });
              refScroll.current.scrollTo({ y: (item + 1) * ITEM_HEIGHT });
          } else {
              refScroll.current.scrollTo({ y: 0 });
          }
        }, (200));

    }, [initialValue]);

    useEffect(() => {
        if (
            position !== 'left' &&
            !!minPrice.value &&
            value.label !== 'no max'
        ) {
            const item = data.findIndex(
                (item) => item.value === minPrice.value
            );
            if (value?.value !== 0 && value?.value < minPrice.value) {
                refScroll.current.scrollTo({ y: (item + 1) * ITEM_HEIGHT });
                setValue(minPrice);
            }
        }
    }, [minPrice]);
    const renderArray: arrayObjectsStringString = [
        { label: '', value: '' },
        { label: '', value: '' },
        { label: '', value: '' },
        { label: position === 'left' ? 'no min' : 'no max', value: '' },
        ...data,
        { label: '', value: '' },
        { label: '', value: '' },
        { label: '', value: '' },
    ];

    const setValueGetItem = (item) => {
        getItem(item);
        setValue(item);
    };

    const scrollEnd = (e: NativeScrollEvent) => {
        const index =
            Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT) - 1;
        if (index > -1) {
            setValueGetItem(data[index]);
            if (position !== 'left' && minPrice.value) {
                const item = data.findIndex(
                    (item) => item.value === minPrice.value
                );
                if (!!item && data[index].value < minPrice.value) {
                    refScroll.current.scrollTo({ y: (item + 1) * ITEM_HEIGHT });
                }
            }
        } else {
            setValueGetItem({
                label: position === 'left' ? 'no min' : 'no max',
                value: '',
            });
        }
    };

    return (
        <Animated.ScrollView
            ref={(view) => (refScroll.current = view)}
            nestedScrollEnabled={true}
            contentContainerStyle={{
                flexGrow: 1,
            }}
            style={[
                position === 'left' ? styles.leftPadding : styles.rightPadding,
                {
                    margin: 5,
                    height: ITEM_HEIGHT * 7,
                },
            ]}
            pagingEnabled={true}
            onScroll={_onScroll}
            onMomentumScrollEnd={scrollEnd}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate={0.95}
        >
            {renderArray.map((item, index) => {
                const inputRangeOpacity = [
                    (index - 6) * ITEM_HEIGHT,
                    (index - 4) * ITEM_HEIGHT,
                    (index - 3) * ITEM_HEIGHT,
                    (index - 2) * ITEM_HEIGHT,
                    index * ITEM_HEIGHT,
                ];
                // const outputRangeOpacity = [0.5, 1, 0.5];
                const outputRangeOpacity = [0.3, 0.5, 1, 0.5, 0.3];
                // const outputRangeOpacity = [0.3, 0.4, 0.5, 1, 0.5, 0.4, 0.3];
                const opacity = useMemo(
                    () =>
                        offsetY.interpolate({
                            inputRange: inputRangeOpacity,
                            outputRange: outputRangeOpacity,
                        }),
                    []
                );
                const inputRangeScale = [
                    // (index - 6) * ITEM_HEIGHT,
                    (index - 5) * ITEM_HEIGHT,
                    (index - 4) * ITEM_HEIGHT,
                    (index - 3) * ITEM_HEIGHT,
                    (index - 2) * ITEM_HEIGHT,
                    (index - 1) * ITEM_HEIGHT,
                    // index * ITEM_HEIGHT,
                ];
                // const scaleRange = [0.88, 1, 0.88];
                const scaleRange = [0.7, 0.88, 1, 0.88, 0.7];
                // const scaleRange = [0.5, 0.65, 0.88, 1, 0.88, 0.65, 0.5];
                const scale = useMemo(
                    () =>
                        offsetY.interpolate({
                            inputRange: inputRangeScale,
                            outputRange: scaleRange,
                        }),
                    []
                );
                const inputRangeTranslateY = [
                    (index - 6) * ITEM_HEIGHT,
                    (index - 5) * ITEM_HEIGHT,
                    // (index - 4) * ITEM_HEIGHT,
                    (index - 3) * ITEM_HEIGHT,
                    // (index - 2) * ITEM_HEIGHT,
                    (index - 1) * ITEM_HEIGHT,
                    index * ITEM_HEIGHT,
                ];
                const translateYRange = [-11, -4, 0, 4, 11];
                // const translateYRange = [-11, -4, -1, 0, 1, 4, 11];
                const translateY = useMemo(
                    () =>
                        offsetY.interpolate({
                            inputRange: inputRangeTranslateY,
                            outputRange: translateYRange,
                        }),
                    []
                );
                return (
                    <Animated.View
                        key={index}
                        style={{
                            transform: [{ translateY }],
                        }}
                    >
                        <Animated.Text
                            key={`${index}-${item.label}`}
                            style={{
                                height: ITEM_HEIGHT,
                                fontSize: ITEM_HEIGHT - 4,
                                lineHeight: ITEM_HEIGHT,
                                letterSpacing: 0.7,
                                fontWeight: '500',
                                opacity: opacity,
                                transform: [{ scale }],
                                width: 150,
                                alignSelf:
                                    position === 'left'
                                        ? 'flex-start'
                                        : 'flex-end',
                                textAlign: position,
                            }}
                        >
                            {item.label}
                        </Animated.Text>
                    </Animated.View>
                );
            })}
        </Animated.ScrollView>
    );
};

// export default WheelPickerM;
export default React.memo(WheelPickerM);
const styles = StyleSheet.create({
    leftPadding: {
        paddingLeft: 50,
    },
    rightPadding: {
        paddingRight: 50,
    },
});
