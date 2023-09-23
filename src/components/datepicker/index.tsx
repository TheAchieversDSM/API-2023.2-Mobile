import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { DataPicker } from './styled';
import { formatDate } from '../../utils/utils';
import { IDatePicker } from '../../interfaces/datepicker';

export const DatePicker = (props: IDatePicker) => {
    const [selected, setSelected] = useState(false)
    const [show, setShow] = useState(false);

    const hideDatePicker = () => {
        setShow(false);
    };

    const showMode = () => {
        setShow(true);
    };

    const handleDateChange = (date: Date) => {
        const formattedDate = formatDate(date);
        props.onDateChange(formattedDate);
        hideDatePicker();
    };

    useEffect(() => {
        if (props.value) {
            // If a value is already set, mark it as selected
            setSelected(true);
        }
    }, [props.value]);

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
                        onConfirm={handleDateChange}
                        onCancel={hideDatePicker}
                        date={props.value ? new Date(props.value) : new Date()} // Pass the currently selected date
                    />
                )}
            </TouchableOpacity>
        </SafeAreaView >
    )
};
