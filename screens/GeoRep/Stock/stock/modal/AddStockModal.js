
import { View, Text , StyleSheet} from 'react-native'
import React , { useState } from 'react'
import CModal from '../../../../../components/common/CModal';
import { Constants } from '../../../../../constants';
import SelectInputView from '../../../../../components/common/SelectInput/components/SelectInputView';
import CSingleSelectInput from '../../../../../components/common/SelectInput/CSingleSelectInput';
import { style } from '../../../../../constants/Styles';


const AddStockModal = React.forwardRef((props, ref) => {

    const [deviceType ,setDeviceType] = useState('');
    const [items, setItems] =  useState([{value:'value', label:'label'}]);

    const onButtonAction = data => {
        if (props.onButtonAction) {
          props.onButtonAction(data);
        }
        if (ref) {
          ref.current.hideModal();
        }
    };

    return (        
        <CModal
            ref={ref}            
            modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
            closableWithOutsideTouch
            onClear={() => {
                onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
            }}
            {...props}>
            
            <View style={styles.container}>  
                <CSingleSelectInput
                    key={"key"}
                    description={'Stock Type'}
                    placeholder={'Stock Type'}
                    checkedValue={deviceType}
                    items={items}
                    hasError={false}
                    disabled={false}
                    onSelectItem={item => {
                        //updateFormData(field_name, item.value);
                        //setDeviceType(item.value);
                    }}
                    containerStyle={{marginTop: 10}}
                />    
            </View>
        </CModal>        
    )
});

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        paddingTop: 10,
        marginHorizontal: 20,
        marginBottom: 30,
    },
})

export default AddStockModal;
