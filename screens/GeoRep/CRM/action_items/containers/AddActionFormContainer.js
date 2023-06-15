import React, {useState, useEffect, useReducer, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getApiRequest, postApiRequest} from '../../../../../actions/api.action';
import DynamicForm from '../../../../../components/common/DynamicForm';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import {Constants} from '../../../../../constants';
import {expireToken, notifyMsg} from '../../../../../constants/Helper';
import { PostRequestDAO } from '../../../../../DAO';
import {
  constructAddActionFormStructure,
  getAddActionItemPostValue,
} from '../helper';

const AddActionFormContainer = props => {
  const [formData, setFormData] = useState({});
  const [formStructure, setFormStructure] = useState([]);
  const dispatch = useDispatch();
  const {locationId} = props;
  const [isLoading, setIsLoading] = useState(false);
  const actionFormRef = useRef(null);
  const currentLocation = useSelector(state => state.rep.currentLocation);

  const load = () => {
    setIsLoading(true);
    getApiRequest('actionsitems/action-item-details', {
      action_item_type: 'action',
    })
      .then(data => {

        console.log("RESSSSS" , data);

        const {formData, formStructure} = constructAddActionFormStructure(data);
        setFormData(formData);
        setFormStructure(formStructure);
        setIsLoading(false);

      })
      .catch(e => {
        console.log("DDD")
        setIsLoading(false);
        expireToken(dispatch, e );
      });      
  };
  
  useEffect(() => {
    load();
  }, []);

  const onSubmit = () => {

    if (!actionFormRef.current.validateForm()) return;
    if (isLoading) return ;

    setIsLoading(true);
    const submitValueData = getAddActionItemPostValue(
      formData,
      locationId,
      currentLocation,
    );

    PostRequestDAO.find(0, submitValueData , 'action-item-details' , 'actionsitems/action-item-details' ,
    '' , ''  , null , dispatch).then((res) => {
      if (res.status === 'success') {
        notifyMsg(dispatch, 'Action Item Added Successfully');
      }
      setIsLoading(false);
      if (props.onButtonAction) {
        props.onButtonAction({
          type: Constants.actionType.ACTION_FORM_SUBMIT,
          value: submitValueData,
        });
      }
    }).catch((e) => {
      setIsLoading(false);
      expireToken(dispatch , e);
    });

  };
  
  return (
    <View style={[styles.container, props.style]}>
      <DynamicForm
        ref={actionFormRef}
        formData={formData}
        formStructureData={formStructure}
        updateFormData={formData => {
          setFormData(formData);
        }}
      />
      <SubmitButton
        onSubmit={() => {
          onSubmit();
        }}        
        title={'Add Action Item'}
        style={{marginTop: 16, marginHorizontal: 10, marginBottom: 16}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default AddActionFormContainer;
