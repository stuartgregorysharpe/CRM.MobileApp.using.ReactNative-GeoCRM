export function getTotalCartProductList(productPriceList, addProductList) {
  const totalCartProductList = [...productPriceList];
  addProductList.forEach(item => {
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
      },
      isAddProduct: true,
    });
  });

  return totalCartProductList;
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
    console.log('price', price);
    console.log('item', product);
    subTotal += price * quantity;
  });
  tax = subTotal * taxRate;
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

export function updateProductPrice(dispatch, productPriceList, product, qty) {}
