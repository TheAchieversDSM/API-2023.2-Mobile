import { IDropdown, IItem } from '../../interfaces/dropdown';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { createStyles } from './styled';
import { useTheme } from 'styled-components';

const data = [
    { label: 'Item 1', value: '1' },
];

export const DropdownComponent = (props: IDropdown) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    const [value, setValue] = useState({} as IItem);
    useEffect(() => {
        props.onValueChange(value.value)
    }, [value])

    const renderItem = (item: IItem) => {
        return (
            <View style={styles.item}>
                <Text style={[styles.textItem, { fontSize: props.fontSize || 18 }]}>{item.label}</Text>

                {item === value && (
                    <AntDesign
                        style={styles.icon}
                        color={props.iconColor || 'black'}
                        name={props.iconSelectedName || 'Safety'}
                        size={props.fontSize || 20}
                    />
                )}
            </View>
        );
    };

    return (
        <Dropdown
            style={
                [styles.dropdown, { width: props.width || 330, backgroundColor: props.backgroundColor || 'transparent', borderBottomColor: props.borderColor || '#000' }]
            }
            placeholderStyle={
                [styles.placeholderStyle, { fontSize: props.fontSize || 18, color: props.color || 'black' }]
            }
            selectedTextStyle={
                [styles.selectedTextStyle, { fontSize: props.fontSize || 18, color: props.color || 'black' }]
            }
            inputSearchStyle={
                [styles.inputSearchStyle, { fontSize: props.fontSize }]
            }
            iconStyle={styles.iconStyle}

            data={props.data || data}
            search={props.search || false}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={props.placeholder || 'Selecione...'}
            searchPlaceholder={props.searchPlaceholder || 'Pesquisar...'}
            value={value}
            onChange={(item) => {
                setValue(item)
            }}
            renderLeftIcon={() => (props.showIcon ? (
                <AntDesign
                    style={styles.icon}
                    color={props.iconColor || 'black'}
                    name={props.iconName || 'Safety'}
                    size={props.iconSize || 25}
                />
            ) : null)}
            renderItem={renderItem}
        />
    );
};