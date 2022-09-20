import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TieredMultipleChoiceInput from '../TieredMutipleChoiceInput';
import ExpandableMultiSelect from '../MultiSelectInput/ExpandableMultiSelect';

const TieredMuliSelectView = props => {
  const {
    options,
    dropdownLabels,
    checkedValueList,
    renderLeafOption,
    idFieldName,
  } = props;
  const [selectedDropdownLists, setSelectedDropdownLists] = useState([]);
  const [level, setLevel] = useState(0);
  const [showError, setShowError] = useState(false);

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

  const getLists = index => {
    var lists = filterData(options, 0, index);
    return lists;
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
            <ExpandableMultiSelect
              hasError={showError && index === level + 1 ? true : false}
              key={index}
              checkedValueList={checkedValueList}
              onItemSelected={item => {
                setShowError(false);
                setLevel(index);
                if (props.onLeafItemSelected) {
                  props.onLeafItemSelected(item);
                }
              }}
              header={element}
              items={getLists(index)}
              idFieldName={idFieldName}
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
            lists={getLists(index)}
          />
        );
      })}
    </View>
  );
};
export default TieredMuliSelectView;
