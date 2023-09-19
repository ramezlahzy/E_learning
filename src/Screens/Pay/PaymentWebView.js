import {Text} from "react-native";
import { WebView } from 'react-native-webview';

const PaymentWebView = ({navigation,route}) => {
    const {paymentKey} = route.params;
    const url=`https://accept.paymob.com/api/acceptance/iframes/788010?payment_token=${paymentKey}`
    return (
        <WebView
            source={{ uri: url}}
        />
    )
}
export default PaymentWebView;
