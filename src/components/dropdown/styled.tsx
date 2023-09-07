import { StyleSheet, View, Text } from 'react-native';

export const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        width: 300,
        height: 50,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderRadius: 12,
        padding: 12,

        elevation: 2,
    },
    icon: {
        marginRight: 10,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
    },
    textItem: {
        flex: 1,
        fontSize: 18,
    },
    placeholderStyle: {
        fontSize: 18,
    },
    selectedTextStyle: {
        fontSize: 18,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 18,
    },
});