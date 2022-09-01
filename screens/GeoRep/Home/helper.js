

export const generateTabs = ( tabs, features) => {

    var tmp = [];
    if (features.includes('actions_items')) {
      tmp = [...tabs, {name: 'Actions', id: tabs.length + 1}];
    }
    if (features.includes('leaderboard')) {
      tmp = [...tmp, {name: 'Leaderboard', id: tmp.length + 1}];
    }
    if (features.includes('sales')) {
      tmp = [...tmp, {name: 'Sales', id: tmp.length + 1}];
    }
    return tmp;
    
}