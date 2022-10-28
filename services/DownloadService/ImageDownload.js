
import RNFS, {
    DownloadFileOptions,
    DocumentDirectoryPath,
    downloadFile,
} from 'react-native-fs';


export function downloadFile(url , fileName , ext){
  
    return new Promise(function(resolve, reject){       
      //ExternalDirectoryPath
      const path = Platform.OS === 'ios' ?  `${RNFS.DocumentDirectoryPath}/${fileName}.${ext}` :  `${RNFS.ExternalDirectoryPath}/${fileName}.${ext}` ;    
      const headers = {
        'Accept': 'application/' + ext,
        'Content-Type': 'application/' + ext,
        'Authorization': `Bearer [token]`
      }
      //Define options
      const options: RNFS.DownloadFileOptions = {
        fromUrl: encodeURI(url),
        toFile: path,
        headers: headers
      }
      //Call downloadFile
      const response =  RNFS.downloadFile(options);    
      resolve(response.promise);
      
    });
  
}
  

  