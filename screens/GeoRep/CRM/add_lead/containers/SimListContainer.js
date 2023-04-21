
import { View , StyleSheet} from 'react-native'
import React , {useEffect, useState , useRef ,useImperativeHandle} from 'react'
import SelectDevicesView from '../components/SelectDevicesView';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import StockSignatureModal from '../../../Stock/stock/modal/device/StockSignatureModal';
import { Constants, Strings } from '../../../../../constants';
import { GetRequestStockListsDAO } from '../../../../../sDAO';
import { expireToken } from '../../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import ViewListsModal from '../modal/ViewListsModal';
import SvgIcon from '../../../../../components/SvgIcon';
import SimListView from '../components/SimListView';
import SimAddModal from '../../devices/modal/SimAddModal';
import { whiteLabel } from '../../../../../constants/Colors';
var isMount = true;

const SimListContainer = React.forwardRef((props, ref) => {

    const  { selectedRICAs } = props;

    const [simList , setSimList] = useState([]);

    const simAddModalRef = useRef();

    useEffect(() => {
        setSimList(selectedRICAs);
    }, [selectedRICAs]);

    const onSimAddModalClosed = ({type , value}) => {
        if( type == Constants.actionType.ACTION_CLOSE){
            simAddModalRef.current.hideModal();        
            onRefresh(value);
        }
    }

    const onRefresh  = (value) => {
        const changedSimList = [...simList, value];
        setSimList(changedSimList);
    }

    const onAdd = () => {
        if(simAddModalRef.current){
            simAddModalRef.current.showModal();
        }
    }
    

    const onAllocate = () => {
        if(props.onButtonAction){
            props.onButtonAction({type: Constants.actionType.ACTION_DONE , value: simList});
        }
    }

    const onItemSelected = (item) => {

    }

    const removeSim = (sim) => {
        const changedSimList = simList.filter(element => element != sim);
        setSimList(changedSimList);
    }

    return (
        <View style={{alignSelf:'stretch' , flex:1}}>

            <SimListView 
                simList={simList}
                onItemSelected={(item) =>onItemSelected(item)}
                removeSim={removeSim}
                {...props}
            />

            {/* <SubmitButton style={{marginHorizontal:10}} title={Strings.Stock.Allocate_Device} onSubmit={allocateSims}/> */}

            <View style={styles.container}>
                <SubmitButton 
                    onSubmit={() => { onAdd() }}
                    title="Add" 
                    style={styles.deleteBtnStyle}                     
                /> 
                <SubmitButton 
                    onSubmit={() => { onAllocate() }}
                    title="Allocate" 
                    style={{flex:1, marginLeft:10}}
                />
            </View>
            

            <SimAddModal
                title={Strings.CRM.RICA_MSISDN}
                clearText={'Close'}
                ref={simAddModalRef}
                location_id={''}
                simModalType={'add'}
                initialValue={''}
                location_device_id={''}
                type="add_lead"
                onButtonAction={onSimAddModalClosed}
            />

                       
        </View>
    )
}); 

export default SimListContainer;


const styles = StyleSheet.create({

    container : {
        marginHorizontal:10,
        marginTop: 20,
        marginBottom: 10,
        flexDirection:'row',
        alignSelf:'stretch',
    },

    deleteBtnStyle : {
        flex:1,
        // backgroundColor : 'white',
        // borderWidth:1,
        // borderColor: whiteLabel().fieldBorder,
    },

    titleStyle:{
        color: whiteLabel().mainText  
    },

})
