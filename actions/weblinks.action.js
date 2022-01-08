
import axios from "axios";

export function getWebLinks(base_url, token, params)
{    
    return new Promise(function(resolve, reject) {    
        
        console.log("axis", `${base_url}/weblinks`);
        console.log("token", token);
        axios
        .get(`${base_url}/weblinks`, {
          params: params,
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then((res) => {      
          console.log("suc")  ;
          if (res.data == undefined) {            
            resolve([]);
          }
          console.log(res.data);
          if(res.data.status == "success"){
            resolve(res.data.weblinks);
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
