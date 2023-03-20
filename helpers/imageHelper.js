import { Platform } from "react-native";
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';

export const optimizeImage = async (filePath, quality, index , isOptimize , onOptimizedImage) => {
    
    var outputPath =
      Platform.OS === 'ios'
        ? `${RNFS.DocumentDirectoryPath}`
        : `${RNFS.ExternalDirectoryPath}`;
    var width_height = 800;
    if (isOptimize) {
      width_height = 500;
    }
    ImageResizer.createResizedImage(
      filePath,
      width_height,
      width_height,
      'JPEG',
      quality,
      0,
      outputPath,
    )
      .then(res => {
        console.log("file size => ", res , isOptimize)        
        if (isOptimize) {
          if (res.size < 1024 * 200 || index >= 2) {
            onOptimizedImage(res);
          } else {
            var newQuality = (1024 * 200 * 100) / res.size;
            optimizeImage(res.uri, newQuality, index + 1 , isOptimize , (imgRes) => {
                onOptimizedImage(imgRes);
            });
          }
        } else {
            console.log("res size", res.size , index);
          if (res.size < 1024 * 500 || index >= 2) {
            onOptimizedImage(res);
          } else {
            var newQuality = (1024 * 500 * 100) / res.size;
            optimizeImage(res.uri, newQuality, index + 1 , isOptimize , (imgRes) => {
                onOptimizedImage(imgRes);
            });
          }
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  };
