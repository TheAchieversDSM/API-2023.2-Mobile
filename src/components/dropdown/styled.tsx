import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    dropdown: {
        marginBottom: 40,
        width: 335,
        height: 50,
        shadowColor: 'transparent',
        backgroundColor: 'transparent',
        borderBottomWidth: 0.6,
        borderBottomColor: '#000',
        borderRadius: 12,
        paddingHorizontal: 12,
        fontFamily: 'Poppins_400Regular',

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
        fontFamily: 'Poppins_400Regular',
    },
    placeholderStyle: {
        fontSize: 18,
        fontFamily: 'Poppins_400Regular',
    },
    selectedTextStyle: {
        fontSize: 18,
        fontFamily: 'Poppins_400Regular',
    },
    iconStyle: {
        width: 30,
        height: 30,
    },
    inputSearchStyle: {
        fontFamily: 'Poppins_400Regular',
        height: 40,
        fontSize: 18,
    },
});