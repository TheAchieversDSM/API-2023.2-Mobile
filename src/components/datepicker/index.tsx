import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { DataPicker } from './styled';
import { formatDate } from '../../utils/utils';
import { IDatePicker } from '../../interfaces/datepicker';


export const DatePicker = (props: IDatePicker) => {
    const [date, setDate] = useState(new Date());
    const [selected, setSelected] = useState(false)
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (
        date: Date
    ) => {
        const currentDate = date;
        setShow(false);
        setSelected(true)
        setDate(currentDate);
        const formattedDate = formatDate(currentDate);
        props.onDateChange(formattedDate);
    };

    const hideDatePicker = () => {
        setShow(false);
    };
    const showMode = () => {
        setShow(true);
        setMode('date');
    };

    useEffect(() => {
        const formattedDate = formatDate(date);
        props.onDateChange(formattedDate);
    }, []);

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={showMode} style={props.style}>
                <DataPicker
                    placeholderTextColor={'#DE0300'}
                    leftIcon={{ type: 'font-awesome', name: props.iconNameL, color: props.iconColorL || '#DE0300', size: props.iconSize || 25 }}
                    rightIcon={{ type: 'font-awesome', name: props.iconNameR, color: props.iconColorR || '#DE0300', size: props.iconSize || 25 }}
                    placeholder={props.title} 
                    value={selected ? props.value : ""}
                    onChange={() => props.value}
                    errorMessage={props.errorMessage}
                    style={{ color: props.color || 'white' }}
                    disabled
                />
                {show && (
                    <DateTimePickerModal
                        isVisible={show}
                        testID="dateTimePicker"
                        onConfirm={onChange}
                        onCancel={hideDatePicker}
                    />
                )}
            </TouchableOpacity>
        </SafeAreaView >
    )
};