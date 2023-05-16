import React , { useRef } from 'react'
import { MAP_FILTERS, PIPELINE_SEARCH_FILTERS, SEARCH_FILTERS } from '../../../actions/actionTypes';
import { Constants } from '../../../constants';
import CModal from '../../common/CModal.android';
import FilterYourSearchContainer from './container/FilterYourSearchContainer';
import { useDispatch } from 'react-redux';
import { clearFilterData } from '../../../constants/Storage';

const FilterYourSearchModal = React.forwardRef((props, ref) => {

    const { page } = props;
    const filterYourSearchRef = useRef();
    const dispatch = useDispatch();

    const onButtonAction = data => {
        if (props.onButtonAction) {
          props.onButtonAction(data);
        }
        if (ref) {
          ref.current.hideModal();
        }
    };

    const  onClear =  async () => {

        let value = {
            stage_id: [],
            outcome_id: [],
            dispositions: [],
            customs: [],
        };

        if ( page == 'pipeline' ) {
            value.opportunity_status_id = [];
            value.opportunity_fields = [];
            value.campaign_id = '';
        }        
        if(filterYourSearchRef.current){
            filterYourSearchRef.current.changeFilters(value);
        }        
        if (page == 'pipeline') {            
            await clearFilterData('@pipeline_filter');
        } else {
            await clearFilterData('@filter');
        }

        if (page == 'map') {
            dispatch({type: MAP_FILTERS, payload: value});
        } else if (page == 'search') {
            dispatch({type: SEARCH_FILTERS, payload: value});
        } else if (page == 'pipeline') {
            dispatch({type: PIPELINE_SEARCH_FILTERS , payload: value});
        }

    }

    return (        
        
        <CModal
            ref={ref}        
            title="Add To Calendar"    
            modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
            closableWithOutsideTouch
            onClear={() => {
                onClear();
                onButtonAction({ type: Constants.actionType.ACTION_FORM_CLEAR });
            }}
            {...props}>

            <FilterYourSearchContainer 
                ref={filterYourSearchRef}
                onButtonAction={onButtonAction}
                {...props} />
                        
        </CModal>        
    )
});

export default FilterYourSearchModal;
