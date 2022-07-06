import {NativeModules} from 'react-native';
export async function gmsCheckAvailability() {
  return NativeModules.HMSBase.isGmsAvailable();
}
