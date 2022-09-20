import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TieredMultipleChoiceInput from '../TieredMutipleChoiceInput';
import ExpandableMultiSelect from '../MultiSelectInput/ExpandableMultiSelect';
import ExpandableSingleSelect from '../SelectInput/ExpandableSingleSelect';

const TieredSingleSelectView = props => {
  const {
    options,
    dropdownLabels,
    checkedValue,
    renderLeafOption,
    idFieldName,
    labelFieldName,
    selectedDropdownValues,
  } = props;
  const [selectedDropdownLists, setSelectedDropdownLists] = useState([]);
  const [level, setLevel] = useState(0);
  const [lists, setLists] = useState([]);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (selectedDropdownValues) {
      setSelectedDropdownLists([...selectedDropdownValues]);
    }
  }, [selectedDropdownValues]);
  const filterData = (objects, recursiveIndex, level) => {
    if (objects != undefined) {
      var tmp = [];
      var objKey = '';

      if (
        selectedDropdownLists[recursiveIndex] &&
        selectedDropdownLists[recursiveIndex] != undefined
      ) {
        objKey = selectedDropdownLists[recursiveIndex].label;
      }

      for (let value of Object.keys(objects)) {
        if (!isNaN(Number(value))) {
          if (typeof objects[value] === 'object') {
            tmp.push({...objects[value]});
          } else {
            tmp.push({label: objects[value]});
          }
        } else {
          tmp.push({label: value});
        }
      }

      if (recursiveIndex === level) {
        return tmp;
      } else {
        if (objKey != '') {
          objects = objects[objKey];
          return filterData(objects, recursiveIndex + 1, level);
        } else {
          return [];
        }
      }
    } else {
      return [];
    }
  };

  const getList = index => {
    const list = filterData(options, 0, index);
    console.log('list', list);
    return list;
  };

  return (
    <View
      style={{
        alignSelf: 'stretch',
        marginHorizontal: 10,
        marginTop: 7,
        marginBottom: 7,
      }}>
      {dropdownLabels.map((element, index) => {
        const isLast = index == dropdownLabels.length - 1;
        if (isLast) {
          return (
            <ExpandableSingleSelect
              hasError={showError && index === level + 1 ? true : false}
              key={index}
              checkedValue={checkedValue}
              onItemSelected={item => {
                setShowError(false);
                setLevel(index);
                if (props.onLeafItemSelected) {
                  props.onLeafItemSelected(item, selectedDropdownLists);
                }
              }}
              header={element}
              items={getList(index)}
              idFieldName={idFieldName}
              labelFieldName={labelFieldName}
              renderDropdownItem={renderLeafOption}
            />
          );
        }
        return (
          <TieredMultipleChoiceInput
            hasError={showError && index === level + 1 ? true : false}
            key={index}
            selectedItem={selectedDropdownLists[index]}
            onItemSelected={item => {
              setShowError(false);
              setLevel(index);
              if (index < selectedDropdownLists.length) {
                var tmp = [];
                selectedDropdownLists.forEach((element, k) => {
                  if (k < index) {
                    tmp.push(element);
                  } else if (k === index) {
                    tmp.push(item);
                  }
                });
                setSelectedDropdownLists(tmp);
              } else {
                setSelectedDropdownLists([...selectedDropdownLists, item]);
              }
            }}
            header={element}
            lists={getList(index)}
          />
        );
      })}
    </View>
  );
};
export default TieredSingleSelectView;
