import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Switch } from 'react-native-switch';
import { primaryColor, primaryLight } from '../../../constants/Colors';

const CustomComponent = () => {
    return (
        <View>
            <Text>fafaf</Text>
        </View>
    );
};
const App = (props) => {
    const [isEnabled, setIsEnabled] = useState(props.initialValue ?? false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const { onCheck } = props;
    const onValueChanged = (val) => {
        setIsEnabled(!isEnabled);
        props?.onCheck(!isEnabled);
    };
    useEffect(() => {
        setIsEnabled(props.initialValue ?? false);
    }, [props.initialValue]);
    return (
        <View style={styles.container}>
            <Switch
                value={isEnabled}
                onValueChange={onValueChanged}
                disabled={false}
                activeText={'On'}
                inActiveText={'Off'}
                circleSize={props?.size ? props.size - 6 : 33}
                // circleSize={33}
                barHeight={props?.size ? props.size : 40}
                circleBorderWidth={0}
                circleBorderColor={primaryColor}
                backgroundActive={primaryColor}
                backgroundInactive={primaryLight}
                circleActiveColor={'#fff'}
                circleInActiveColor={'#fff'}
                changeValueImmediately={true}
                // changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                innerCircleStyle={{}} // style for inner animated circle for what you (may) be rendering inside the circle
                outerCircleStyle={{}} // style for outer animated circle
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={2.2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2.2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2.1} // multipled by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={props?.size ? props.size : 30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
