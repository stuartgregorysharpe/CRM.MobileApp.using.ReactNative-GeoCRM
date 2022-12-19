import { StyleSheet, Text, View , FlatList } from 'react-native'
import React , { useEffect ,useState ,useCallback } from 'react'
import CSingleSelectInput from '../../../../components/common/SelectInput/CSingleSelectInput'
import { SubmitButton } from '../../../../components/shared/SubmitButton';
import { style } from '../../../../constants/Styles';
import { whiteLabel } from '../../../../constants/Colors';
import { Fonts } from '../../../../constants';
import { getJsonData } from '../../../../constants/Storage';

const ProductFilterView = (props) => {    

    const { typeLists, brandLists ,isClearFilter } = props;
                
    const [types, setTypes] = useState([]);
    const [brands, setBrands] =  useState([]);

    useEffect(() => {
        initializeData();
    }, []);
    
    useEffect(() => {
        if(isClearFilter){
            setTypes([]);
            setBrands([]);
        }        
    }, [isClearFilter]);

    const initializeData = async() => {
        var params = await getJsonData("@sale_product_parameter");
        if(params != null){
            var filters =  params['filters'];
            if(filters.product_type){
                setTypes(filters.product_type)
            }
            if(filters.brands){
                setBrands(filters.brands)
            }
        }    
    }
 
    return (
        <View style={{alignSelf:'stretch',  flex:1 , marginTop:10}}>
            
            <CSingleSelectInput
                bgType="card"
                bgStyle={[style.card, {borderWidth:0}]}
                placeholderStyle={{fontFamily:Fonts.secondaryMedium}}
                description={'Product Type'}
                placeholder={'Product Type'}
                mode='multi'
                checkedValue={types}
                items={typeLists}
                hasError={false}
                disabled={false}
                onSelectItem={item => {             
                    if(types.includes(item.value)){
                        setTypes(types.filter(element => element != item.value));                        
                      }else{
                        setTypes([...types, item.value]);                        
                    }                            
                    if(props.haveFilter){
                        props.haveFilter();
                    }
                }}
                //onClear={() => setTypes([]) }
                containerStyle={{marginTop: 0 , marginLeft:5, }}
            /> 

            <CSingleSelectInput
                bgType="card"
                bgStyle={[style.card, {borderWidth:0}]}
                placeholderStyle={{fontFamily:Fonts.secondaryMedium}}
                description={'Product Brand'}
                placeholder={'Product Brand'}
                mode='multi'
                checkedValue={brands}
                items={brandLists}
                hasError={false}
                disabled={false}
                onSelectItem={item => {                        
                    if(brands.includes(item.value)){
                        setBrands(brands.filter(element => element != item.value));                        
                      }else{
                        setBrands([...brands, item.value]);                       
                    }   
                    if(props.haveFilter){
                        props.haveFilter();
                    }
                }}
                //onClear={() => setType('') }
                containerStyle={{marginTop: 0 , marginLeft:5, }}
            />             

            <SubmitButton 
                onSubmit={() => {
                    if(props.applyFilter){
                        props.applyFilter({product_type:types, brands: brands});
                    }
                }}
                haveNextIcon={false}
                title="Appy  Filters" />
     
        </View>
    )
}

export default ProductFilterView

const styles = StyleSheet.create({})