export type positionPicker = 'left' | 'right';
export type objectStringString = { label: string; value: string };
export type arrayObjectsStringString = Array<objectStringString>;

export const ROLES: arrayObjectsStringString = [
    { label: 'Buyer', value: 'buyer' },
    { label: 'Seller', value: 'seller' },
    { label: 'Agent', value: 'agent' },
];

export const WHEEL_PICKET_ITEMS: arrayObjectsStringString = [
    // { label: '$50k', value: '100' },
    // { label: '$75k', value: '150' },
    { label: '$100k', value: '100' },
    { label: '$150k', value: '150' },
    { label: '$200k', value: '200' },
    { label: '$250k', value: '250' },
    { label: '$300k', value: '300' },
    { label: '$350k', value: '350' },
    { label: '$400k', value: '400' },
    { label: '$450k', value: '450' },
    { label: '$500k', value: '500' },
    { label: '$550k', value: '550' },
    { label: '$600k', value: '600' },
    { label: '$650k', value: '650' },
    // { label: '$800k', value: '200' },
    // { label: '$900k', value: '250' },
];
