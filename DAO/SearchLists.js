
export function load() {
  return new Promise((resolve, reject) => {
    
    var searchLists = [];
    for(var i = 0 ; i < 10; i++){
        let item = {
            name: "",
            address: "",
            distance: "",
            status: "",
            location_id: "",
            status_text_color:""
        }
        searchLists.push(item);
    } 
    resolve(searchLists);
  });  
}

export default {
  load,
};
