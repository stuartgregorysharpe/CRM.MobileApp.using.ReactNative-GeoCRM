import { Constants } from "../constants";
import { getPageNameByLinker } from "../constants/Helper";
import MoreNavigator from './MoreNavigator';

export function getBottomTabs (payload , selectProject) {

    var modules = [];
    if (selectProject === Constants.projectType.GEO_REP) {
      modules = payload.user_scopes.geo_rep.modules_nav_order;
    } else if (selectProject === Constants.projectType.GEO_LIFE) {
      modules = payload.user_scopes.geo_life.modules_nav_order;
    } else if (selectProject === Constants.projectType.GEO_CRM) {
      modules = payload.user_scopes.geo_crm.modules_nav_order;
    }
    var tmp = [];
    modules.forEach((element, index) => {
      if (index < 4) {
        tmp = [...tmp, getPageNameByLinker(selectProject, element)];
      }
    });
    tmp = [
      ...tmp,
      {
        linker: 'more',
        name: 'More',
        router: MoreNavigator,
        activeIcon: 'Android_More_Horizontal',
        inActiveIcon: 'Android_More_Horizontal_Gray',
      },
    ];    
    return tmp;

}