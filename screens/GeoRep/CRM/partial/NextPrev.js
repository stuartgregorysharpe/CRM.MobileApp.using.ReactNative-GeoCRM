import React, {
  Fragment,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {whiteLabel} from '../../../../constants/Colors';
import {getLocationInfo} from '../../../../actions/location.action';
import {
  getLocationLoop,
  storeLocationLoop,
} from '../../../../constants/Storage';
import SvgIcon from '../../../../components/SvgIcon';
import DeviceInfo from 'react-native-device-info';
import {expireToken, showOfflineDialog} from '../../../../constants/Helper';
import { checkConnectivity } from '../../../../DAO/helper';
var currentPosition = -1;
var isClickable = true;

//export function NextPrev(props){
export const NextPrev = forwardRef((props, ref) => {
  // pageType : 'camera' or 'search-lists'  ,  onUpdated: called after pressed "next" or "prev" button.
  const {
    currentLocation,
    pageType,
    locationInfo,
    onUpdated,
    onStart,
    onEnd,
    canGoNextPrev,
  } = props;
  const [isPrev, setIsPrev] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const loopLists = useSelector(state => state.location.loopLists); // use for camera page
  const [currentLoopLists, setCurrentLoopList] = useState([]);
  const [loopPosition, setLoopPosition] = useState(-1);
  const [nextLocationName, setNextLocationName] = useState('');
  const [prevLocationName, setPrevLocationName] = useState('');
  
  const dispatch = useDispatch();

  useImperativeHandle(
    ref,
    () => ({
      onClickPrev() {
        console.log('Called on prev');
        onPrev();
      },
      onClickNext() {
        console.log('called on next');
        onNext();
      },
    }),
    [currentLoopLists],
  );

  useEffect(() => {
    console.log('page type', pageType.name);
    if (pageType.name === 'search-lists') {
      checkIsPrev();
      checkIsNext();
    } else if (pageType.name === 'camera') {
      setIsNext(false);
      setIsPrev(false);
    }
  }, []);

  useEffect(() => {
    console.log('updatede lopp list');
    if (pageType.name === 'search-lists') {
      initLocationLoopData();
    } else if (pageType.name === 'camera') {
      if (loopLists.length > 0) {
        setCurrentLoopList([...loopLists]);
      }
      if (loopLists.length > 1) {
        setIsPrev(true);
        setIsNext(true);
      }
      if (loopLists.length > 0) {
        var pos = getPositionForCamera();
      }
    }
  }, [loopLists]);

  // const _canGoNextPrev = async () => {
  //     let check = await checkFeatureIncludeParam("feedback_loc_info_outcome");
  //     if( check && !outcomeVal){
  //       feedback()
  //     }else{
  //       return true;
  //     }
  // }

  const checkIsPrev = async () => {
    var savedLocationLoop = await getLocationLoop();
    if (savedLocationLoop.length > 0) {
      setIsPrev(true);
    }
  };
  const checkIsNext = async () => {
    if (
      locationInfo !== undefined &&
      locationInfo.next !== undefined &&
      locationInfo.next.location_id !== undefined
    ) {
      setIsNext(true);
    } else {
      setIsNext(false);
    }
  };

  const initLocationLoopData = async () => {
    var savedLocationLoops = await getLocationLoop();
    var position = -1;
    savedLocationLoops.forEach((element, index) => {
      if (element.location_id === locationInfo.location_id) {
        position = index;
      }
    });

    if (position != -1) {
      // exist in original lists

      console.log('new_lists1', savedLocationLoops);

      setCurrentLoopList([...savedLocationLoops]);
      currentPosition = position;

      if (currentPosition < savedLocationLoops.length - 1) {
        setNextLocationName(
          savedLocationLoops[position + 1].name
            ? savedLocationLoops[position + 1].name
            : '',
        );
      }
      if (currentPosition > 0) {
        setPrevLocationName(
          savedLocationLoops[position - 1].name
            ? savedLocationLoops[position - 1].name
            : '',
        );
      }
      setIsNext(true);
      if (currentPosition === 0) {
        setIsPrev(false);
      } else {
        setIsPrev(true);
      }
    } else {
      var new_lists = [...savedLocationLoops];
      if (
        savedLocationLoops.length === 0 ||
        (savedLocationLoops.length > 0 &&
          savedLocationLoops[savedLocationLoops.length - 1].location_id !==
            locationInfo.location_id)
      ) {
        let currentLoc = {
          location_id: locationInfo.location_id,
          name: locationInfo.location_name.value,
          address: locationInfo.address,
        };
        new_lists = [...savedLocationLoops, currentLoc];
      }
      
      setCurrentLoopList(new_lists);
      currentPosition = new_lists.length - 1;
      await storeLocationLoop(new_lists);      
      if (new_lists.length >= 2) {        
        setPrevLocationName( new_lists[new_lists.length - 2] != undefined ? new_lists[new_lists.length - 2].name : '');
        setNextLocationName( locationInfo.next != undefined ? locationInfo.next.name : '');        
      } else {
        setNextLocationName( locationInfo.next != undefined ? locationInfo.next.name : '');
      }
    }
  };

  getCameraNextPosition = pos => {
    if (pos < loopLists.length - 1) {
      return pos + 1;
    }
    if (pos === loopLists.length - 1) {
      return 0;
    }
  };

  getCameraPrevPosition = pos => {
    if (pos === 0) {
      return loopLists.length - 1;
    }
    if (pos > 0) {
      return pos - 1;
    }
  };

  const getPositionForCamera = () => {
    var position = -1;
    loopLists.forEach((element, index) => {
      if (element.location_id === locationInfo.location_id) {
        position = index;
      }
    });

    if (position != -1) {
      if (pageType.name === 'camera') {
        currentPosition = position;
        // Prev and Next Location Name for Tablet
        setNextLocationName(loopLists[getCameraNextPosition(position)].name);
        setPrevLocationName(loopLists[getCameraPrevPosition(position)].name);
      }
    }
  };

  const openLocationInfo = (location_id, curLocation) => {
    isClickable = false;
    console.log('new loc id', location_id);
    getLocationInfo(Number(location_id), curLocation)
      .then(res => {
        onUpdated(res);
        isClickable = true;
      })
      .catch(e => {        
        isClickable = true;
        expireToken(dispatch, e);
      });
  };

  const openNewLocationInfo = location_id => {
    isClickable = false;    
    getLocationInfo(Number(location_id), currentLocation)
      .then(async res => {        
        let item = {
          name: res.location_name.value,
          address: res.address,
          location_id: res.location_id,
        };
        await storeLocationLoop([...currentLoopLists, item]);
        onUpdated(res);
        isClickable = true;
      })
      .catch(e => {
        isClickable = true;
        expireToken(dispatch, e);
      });
  };

  const onPrev = () => {
    if (isClickable) {
      console.log('on prev');
      onStart();
      if (pageType.name === 'camera') {
        openLocationInfo(
          currentLoopLists[getCameraPrevPosition(currentPosition)].location_id,
        );
        currentPosition = getCameraPrevPosition(currentPosition);
        setNextLocationName(
          loopLists[getCameraNextPosition(currentPosition)].name,
        );
        setPrevLocationName(
          loopLists[getCameraPrevPosition(currentPosition)].name,
        );
      } else if (pageType.name === 'search-lists') {
        console.log('page tpye', pageType.name);
        console.log('page tpye', currentPosition);
        if (currentPosition > 0) {
          openLocationInfo(currentLoopLists[currentPosition - 1].location_id);
          currentPosition = currentPosition - 1;
          if (currentPosition === 0) {
            setIsPrev(false);
          } else {
            // Next & Prev button text
            setPrevLocationName(currentLoopLists[currentPosition - 1].name);
            if (currentPosition < currentLoopLists.length - 1) {
              setNextLocationName(currentLoopLists[currentPosition + 1].name);
            }
          }
        } else {
          setIsPrev(false);
        }
      }
    }
  };

  const onNext = () => {
    if (isClickable) {
      onStart();

      console.log('on next');
      if (pageType.name === 'camera') {
                
        openLocationInfo(currentLoopLists[getCameraNextPosition(currentPosition)].location_id);
        currentPosition = getCameraNextPosition(currentPosition);
        setNextLocationName(
          loopLists[getCameraNextPosition(currentPosition)].name,
        );
        setPrevLocationName(
          loopLists[getCameraPrevPosition(currentPosition)].name,
        );
      } else if (pageType.name === 'search-lists') {
        
        console.log("currentLoopLists",currentLoopLists);
        console.log("currentLoopLists",locationInfo);
        

        if (currentPosition === currentLoopLists.length - 1) {

          if(locationInfo.next != undefined && locationInfo.next.location_id != undefined){
            openNewLocationInfo(locationInfo.next.location_id);
          }else{
            checkIsNext();
            checkIsPrev();
            onEnd(locationInfo);
          } 

        } else if (currentPosition < currentLoopLists.length - 1) {
          if (currentPosition + 1 == currentLoopLists.length - 1) {
            openLocationInfo(
              currentLoopLists[currentPosition + 1].location_id,
              currentLocation,
            );
          } else {
            openLocationInfo(currentLoopLists[currentPosition + 1].location_id);
          }
        } else {
        }
      }
    }
  };

  return (
    <Fragment>
      <View style={styles.container}>
        {isPrev && (
          <TouchableOpacity
            style={styles.leftContainer}
            onPress={async () => {

              checkConnectivity().then((isConnected) => {
                if(isConnected){
                  if (canGoNextPrev('prev') === true) {
                    onPrev();
                  }
                }else{
                  showOfflineDialog(dispatch);
                }
              })
              
              
            }}>
            <View
              style={[styles.prevStyle, {paddingLeft: 10, paddingRight: 10}]}>
              <SvgIcon icon="Arrow_Left_Btn_alt" width="7px" height="15px" />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                  color: whiteLabel().actionOutlineButtonText,
                  fontWeight: '700',
                }}>
                {!DeviceInfo.isTablet() ? 'Previous' : prevLocationName}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {isNext && (
          <TouchableOpacity
            style={[styles.rightContainer]}
            onPress={async () => {

              checkConnectivity().then((isConnected) => {
                if(isConnected){
                  if (canGoNextPrev('next') === true) {
                    onNext();
                  }
                }else{
                  showOfflineDialog(dispatch);
                }
              })
              

            }}>
            <View
              style={[styles.prevStyle, {paddingLeft: 20, paddingRight: 10}]}>
              <Text
                style={{
                  marginRight: 13,
                  fontSize: 12,
                  color: whiteLabel().actionOutlineButtonText,
                  fontWeight: '700',
                }}>
                {!DeviceInfo.isTablet() ? 'Next' : nextLocationName}
              </Text>
              <SvgIcon icon="Arrow_Right_Btn_alt" width="7px" height="15px" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </Fragment>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
  },
  leftContainer: {
    flexGrow: 1,
    alignItems: 'flex-start',
  },
  rightContainer: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  prevStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width:Dimensions.get('window').width/5,
    borderWidth: 1.5,
    borderRadius: 15,
    borderColor: whiteLabel().actionOutlineButtonBorder,
    padding: 3,
  },
});
