import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React , { useState, useEffect , useRef} from 'react'
import { useSelector } from 'react-redux';
import DirectionMap from '../../../../services/Map/DirectionMap';
import NavigationHeader from '../../../../components/Header/NavigationHeader';

const ViewRouteMap = (props) => {

    const isShowCustomNavigationHeader = props.isDeeplink != undefined;
    const [destination, setDestinationLocation] = useState(props.route.params.location);
    const currentLocation = useSelector(state => state.rep.currentLocation);

    const { width, height } = Dimensions.get('window');
    const mapRef = useRef(null);
    const ASPECT_RATIO = width / height;
    const LATITUDE = currentLocation.latitude;
    const LONGITUDE = currentLocation.longitude;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    
    const [coordinates , setCoordinates] = useState([]);

    useEffect(() => {
        if(destination != undefined && currentLocation != undefined){
            var locations = [];
            locations.push({latitude : currentLocation.latitude, longitude : currentLocation.longitude});
            locations.push({latitude : parseFloat(destination.latitude), longitude : parseFloat(destination.longitude)});            
            setCoordinates(locations);            
        }
    }, [])

    return (
        <View>
        
            {isShowCustomNavigationHeader && (
                            
                <NavigationHeader
                    showIcon={true}
                    title={'View Route'}
                    onBackPressed={() => {
                        props.navigation.goBack();
                    }}
                />
            )}

            <DirectionMap 
                coordinates={coordinates}
                currentLocation={currentLocation}
                region={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    zoomEnabled : true
                }}
            />
            
        </View>
    )
    
}

export default ViewRouteMap

const styles = StyleSheet.create({})