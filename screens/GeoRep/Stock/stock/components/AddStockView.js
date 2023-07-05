import {View, StyleSheet} from 'react-native';
import React, { useState, useEffect , useRef } from 'react';
import CSingleSelectInput from '../../../../../components/common/SelectInput/CSingleSelectInput';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import DeviceView from './stock_types/DeviceView';
import ConsumableView from './stock_types/ConsumableView';
import SimView from './stock_types/SimView';
import {Constants, Strings} from '../../../../../constants';
import {validateNumber} from '../../../../../helpers/validateHelper';
import AlertModal from '../../../../../components/modal/AlertModal';
import { getLabel, getModalMessage } from './helper';

var vodacom = [];
var details = '';
var quantity = '';
var gMsn = '';
var gImei = '';
var gAdditionalImei = '';

export default function AddStockView(props) {
  
  const {deviceTypeLists, stockTypes} = props;

  const [deviceType, setDeviceType] = useState('');
  const [device, setDevice] = useState('');
  const [productId, setProductId] = useState('');
  const [additionalImei, setAdditionalImei] = useState('');
  const [msnRequired, setMsnRequired] = useState('0');
  const [deviceLists, setDeviceLists] = useState([]);
  const [codeLists, setCodeLists] = useState([]);
  const [enableAddStock, setEnableAddStock] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [count, setCount] = useState(0);  
  const [errors, setErrors] = useState({});
  const alertModalRef = useRef()

  useEffect(() => {
    vodacom = [];
    details = '';
    quantity = '';
    gMsn = '';
    gImei = '';
    gAdditionalImei = '';
  },[]);

  useEffect(() => {
    if (codeLists.length > 0) {
      setCount(codeLists.length);
    }
  }, [codeLists]);


  const onDataChangedDevice = (msn, imei , additional_imei) => {
    gMsn = msn ;
    gImei = imei ;        
    gAdditionalImei = additional_imei;
    if ( ( msnRequired == '1' && gMsn != '' && gImei != '' &&  gAdditionalImei != '' && additionalImei == '1' ) 
      || ( msnRequired == '1' && gMsn != '' && gImei != '' && additionalImei != '1') 
      || ( msnRequired != '1' && gImei != '' &&  gAdditionalImei != '' && additionalImei == '1' ) 
      || ( msnRequired != '1' && gImei != '' && additionalImei != '1') 
      ) {
      setEnableAddStock(true);
    } else {
      setEnableAddStock(false);
    }
    isValidate();
  };

  const onDataChangedConsumable = (det, qua) => {
    details = det;
    quantity = qua;
    if (quantity != '') {
      setEnableAddStock(true);
    } else {
      setEnableAddStock(false);
    }
  };

  const onDataChangedSim = value => {
    var tmp = {type: device, code: value};
    var flag = false;
    var check = vodacom.find(element => element.code == value.toString());
    if (check == undefined) {
      vodacom.push(tmp);
      setCodeLists([...codeLists, tmp]);
      flag = true;
    }
    if (flag) {
      setIsAdded(true);
      setEnableAddStock(true);
    } else {
      setEnableAddStock(false);
    }
  };

  const removeCode = value => {
    let filteredArray = codeLists.filter(item => item.code !== value.code);
    vodacom = vodacom.filter(item => item.code !== value.code);
    setCodeLists(filteredArray);
  };

  const isDuplicateData = () =>{
    if( msnRequired == '1' && additionalImei == '1'){
      if(gImei.trim() === gMsn.trim() || gImei.trim() === gAdditionalImei.trim() || gMsn.trim() === gAdditionalImei.trim() ){
        return true;
      }
    }else if( msnRequired == '1' && additionalImei != '1'){ 
      if(gImei === gMsn){
        return true;
      }
    }else if( msnRequired != '1' && additionalImei == '1'){ 
      if(gImei.trim() === gAdditionalImei.trim()){
        return true;
      }
    }
    return false;
  }

  const isValidate = () => {
    var isAvailable = true;
    if (deviceType == '') {
      setErrors({stockType: true});
      return false;
    }
    if (deviceType == Constants.stockType.DEVICE) {
      const _errors = {...errors};
      const type1 = additionalImei === '1' ? 'imei1' : 'imei';
      const type2 = additionalImei === '1' ? 'imei2' : '';

      if (gImei == '' ) {
        isAvailable = false;
        _errors[type1] = true;
      }else{
        isAvailable = true;
        _errors[type1] = false;
      }

      if (gAdditionalImei == '' && additionalImei == '1' ) {
        isAvailable = false;
        _errors['imei2'] = true;
      }else{
        isAvailable = true;
        _errors['imei2'] = false;
      }

      if (gMsn == '') {
        if(msnRequired == '1'){
          isAvailable = false;
          _errors['msn'] = true;
        }
      }else{
        isAvailable = true;
        _errors['msn'] = false;
      }
      if (device == '') {
        isAvailable = false;
        _errors['device'] = true;
      }                
      setErrors(_errors);
    } else if (deviceType == Constants.stockType.CONSUMABLE) {
      isAvailable = validateNumber(quantity);
      const _errors = {...errors};
      if (!isAvailable) {
        _errors['quantity'] = true;
      }
      setErrors(_errors);
    } else if (deviceType == Constants.stockType.SIM) {
      var simLists = getSimLists();
      if (simLists.length == 0) {
        isAvailable = false;
      }
    }
    if (!enableAddStock) return false;
    return isAvailable;
  };

  const onSubmit = () => {
    if ( isValidate() ) {

      setErrors({});
      var data = {
        stock_type: deviceType,
        device: device,
        details: details,
        quantity: quantity,
      };      
      if (deviceType == Constants.stockType.DEVICE) {
        if(isDuplicateData()){
          showAlertModal(Strings.Stock.Duplicate_Code)
          return;
        }
        data = {
          stock_type: deviceType,
          product_id: productId,
          description: device,
          imei: gImei,
          additional_imei : gAdditionalImei,
          device_serial: gMsn,
        };        
      } else if (deviceType == Constants.stockType.CONSUMABLE) {
        data = {
          stock_type: deviceType,
          product_id: productId,
          description: device,
          details: details,
          quantity: quantity,
        };
      } else if (deviceType == Constants.stockType.SIM) {
        var simLists = [];
        deviceLists.forEach(item => {
          var iccids = [];
          var tmp = vodacom.filter(element => element.type == item.label);
          tmp.forEach(element => {
            iccids.push(element.code);
          });
          if (iccids.length > 0) {
            simLists.push({
              network: item.label,
              product_id: item.value,
              iccids: iccids,
            });
          }
        });
        data = {
          stock_type: deviceType,
          sims: simLists,
        };
      }
      props.callAddStock(deviceType, data);
    } else {
      showAlertModal(getModalMessage(deviceType));
    }
  };

  const getSimLists = () => {
    var simLists = [];
    deviceLists.forEach(item => {
      var iccids = [];
      var tmp = vodacom.filter(element => element.type == item.label);
      tmp.forEach(element => {
        iccids.push(element.code);
      });
      if (iccids.length > 0) {
        simLists.push({
          network: item.label,
          product_id: item.value,
          iccids: iccids,
        });
      }
    });
    return simLists;
  };

  const showAlertModal = (message) => {
    if(alertModalRef.current)
      alertModalRef.current.alert(message);
  }

  return (
    <View style={styles.container}>
      
      <AlertModal ref={alertModalRef} />

      <CSingleSelectInput
        isKeyboardManager={false}
        key={'key'}
        description={'Stock Type'}
        placeholder={'Select Stock Type'}
        checkedValue={deviceType}
        items={deviceTypeLists}
        mode="single"
        hasError={errors['stockType']}
        disabled={false}
        onSelectItem={item => {
          setDeviceType(item.value);
          setErrors({...errors, stockType: false});
          var tmp = [];
          stockTypes[item.value].forEach(element => {
            tmp.push({value: element.product_id, label: element.label , additional_imei: element.additional_imei , msn_required: element.msn_required });
          });
          setDeviceLists(tmp);
        }}
        containerStyle={{marginTop: 10}}
      />

      <CSingleSelectInput
        isKeyboardManager={false}
        description={getLabel(deviceType)}
        placeholder={'Select ' + getLabel(deviceType)}
        checkedValue={productId}
        mode="single"
        items={deviceLists}
        hasError={errors['device']}
        disabled={false}
        onSelectItem={item => {          
          setDevice(item.label);
          setErrors({...errors, device: false});
          setProductId(item.value);
          setAdditionalImei(item.additional_imei);
          setMsnRequired(item.msn_required);          
        }}
        containerStyle={{marginTop: 15}}
      />

      {deviceType === Constants.stockType.DEVICE && (
        <DeviceView 
          additionalImei={additionalImei}
          msnRequired={msnRequired}
          onDataChanged={onDataChangedDevice} 
          errors={errors} />
      )}

      {deviceType === Constants.stockType.CONSUMABLE && (
        <ConsumableView
          onDataChanged={onDataChangedConsumable}
          errors={errors}
        />
      )}

      {deviceType === Constants.stockType.SIM && (
        <SimView
          count={count == 0 ? '' : count}
          codeLists={codeLists}
          removeCode={removeCode}
          isAdded={isAdded}
          addStock={() => {
            onSubmit();
          }}
          onDataChangedSim={onDataChangedSim}
        />
      )}

      <SubmitButton
        onSubmit={() => {
          onSubmit();
        }}
        title={Strings.Stock.Add_Stock}
        style={{marginTop: 20}}>
      </SubmitButton>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingTop: 10,
    marginHorizontal: 20,
    marginBottom: 30,
  },
});
