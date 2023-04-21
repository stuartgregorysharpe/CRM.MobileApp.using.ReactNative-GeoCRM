import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import Actions from '../../../Home/Actions/Actions';
import CTabSelector from '../../../../../components/common/CTabSelector';
import {boxShadow, style} from '../../../../../constants/Styles';
import BubbleMenu from '../../../../../components/common/BubbleMenu';
import {Constants} from '../../../../../constants';
import AddActionItemModal from '../modals/AddActionItemModal';
import UpdateActionItemModal from '../modals/UpdateActionItemModal';
import { getJsonData } from '../../../../../constants/Storage';
import { useNavigation } from '@react-navigation/native';

const ActionItemsContainer = props => {
  
  const navigation = useNavigation();
  const {locationId, hasAdd} = props;
  const [tabIndex, setTabIndex] = useState(0);
  const addActionItemModalRef = useRef(null);
  const updateActionItemModalRef = useRef(null);
  const actionListRef = useRef(null);
  const [selectedActionItem, setSelectedActionItem] = useState(null);
  const tabs = [
    {title: 'All', id: 0},
    {title: 'Tasks', id: 1},
    {title: 'Action Items', id: 2},
    {title: 'Completed', id: 3},
  ];

  const onPressActionItem = item => {    
    setSelectedActionItem(item);
    updateActionItemModalRef.current.showModal();
  };

  const onUpdateActionItemModalClosed = ({type, value}) => {
    if(type == Constants.buttonType.BUTTON_TYPE_CHECKIN_LINK){  
      if(value?.item != undefined && value?.actionName != undefined){        
        console.log("data => ", value);      
        const data = {
          form_id : value?.item?.form_id,
          for_name : value?.actionName
        }
        openFormPage(data , value?.location_id); 
      }
    }
  }

  const openFormPage = async(data , location_id) => {
    var routeName = 'DeeplinkFormQuestionsScreen';        
    navigation.navigate(routeName, {
      data: data,
      location_id: location_id,
    });
  }

  return (
    <View style={[styles.container, props.style]}>
      <View style={{marginTop: 10, marginHorizontal: 10}}>
        <CTabSelector
          items={tabs}
          selectedIndex={tabIndex}
          onSelectTab={(item, index) => {
            setTabIndex(index);
          }}
          containerStyle={[
            boxShadow,
            {
              height: 40,
              backgroundColor: 'white',
              borderRadius: 4,
            },
          ]}
        />
      </View>

      <Actions
        ref={actionListRef}
        locationId={locationId}
        tabIndex={tabIndex}
        onPressActionItem={onPressActionItem}></Actions>

      {hasAdd && (
        <BubbleMenu
          items={[
            {
              icon: 'Round_Btn_Default_Dark',
              type: Constants.actionType.ACTION_ADD,
            },
          ]}
          onPressItem={() => {
            addActionItemModalRef.current.showModal();
          }}
          style={{marginRight: 20, marginBottom: 32}}
        />
      )}

      <AddActionItemModal
        ref={addActionItemModalRef}
        locationId={locationId}
        onButtonAction={({type}) => {
          if (type == Constants.actionType.ACTION_FORM_SUBMIT)
            if (actionListRef && actionListRef.current) {
              actionListRef.current.onLoad();
            }
        }}
      />

      <UpdateActionItemModal
        ref={updateActionItemModalRef}
        locationId={locationId}
        actionName={selectedActionItem? selectedActionItem?.action_name : ''}
        actionItemId={
          selectedActionItem ? selectedActionItem.action_item_id : null
        }
        actionItemType={
          selectedActionItem ? selectedActionItem.action_item_type : null
        }
        onButtonAction={onUpdateActionItemModalClosed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
});

export default ActionItemsContainer;
