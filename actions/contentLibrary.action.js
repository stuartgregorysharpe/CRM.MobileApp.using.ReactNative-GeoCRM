
import axios from "axios";
import RNFS, { DownloadFileOptions , DocumentDirectoryPath , downloadFile} from 'react-native-fs';


export function getContentLibrary(base_url, token, params)
{    
    return new Promise(function(resolve, reject) {                    
        axios
        .get(`${base_url}/contentlibrary`, {
          params: params,
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then((res) => {          
          console.log("res.data.folders)",res.data.folders);
          if (res.data == undefined) {            
            resolve([]);
          }
          if(res.data.status == "success"){
            resolve(res.data.folders);
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

export function downloadPDF(url, fileName, ext){
  
  return new Promise(function(resolve, reject){       
    //ExternalDirectoryPath
    const path = Platform.OS === 'ios' ?  `${RNFS.DocumentDirectoryPath}/${fileName}.${ext}` :  `${RNFS.ExternalDirectoryPath}/${fileName}.${ext}` ;
    console.log(path);

    const headers = {
      'Accept': 'application/pdf',
      'Content-Type': 'application/pdf',
      'Authorization': `Bearer [token]`
    }

    //Define options
    const options: RNFS.DownloadFileOptions = {
      fromUrl: url,
      toFile: path,
      headers: headers
    }
    //Call downloadFile
    const response =  RNFS.downloadFile(options);    
    resolve(response.promise);
    
  });

}
