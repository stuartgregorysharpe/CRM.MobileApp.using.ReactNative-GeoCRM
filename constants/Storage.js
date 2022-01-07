
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@user', jsonValue)
    } catch (e) {
      // saving error
      console.log("error", e);
    }
}

export const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
}

export const setToken = async (value) => {
    try {
      await AsyncStorage.setItem('@token', String(value))
    } catch (e) {
      // saving error
    }
}

export const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if(value !== null) {
          return value;        
      }
    } catch(e) {
        return null;      
    }
}
