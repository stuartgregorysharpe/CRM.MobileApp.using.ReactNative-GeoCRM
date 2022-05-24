import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import Actions from '../../../Home/Actions/Actions';
import CTabSelector from '../../../../../components/common/CTabSelector';
import CardView from '../../../../../components/common/CardView';
import {style} from '../../../../../constants/Styles';
import BubbleMenu from '../../../../../components/common/BubbleMenu';
import {Constants} from '../../../../../constants';
import AddActionItemModal from '../modals/AddActionItemModal';

const ActionItemsContainer = props => {
  const {locationId, hasAdd} = props;
  const [tabIndex, setTabIndex] = useState(0);
  const addActionItemModalRef = useRef(null);
  const tabs = [
    {title: 'All', id: 0},
    {title: 'Tasks', id: 1},
    {title: 'Action Items', id: 2},
    {title: 'Completed', id: 3},
  ];

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
      <Actions locationId={locationId} tabIndex={tabIndex}></Actions>
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
