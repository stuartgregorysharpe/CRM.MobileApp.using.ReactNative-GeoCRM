import React, {useState, useEffect, useRef, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Constants} from '../../../constants';
import {formatDate} from '../../../helpers/formatHelpers';
import {DatetimePickerView} from '../../DatetimePickerView';
import SelectInputView from './components/SelectInputView';

const CDateTimePickerInput = props => {
  const [isShowDateTimePickerModal, setIsShowDateTimePickerModal] =
    useState(false);

  const {placeholder, description, value, hasError} = props;

  const formatDateTime = () => {
    if (value) {
      return formatDate(value, Constants.dateFormat.DATE_FORMAT_SHORT);
    }
    return '';
  };
  const text = useMemo(() => formatDateTime());
  const showDescription = text != '' && text != null;
  const onOpenPicker = () => {
    setIsShowDateTimePickerModal(true);
  };

  const onSelectDate = date => {
    if (props.onSelectDate) {
      const selectedDate = formatDate(
        date,
        Constants.dateFormat.DATE_FORMAT_API,
        Constants.dateFormat.DATE_FORMAT_DATE_PICKER,
      );
      props.onSelectDate(selectedDate);
    }
  };
  return (
    <View style={[styles.container, props.containerStyle]}>
      <SelectInputView
        showDescription={showDescription}
        description={description || placeholder}
        placeholder={placeholder}
        text={text}
        hasError={hasError}
        hideSuffixIcon
        onPress={onOpenPicker}
      />
      <DatetimePickerView
        visible={isShowDateTimePickerModal}
        value={value}
        onModalClose={() => {
          setIsShowDateTimePickerModal(false);
        }}
        close={date => {
          onSelectDate(date);
          setIsShowDateTimePickerModal(false);
        }}></DatetimePickerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default CDateTimePickerInput;
