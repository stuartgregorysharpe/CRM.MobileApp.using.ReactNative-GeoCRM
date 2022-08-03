import {NativeModules} from 'react-native';
export function gmsCheckAvailability() {
  return new Promise(function (resolve, reject) {
    NativeModules.GMSBase.isGmsAvailable(isAvailable => {
      resolve(isAvailable);
    });
  });
}
