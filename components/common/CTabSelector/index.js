import React, {Component} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import BottomBorderTabItem from './BottomBorderTabItem';
import SvgIcon from '../../SvgIcon';
export class CTabSelector extends Component {
  constructor(props) {
    super(props);
  }
  onSelectTab = (item, index) => {
    if (this.props.onSelectTab) {
      this.props.onSelectTab(item, index);
    }
    if (this.tabSelectorRef) {
      this.tabSelectorRef.scrollToIndex({index: index});
    }
  };
  renderTabItem = (item, index, totalCount) => {
    let {selectedIndex} = this.props;
    const isPicked = index === selectedIndex;
    const isLast = index === totalCount - 1;
    if (this.props.renderTabItem) {
      return this.props.renderTabItem(item, index, isPicked, isLast);
    }
    if (!item) return null;
    return (
      <BottomBorderTabItem
        isPicked={isPicked}
        onSelectTab={this.onSelectTab}
        key={'tab' + index}
        index={index}
        item={item}
        style={[this.props.showInView && {flex: 1}]}
      />
    );
  };
  onPressNextButton = isNext => {
    const {selectedIndex, items} = this.props;
    let nextSelectedIndex = selectedIndex;
    if (isNext && selectedIndex < items.length) {
      nextSelectedIndex = selectedIndex + 1;
    } else if (!isNext && selectedIndex > 0) {
      nextSelectedIndex = selectedIndex - 1;
    }
    this.onSelectTab(items[nextSelectedIndex], nextSelectedIndex);
  };
  renderNextButton = () => {
    return (
      <TouchableOpacity
        style={styles.nextButtonContainer}
        onPress={() => {
          this.onPressNextButton(true);
        }}>
        <SvgIcon icon="Slider_Arrow_Right" width="16px" height="16px" />
      </TouchableOpacity>
    );
  };
  renderPrevButton = () => {
    return (
      <TouchableOpacity
        style={styles.nextButtonContainer}
        onPress={() => {
          this.onPressNextButton(false);
        }}>
        <SvgIcon icon="Slider_Arrow_Left" width="16px" height="16px" />
      </TouchableOpacity>
    );
  };
  renderTabs = items => {
    if (!items) return null;
    if (this.props.showInView) {
      return this.renderTabsInView(items);
    }
    return (
      <View style={styles.rowContainer}>
        <FlatList
          ref={instance => {
            this.tabSelectorRef = instance;
          }}
          data={items}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => this.renderTabItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          extraData={this.props}
        />
      </View>
    );
  };
  renderTabsInView = items => {
    const totalCount = items.length;
    return items.map((item, index) =>
      this.renderTabItem(item, index, totalCount),
    );
  };
  render() {
    const {selectedIndex, items,hidePrevNext} = this.props;
    const isShowNextButton = selectedIndex < items.length - 1;
    const isShowPrevButton = selectedIndex > 0;
    return (
      <View style={[styles.tabContainer, this.props.containerStyle]}>
        {!hidePrevNext && isShowPrevButton && this.renderPrevButton()}
        <View style={{flex: 1, flexDirection: 'row'}}>
          {this.renderTabs(items)}
        </View>
        {!hidePrevNext && isShowNextButton && this.renderNextButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  nextButtonContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
});

export default CTabSelector;
