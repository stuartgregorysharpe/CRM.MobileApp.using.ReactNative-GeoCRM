import { StyleSheet, Text, View , FlatList, TouchableOpacity } from 'react-native'
import React , { useEffect ,useState ,useCallback } from 'react'
import ProductItem from './items/ProductItem';
import ProductGroupItem from './items/ProductGroupItem';
import { useSelector } from 'react-redux';
import SearchBar from '../../../../components/SearchBar';
import { getJsonData } from '../../../../constants/Storage';
import SvgIcon from '../../../../components/SvgIcon';

const ProductSalesView = (props) => {

    const { settings, lists , page , isLoading} = props;    
    const productPriceLists = useSelector(
        state => state.sales.productPriceLists,
    );
    const [isEndPageLoading , setIsEndPageLoading] = useState(false);
    const [isPageLoading , setIsPageLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [haveFilter, setHaveFilter] = useState(false);

    useEffect(() => {
        setPageNumber(page);
    }, [page]);
    
    useEffect(() => {        
        checkFilter()
    }, [lists]);
    
    const checkFilter = async() => {
        var param = await getJsonData("@setup");
        var filters = param['filters'];
        var flag = false;        
        if(filters != '' && filters.product_type  && filters.brands){
            if(filters.product_type.length > 0 || filters.brands.length > 0){                
                flag = true;
            }
        }
        setHaveFilter(flag);
    }
 
    const renderItem = (item, index) => {

        const products = item.products;                
		if(parseInt(item.count) == 1){
			return (                
				<ProductItem 
                    key={index} 
                    settings={settings}
                    geProductPrice={(product_id, qty) => {
                        if(props.geProductPrice){
                            props.geProductPrice(product_id, qty)
                        }
                    }}
                    openProductDetail={(item) => {
                        if(props.openProductDetail){
                            props.openProductDetail(item);
                        }
                    }}
                    item={products.length == 1 ? products[0] : null } 
                    productPriceLists={productPriceLists}
                />
			)
		}
		if(parseInt(item.count) > 1){
			return (
				<ProductGroupItem key={index} 
                    onGroupItemClicked={() => {
                        if(props.onGroupItemClicked){
                            props.onGroupItemClicked(item);
                        }
                    }}
                    title={item.product_group} 
                    products={products} 
                />
			)
		}
	}

    const loadMoreData = useCallback(
        (pageNumber, searchKey) => {
            if (isEndPageLoading === false && isLoading === false) {          
                if(props.loadMoreData){                    
                    props.loadMoreData( pageNumber , searchKey);
                }
            }
        },
        [isEndPageLoading, isLoading ],
    )
            
    return (
        <View style={{alignSelf:'stretch',  flex:1}}>

            <SearchBar 
                isFilter
                haveFilter={haveFilter}
                isScan
                onSearch={(searchText) => {                    
                    //setSearchKey(searchKey);
                    if(searchText != '' , searchText.length >=2){
                        loadMoreData(0, searchText);
                    }
                    
                }}
                onSuffixButtonPress={() => {                    
                    if(props.openFilter){
                        props.openFilter();
                    }
                }}
            />
        
            <FlatList
                data={lists}
                renderItem={({item, index}) => renderItem(item, index)}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.props}
                onEndReached={() => {                    
                    loadMoreData(pageNumber, '')
                }}
                onEndReachedThreshold={1}
            />

            <View
                style={{
                    flexDirection:'row',
                    position:'absolute', 
                    bottom:10,
                    right:10
                }}                
                >
                {
                    settings != undefined && settings.allow_add_product === "1" &&
                    <TouchableOpacity
                        onPress={props.openAddProductModal}
                        >
                        <SvgIcon icon="Round_Btn_Default_Dark" width="70px" height="70px" />
                    </TouchableOpacity>
                }                

                <TouchableOpacity>
                    <SvgIcon icon="Sales_Cart" width="70px" height="70px" />
                </TouchableOpacity>
              
            </View>
            

        </View>
    )
}

export default ProductSalesView

const styles = StyleSheet.create({})