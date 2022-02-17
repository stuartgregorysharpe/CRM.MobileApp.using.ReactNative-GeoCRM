
export function load() {
    return new Promise((resolve, reject) => {

        let item = {         
            address: "",
            contacts:[],
            coordinates: "",
            current_outcome_id: "",
            disposition_fields: [],
            last_interaction:"",
            last_visit:"",
            location_id:"",
            location_image:"",
            location_name:"",
            outcomes:[{linked_stage_id:'', outcome_id:'', outcome_name:''}],
            stages:[{stage_id:'',stage_name:''}]
        } 
        resolve(item);
    });  
  }
  
  export default {
    load,
  };
  