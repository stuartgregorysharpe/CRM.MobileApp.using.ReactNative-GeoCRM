/* 
  This component is taken from the venits/react-native-map-clustering repository and 
  imported into ours so that you can replace something and experiment with working with 
  clusters yourself.
  
  Some parts of this code may have already been changed.
*/

import React, { forwardRef, memo, useEffect, useMemo, useRef, useState ,useImperativeHandle } from 'react'
import { Dimensions, LayoutAnimation, Platform , View ,StyleSheet , TouchableOpacity , Text} from 'react-native'
import MapView, { MapViewProps, Polyline , Polygon, Callout, PROVIDER_GOOGLE} from 'react-native-maps'
import SuperCluster from 'supercluster'
import SvgIcon from '../../../../components/SvgIcon'
import Colors from '../../../../constants/Colors'

import { MapClusteringProps } from './ClusteredMapViewTypes'
import ClusterMarker from './ClusteredMarker'
import {
  calculateBBox,
  generateSpiral,
  isMarker,
  markerToGeoJSONFeature,
  returnMapZoom,
} from './helpers'

let previousCount = 0;
let currentZoom = 0;

const ClusteredMapView = forwardRef<MapClusteringProps & MapViewProps, any>(
  (
    {
      radius,
      maxZoom,
      minZoom,
      minPoints,
      extent,
      nodeSize,
      children,
      onClusterPress,
      onRegionChangeComplete,
      onMarkersChange,
      preserveClusterPressBehavior,
      clusteringEnabled,
      clusterColor,
      clusterTextColor,
      clusterFontFamily,
      spiderLineColor,
      layoutAnimationConf,
      animationEnabled,
      renderCluster,
      tracksViewChanges,
      spiralEnabled,
      superClusterRef,
      currentLocation,      
      scrollEnabled,
      editing,
      onPress,
      ...restProps
    },
    ref,
  ) => {

    const [markers, updateMarkers] = useState([])
    const [spiderMarkers, updateSpiderMarker] = useState([])
    const [otherChildren, updateChildren] = useState([])
    const [superCluster, setSuperCluster] = useState(null)
    const [currentRegion, updateRegion] = useState(restProps.region || restProps.initialRegion)
    const [isSpiderfier, updateSpiderfier] = useState(false)
    const [clusterChildren, updateClusterChildren] = useState(null)
    const mapRef = useRef()
    const propsChildren = useMemo(() => React.Children.toArray(children), [children])    
    
    useEffect(() => {
      const rawData = []
      const otherChildren = []

      let isMount = true;

      //console.log("%%%%% refresh $$$$$$$$$" ,propsChildren);
      
      if (!clusteringEnabled) {
        updateSpiderMarker([])
        updateMarkers([])
        updateChildren(propsChildren)
        setSuperCluster(null)
        return
      }      
        // if( scrollEnabled && previousCount === propsChildren.length){
        //   return;
        // } 
                   
        console.log("new data refresh ", propsChildren.length);
        propsChildren.forEach((child, index) => {
          if (isMarker(child)) {
            rawData.push(markerToGeoJSONFeature(child, index))
          } else {
            otherChildren.push(child)
          }
        })

        console.log("child count ", otherChildren.length);
        previousCount = propsChildren.length;
        
        if(scrollEnabled && isMount){
          const superCluster = new SuperCluster({
            radius,
            maxZoom,
            minZoom,
            minPoints,
            extent, 
            nodeSize,
          })
          superCluster.load(rawData)
          const bBox = calculateBBox(currentRegion)     
          var zoom = returnMapZoom(currentRegion, bBox, minZoom)
          if(zoom < 14){
            zoom = zoom - 2;
          }
          const markers = superCluster.getClusters(bBox, zoom)          
          //console.log("markers", markers);
          console.log("markers", markers.length);                      
          updateChildren(otherChildren)
          setSuperCluster(superCluster) 
          updateMarkers(markers)  
          superClusterRef.current = superCluster                
        }else{
          updateChildren(otherChildren)
        }                                                  

        return () => {
          isMount = false;
        };
        
    }, [propsChildren, clusteringEnabled])

    useEffect(() => {      
      if (!spiralEnabled) {
        return
      }            
      if (isSpiderfier && markers.length > 0) {
        const allSpiderMarkers = []
        let spiralChildren = []
        markers.map((marker, i) => {
          if (marker.properties.cluster) {
            spiralChildren = superCluster.getLeaves(marker.properties.cluster_id, Infinity)
          }
          const positions = generateSpiral(marker, spiralChildren, markers, i)
          allSpiderMarkers.push(...positions)
        })        
        
        updateSpiderMarker(allSpiderMarkers)
      } else {
        updateSpiderMarker([])
      }

    }, [isSpiderfier, markers])

    const _onRegionChangeComplete = (region) => {
      
      if(region === undefined){
        goToCurrentLocation();
        return; 
      }
            
      if (superCluster && region) {
        const bBox = calculateBBox(region)        
        var zoom = returnMapZoom(region, bBox, minZoom)   
        currentZoom = zoom;
        if(zoom < 14){
          zoom = zoom - 2 ;
        }
        const markers = superCluster.getClusters(bBox, zoom)
        console.log("markers count", markers.length);
        if (animationEnabled && Platform.OS === 'ios') {
          LayoutAnimation.configureNext(layoutAnimationConf)
        }
        if (zoom >= 18 && markers.length > 0 && clusterChildren) {
          if (spiralEnabled) {
            updateSpiderfier(true)
          }
        } else {
          if (spiralEnabled) {
            updateSpiderfier(false)
          }
        }
        updateMarkers(markers)
        onMarkersChange(markers)        
        onRegionChangeComplete(region, markers , bBox, zoom)              
        updateRegion(region)
        console.log("end -change region");
      } else {
        console.log("special region changed");
        onRegionChangeComplete(region)
      }
    }
    
    const _onPress = (e) => {
        onPress(e)
    }

    
    const _onClusterPress = (cluster) => () => {
      const children = superCluster.getLeaves(cluster.id, Infinity)
      updateClusterChildren(children)

      if (preserveClusterPressBehavior) {
        onClusterPress(cluster, children)
        return
      }

      const coordinates = children.map(({ geometry }) => ({
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      }))

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: restProps.edgePadding,
      })

      onClusterPress(cluster, children)
    }

    const goToCurrentLocation = () => {
    
      mapRef.current.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      });
    }
    
    const mapOptions = {
      scrollEnabled: true,
    };

    if (scrollEnabled === false) {
      mapOptions.scrollEnabled = false;
      var prev = undefined;
      mapOptions.onPanDrag = e => {
        console.log("----------" , e.nativeEvent.coordinate);
        console.log("currentZoom", currentZoom)
        var alt = 0.02;        
        if(currentZoom > 16){
          alt = 0.0000001;
        }else if(currentZoom > 14){
          alt = 0.00001;
        }else if(currentZoom > 12){
          alt = 0.0001;
        }else if(currentZoom > 10){
          alt = 0.0002;
        }else if(currentZoom > 8){
          alt = 0.002;
        }else if(currentZoom > 6){
          alt = 0.2;
        }else if(currentZoom >= 0 ){
          alt = 0.01;
        }
        console.log("alt", alt);
        if(prev !== undefined && ( Math.abs(prev.latitude - e.nativeEvent.coordinate.latitude) > alt || Math.abs(prev.longitude - e.nativeEvent.coordinate.longitude) > alt ) ){
          console.log("on drag"); 
          onPress(e);
        }         
        prev = e.nativeEvent.coordinate;
      };
    }
    
      return (
        <View style={{ flex: 1, width: '100%', height: '100%'}}>
          <MapView          
          {...restProps}
          ref={(map) => {
            mapRef.current = map
            if (ref) {
              ref.current = map
            }
            restProps.mapRef(map)        
          }}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          moveOnMarkerPress={false}
          provider={PROVIDER_GOOGLE}
          showsUserLocation = {true}
          followUserLocation = {true}
          showsMyLocationButton = {Platform.OS === "android" ? false: false}           
          zoomEnabled={true}        
          onRegionChangeComplete={_onRegionChangeComplete}
          onPress={_onPress}
          //onDoublePress={_onDoublePress}
          {...mapOptions}
          >
          { markers.map((marker) =>
            marker.properties.point_count === 0 ? (
              propsChildren[marker.properties.index]              
            ) : !isSpiderfier ? (
              renderCluster ? (
                renderCluster({
                  onPress: _onClusterPress(marker),
                  clusterColor,
                  clusterTextColor,
                  clusterFontFamily,
                  ...marker,
                })
              ) : (
                <ClusterMarker
                  key={`cluster-${marker.id}`}
                  {...marker}
                  onPress={_onClusterPress(marker)}
                  clusterColor={
                    restProps.selectedClusterId === marker.id
                      ? restProps.selectedClusterColor
                      : clusterColor
                  }
                  clusterTextColor={clusterTextColor}
                  clusterFontFamily={clusterFontFamily}
                  tracksViewChanges={tracksViewChanges}
                />
              )
            ) : null,
          )}
          
          {otherChildren}
    
          { editing && editing.coordinates.length > 0 && (
            <Polygon
              key={editing.id}
              coordinates={editing.coordinates}
              holes={editing.holes}                        
              strokeColor="#000"                        
              fillColor="rgba(76,146,236,0.5)"                        
              strokeWidth={1}
            />
          )}

          {spiderMarkers.map((marker) => {
            return propsChildren[marker.index]
              ? React.cloneElement(propsChildren[marker.index], {
                  coordinate: { ...marker },
                })
              : null
          })}
          {spiderMarkers.map((marker, index) => (
            <Polyline
              key={index}
              coordinates={[marker.centerPoint, marker, marker.centerPoint]}
              strokeColor={spiderLineColor}
              strokeWidth={1}
            />
          ))}    
          </MapView>                    

          <View style={styles.myLocation}>                
              <TouchableOpacity onPress={() => {                
                goToCurrentLocation();
              }}>              
                <SvgIcon icon="GPS_LOCATION" width='30px' height='30px' />                
              </TouchableOpacity>                
          </View>          
      </View>
      
      )
    
   
  },
)

ClusteredMapView.defaultProps = {
  editing:[],
  scrollEnabled:true,
  clusteringEnabled: true,
  spiralEnabled: true,
  animationEnabled: true,
  preserveClusterPressBehavior: false,
  layoutAnimationConf: LayoutAnimation.Presets.spring,
  tracksViewChanges: false,
  // SuperCluster parameters
  radius: Dimensions.get('window').width * 0.06,
  maxZoom: 20,
  minZoom: 1,
  minPoints: 4,
  extent: 512,
  nodeSize: 64,
  // Map parameters
  edgePadding: { top: 50, left: 50, right: 50, bottom: 50 },
  // Cluster styles
  clusterColor: '#00B386',
  clusterTextColor: '#FFFFFF',
  spiderLineColor: '#FF0000',
  // Callbacks
  onRegionChangeComplete: () => {},
  onClusterPress: () => {},
  onMarkersChange: () => {},
  superClusterRef: {},
  currentLocation: {},
  onPress: () => {},
  mapRef: () => {},  
}

const styles = StyleSheet.create({
  bound:{
    flex: 1,
    alignSelf: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderWidth: 0.5,
    ios: { padding: 5 },
    borderRadius: 20
  },
  myLocation:{
    position:'absolute', top:20, right:20, width:55,height:55 , backgroundColor:Colors.whiteColor , alignItems:'center', 
    borderRadius:30,                        
    shadowColor:'#000',
    shadowOffset:{
      width: 0, 
      height: 3
    },
    shadowOpacity:0.27,
    shadowRadius:4.65,
    elevation:6,
    zIndex:20000,
    justifyContent:'center' 
  }
});
export default memo(ClusteredMapView)
