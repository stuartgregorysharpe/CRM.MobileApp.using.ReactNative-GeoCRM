import { postApiRequest } from "../../../actions/api.action";
import { getPostParameter } from "../../../constants/Helper";
import { checkConnectivity } from "../../../DAO/helper";

export const postGPSLocation = (currentLocation) => {

  if(currentLocation != undefined && currentLocation.latitude != undefined && currentLocation.longitude != undefined){

    var userParam = getPostParameter(currentLocation);
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
