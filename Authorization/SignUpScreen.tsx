import * as React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';
// import { SignUp1 } from '../../components/common/Authorization/SignUp1';
// import { SignUp2 } from '../../components/common/Authorization/SignUp2';
// import { SignUp3 } from '../../components/common/Authorization/SignUp3';
// import { SignUp4 } from '../../components/common/Authorization/SignUp4';
// import { SignUp5 } from '../../components/common/Authorization/SignUp5';
// import { ModalCongrats } from '../../components/common/Authorization/ModalCongrats';
import SetProfileScreen from '../../components/common/Authorization/SetProfileScreen';
// import { PagerDots } from '../../components/PagerDots';
import { SignUpChooseRoles } from '../../components/common/Authorization/SignUpChooseRoles';
import { SignUpSetProfile } from '../../components/common/Authorization/SignUpSetProfile';
import { objectStringString } from '../../components/common/Filters/constants';

// type Props = StackScreenProps<AuthParamList, 'SignUp'>;
export interface setRefund {
    refundHigh: string;
    refundLow: string;
}

export default function SignUpScreen() {
    const insets = useSafeAreaInsets();
    const refPagerView = useRef<PagerView | null>(null);
    // const [city, setCity] = useState<string>('');
    const [role, setRole] = useState<objectStringString>({
        label: '',
        value: '',
    });
    // const [email, setEmail] = useState<string>('');
    // const [password, setPassword] = useState<string>('');
    const [showCongrats, setShowCongrats] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const showNextPage = (index) => {
        const indexPage = index ?? page;
        refPagerView?.current?.setPage(indexPage);
        setPage(indexPage + 1);
    };
    return (
        <View key="1" style={{ flex: 1, paddingTop: Math.max(insets.top, 30) }}>
            {/*<PagerDots count={6} currentPage={page} />*/}
            <PagerView
                scrollEnabled={false}
                ref={refPagerView}
                style={{ flex: 1 }}
                initialPage={0}
            >
                {/* <SignUpChooseRoles
                    showNextPage={showNextPage}
                    setRole={setRole}
                /> */}
                <SignUpSetProfile showNextPage={showNextPage} role={role} />
                {/*<SignUp1 showNextPage={showNextPage} setCity={setCity} />*/}
                {/*<SignUp2 showNextPage={showNextPage} setRefund={setRefund} />*/}
                {/*<SignUp3 showNextPage={showNextPage} />*/}
                {/*<SignUp4 setShowCongrats={setShowCongrats} refund={refund} />*/}
                {/*<SignUp5*/}
                {/*    setEmail={setEmail}*/}
                {/*    setPassword={setPassword}*/}
                {/*    showNextPage={showNextPage}*/}
                {/*/>*/}
                {/* <SetProfileScreen
                    showNextPage={showNextPage}
                // email={email}
                // password={password}
                /> */}
            </PagerView>
            {/*<ModalCongrats*/}
            {/*    isShowCongrats={showCongrats}*/}
            {/*    showNextPage={showNextPage}*/}
            {/*    setShowCongrats={setShowCongrats}*/}
            {/*    refund={refund}*/}
            {/*/>*/}
        </View>
    );
}
