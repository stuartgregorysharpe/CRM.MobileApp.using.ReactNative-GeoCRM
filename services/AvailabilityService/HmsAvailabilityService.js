import HMSAvailability, {
  ErrorCode,
} from '@hmscore/react-native-hms-availability';
export async function hmsCheckAvailability() {
  const minApkVersion = 50500300;
  const errorCode = await HMSAvailability.isHuaweiMobileServicesAvailable(
    minApkVersion,
  );
  return errorCode === 0;
}
