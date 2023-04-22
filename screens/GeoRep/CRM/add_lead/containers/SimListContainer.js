
import { View , StyleSheet} from 'react-native'
import React , {useEffect, useState , useRef ,useImperativeHandle} from 'react'
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import { Constants, Strings } from '../../../../../constants';
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
    },

    titleStyle:{
        color: whiteLabel().mainText  
    },

})
