import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '@components/common/Loader';
import LeadsCard from '../../components/common/LeadsCard';
import { getLeads } from '@actions/leadsActions'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { LightButtonFilled } from '../../components/common/LightButton';

const LeadsScreen = (props) => {
    const [page, setPage] = useState(1)
    const [isRefreshing, setIsRefreshing] = useState(false)
    useEffect(() => {
        props.getLeads(page)
    }, [page])

    const leads = useSelector((state) => state.leads.leads);
    const insets = useSafeAreaInsets();
    const { loading } = props;

    const renderFlatListItem = useCallback(({ item }) => {
        return <LeadsCard item={item.itemLeads} />;
    }, []);
    const flatListKeyExtractor = useCallback(
        (item, index) => `${item.itemLeads.id}_${index}`,
        []
    );
    const array = Object.keys(leads).map((item) => {
        return { itemLeads: leads[item] };
    });

    const onRefresh = async () => {
        setIsRefreshing(true);
        await props.getLeads(1);
        setIsRefreshing(false);
    };

    return (
        <View
            style={[styles.container, { paddingTop: Math.max(insets.top, 30) }]}
        >
            {/* <LightButtonFilled onPress={() => { props.getLeads(1) }} title="reload" /> */}
            <Text style={styles.title}>Your Leads ({array.length})</Text>
            {!loading ? (
                array.length ? (
                    <FlatList
                        onRefresh={onRefresh}
                        refreshing={isRefreshing}
                        data={array}
                        renderItem={renderFlatListItem}
                        keyExtractor={flatListKeyExtractor}
                    />
                ) : (
                    <Text style={styles.title}>No Leads</Text>
                )
            ) : (
                <Loader />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        marginVertical: 10,
        color: '#4A4A4A',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default connect(null, {
    getLeads
})(LeadsScreen)