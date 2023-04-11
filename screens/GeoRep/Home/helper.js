import { postApiRequest } from "../../../actions/api.action";
import { getPostParameter } from "../../../constants/Helper";
import { getJsonData } from "../../../constants/Storage";
import { checkConnectivity } from "../../../DAO/helper";

export const postGPSLocation = async (currentLocation) => {
  var userParam = {};
  if(currentLocation != undefined && currentLocation.latitude != undefined && currentLocation.longitude != undefined){    
    userParam = getPostParameter(currentLocation);
  }else{
    userParam = getPostParameter(currentLocation);
    const location = await getJsonData("@current_location");    
    userParam.user_local_data.latitude = location?.latitude;
    userParam.user_local_data.longitude = location?.longitude;
  }
  
  var postData = {
    user_local_data: userParam.user_local_data,
  };
  
  checkConnectivity().then((isConnected) => {
    if(isConnected){
      console.log("trigger api call" , postData);
      postApiRequest('user/location-ping' , postData ,  null).then((res) => {
        console.log("response => ", res);
      }).catch((e) => {

      });
    }
  }).catch((e) => {

  });

  

}

export const generateTabs = features => {
  var tabs = [];
  var allTabs = getAllTabs();
  allTabs.forEach((element, index) => {
    if (element.slug === 'main' || features.includes(element.slug)) {
      tabs = [...tabs, {name: element.title, slug: element.slug, id: index}];
    }
  });
  return tabs;
};

const getAllTabs = () => {
  return [
    {
      title: 'Main',
      slug: 'main',
    },
    {
      title: 'Actions',
      slug: 'actions_items', 
    },
    {
      title: 'Leaderboard',
      slug: 'leaderboard',
    },
    {
      title: 'sales',
      slug: 'Sales',
    },
    {
      title: 'Orders',
      slug: 'dash_orders',
    },
    {
      title: 'Sales',
      slug: 'danone_sales_dash',
    },
  ];
};
