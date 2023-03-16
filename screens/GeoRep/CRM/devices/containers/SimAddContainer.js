import { StyleSheet, Text, View } from 'react-native'
import React , { useRef , useState , useEffect } from 'react'
import SimAddView from '../components/SimAddView'
import { PostRequestDAO } from '../../../../../DAO'
import { expireToken, getPostParameter } from '../../../../../constants/Helper'
import { useDispatch , useSelector } from 'react-redux'
import { Constants, Strings } from '../../../../../constants'
import LoadingBar from '../../../../../components/LoadingView/loading_bar'
import AlertModal from '../../../../../components/modal/AlertModal'
import { generateKey } from '../../../../../constants/Utils'

var indempotency = '';

const SimAddContainer = (props) => {

  const { location_id , simModalType , location_device_id } = props;

  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const loadingBar = useRef();
  const alertModalRef = useRef();
  const [isLoading, setIsLoading] =  useState(false);

  useEffect(() => {
    indempotency = generateKey();
  }, [])

  const onPost = ( type,  msisdn) => {
    if(isLoading || indempotency == ''){
      return;
    }
    setIsLoading(true)
    showLoadingBar();
    var userParam = getPostParameter(currentLocation);

    var postData = {
      location_device_id : '' ,
      location_id : location_id ,
      msisdn : msisdn , 
      mode : 'online' ,
      user_local_data: userParam.user_local_data,
    }
    var url = 'devices/add-update-unattached-device';
    if(type == 'delete'){
      postData = {
        location_device_id : location_device_id,
        mode: 'online'
      }
      url = 'devices/delete-unattached-device';
    }else if( type == 'update'){
      postData.location_device_id = location_device_id;
    }

    PostRequestDAO.find(0, postData, 'stock_module' , url , 'Device Sim','Location Name for the location ' + location_id , indempotency ).then((res) => {      
      setIsLoading(false);
      hideLoadingBar();
      if(res.status == Strings.Success){
        if(props.onButtonAction){
          props.onButtonAction( { type : Constants.actionType.ACTION_CLOSE , value : null} );
        }
      }
    }).catch((e) => {
      setIsLoading(false);
      hideLoadingBar();
      expireToken(dispatch , e);
    })
  }

  const onAdd = (msisdn) => {
    onPost('add', msisdn);
  }

  const onDelete = () => {
    onPost('delete' , '');
  }

  const onUpdate = (msisdn) => {        
    onPost('update', msisdn);
  }


  const showLoadingBar = () => {
    if(loadingBar.current){
      loadingBar.current.showModal();
    }
  }

  const hideLoadingBar = () => {
    if(loadingBar.current){
      loadingBar.current.hideModal();
    }
  }

  const showAlertModal = () => {
    if(alertModalRef.current){
      alertModalRef.current.alert(Strings.Complete_Compulsory_Fields)
    }
  }
 
  return (
    <View style={styles.container}>

        <LoadingBar ref={loadingBar} />
        <AlertModal ref={alertModalRef}/>
        
        <SimAddView 
          {...props}
          onAdd={onAdd}
          onDelete={onDelete}
          onUpdate={onUpdate}
          showAlertModal={showAlertModal}
        />    
    </View>
  )

}

export default SimAddContainer

const styles = StyleSheet.create({
  container : {
    alignSelf: 'stretch'
  }
})