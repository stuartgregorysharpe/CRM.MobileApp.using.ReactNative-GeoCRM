

import { View, Text } from 'react-native'
import React from 'react'
import TopSwipeTab from './partial/TopSwipeTab'
import StartMyDay from './partial/StartMyDay'
import SyncAll from './partial/SyncAll'
import CheckOut from './partial/CheckOut'

export default function HomeScreen() {
  return (
    <View>
        <TopSwipeTab></TopSwipeTab>
        
        <StartMyDay></StartMyDay>
        
        <SyncAll></SyncAll>
        
        <CheckOut></CheckOut>

        {/* cards */}

    </View>
  )
}