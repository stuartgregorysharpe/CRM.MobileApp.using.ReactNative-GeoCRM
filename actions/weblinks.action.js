
import axios from "axios";

export const getWebLinks = () => (dispatch, getState) => {    
    axios
      .get(`${getState().selection.payload.user_scopes.geo_rep.base_url}/weblinks`, {
        params: {          
        },
        headers: {
          Authorization: 'Bearer ' + getState().selection.token
        }
      })
      .then((res) => {
        if (res.data == undefined) {
          
          dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
          return;
        }

        console.log("res.data.weblinks" , res.data.weblinks);
        if (res.data.status == 'success') {
          dispatch({ type: CHANGE_LOCATION_FILTERS, payload: res.data.weblinks })
        }

      })
      .catch((err) => {
        dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
        console.log(err);
      })
  }
