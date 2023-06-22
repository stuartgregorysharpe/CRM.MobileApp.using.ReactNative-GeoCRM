import {View, TouchableOpacity} from 'react-native';
import React, {useState, useRef, useEffect , forwardRef,useImperativeHandle} from 'react';
import {style} from '../../../../constants/Styles';
import SvgIcon from '../../../../components/SvgIcon';
import Colors, {whiteLabel} from '../../../../constants/Colors';
import {AppText} from '../../../../components/common/AppText';
import {BasketListContainer} from './containers/BasketListContainer';
import {RotationAnimation} from '../../../../components/common/RotationAnimation';
import {getBascketLastSyncTableData} from '../../../../sqlite/BascketLastSyncsHelper';
import {Strings, Values} from '../../../../constants';
import ViewOfflineSyncItemContainer from './containers/ViewOfflineSyncItemContainer';
import { useSelector } from 'react-redux';
import AlertModal from '../../../../components/modal/AlertModal';
import { initializeDB } from '../../../../services/SyncDatabaseService/SyncTable';

export const SyncAll = forwardRef((props, ref) => {

  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSyncedDate, setLastSyncedDate] = useState('');
  const basketRef = useRef();
  const offlineStatus = useSelector(state => state.auth.offlineStatus);
  const [isManual, setIsManual] = useState(true); // expland it manually or automatically(offline change)

  const alertModalRef = useRef()

  const updateLoading = loading => {
    setIsLoading(loading);
    initLastSyncAllDateTime();    
  };

  useImperativeHandle(ref, () => ({
    syncAllData(syncType , flag) {
      initializeDB().then((syncNotCompleted) => {
        console.log("Syn done", syncNotCompleted, syncType , flag);
        if(syncType === 'bascket_and_offline_items'){
          if(flag){
            setIsManual(false);
            setExpanded(true); 
          }        
        }else{        
          if(syncNotCompleted && flag){
            setExpanded(true);            
            setIsLoading(true);
          }  
        }                                                    
      }).catch((e) => {
        console.log("initailizeDB"  , e.toString());
      });        

                                                                                                    
    },
    refreshView() {
      initLastSyncAllDateTime();
    }
  }));


  useEffect(() => {    
    initLastSyncAllDateTime();
  }, [props.refresh]);

  useEffect(() => {
      if(!props.isExpandSync){
        setExpanded(false);
      }
  }, [props.isExpandSync]);


  useEffect(() => {
    let isMount = true;
    console.log("trigger => ", expanded , isLoading)
    if (isMount && expanded && isLoading) {
      startTableSync();
    } else if (isMount && expanded && !isLoading) {
      if (basketRef.current && basketRef.current.expand) {
        basketRef.current.expand();
      }
    }
    return () => {
      isMount = false;
    };
  }, [isLoading, expanded]);

  useEffect(() => {
    if (!isLoading) {
      initLastSyncAllDateTime();
    }
  }, [isLoading]);

  const initLastSyncAllDateTime = async () => {
    var res = await getBascketLastSyncTableData('sync_all');
    var title = '';
    if (res.length > 0) {
      title = Strings.Last_Synced_Date + res.item(0).timestamp;
    }
    setLastSyncedDate(title);
  };


  const startTableSync = () => {        
    setIsManual(true);    
    if (basketRef.current && basketRef.current.startSync) {
      console.log("sync table start");
      basketRef.current.startSync();
    }else{
      console.log("start table sync failed")
    }
  }

  const showNotAvailableModal = () => {
    if(alertModalRef.current){
      alertModalRef.current.alert(Strings.This_Function_Not_Available);
    }
  }

  return (
    <View
      style={[
        style.scrollTabCard,
        {
          marginTop: 10,
          flexDirection: 'column',
          paddingTop: 5,
          paddingBottom: 5,
        },
      ]}>
      
      <AlertModal ref={alertModalRef} />

      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        {!isLoading && (
          <TouchableOpacity
            onPress={() => {
              if(offlineStatus){
                showNotAvailableModal();
                return;
              }
              if (basketRef.current && basketRef.current.startSync) {
                startTableSync();
              } else {
                setExpanded(true);
                setIsLoading(true);
              }
            }}>
            <View
              style={{
                backgroundColor: whiteLabel().actionFullButtonBackground,
                borderRadius: 5,
                marginLeft: 5,
              }}>
              <SvgIcon icon="Sync" width="50" height="50" />
            </View>
          </TouchableOpacity>
        )}

        {isLoading && <RotationAnimation style={{width: 50, height: 50}} />}

        <View style={{flex: 1, marginLeft: 7, marginTop: 3}}>
          <AppText
            title={Strings.Home.Sync_All}
            type="secondaryBold"
            color={whiteLabel().mainText}
            style={{fontSize: Values.fontSize.small}}></AppText>
          <AppText
            title={lastSyncedDate}
            type="secondaryMedium"
            color={Colors.disabledColor}
            style={{
              fontSize: Values.fontSize.xxxSmall,
              marginTop: 5,
            }}></AppText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 2,
            marginRight: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/*<Icon
                name={`info-outline`}
                size={20}
        color={Colors.redColor}/>*/}

          <TouchableOpacity
            onPress={() => {
              setExpanded(!expanded);
              setIsManual(true);
            }}>
            <View style={{marginRight: 10, marginLeft: 10}}>
              <SvgIcon
                icon={expanded ? 'Up_Arrow' : 'Bottom_Arrow'}
                width="30"
                height="30"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {expanded && (
        <BasketListContainer 
          changeIsManual={(flag) => {
            setIsManual(flag);
          }}
          isManual={isManual} 
          ref={basketRef} 
          updateLoading={updateLoading}
          showNotAvailableModal={showNotAvailableModal}
          onClosed={() => {
            setExpanded(false);
            setIsLoading(false);
          }}
        />
      )}

      {expanded && (
        <ViewOfflineSyncItemContainer
          isManual={isManual} 
          changeIsManual={(flag) => {
            setIsManual(flag);
          }}
          onSyncStart={(message) =>{ 
            startTableSync();
          }}
          onClosed={() => {
            setExpanded(false);
          }}
        />
      )}
    </View>
  );
});
