
import React , { useRef ,useImperativeHandle } from 'react';
import CModal from '../../../../../components/common/CModal';
import { Constants } from '../../../../../constants';
import SelectDevicesContainer from '../containers/SelectDevicesContainer';

const SelectDevicesModal = React.forwardRef((props, ref) => {

  const selectDevicesContainerRef = useRef(null)
  useImperativeHandle(
      ref,
      () => ({
        showViewLists() {          
          if(selectDevicesContainerRef.current){
            selectDevicesContainerRef.current.showViewLists();
          }        
        }          
      }),
      [],
  );

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

  return (    
    <CModal
      ref={ref}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
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
