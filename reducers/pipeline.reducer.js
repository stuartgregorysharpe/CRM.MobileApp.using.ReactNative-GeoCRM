import { CHANGE_PIPELINE_FILTERS, STATUS_PIPELINE_FILTERS } from "../actions/actionTypes";

const initialState={
    pipelineFilters:[],
    statusPipelineFilters:'request'
}

export default (state = initialState, action) => {
    switch (action.type) {
    
      case STATUS_PIPELINE_FILTERS:
        return {
          ...state,
          statusLocationFilters: action.payload
        }
    
      case CHANGE_PIPELINE_FILTERS:
        return {
          ...state,
          pipelineFilters: action.payload
        }
     
      default:
        return state;
    }
}