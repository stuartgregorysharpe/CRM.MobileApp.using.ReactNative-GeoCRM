import React, { Fragment } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { grayBackground } from '../constants/Styles';
import { SLIDE_STATUS } from '../actions/actionTypes';

export default function GrayBackground() {
  const dispatch = useDispatch();
  const crmStatus = useSelector(state => state.rep.crmSlideStatus);

  return (
    <Fragment>
      {crmStatus && <TouchableOpacity
        activeOpacity={1} 
        style={grayBackground}
        onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}  
      ></TouchableOpacity>}
    </Fragment>
  )
}