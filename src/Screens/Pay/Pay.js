import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from "react-native";
import {white} from "../../../.yarn/releases/yarn-1.22.19";
import auth from "@react-native-firebase/auth";
import {useState} from "react";

const Pay = ({navigation}) => {
    const [amount, setAmount] = useState()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const pay = () => {
        // console.log("amount ", amount)
        if (amount === undefined || amount === null || amount === '' || isNaN(amount)) {
            setError(true)
            return;
        }
        setError(false)
        setLoading(true)
        getToken().then((res1) => {
            if (res1 === undefined) {
                alert("حدث خطأ اثناء الدفع")
                setLoading(false)
                return
            }
            getOrder({amount: amount * 100, auth_token: res1.token}).then((res) => {
                if (res === undefined) {
                    alert("حدث خطأ اثناء الدفع")
                    setLoading(false)
                    return
                }
                getPaymentKey({orderId: res.id, auth_token: res1.token}).then((res) => {
                    setLoading(false)
                    if (res1 === undefined)
                        alert("حدث خطأ اثناء الدفع")
                    else
                        navigation.navigate('PaymentWebView', {paymentKey: res.token})
                })
            })
        })
    }
    return (
        <View
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',

            }}
        >
            {
                loading &&
                <ActivityIndicator size="large" color="#007AFF"/>
            }
            {
                !loading &&
                <>
                    <Text
                        style={{
                            color: 'black',
                            margin: 5
                        }}
                    >
                        ادخل قيمة المبلغ
                    </Text>
                    <TextInput
                        style={{
                            height: 50,
                            width: 200,
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: 10,
                            padding: 5,
                            shadowColor: 'black',
                            elevation: 5,
                            textAlign: 'center'
                            //numeric
                        }}
                        keyboardType="numeric"
                        placeholderTextColor={'grey'}
                        placeholder={'المبلغ'}
                        onChangeText={(text) => {
                            setAmount(parseInt(text, 10))
                        }}
                        value={amount}

                    />
                    {
                        error &&
                        <Text
                            style={{
                                color: 'red',
                                margin: 5

                            }}
                        >
                            ادخل قيمة المبلغ
                        </Text>
                    }
                    <TouchableOpacity
                        style={{
                            height: 50,
                            width: 200,
                            backgroundColor: 'rgb(224,0,0)',
                            margin: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            shadowColor: 'black',
                            elevation: 5,
                        }}
                        onPress={() => {
                            pay()
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}
                        >
                            اشحن
                        </Text>
                    </TouchableOpacity>
                </>
            }
        </View>
    )
}
const getToken = async () => {
    try {
        const apiUrl = 'https://accept.paymob.com/api/auth/tokens'; // Replace with your API URL
        const requestBody = {
            "api_key": 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2libUZ0WlNJNkltbHVhWFJwWVd3aUxDSndjbTltYVd4bFgzQnJJam8xTWpVMU5EQjkuamU0b3h3V2wtS3BXeEs2YkhUNXpyWlFhSXQ2dUdYLWlnS3FObDkyMklBNm1lWGpZMlZjVE9HY0JEM0tuanliWWR4anE4TGswLWR5WmdHT1d0MHZLcnc='
        };
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody), // Convert the request body to JSON format
        });
        if (response.ok) {
            const responseData = await response.json();
            return responseData
        } else {
        }
    } catch (error) {
    }
};
const getOrder = async ({amount, auth_token}) => {
    const body = {
        "auth_token": auth_token,
        "delivery_needed": "false",
        "amount_cents": amount,
        "currency": "EGP",
        // "merchant_order_id": 31,
        "items": [
            {
                "name": "ASC1515",
                "amount_cents": "500000",
                "description": "Smart Watch",
                "quantity": "1"
            },
            {
                "name": "ERT6565",
                "amount_cents": "200000",
                "description": "Power Bank",
                "quantity": "1"
            }
        ],
        "shipping_data": {
            "apartment": "803",
            "email": "claudette09@exa.com",
            "floor": "42",
            "first_name": "Clifford",
            "street": "Ethan Land",
            "building": "8028",
            "phone_number": "+86(8)9135210487",
            "postal_code": "01898",
            "extra_description": "8 Ram , 128 Giga",
            "city": "Jaskolskiburgh",
            "country": "CR",
            "last_name": "Nicolas",
            "state": "Utah"
        },
        "shipping_details": {
            "notes": " test",
            "number_of_packages": 1,
            "weight": 1,
            "weight_unit": "Kilogram",
            "length": 1,
            "width": 1,
            "height": 1,
            "contents": "product of some sorts"
        }
    }
    const url = 'https://accept.paymob.com/api/ecommerce/orders'
    const response = await fetch(url, {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // Convert the request body to JSON format
    });
    if (response.ok) {
        // Parse the response data (assuming it's JSON)
        const responseData = await response.json();
        return responseData
        // setResponseText(`Response: ${JSON.stringify(responseData)}`);
    } else {
        // Handle error responses here
        console.log(`Error2: ${response.status}`)
        // return response
        // setResponseText(`Error: ${response.status}`);
    }
}

const getPaymentKey = async ({orderId, auth_token}) => {
    // console.log("orderId ", orderId)
    // console.log("auth_token ", auth_token)
    const body =
        {
            "auth_token": auth_token,
            "amount_cents": "100",
            "expiration": 3600,
            "order_id": "" + orderId,
            "billing_data": {
                "apartment": "803",
                "email": "claudette09@exa.com",
                "floor": "42",
                "first_name": "Clifford",
                "street": "Ethan Land",
                "building": "8028",
                "phone_number": "01010101010",
                "shipping_method": "PKG",
                "postal_code": "01898",
                "city": "Jaskolskiburgh",
                "country": "CR",
                "last_name": "Nicolas",
                "state": "Utah"
            },
            "currency": "EGP",
            "integration_id": "4199042",
            "lock_order_when_paid": "false"
        }
    const url = 'https://accept.paymob.com/api/acceptance/payment_keys'
    const response = await fetch(url, {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // Convert the request body to JSON format
    });
    if (response.ok) {
        const responseData = await response.json();
        return responseData
    } else {
        console.log(`Error3: ${response.status}`)
        // Handle error responses here
        // Handle error responses here
        // return response
        // setResponseText(`Error: ${response.status}`);
    }
}
export default Pay;
