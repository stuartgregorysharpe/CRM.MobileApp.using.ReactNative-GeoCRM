import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import CSingleSelectInput from '../../../../components/common/SelectInput/CSingleSelectInput';
import {style} from '../../../../constants/Styles';
import {whiteLabel} from '../../../../constants/Colors';

const FormFilterModalView = props => {
  const {items, filters, saveFilter} = props;
  const [checkedLists, setCheckedLists] = useState([]);

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      if (filters) {
        setCheckedLists(filters.form_type);
      } else {
        setCheckedLists([]);
      }
    }
    return () => {
      isMount = false;
    };
  }, [filters]);

  return (
    <View style={{marginTop: 15}}>
      {items.map((element, index) => {
        return (
          <CSingleSelectInput
            key={index}
            bgType="card"
            bgStyle={[style.card, {borderWidth: 0}]}
            placeholderStyle={{color: whiteLabel().mainText, fontWeight: '700'}}
            description={element.label}
            placeholder={element.label}
            checkedValue={checkedLists}
            mode={'multi'}
            items={element.options}
            hasError={false}
            disabled={false}
            onSelectItem={item => {
              if (checkedLists.includes(item.value)) {
                setCheckedLists(
                  checkedLists.filter(element => element != item.value),
                );
                saveFilter(item.value, false);
              } else {
                setCheckedLists([...checkedLists, item.value]);
                saveFilter(item.value, true);
              }
            }}
            onClear={() => {}}
            containerStyle={{marginTop: 0, flex: 1}}
          />
        );
      })}
    </View>
  );
};

export default FormFilterModalView;

const styles = StyleSheet.create({});
