
import axios from "axios";

export function getCalendar(base_url, token, period)
{    
    return new Promise(function(resolve, reject) {    
        console.log("lnk", `${base_url}/calendar?period=${period}`);   
        console.log("token", token);
       
        axios
        .get(`${base_url}/calendar?period=${period}`, {
          params: {},
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then((res) => {      
          
          if (res.data == undefined) {            
            resolve([]);
          }
          
          if(res.data.status == "success"){
            resolve(res.data.items);
          }else{
            resolve([]);
          }
        })
        .catch((err) => {        
          console.log("load list4", err);
          reject(err);          
        })        

    });    
}
