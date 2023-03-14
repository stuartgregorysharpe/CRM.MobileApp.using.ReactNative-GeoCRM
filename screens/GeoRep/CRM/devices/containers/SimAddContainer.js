import { StyleSheet, Text, View } from 'react-native'
import React , { useRef } from 'react'
import SimAddView from '../components/SimAddView'
import { PostRequestDAO } from '../../../../../DAO'
import { expireToken, getPostParameter } from '../../../../../constants/Helper'
import { useDispatch , useSelector } from 'react-redux'
import { Constants, Strings } from '../../../../../constants'
import LoadingBar from '../../../../../components/LoadingView/loading_bar'
import AlertModal from '../../../../../components/modal/AlertModal'

const SimAddContainer = (props) => {

  const { location_id } = props;
  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const loadingBar = useRef();
  const alertModalRef = useRef();

  const onAdd = (msisdn) => {
    
    showLoadingBar();
    var userParam = getPostParameter(currentLocation);
    const postData = {
      location_device_id : '' ,
      location_id : location_id ,
      msisdn : msisdn , 
      mode : 'online' ,
      user_local_data: userParam.user_local_data,
    }

    PostRequestDAO.find(0, postData, 'add-update-unattached-device' ,'devices/add-update-unattached-device' , '','').then((res) => {
      console.log("add-update-unattached-device => ", res);
      hideLoadingBar();
      if(res.status == Strings.Success){
        if(props.onButtonAction){
          props.onButtonAction( { type : Constants.actionType.ACTION_CLOSE , value : null} );
        }
      }
    }).catch((e) => {
      hideLoadingBar();
      expireToken(dispatch , e);
    })
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

  const hideAlertModal = () => {
    if(alertModalRef.current){
      alertModalRef.current.hideModal();
    }
  }
 
  return (
    <View style={styles.container}>

        <LoadingBar ref={loadingBar} />
        <AlertModal ref={alertModalRef}/>
        
        <SimAddView 
          onAdd={onAdd}
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