import { View, StyleSheet} from 'react-native'
import React from 'react'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { useSelector } from 'react-redux';

export default function AddLeadMap() {
    const currentLocation = useSelector(state => state.rep.currentLocation);
    return (
        <View style={{marginHorizontal:10}}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation={true}
                followUserLocation={true}
                showsMyLocationButton={true}
                zoomEnabled={true}
                region={{
                    latitude:  currentLocation && currentLocation.latitude != undefined? currentLocation.latitude : 0,
                    longitude: currentLocation && currentLocation.longitude != undefined? currentLocation.longitude : 0,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}></MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 230,
        marginBottom: 10,
    },    
})