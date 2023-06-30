import React from "react";
import { View } from 'react-native';
import { whiteLabel } from "../../../../constants/Colors";

const ProgressIndicatorView = ({ total, style,height, progressbarColor = whiteLabel().mainText, completed }) => {
    const courseProgressIndicatorView = () => {
        let listViews = [];

        for (let index = 0; index < total; index++) {
            listViews.push(<View key={index.toString()}
                style={{
                    height: height,
                    flex: 1,
                    borderRadius: 50,
                    marginHorizontal: 1,
                    backgroundColor: (index < completed) ?   progressbarColor: '#E5E5E5'
                }}>
            </View>)

        }
        return listViews;
    }
    return (
        <View style={style}>{courseProgressIndicatorView()}</View>
    )
}
export default ProgressIndicatorView;