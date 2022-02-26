/* 
  This component is taken from the venits/react-native-map-clustering repository and 
  imported into ours so that you can replace something and experiment with working with 
  clusters yourself.
  
  Some parts of this code may have already been changed.
*/

import React, { forwardRef, memo, useEffect, useMemo, useRef, useState ,useImperativeHandle } from 'react'
import { Dimensions, LayoutAnimation, Platform , View ,StyleSheet , TouchableOpacity} from 'react-native'
import MapView, { MapViewProps, Polyline , Callout, PROVIDER_GOOGLE} from 'react-native-maps'
import SuperCluster from 'supercluster'
import SvgIcon from '../../../../components/SvgIcon'
import Colors, { PRIMARY_COLOR } from '../../../../constants/Colors'

import { MapClusteringProps } from './ClusteredMapViewTypes'
import ClusterMarker from './ClusteredMarker'
import {
  calculateBBox,
  generateSpiral,
  isMarker,
  markerToGeoJSONFeature,
  returnMapZoom,
} from './helpers'

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

      if (!clusteringEnabled) {
        updateSpiderMarker([])
        updateMarkers([])
        updateChildren(propsChildren)
        setSuperCluster(null)
        return
      }
      
      propsChildren.forEach((child, index) => {
        if (isMarker(child)) {
          rawData.push(markerToGeoJSONFeature(child, index))
        } else {
          otherChildren.push(child)
        }
      })

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

      const zoom = returnMapZoom(currentRegion, bBox, minZoom)
      const markers = superCluster.getClusters(bBox, zoom)            
      
      
      updateMarkers(markers)
      updateChildren(otherChildren)
      setSuperCluster(superCluster)      

      superClusterRef.current = superCluster      
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
        const zoom = returnMapZoom(region, bBox, minZoom)      
        const markers = superCluster.getClusters(bBox, zoom)
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
      } else {
        onRegionChangeComplete(region)
      }
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
          onRegionChangeComplete={_onRegionChangeComplete}>
          {markers.map((marker) =>
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
