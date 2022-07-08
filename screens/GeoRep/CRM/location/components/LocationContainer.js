import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getLocationMapByRegion} from '../../../../../actions/location.action';
import LocationMap from '../../../../../services/Map/LocationMap';
import {getPolygonData} from '../helper';
import LocationWatcher from './LocationWatcher';

const LocationContainer = props => {
  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const polygons = useSelector(state => state.location.polygons);
  const [makers, setMarkers] = useState([]);
  const polygonData = useMemo(() => getPolygonData(polygons), [polygons]);
  const mapFilters = useSelector(state => state.selection.mapFilters);
  const [boundBox, setBoundBox] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const onLoadMakers = (currentLocation, boundBox) => {
    const isLoadable =
      currentLocation &&
      currentLocation.latitude !== undefined &&
      boundBox &&
      !isLoading;
    if (isLoadable) {
      setIsLoading(true);
      getLocationMapByRegion(currentLocation, boundBox)
        .then(res => {
          setIsLoading(false);
          setMarkers(res.locations);
          dispatch({type: CHANGE_POLYGONS, payload: res.polygons});
        })
        .catch(e => {
          expireToken(dispatch, e);
        });
    }
  };
  useEffect(() => {
    onLoadMakers(currentLocation, boundBox);
  }, [mapFilters, currentLocation, boundBox]);

  return (
    <View style={[styles.container, props.style]}>
      <LocationWatcher />
      <LocationMap polygonData={polygonData} makers={makers} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LocationContainer;
