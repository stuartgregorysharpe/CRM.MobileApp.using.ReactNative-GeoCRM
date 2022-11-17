import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import CModal from '../../../../../components/common/CModal';
import {Constants} from '../../../../../constants';
import {FormListItem} from '../../../Forms/partial/FormListItem';
let isInfoWindow = false;

const AddLeadFormsModal = React.forwardRef((props, ref) => {
  const {onClose} = props;
  const _onTouchStart = (e, text) => {};

  return (
    <CModal
      ref={ref}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      {...props}>
      <View style={{alignSelf: 'stretch', marginHorizontal: 10, marginTop: 10}}>
        <ScrollView
          style={{
            maxHeight: Dimensions.get('screen').height * 0.8,
            marginBottom: 10,
          }}>
          {props.formLists.map((item, index) => (
            <FormListItem
              key={index}
              item={item}
              onItemPress={() => {
                if (!isInfoWindow) {
                  onClose();
                  props.onNext(item);
                } else {
                  isInfoWindow = false;
                }
              }}
              onTouchStart={(e, text) => _onTouchStart(e, text)}></FormListItem>
          ))}
        </ScrollView>
      </View>
    </CModal>
  );
});
export default AddLeadFormsModal;
