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
  return groups;
}

export function filterItems(items, keyword) {
  if (!keyword) return items;
  return items;
}
