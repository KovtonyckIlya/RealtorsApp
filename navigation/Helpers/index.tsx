import * as React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'None';
    if (routeName === 'ListingDetailScreen') {
        return false;
    }

    return true;
};

const getHeaderVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'None';
    if (routeName === 'ListingDetailScreen') {
        return false;
    }
    return false;
};

export { getTabBarVisibility, getHeaderVisibility };
