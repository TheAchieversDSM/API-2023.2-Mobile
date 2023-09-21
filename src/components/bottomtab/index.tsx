import { IconRender } from './renderIcons';
import { View, Text } from 'react-native';
import { styles } from './styled';
import React from 'react';
import { IconRenderProps } from '../../interfaces/tabs';


export const renderBottomTab = ({ icons, name, focused, nameScreen, isPlusIcon }: IconRenderProps) => {
    return (
        <View style={[styles.tab, isPlusIcon ? styles.plusIconContainer : {}]}>
            <IconRender focused={focused} icons={icons} name={name} isPlusIcon={isPlusIcon} />
            <Text style={{
                color: focused ? '#C74634' : '#393939',
            }}>
                {nameScreen}
            </Text>
        </View>
    );
};