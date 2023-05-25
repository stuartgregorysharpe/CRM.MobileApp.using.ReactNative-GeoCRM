
import RNFS, {
    DownloadFileOptions,
    DocumentDirectoryPath,
    downloadFile,
} from 'react-native-fs';
import { getFileName } from '../../constants/Utils';
import { Platform }  from 'react-native';
import { Constants } from '../../constants';



export function downloadImageFile(url , fileName , ext){
  
    return new Promise(function(resolve, reject){       
      //ExternalDirectoryPath
      const path = Platform.OS === 'ios' ?  `${RNFS.DocumentDirectoryPath}/${fileName}.${ext}` :  `${RNFS.ExternalDirectoryPath}/${fileName}.${ext}` ;    
      const headers = {
        'Accept': 'application/' + ext,
        'Content-Type': 'application/' + ext,
        'Authorization': `Bearer [token]`
      }
      //Define options

      RNFS.exists(path).then((res) => {
        if (res) {
          resolve({statusCode:200, bytesWritten:100});
        }else{
          const options: RNFS.DownloadFileOptions = {
            fromUrl: encodeURI(url),
            toFile: path,
            headers: headers
          }
          //Call downloadFile
          const response =  RNFS.downloadFile(options);    
          resolve(response.promise);
        }
      }).catch((e) => {
        reject(e);
      })
            
    });
  
}
  

export function downloadImageFiles(photos){

  console.log("photos", photos);

  return new Promise( async function(resolve, reject) {

    var localPaths = [];
    if(photos != undefined){
      for(let i = 0; i < photos.length; i++){     
        if(photos[i].includes("http")){        
          var downloadFile = getFileName(photos[i]);
          console.log("file path", photos[i], JSON.stringify(downloadFile) );
          var fileName =  downloadFile.name;
          var ext = downloadFile.ext;      
  
          var res = await downloadImageFile(photos[i], fileName, ext);
          console.log("download res", res);
          if ( res && res.statusCode === 200 && res.bytesWritten > 0 ){
            var path = Platform.OS === 'ios' ?  `${RNFS.DocumentDirectoryPath}/${fileName}.${ext}` :  `${RNFS.ExternalDirectoryPath}/${fileName}.${ext}` ;        
            if (!path.includes('file://')) {
              path = 'file://' + path;
            }
            localPaths.push(path);
          } 
        }else{
          localPaths.push(photos[i]);
        }      
      }   
    }     
    resolve(localPaths);

  });

}

export async function downloadFormQuestionImages (formQuestionGroups) {

  try{

    const questions = [];
    formQuestionGroups.forEach(formQuestionGroup => {
      questions.push(...formQuestionGroup.questions);
    });

    for (let i = 0; i < questions.length; i++) {
      var item = questions[i];
      
      if (
        item.question_type === 'upload_file' ||
        item.question_type === 'take_photo' ||
        (item.question_type === 'yes_no' && (item.yes_image && item.yes_image != '' && item.yes_image.length > 0 || item.no_image && item.no_image !='' && item.no_image.length > 0))
      ) { 
        
        if(item.question_type === "yes_no"){
          console.log("yes image start");
          if( item.yes_image && item.yes_image != undefined && item.yes_image.length > 0 ){            
            var photo = await downloadImageFiles(item.yes_image);
            item.yes_image = photo;
          }
    
          if( item.no_image && item.no_image != undefined && item.no_image.length > 0 ){            
            var photo = await downloadImageFiles(item.no_image);
            item.no_image = photo;
          }
        }else{
          var photos = await downloadImageFiles(item.value);
          item.value = photos;
        }

      } else if (
        item.question_type ===
        Constants.questionType.FORM_TYPE_MULTI_SELECT_WITH_THOTO
      ) {

          var photos = [];
          if(item.value != ''){
            item.value.forEach((element) => {
              photos.push(element.image);
            });        
            var paths = await downloadImageFiles(photos);
            
            var tmp = [];
            if(paths.length == item.value.length){            
              item.value.forEach((element , index) => {
                tmp.push({value: element.value, image: paths[index] });              
              });
              item.value = tmp;
            }        
          }          
      }    
      //questions[i]
    }
    return formQuestionGroups;  
    
  }catch(e){
    console.log("downlad error => ", e);
    return formQuestionGroups;
  }
  

}