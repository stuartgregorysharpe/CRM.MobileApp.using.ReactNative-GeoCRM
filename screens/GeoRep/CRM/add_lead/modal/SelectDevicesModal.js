
import React , { useRef } from 'react';
import CCircleButton from '../../../../../components/common/CCircleButton';
import CModal from '../../../../../components/common/CModal';
import { Constants } from '../../../../../constants';
import SelectDevicesContainer from '../containers/SelectDevicesContainer';

const SelectDevicesModal = React.forwardRef((props, ref) => {

  const { selLists } = props;
  const selectDevicesContainerRef = useRef(null)  
  
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (data.type == Constants.actionType.ACTION_DONE) {
      if (ref) {
        ref.current.hideModal();
      }
    }
    if(data.type ==  Constants.actionType.ACTION_CLOSE) {
      if (ref) {
        props.onButtonAction(data);
      }      
    }
  };

  const renderViewLists = () => {
    return (
      <CCircleButton
        onClick={() => viewLists()}
        title="View List"
        icon="Check_List_Active"></CCircleButton>
    );
  };

   
  const viewLists = () => {    
    if(selectDevicesContainerRef.current){      
      selectDevicesContainerRef.current.showViewLists();
    }    
  };


  return (    
    <CModal
      ref={ref}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      customRightHeaderView={
        selLists > 0 || selLists.length > 0 ? (
          renderViewLists()
        ) : (
          <></>
        )
      }
      {...props}>
      <SelectDevicesContainer
        {...props}
        style={{marginTop: 14}}
        ref={selectDevicesContainerRef}
        onButtonAction={onButtonAction}
      />
    </CModal>
        
  );
});

export default SelectDevicesModal;
