
import {Alert} from 'react-native';

export const WHATS_APP_LINK = "https://api.whatsapp.com/send?l=en&text=Hi!%20I%20have%20a%20support%20request&phone=27608477174%22";


export function notifyMessage(title, msg) {
    Alert.alert(title, msg, [
        // {
        //     text: 'ok',
        //     onPress: str => console.log('Entered string: ' + str),
        // },
        {
            text: 'Ok',
            onPress: () => console.log('Pressed Cancel!'),
            style: 'ok',
        },
    ]);
}
