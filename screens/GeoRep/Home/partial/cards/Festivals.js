
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppText } from '../../../../../components/common/AppText';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import { useEffect } from 'react';
import { getApiRequest } from '../../../../../actions/api.action';
import { expireToken } from '../../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { style } from '../../../../../constants/Styles';
import LindtCardsTitleView from './partial/LindtCardsTitleView';
import ProgressBar from '../ProgressBar';
import SvgIcon from '../../../../../components/SvgIcon';
import { formattedNumber, formattedPriceWithSpace } from '../../../../../helpers/formatHelpers';
import LindtFestivalProgress from './partial/LindtFestivalProgress';
import IndicatorDotScroller from '../../../../../components/common/IndicatorDotScroller';

const Festivals = (props) => {
  const colors = [Colors.primaryColor, Colors.graph_grey];
  const [festivalData, setFestivalData] = useState([]);
  const [clientName,setClientName] = useState('');
  const dispatch = useDispatch();


  useEffect(() => {
    loadData();
  }, [props.haveFilter]);

  const loadData = () => {
    let postData = props.haveFilter ? props.haveFilter : {};
    console.log(postData);
    getApiRequest('lindtdash/festival', postData).then(response => {
      let data = response.festivals;
      setClientName(response?.client_name);
      data.map((x, i) => {
        x.isExpanded = false
        return x
      })
      setFestivalData(data);
    }).catch(e => {
      expireToken(dispatch, e);
    })
  }

  const getTotalPercentage = (_total, _target) => {
    let total = parseInt(_total);
    let target = parseInt(_target);
    // console.log("percentage", total / target);
    let percentage = target > 0 ? (total / target) * 100 : 0
    return percentage <= 100 ? percentage : 100;
  }

  const renderExpandView = (item, index) => {
    return (
      <TouchableOpacity onPress={() => {
        let data = [...festivalData];

        data[index].isExpanded = !item.isExpanded
        setFestivalData(data);
      }}>
        <View style={{ marginVertical: 5, borderWidth: 1, borderRadius: 5, borderColor: Colors.disabledColor }}>
          <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
            <AppText title="Meridian" type="secondaryBold"
              style={{ marginLeft: 5, flex: 0.8, textAlign: 'right' }} color={Colors.primaryColor}></AppText>
            <View style={{ flex: 2.2 }}>
              <View style={{ marginLeft: 10, }}>
                <LindtFestivalProgress colors={colors} steps={[getTotalPercentage(item.meridian.total, item.meridian.target),
                100 - getTotalPercentage(item.meridian.total, item.meridian.target)]} height={20}
                  titles={[formattedNumber(parseInt(item.meridian.total)), formattedNumber(parseInt(item.meridian.variance))]}></LindtFestivalProgress>
              </View>
            </View>
            <AppText title={formattedNumber(parseInt(item.meridian.target))} type="secondaryBold"
              style={{ marginLeft: 5, fontSize: 11, flex: 0.8 }} color={Colors.textColor}></AppText>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
            <AppText title="SE" type="secondaryBold"
              style={{ marginLeft: 5, flex: 0.8, textAlign: 'right' }} color={Colors.primaryColor}></AppText>
            <View style={{ flex: 2.2 }}>
              <View style={{ marginLeft: 10 }}>
                <LindtFestivalProgress colors={colors} steps={[getTotalPercentage(item.se.total, item.se.target),
                100 - getTotalPercentage(item.se.total, item.se.target)]} height={20}
                  titles={[formattedNumber(parseInt(item.se.total)), formattedNumber(parseInt(item.se.variance))]}></LindtFestivalProgress>
              </View>
            </View>
            <AppText title={formattedNumber(parseInt(item.se.target))} type="secondaryBold"
              style={{ marginLeft: 5, fontSize: 11, flex: 0.8 }} color={Colors.textColor}></AppText>
          </View>
          <SvgIcon icon={'Up_Arrow'} width={20} height={20} style={{ alignSelf: 'center' }} />
        </View>
      </TouchableOpacity>
    )
  }

  const renderFestivalRow = (item, index) => {
    return (
      <View key={index} style={{ marginHorizontal: 10 }}>
        <TouchableOpacity onPress={() => {
          let data = [...festivalData];

          data[index].isExpanded = !item.isExpanded
          setFestivalData(data);
        }}>
          <View style={{ marginTop: 10, flexDirection: 'row', }}>
            <AppText title={item.festival_name} type="secondaryBold"
              style={{ marginLeft: 5, flex: 1 }} color={Colors.primaryColor}></AppText>
            <View style={{ flex: 2 }}>
              <View style={{ marginLeft: 10, width: '100%' }}>
                <LindtFestivalProgress colors={colors} steps={[getTotalPercentage(item.total, item.target),
                100 - getTotalPercentage(item.total, item.target)]} height={20} titles={
                  [formattedNumber(parseInt(item.total)), formattedNumber(parseInt(item.variance))]
                } canAddExtraSpaceForText></LindtFestivalProgress>
              </View>
            </View>
            <View style={{ flex: 0.8, alignItems: 'center' }}>
              <AppText title="Target" type="secondaryMedium"
                style={{ marginLeft: 5, fontSize: 11 }} color={Colors.primaryColor}></AppText>
              <AppText title={formattedNumber(parseInt(item.target))} type="secondaryBold"
                style={{ marginLeft: 5, fontSize: 11 }} color={Colors.textColor}></AppText>
            </View>
          </View>
          {!item.isExpanded && <View style={styles.expand}>
            <SvgIcon icon={'Bottom_Arrow'} width={20} height={20} />
          </View>}
        </TouchableOpacity>
        {item.isExpanded && renderExpandView(item, index)}
      </View>

    )
  }

  return (
    <View style={{ marginTop: 10, flex: 1 }}>
      <View style={[style.scrollTabCard, { flexDirection: 'column' }]}>
        <LindtCardsTitleView haveFilter={props.haveFilter}
          onFilterPress={() => { props.onFilterPress() }}
          title="Festival" icon="Festival_Icon" />
        {/* {renderFestivalRow()} */}
        {festivalData && festivalData.map((x, i) => {
          return renderFestivalRow(x, i);
        })}
        <View style={{ flexDirection: 'row',justifyContent:'space-evenly',marginTop:10 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 15, height: 15, borderRadius: 3, backgroundColor: Colors.primaryColor }} />
            <AppText title={clientName} type="secondaryBold"
              style={{ marginLeft: 5 }} color={Colors.textColor}></AppText>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 15, height: 15, borderRadius: 3, backgroundColor: Colors.disabledColor }} />
            <AppText title={'Variance'} type="secondaryBold"
              style={{ marginLeft: 5 }} color={Colors.textColor}></AppText>
          </View>


        </View>
      </View>
      <IndicatorDotScroller
        total={props.pageCount ? props.pageCount : 0}
        selectedIndex={props.pageIndex}></IndicatorDotScroller>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
  actionItemLegend: {
    width: 12,
    height: 12,
    borderRadius: 2
  },
  expand: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.disabledColor,
    width: '100%', alignItems: 'center'
  }
})

export default Festivals;