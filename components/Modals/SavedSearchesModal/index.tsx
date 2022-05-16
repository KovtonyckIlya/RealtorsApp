import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
    View,
    Image,
} from 'react-native';
import { LightButtonFilled } from '../../common/LightButton';
import { useNavigation } from '@react-navigation/native';
import { setShowFilters } from '@actions/exploreActions/exploreFiltersActions';
import { cancelRed, primaryColor } from '../../../constants/Colors';
import {
    getSearches,
    applySearch,
    deleteSearch,
    updateSearch
} from '@actions/searchesActions';
import { useDispatch, useSelector } from 'react-redux';
import xIcon from '../../../assets/images/icons/x.png';
import houseIcon from '../../../assets/images/icons/house.png';
import bathIcon from '../../../assets/images/icons/bathroom.png';
import bedIcon from '../../../assets/images/icons/bed.png';
import dollarIcon from '../../../assets/images/icons/dollar.png';
import areaIcon from '../../../assets/images/icons/ruler.png';
import RangedField from './RangedField';
import NonRangedField from './NonRangedField';
// import SavedSearchesCard from '@components/common/savedSearchesCard';

const SavedSearchesModal = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    useEffect(() => {
        dispatch(getSearches());
    }, []);

    const searches = useSelector((state) => state.searchesReducer.searches);
    const [selectedId, setSelectedId] = useState(null);
    const dismiss = () => {
        props.navigation.pop();
        dispatch(setShowFilters(true));
    };

    const selectSaved = (search:any) => {
        dispatch(applySearch(search));
        navigation.navigate('Explore');
    };

    const onPressTrash = (search:any) => {
         dispatch(deleteSearch(search));
        //  dispatch(updateSearch(search.id,search.name));
        
    
    };

    const searchItems = [
        {
            min: 'propertyType',
            icon: houseIcon,
            range: false,
            name: 'propertyType',
        },
        { min: 'bathsMin', icon: bathIcon, range: false, name: 'baths' },
        { min: 'bedsMin', icon: bedIcon, range: false, name: 'beds' },
        {
            min: 'priceMin',
            max: 'priceMax',
            icon: dollarIcon,
            range: true,
            name: 'price',
        },
        {
            min: 'sqftMin',
            max: 'sqftMax',
            icon: areaIcon,
            range: true,
            name: 'area',
        },
    ];

    const Item = ({ item }) => {
        // console.log(item);  
        return (
            <View style={styles.listItemContainter}>
                <TouchableOpacity onPress={() => selectSaved(item)} style={[]}>
                    <View style={styles.valuesContainer}>
                        {searchItems.map((section, i) =>
                            item[section.min] || item[section.max] ? (
                                <View
                                    style={styles.valueItem}
                                    key={`${item.id}-${i}`}
                                >
                                    <Image
                                        source={section.icon}
                                        style={styles.listIcon}
                                        resizeMode={'stretch'}
                                    />
                                    <Text styles={styles.searchText}>
                                        {':'}
                                    </Text>

                                    {!section.range ? (
                                        <NonRangedField
                                            item={item}
                                            section={section}
                                        />
                                    ) : (
                                        <RangedField
                                            item={item}
                                            section={section}
                                        />
                                    )}
                                </View>
                            ) : null
                        )}
                    </View>
                </TouchableOpacity>

                <View styles={styles.buttonContainer}>
                    <LightButtonFilled
                        style={styles.useSearchButton}
                        title="Use Search"
                        styleText={styles.whiteText}
                        onPress={() => selectSaved(item)}
                    />

                    <LightButtonFilled
                        style={styles.deleteButton}
                        styleText={styles.whiteText}
                        title="Delete Search"
                        onPress={() => onPressTrash(item)}
                    />
                </View>
            </View>
        );
    };

    const renderItem = ({ item }) => {
        return (
            <Item
                key={item.id}
                item={item}
                onPress={() => {
                    dispatch(applySearch(item.id)), dismiss;
                }}
                backgroundColor={'#666666'}
                textColor={'#000000'}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, styles.shadow]}>
                <View style={styles.topWrapper} />
                <Text style={styles.title}>
                    Saved searches ({searches.length})
                </Text>
                <TouchableOpacity style={styles.topWrapper} onPress={dismiss}>
                    <Image source={xIcon} style={styles.close} />
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.flatList}
                data={searches.map((x) => x[Object.keys(x)[0]])}
                renderItem={renderItem}
                keyExtractor={(item) => `${item.id}`}
                extraData={selectedId}
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            height: 1,
                            width: '100%',
                            backgroundColor: '#AAA',
                            marginVertical: 20,
                        }}
                    />
                )}
            />
        </View>
    );
};

export default SavedSearchesModal;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    header: {
        height: 40,
        marginTop: 20,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topWrapper: {
        width: '10%',
        padding: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    body: {
        paddingVertical: 10,
        textAlign: 'center',
    },
    button: {
        width: '80%',
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: primaryColor,
    },
    buttonRed: {
        backgroundColor: cancelRed,
        borderColor: cancelRed,
    },
    buttonText: {
        color: 'white',
    },

    close: {
        alignSelf: 'flex-end',
        marginRight: 5,
        width: 25,
        height: 25,
    },
    shadow: {
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    flatList: {
        flex: 1,
        marginTop: 10,
    },

    listItemContainter: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    propertyType: {
        width: '100%',
        // textAlign: 'center',
        fontSize: 13,
        fontWeight: 'bold',
        color: primaryColor,
    },
    searchText: {
        flex: 1,
        fontSize: 13,
        fontWeight: 'bold',
        color: primaryColor,
        marginHorizontal: 5,
    },
    listIcon: {
        height: 20,
        width: 20,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        tintColor: 'black',
    },
    valuesContainer: {
        flex: 1,
        width: '100%',
        marginBottom: 10,
    },
    valueItem: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    Container: {
        flex: 1,
        width: 150,
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
    },
    savedSearchesButtons: {
        width: 70,
        height: 25,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    useSearchButton: {
        height: 42,
        marginBottom: 10,
        backgroundColor: primaryColor,
    },
    deleteButton: {
        height: 42,
        padding: 10,
        backgroundColor: cancelRed,
        borderColor: cancelRed,
    },
    whiteText: {
        color: 'white',
    },
    buttonContainer: {},
});
