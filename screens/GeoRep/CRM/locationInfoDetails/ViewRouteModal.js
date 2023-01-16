import React from 'react';
import {Dimensions, View} from 'react-native';
import CModal from '../../../../components/common/CModal';
import {Constants} from '../../../../constants';
import DirectionMap from '../../../../services/Map/DirectionMap';

const ViewRouteModal = React.forwardRef((props, ref) => {

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
			onButtonAction({type: Constants.actionType.ACTION_CLOSE});
		}}
		{...props}>
		
		<View style={{flex:1, marginTop:10, height:Dimensions.get("screen").height * 0.8}}>
			<DirectionMap
				{...props}			
				isModal={true}
				onButtonAction={onButtonAction}
			/>
		</View>
		
    </CModal>
  );
});

export default ViewRouteModal;
