import {View, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import CSingleSelectInput from '../../../../../components/common/SelectInput/CSingleSelectInput';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import DeviceView from './stock_types/DeviceView';
import ConsumableView from './stock_types/ConsumableView';
import SimView from './stock_types/SimView';
import {Constants, Strings} from '../../../../../constants';
import {validateNumber} from '../../../../../helpers/validateHelper';
import {useDispatch} from 'react-redux';
import {
  clearNotification,
  showNotification,
} from '../../../../../actions/notification.action';
import {Notification} from '../../../../../components/modal/Notification';

var vodacom = [];

export default function AddStockView(props) {
  const {deviceTypeLists, stockTypes} = props;

  const [deviceType, setDeviceType] = useState('');
  const [device, setDevice] = useState('');
  const [productId, setProductId] = useState('');
  const [deviceLists, setDeviceLists] = useState([]);
  const [codeLists, setCodeLists] = useState([]);
  const [enableAddStock, setEnableAddStock] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [count, setCount] = useState(0);
  const [imei, setEmei] = useState('');
  const [errors, setErrors] = useState({});

  var details = '';
  var quantity = '';

  const dispatch = useDispatch();

  useEffect(() => {
    if (codeLists.length > 0) {
      setCount(codeLists.length);
    }
  }, [codeLists]);

  const onDataChangedDevice = (det, qua) => {
    details = det;
    quantity = qua;
    setEmei(qua);
    if (quantity != '') {
      setEnableAddStock(true);
    } else {
      setEnableAddStock(false);
    }
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

  const getLabel = () => {
    if (deviceType === Constants.stockType.DEVICE) {
      return 'Device';
    }
    if (deviceType === Constants.stockType.CONSUMABLE) {
      return 'Product';
    }
    if (deviceType === Constants.stockType.SIM) {
      return 'Network';
    }
    return '';
  };

  const isValidate = () => {
    var isAvailable = true;

    if (deviceType == '') {
      setErrors({stockType: true});
      return false;
    }
    if (deviceType == Constants.stockType.DEVICE) {
      const _errors = {...errors};
      if (imei == '') {
        isAvailable = false;
        _errors['imei'] = true;
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
    if (isValidate()) {
      setErrors({});
      var data = {
        stock_type: deviceType,
        device: device,
        details: details,
        quantity: quantity,
      };
      console.log('D1', data);
      if (deviceType == Constants.stockType.DEVICE) {
        data = {
          stock_type: deviceType,
          product_id: productId,
          description: device,
          details: details,
          device_serial: imei,
        };
        console.log('D2', data);
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
      dispatch(
        showNotification({
          type: Strings.Success,
          message: getModalMessage(),
          buttonText: 'Ok',
          buttonAction: () => {
            dispatch(clearNotification());
          },
        }),
      );
    }
  };

  const getModalMessage = () => {
    if (deviceType == '') {
      return 'Please complete compulsory fields.';
    }
    if (
      deviceType == Constants.stockType.DEVICE ||
      deviceType == Constants.stockType.CONSUMABLE
    ) {
      return 'Please complete compulsory fields.';
    } else {
      return 'No sims scanned/selected.';
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

  return (
    <View style={styles.container}>
      <CSingleSelectInput
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
            tmp.push({value: element.product_id, label: element.label});
          });
          setDeviceLists(tmp);
        }}
        containerStyle={{marginTop: 10}}
      />

      <CSingleSelectInput
        description={getLabel()}
        placeholder={'Select ' + getLabel()}
        checkedValue={productId}
        mode="single"
        items={deviceLists}
        hasError={errors['device']}
        disabled={false}
        onSelectItem={item => {
          setDevice(item.label);
          setErrors({...errors, device: false});
          setProductId(item.value);
        }}
        containerStyle={{marginTop: 15}}
      />

      {deviceType === Constants.stockType.DEVICE && (
        <DeviceView onDataChanged={onDataChangedDevice} errors={errors} />
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
        style={{marginTop: 20}}></SubmitButton>
      <Notification />
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
