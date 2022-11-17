import {Strings} from '../constants';
import {ExecuteQuery} from '../sqlite/DBHelper';
import GetRequest from './GetRequest';

export function find() {
  return new Promise(function (resolve, reject) {
    GetRequest.call('contentlibrary')
      .then(async res => {
        if (res.status == Strings.Success && res.isConnected) {
          resolve(res.data);
        } else if (res.status == Strings.Success && !res.isConnected) {
          const client_id = res.data.client_id;
          const business_unit_id = res.data.business_unit_id;
          const user_id = res.data.user_id;

          if (client_id && business_unit_id) {
            const lists = await fetchDataFromDB(business_unit_id, client_id);
            const assets_path = await getAssetsPath(
              client_id,
              business_unit_id,
            );
            resolve({
              status: Strings.Success,
              folders: getData(lists, assets_path),
            });
          } else {
            reject();
          }
        } else {
          reject(res.status);
        }
      })
      .catch(e => {
        reject(e);
      });
  });
}

const fetchDataFromDB = async (business_unit_id, client_id) => {
  const query = generateQuery();
  const res = await ExecuteQuery(query, [business_unit_id, client_id]);
  return res.rows ? res.rows : [];
};
const getFileSizeString = file_size => {
  const fileSize = Number(file_size);
  console.log(fileSize);
  if (fileSize < 1024) return fileSize + ' b';
  if (fileSize >= 1024 && fileSize < 1024 * 1024)
    return (fileSize / 1024).toFixed(2) + ' kb';
  if (fileSize >= 1024 * 1024 && fileSize < 1024 * 1024 * 1024)
    return (fileSize / (1024 * 1024)).toFixed(2) + ' mb';
  return (fileSize / (1024 * 1024 * 1024)).toFixed(2) + ' gb';
};

const generateQuery = () => {
  const query = `SELECT cc.category_name,c.filename,
       c.file_size,
       DATE(c.time_stamp) AS "modified_date"
      FROM content AS c
      LEFT JOIN content_categories AS cc 
      ON c.category_id = cc.category_id
      WHERE c.business_unit_id = ?
      AND c.client_id = ?
      AND c.delete_status = 0
      AND cc.delete_status = 0
      ORDER BY cc.category_name,c.filename`;
  return query;
};

const getAssetsPath = async (client_id, business_unit_id) => {
  const query = `SELECT 
                assets_path 
              FROM client_settings 
              WHERE client_id = ?
              AND business_unit_id = ?`;
  const res = await ExecuteQuery(query, [client_id, business_unit_id]);

  if (res.rows && res.rows.length > 0) {
    return res.rows.item(0).assets_path;
  }
  return '';
};

const getData = (lists, assets_path) => {
  const foldersArrayData = {};
  for (let i = 0; i < lists.length; i++) {
    const item = lists.item(i);

    const categoryName = item.category_name;
    if (foldersArrayData[categoryName]) {
      //Increment file count
      foldersArrayData[categoryName]['file_count'] =
        foldersArrayData[categoryName]['file_count'] + 1;
      //Load file details into folder

      const fileDetails = {
        filename: item.filename,
        file_path: assets_path + 'content_library/' + item.filename,
        modified_date: item.modified_date,
        file_size: getFileSizeString(item.file_size),
      };
      if (!foldersArrayData[categoryName]['files']) {
        foldersArrayData[categoryName]['files'] = [];
      }
      foldersArrayData[categoryName]['files'].push(fileDetails);
    } else {
      foldersArrayData[categoryName] = {};
      //Create folder details in array
      foldersArrayData[categoryName]['folder_name'] = categoryName;
      foldersArrayData[categoryName]['file_count'] = 1;

      //Load file details into folder
      const fileDetails = {
        filename: item.filename,
        file_path: assets_path + 'content_library/' + item.filename,
        modified_date: item.modified_date,
        file_size: getFileSizeString(item.file_size),
      };
      if (!foldersArrayData[categoryName]['files']) {
        foldersArrayData[categoryName]['files'] = [];
      }
      foldersArrayData[categoryName]['files'].push(fileDetails);
    }
  }
  return Object.values(foldersArrayData);
};

export default {
  find,
};
