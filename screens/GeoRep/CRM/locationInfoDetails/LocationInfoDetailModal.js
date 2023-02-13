import React from 'react';
import {ScrollView} from 'react-native';

import CModal from '../../../../components/common/CModal';
import {Constants, Values} from '../../../../constants';
import {LocationInfoDetails} from './LocationInfoDetails';

const LocationInfoDetailModal = React.forwardRef((props, ref) => {


  const onButtonAction = data => {    
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (ref) {
      //ref.current.hideModal();
    }
  };
  return (
    <CModal
      ref={ref}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      closableWithOutsideTouch
      hideClose
      onClear={() => {     
        onButtonAction({type: Constants.actionType.ACTION_FORM_CLEAR});
      }}
      onClose={() => {
        console.log(" modal closed");
        onButtonAction({type: Constants.actionType.ACTION_CLOSE});
      }}
      {...props}>
      {/* <ScrollView
        style={{height: Values.deviceHeight - 68, alignSelf: 'stretch'}}> */}
      <LocationInfoDetails
        {...props}
        isModal={true}
        onButtonAction={onButtonAction}
      />
      {/* </ScrollView> */}
    </CModal>
  );
});

export default LocationInfoDetailModal;
