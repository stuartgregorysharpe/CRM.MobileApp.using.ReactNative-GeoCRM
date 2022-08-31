
import { View, TouchableOpacity } from 'react-native'
import React , {useState ,useRef} from 'react'
import CTextInput from '../../../../../../components/common/CTextInput';
import { SubmitButton } from '../../../../../../components/shared/SubmitButton';
import QRScanModal from '../../../../../../components/common/QRScanModal';
import { Constants, Strings } from '../../../../../../constants';
import { useDispatch } from 'react-redux';
import { clearNotification, showNotification } from '../../../../../../actions/notification.action';

export default function DeviceView(props) {

    const [details, setDetails] = useState("");
    const [code, setCode] = useState("");
    const qrScanModalRef = useRef(null)
    const [codeDisabled ,setCodeDisabled] = useState(true)
    const dispatch = useDispatch();

    const onCaptureAction = ({type, value}) => {
        if (type == Constants.actionType.ACTION_CAPTURE) {            
            setCode(value)
            onDataChanged(details, value);
        }
    };
        
    const onDataChanged = (details, quantity) =>{
        props.onDataChanged(details, quantity)
    }


    const popDialog = () => {
        if(codeDisabled){
            dispatch(
                showNotification({
                  type: Strings.Success,
                  message: Strings.Stock.Have_You_Tried,
                  cancelButtonText: 'No',
                  buttonText: 'Yes',
                  buttonAction: async () => {                     
                        setCodeDisabled(false)  
                        dispatch(clearNotification());                
                  },
                }),
            );       
        }         
    }
    
    return (        
        <View style={{alignSelf:'stretch'}}>          
            <CTextInput                    
                label="Details"                    
                value={details}                    
                returnKeyType={'done'}                                        
                isRequired={true}
                onChangeText={text => {
                    setDetails(text);
                    onDataChanged(text, code);
                }}
                style={{marginTop:15}}
            />

            <View style={{ marginTop:15 , flexDirection:'row' , alignItems:'center'}}>
                <TouchableOpacity style={{ flex:1}} onPress={() => popDialog() }>
                    <CTextInput                        
                        label="Input IMEI"                    
                        value={code}     
                        keyboardType={'number-pad'}
                        returnKeyType={'done'}                                       
                        isRequired={true}
                        disabled={codeDisabled}
                        onChangeText={text => {
                            setCode(text);
                            onDataChanged(details, text);
                        }}
                    />
                </TouchableOpacity>                
                <SubmitButton                     
                    onSubmit={() => {
                        qrScanModalRef.current.showModal()
                    }}
                    svgIcon="QR_SCAN" title="Scan Code " style={{marginTop:5 , marginLeft:10}}></SubmitButton>                    
            </View>       

            <QRScanModal
                ref={qrScanModalRef}                    
                onButtonAction={onCaptureAction}
            />                

        </View>
    )
}