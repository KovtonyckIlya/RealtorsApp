import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import HeaderSearch from '@components/common/HeaderSearch';
import { useState } from 'react';
import GooglePlace from '@components/common/GooglePlace';
import BottomModal from '@components/common/BottomModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux'

export default function withNavigation(
    WrappedComponent,
    headerShown = false,
    footerShown = false
) {
    return function Navigation(props) {
        const insets = useSafeAreaInsets();

        const [tabBarVisible, setTabBarVisible] = useState(true);
        const { navigation } = props;
        const toggleNavigation = (hide = true) => {
            navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: !hide,
            });
            setTabBarVisible(!hide);
        };

        const onPressFilter = () => {
            console.log('onPressFilter')
        }
        // const [ data , setData ] = React.useState([]);
        // const [ initialData , setInitialData ] = React.useState([]);
        //
        // React.useEffect(() => {
        //
        //   const category_id = ( props.route.params && props.route.params.category.id ) || 1;
        //   if ( isClub ) {
        //     const title = ( props.route.params && props.route.params.category.title ) || 'Сквошь';
        //     props.navigation.setOptions({ headerTitle: title , headerBackTitle: 'Спорт' })
        //   }
        //   async function fetchDataAsync() {
        //     const result = await fetchData( category_id );
        //     if ( isClub ) {
        //       setData( result.clubs );
        //       setInitialData( result.clubs );
        //     } else {
        //       setData( result );
        //       setInitialData( result );
        //     }
        //   }
        //   fetchDataAsync();
        // }, []);

        // const filter = ( string ) => {
        //   let filtered = initialData.filter( val => val.title.toLowerCase().includes( string ) );
        //   if ( filtered.length ) setData( filtered );
        //   else setData( initialData );
        // }

        return (
            <>
                <View
                    style={{
                        flex: 1,
                        paddingTop: Math.max(insets.top, 30),
                        backgroundColor: '#fff',
                    }}
                >
                    <StatusBar
                        animated={true}
                        backgroundColor="#61dafb"
                        barStyle="dark-content"
                    // hidden={true}
                    />
                    <GooglePlace onPressFilter={onPressFilter} tabBarVisible={tabBarVisible} />
                    {headerShown && (
                        <HeaderSearch toggleNavigation={toggleNavigation} />
                    )}
                    <WrappedComponent {...props} />
                    <BottomModal />
                </View>
            </>
        );
    };
}
