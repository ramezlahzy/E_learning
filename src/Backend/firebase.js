import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

let itemsRef = database().ref('/items');
export {
    auth
}
