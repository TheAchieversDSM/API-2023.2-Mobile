import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { styles } from './styled';

export const renderBottomTab = (
    name: keyof typeof FontAwesome.glyphMap,
    focused: boolean,
    nameScreen?: string
) => {
    const isPlusIcon = name === 'plus';
    return (
        <View style={[styles.tab, isPlusIcon ? styles.plusIconContainer : {}]}>
            <FontAwesome
                name={name}
                size={isPlusIcon ? 35 : 25}
                style={
                    [isPlusIcon ? {
                        transform: [{ rotate: "-45deg" }],
                    } : {
                        color: focused ? '#C74634' : '#393939',
                    }]
                }
            />
            <Text style={{
                color: focused ? '#C74634' : '#393939',
            }}>
                {nameScreen}
            </Text>
        </View>
    );
};