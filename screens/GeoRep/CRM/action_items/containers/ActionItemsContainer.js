import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import Actions from '../../../Home/Actions/Actions';
import CTabSelector from '../../../../../components/common/CTabSelector';
import CardView from '../../../../../components/common/CardView';
import {style} from '../../../../../constants/Styles';
import BubbleMenu from '../../../../../components/common/BubbleMenu';
import {Constants} from '../../../../../constants';
import AddActionItemModal from '../modals/AddActionItemModal';
import UpdateActionItemModal from '../modals/UpdateActionItemModal';

const ActionItemsContainer = props => {
  const {locationId, hasAdd} = props;
  const [tabIndex, setTabIndex] = useState(0);
  const addActionItemModalRef = useRef(null);
  const updateActionItemModalRef = useRef(null);
  const [selectedActionItem, setSelectedActionItem] = useState(null);
  const tabs = [
    {title: 'All', id: 0},
    {title: 'Tasks', id: 1},
    {title: 'Action Items', id: 2},
    {title: 'Completed', id: 3},
  ];
  useEffect(() => {
    if (
      updateActionItemModalRef &&
      updateActionItemModalRef.current &&
      selectedActionItem
    ) {
      updateActionItemModalRef.current.showModal();
    }
  }, [selectedActionItem]);
  const onPressActionItem = item => {
    if (item == selectedActionItem) {
      updateActionItemModalRef.current.showModal();
    } else {
      setSelectedActionItem(item);
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      <View style={{marginTop: 10, marginHorizontal: 10}}>
        <CTabSelector
          items={tabs}
          selectedIndex={tabIndex}
          onSelectTab={(item, index) => {
            setTabIndex(index);
          }}
          containerStyle={style.card}
        />
      </View>
      <Actions
        locationId={locationId}
        tabIndex={tabIndex}
        onPressActionItem={onPressActionItem}></Actions>
      {hasAdd && (
        <BubbleMenu
          items={[{text: '+', type: Constants.actionType.ACTION_ADD}]}
          onPressItem={() => {
            addActionItemModalRef.current.showModal();
          }}
          style={{marginRight: 16, marginBottom: 32}}
        />
      )}
      <AddActionItemModal ref={addActionItemModalRef} locationId={locationId} />
      <UpdateActionItemModal
        ref={updateActionItemModalRef}
        locationId={locationId}
        actionItemId={
          selectedActionItem ? selectedActionItem.action_item_id : null
        }
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
