import {getJsonData} from '../../../constants/Storage';

export function getTotalCartProductList(
  productPriceList,
  addProductList,
  currency,
) {
  const totalCartProductList = productPriceList.filter(
    x => parseInt(x.qty) > 0,
  );
  const symbol = currency?.symbol || 'R';
  addProductList.forEach(item => {
    if (item && item.price) {
      totalCartProductList.push({
        price: item.price.value,
        product_id: item.add_product_id,
        qty: item.quantity,
        product: {
          ...item,
          product_images: item.product_image,
          product_id: item.add_product_id,
          price: item.price.value,
          qty: item.quantity,
          qty_increments: 1,
          symbol: symbol,
        },
        isAddProduct: true,
      });
    }
  });
  totalCartProductList.sort((a, b) => (a.product_id > b.product_id ? 1 : -1));
  return totalCartProductList;
}
export function getProductItemDataForRender(productItem) {
  let finalPrice = 0;
  let price = productItem.product.price;
  if (
    productItem.finalPrice != undefined &&
    productItem.finalPrice != '' &&
    productItem.finalPrice.final_price != undefined
  ) {
    finalPrice = productItem.finalPrice.final_price;
  }
  if (
    productItem.price != undefined &&
    productItem.price != '' &&
    productItem.price != 0
  ) {
    price = productItem.price;
  }
  return {
    ...productItem.product,
    price,
    finalPrice,
    qty: productItem.qty,
    special: productItem.special,
    isAddProduct: productItem.isAddProduct,
  };
}
export function calculateDiscountAmount(productItem) {
  let discountPrice = 0;
  if (productItem && productItem.finalPrice && productItem.finalPrice != '') {
    discountPrice =
      Number(productItem.finalPrice.adjustedPrice) -
      Number(productItem.finalPrice.final_price);
  }
  return discountPrice;
}
export function calculatePrice(productItem) {
  if (!productItem) return 0;
  let price = productItem?.price;
  if (productItem?.finalPrice && productItem.finalPrice != '') {
    return Number(productItem?.finalPrice?.final_price);
  }
  if (!price) return 0;
  return Number(price);
}
export function calculateCartStatistics(productList, taxRate = 0) {
  let totalUnitCount = 0;
  let totalDiscount = 0;
  let subTotal = 0;
  let tax = 0;

  productList.forEach(product => {
    const quantity = Number(product.qty);
    totalUnitCount += quantity;
    totalDiscount += calculateDiscountAmount(product);
    const price = calculatePrice(product);
    subTotal += price * quantity;
  });
  tax = subTotal * (taxRate / 100);
  const total = tax + subTotal;
  const cartStatistics = {
    itemCount: productList.length,
    unitCount: totalUnitCount,
    discount: totalDiscount,
    subTotal: subTotal,
    tax: tax,
    total: total,
  };
  return cartStatistics;
}

export function getWarehouseGroups(productList) {
  const groupsMap = {};
  productList.forEach(product => {
    if (product.product?.warehouse_id) {
      const warehouseId = product.product?.warehouse_id;
      const warehouseName = product.product?.warehouse_name;
      if (!groupsMap[warehouseId]) {
        groupsMap[warehouseId] = {
          warehouse_id: warehouseId,
          title: warehouseName,
          itemCount: 1,
        };
      } else {
        groupsMap[warehouseId].itemCount = groupsMap[warehouseId].itemCount + 1;
      }
    }
  });
  return Object.values(groupsMap);
}
export function filterProducts(productList, params) {
  if (!params) return productList;
  return productList.filter(x => {
    return (
      !params?.warehouse_id || x?.product?.warehouse_id == params?.warehouse_id
    );
  });
}

export function updateProductPrice(dispatch, productPriceList, product, qty) {}

export const configProductSetUp = async (value, callBack) => {
  var setupData = await getJsonData('@setup');
  if (setupData != null && setupData != undefined && setupData.location && setupData.transaction_type) {        
    if (
      setupData.location.name != value.location.name ||
      setupData.transaction_type.type != value.transaction_type.type
    ) {
      console.log('config changed');
      callBack('changed');
    } else {
      console.log('config continue');
      callBack('continue');
    }
  } else {
    console.log('config changed with null');
    callBack('changed');
  }
};

export const onCheckProductSetupChanged = async (value, callBack) => {
  var setupData = await getJsonData('@setup');
  console.log("setup data ==>" , setupData);
    console.log("value", value);
  if (value && setupData != null && setupData != undefined && setupData.location && setupData.transaction_type && setupData.warehouse_id && setupData.currency_id) {        

    

    if (
      setupData.location.name != value.location.name ||
      setupData.transaction_type.type != value.transaction_type.type || 
      setupData.currency_id.id != value.currency_id.id || 
      setupData.warehouse_id.length != value.warehouse_id.length
    ) {      

      callBack('changed');

    } else {      
      callBack('continue');
    }
  } else {    
    callBack('changed');
  }

}


export const getConfigFromRegret = regret => {
  return {
    currency_id: {
      abbreviation: regret.abbreviation,
      exchange_rate: regret.exchange_rate,
      symbol: regret.symbol,
      tax_rate: regret.tax_rate,
      id: regret.currency_id,
    },
    location: {
      address: regret.address,
      name: regret.location_name,
      location_id: regret.location_id,
    },
    transaction_type: {
      type: 'Order',
      warehouse_required: '1',
    },
    warehouse_id: [
      {
        id: '0',
        label: 'all',
      },
    ],
    regret_id: regret.regret_id,
  };
};
