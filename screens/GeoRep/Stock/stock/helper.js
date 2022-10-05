import {Constants} from '../../../../constants';

export function getItemsFromStockItems(stockItems) {
  if (!stockItems) return [];
  const items = [];
  stockItems.forEach(stockItem => {
    if (stockItem.stock_type == Constants.stockType.SIM) {
      if (stockItem.items && stockItem.items.length > 0) {
        stockItem.items.forEach(item => {
          items.push({
            stock_type: stockItem.stock_type,
            network: stockItem.network,
            date: stockItem.date,
            ...item,
          });
        });
      }
    } else {
      items.push(stockItem);
    }
  });
  return items;
}


export function getStockItemsFromItems(items) {
  if (!items) return [];
  const stockItemMap = {};
  const stockItems = [];
  items.forEach(item => {
    if (item.stock_type == Constants.stockType.SIM) {
      if (!stockItemMap[item.network]) {
        stockItemMap[item.network] = [];
      }
      stockItemMap[item.network].push(item);
    } else {
      stockItems.push(item);
    }
  });

  Object.values(stockItemMap).forEach(stockItemItems => {
    if (stockItemItems && stockItemItems.length > 0) {
      const item = stockItemItems[0];
      const stockItem = {
        stock_type: item.stock_type,
        network: item.network,
        date: item.date,
        items: stockItemItems,
      };
      stockItems.push(stockItem);
    }
  });
  return stockItems;
}

export function captureDeviceStockItem(items, barcode) {
  if (!items) return null;
  const capturedDevice = items.find(
    x =>
      x.stock_type != Constants.stockType.SIM &&
      x.serial &&
      x.serial == barcode,
  );
  return capturedDevice;
}

export function filterItems(items, keyword, filters) {
  return items.filter(x => {
    if (filters && filters.stockType && filters.stockType != x.stock_type) {
      return false;
    }
    if (!keyword) return true;
    return (
      (x.description &&
        x.description.toLowerCase().includes(keyword.toLowerCase())) ||
      (x.stock_type &&
        x.stock_type.toLowerCase().includes(keyword.toLowerCase())) ||
      (x.serial && x.serial.toLowerCase().includes(keyword.toLowerCase())) ||
      (x.network && x.network.toLowerCase().includes(keyword.toLowerCase())) ||
      (x.iccid && x.iccid.includes(keyword)) ||
      (x.box && x.box.includes(keyword)) ||
      (x.innerbox && x.innerbox.includes(keyword)) ||
      (x.brick && x.brick.includes(keyword)) ||
      (x.kit && x.kit.includes(keyword))
    );
  });
}
