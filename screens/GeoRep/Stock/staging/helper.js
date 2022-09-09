export function getItemsFromShipments(shipments) {
  if (!shipments) return [];
  const items = [];
  shipments.forEach(shipment => {
    if (shipment.items && shipment.items.length > 0) {
      shipment.items.forEach(item => {
        items.push({
          shipment_id: shipment.shipment_id,
          network: shipment.network,
          date: shipment.date,
          ...item,
        });
      });
    }
  });
  return items;
}

export function getShipmentsFromItems(items) {
  if (!items) return [];
  const shipmentsMap = {};
  items.forEach(item => {
    if (!shipmentsMap[item.shipment_id]) {
      shipmentsMap[item.shipment_id] = [];
    }
    shipmentsMap[item.shipment_id].push(item);
  });
  const shipments = [];
  Object.values(shipmentsMap).forEach(shipmentItems => {
    if (shipmentItems && shipmentItems.length > 0) {
      const item = shipmentItems[0];
      const shipment = {
        shipment_id: item.shipment_id,
        network: item.network,
        date: item.date,
        items: shipmentItems,
      };
      shipments.push(shipment);
    }
  });
  return shipments;
}

export function groupByNetworkFromItems(items) {
  if (!items) return [];
  const groupMap = {};
  items.forEach(item => {
    if (!groupMap[item.network]) {
      groupMap[item.network] = [];
    }
    groupMap[item.network].push(item);
  });
  const groups = [];
  Object.values(groupMap).forEach(groupItems => {
    if (groupItems && groupItems.length > 0) {
      const item = groupItems[0];
      const group = {
        network: item.network,
        items: groupItems,
      };
      groups.push(group);
    }
  });
  console.log('groups', groups);
  return groups;
}

export function filterItemsByBarcode(items, barcode) {
  if (!barcode) return [];
  return items.filter(
    x =>
      x.iccid == barcode ||
      x.box == barcode ||
      x.innerbox == barcode ||
      x.brick == barcode ||
      x.kit == barcode,
  );
}
export function filterItems(items, keyword) {
  if (!keyword) return items;
  return items.filter(
    x =>
      (x.description &&
        x.description.toLowerCase().includes(keyword.toLowerCase())) ||
      (x.stock_type &&
        x.stock_type.toLowerCase().includes(keyword.toLowerCase())) ||
      (x.serial && x.serial.toLowerCase().includes(keyword.toLowerCase())) ||
      (x.iccid && x.iccid.includes(keyword)) ||
      (x.box && x.box.includes(keyword)) ||
      (x.innerbox && x.innerbox.includes(keyword)) ||
      (x.brick && x.brick.includes(keyword)) ||
      (x.kit && x.kit.includes(keyword)),
  );
}
