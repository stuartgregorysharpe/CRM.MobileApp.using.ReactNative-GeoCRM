
import { View , BackHandler } from 'react-native'
import React , { useState , useEffect ,useRef , useCallback } from 'react'
import ProductSalesView from '../components/ProductSalesView';
import SetupFieldModal from '../modal/SetupFieldModal';
import ProductGroupModal from '../modal/ProductGroupModal';
import { Constants, Strings } from '../../../../constants';
import { useSelector , useDispatch } from 'react-redux';
import { GetRequestProductPriceDAO } from '../../../../DAO';
import { expireToken } from '../../../../constants/Helper';
import { PRODUCT_PRICE_LISTS } from '../../../../actions/actionTypes';
import ProductFilterModal from '../modal/ProductFilterModal';
import { getJsonData, storeJsonData } from '../../../../constants/Storage';
import ProductDetailsModal from '../modal/ProductDetailsModal';
import AddProductModal from '../modal/AddProductModal';
import { setProductPriceLists } from '../../../../actions/sales.action';
import { showNotification } from '../../../../actions/notification.action';

const  ProductSalesContainer = (props) => {
        
    const navigation = props.navigation;
	const productPriceLists = useSelector(
        state => state.sales.productPriceLists,
    );
	const { items , settings } = props;
    const [selectedGroupTitle, setSelectedGroupTitle] = useState("");
	const [selectedLocation , setSelectedLocation] =  useState(null);
	const [products, setProducts] = useState([])
    const setupFieldModalRef = useRef(null)
    const productGroupModalRef = useRef(null);
	const productFilterModalRef = useRef(null)
	const productDetailsModalRef  = useRef(null)
	const addProductModalRef = useRef(null)
	const [lists, setLists] = useState(null);	
	const [productDetailTitle, setProductDetailTitle] = useState("");
	const [product, setProduct] = useState();
	const [cartCount, setCartCount] = useState(0);
	const dispatch = useDispatch()

	//    ------------------------    DEFINE SETUP MOMDAL   ----------------------------
    useEffect(() => { 
		setupFieldModalRef.current.showModal();
	},[]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			setupFieldModalRef.current.showModal();
		});    
		return unsubscribe;
	}, [navigation]);
	//    ------------------------    END DEFINE SETUP MODAL   --------------------------

	//    ------------------------    RERENDER PRODUCT LIST AND PRODUCT LIST IN GROUP BY PRICE AND QTY   --------------------------------
	useEffect(() => {		
		if(items.length > 0){
			var tpLists = [...items];
			tpLists.forEach(item => {
				const originProducts = item.products;        
				const products = getProducts(originProducts);
				item.products =  products;
			});
			setLists(tpLists);
			updateProdoctsGroup()
		}		
	}, [items , productPriceLists]);

	const updateProdoctsGroup = useCallback(
		() => {						
			if(products.length > 0){				
				const tpLists = [...products];						
				const newProducts = getProducts(tpLists);				
				setProducts(newProducts);
			}
		},
		[products , productPriceLists ],
	)
	//   -------------------------     END  ----------------------------------------------------------------


	const updateProductPriceList = async(value) => {
		var setupData = await getJsonData("@setup");
		if(setupData != null && setupData != undefined  && setupData.location){			
			if(setupData.location.name != value.location.name || setupData.transaction_type !=  value.transaction_type){
				console.log("changed setup ", value)	
				dispatch(setProductPriceLists([]));
			}else{
				console.log("no changes", setupData.transaction_type, value.transaction_type)
			}
		}else{
			console.log("setup data", setupData)
		}

		var addProductLists = await getJsonData("@add_product");
		if(addProductLists != null && addProductLists != undefined)
			setCartCount(addProductLists.length)

	}


    const onSetupFieldModalClosed = ({ type, value}) => {
		if(type === Constants.actionType.ACTION_CLOSE){		
			setupFieldModalRef.current.hideModal();			
            if(props.getProductLists){		
				setSelectedLocation(value.location.name);		
				updateProductPriceList(value);
                props.getProductLists(value);				
            }			
		}
	}

	const onProductGroupModalClosed = ({type , value}) => {
		if(type === Constants.actionType.ACTION_CLOSE){		
			productGroupModalRef.current.hideModal()
		}
	}

	const onProductFilterModalClosed = ({type, value}) => {		
		if(type === Constants.actionType.ACTION_CLOSE){		
			productFilterModalRef.current.hideModal()
		}
		if(type === Constants.actionType.ACTION_DONE){
			console.log("Value", value)
			productFilterModalRef.current.hideModal();
			if(props.getProductListsByFilter){
                props.getProductListsByFilter(value);
			}
		}
		if(type === Constants.actionType.ACTION_FORM_CLEAR){
			clearFilter();
		}
	}

	const onProductDetailsModalClosed = ({type , value}) => {
		if(type === Constants.actionType.ACTION_DONE){
			saveFinalPrice(value);	
			if(productDetailsModalRef.current)
				productDetailsModalRef.current.hideModal()
		}
	}

	const onAddProductModalClosed = ({type , value}) => {
		if(type == Constants.actionType.ACTION_DONE){			
			addProductModalRef.current.hideModal();
			saveProducts(value);
		}
	}

	const clearFilter = async() => {
		var param = await getJsonData("@sale_product_parameter");
		param['filters'] = '';
		await storeJsonData("@sale_product_parameter" , param);
	}

	const saveFinalPrice = async(value) =>{
		console.log("final  price")
		var lists = await getJsonData("@final_price");
		var finalPrices = [];
		if(lists != null && lists != undefined){
			console.log("lists",lists)
			finalPrices = lists.filter(item => item.product_id != value.product_id);
		}
		finalPrices.push(value);	
		storeJsonData("@final_price", finalPrices);
	}

	const saveProducts = async(value) =>{		
		var lists = await getJsonData("@add_product");
		var products = [];
		if(lists != null && lists != undefined){			
			products = lists.filter(item => item.add_product_id != value.add_product_id);
		}
		products.push(value);	
		setCartCount(products.length);
		console.log("add products", products);
		storeJsonData("@add_product", products);
	}


	const onGroupItemClicked = (item) => {				
		setSelectedGroupTitle(item.product_group);		
		const products = getProducts(item.products);		
		setProducts(products);
		productGroupModalRef.current.showModal()

	}

	const getProducts = useCallback((products) => {	
		var lists = [];
		if(products != undefined){
			products.forEach(element => {            
				const product = productPriceLists.find(item => item != undefined && parseInt(item.product_id) == parseInt(element.product_id));
				if(product != undefined){                
					element.price = product.price;     
					element.special = product.special;					
					lists.push({
						...element,                    
						qty:  product.qty
					})
				}else{
					lists.push({
						...element,                    
						qty:  0
					})
				}
			});
		}
        
        return lists;	
	}, [productPriceLists]);

	const geProductPrice = (product_id, qty) => {
		const param = {
			product_id : product_id,
			qty : qty
		}
	
		GetRequestProductPriceDAO.find(param).then((res) => {
			console.log(res)
			if(res.status === Strings.Success){
				console.log("price res", res)
				const price = res.price;             
				const special = res.special;
				updateProductPriceLists(product_id, price, qty , special);
			}
		}).catch((e) => {
			expireToken(dispatch, e);
		})
	}

	const updateProductPriceLists = useCallback( async(product_id , price , qty , special) => {		
		var lists = [...productPriceLists];         
        const check =  lists.find(item => parseInt(item.product_id) == parseInt(product_id) );        
        if(check != undefined){
			var tmp = [];
			lists.forEach((item, index) => {
				if(parseInt(item.product_id) == parseInt(product_id)){
					tmp.push({product_id: product_id , price: price , qty: qty , special:special});
				}else{
					tmp.push(item);
				}
			});
            lists = tmp;
        }else{        
            lists.push({product_id: product_id , price: price , qty: qty , special: special});
        }		    	
		dispatch({type: PRODUCT_PRICE_LISTS, payload: lists});

      }, [productPriceLists]);

	const openProductDetail = (item) => {		
		setProductDetailTitle(item.product_name);
		setProduct(item);
		if(productDetailsModalRef.current)
			productDetailsModalRef.current.showModal();
	}

	const openAddProductModal = () => {
		addProductModalRef.current.showModal();
	}

	const openSetup = () =>{
		setupFieldModalRef.current.showModal();
	}
	const openReorder = () => {
		dispatch(showNotification({type:Strings.Success , message: 'Feature not available yet' , buttonText: Strings.Ok}));
	}

    return (
        <View style={{
            alignSelf:'stretch' , 
            flex:1 ,                                 
        }}>                              

            <SetupFieldModal 
				title="Define Setup"
				hideClear
				backButtonDisabled={true}
				closableWithOutsideTouch={false}
				ref={setupFieldModalRef}
				hideDivider={true}
				modalType={Constants.modalType.MODAL_TYPE_CENTER}
				onButtonAction={onSetupFieldModalClosed}
			/>

			<ProductGroupModal
				title={selectedGroupTitle}
				products={products}
				settings={settings}
				geProductPrice={geProductPrice}	
				openProductDetail={openProductDetail}
				backButtonDisabled={true}
				closableWithOutsideTouch={false}
				ref={productGroupModalRef}
				onButtonAction={onProductGroupModalClosed}
			/>

			<ProductFilterModal
				title="Filter your search"
				clearText = "Clear Filters"
				closableWithOutsideTouch={false}
				ref={productFilterModalRef}
				onButtonAction={onProductFilterModalClosed}
			/>

			<ProductDetailsModal 
				title={productDetailTitle}
				product={product}
				settings={settings}
				onButtonAction={onProductDetailsModalClosed}
				ref={productDetailsModalRef}
			/>

			<AddProductModal 				
				onButtonAction={onAddProductModalClosed}
				ref={addProductModalRef}
			/>

            <ProductSalesView
				geProductPrice={geProductPrice}
				onGroupItemClicked={onGroupItemClicked}
				openProductDetail={openProductDetail}
				openAddProductModal={openAddProductModal}
				openSetup={openSetup}
				openReorder={openReorder}
				openFilter={() => {					
					productFilterModalRef.current.showModal();
				}}
				lists={lists}
				cartCount={cartCount}
				selectedLocation={selectedLocation}
                {...props} />
            
        </View>
    )
}
export default ProductSalesContainer;