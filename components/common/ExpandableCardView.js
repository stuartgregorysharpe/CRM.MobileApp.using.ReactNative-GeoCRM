import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {whiteLabel} from '../../constants/Colors';
import SvgIcon from '../SvgIcon';

const ExpandableCardView = props => {
  const [isExpanded, setIsExpanded] = useState(props.isExpanded);
  const renderTitleSection = () => {
    if (props.renderTitleSection) {
      return props.renderTitleSection();
    }
    return null;
  };
  const renderContentSection = () => {
    if (isExpanded && props.children) {
      return props.children;
    }
    return null;
  };
  return (
    <View style={[styles.container, props.style]}>
      <View
        style={[styles.headerSection, !isExpanded && {borderBottomWidth: 0}]}>
        <View style={styles.titleSection}>{renderTitleSection()}</View>
        <TouchableOpacity
          onPress={() => {
            setIsExpanded(!isExpanded);
          }}>
          <SvgIcon
            icon={isExpanded ? 'Drop_Up' : 'Drop_Down'}
            width="20px"
            height="20px"
          />
        </TouchableOpacity>
      </View>
      {renderContentSection()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  expandButton: {
    height: 20,
    width: 20,
  },
  headerSection: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: whiteLabel().lineSeperator,
  },
  titleSection: {
    flex: 1,
  },
});

export default ExpandableCardView;
