import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Titulo } from "./styled";
import { useTheme } from "styled-components";
import { IMonthlyCalculated } from "../../../interfaces/dashboard";
import { IItem } from "../../../interfaces/dropdown";
import { monthlyTimeCalculateArray } from "../../../utils/utils";

export const Coluna = (monthly: IMonthlyCalculated) => {

    const theme = useTheme()

    const { barData, maxValue } = monthlyTimeCalculateArray(monthly)

    monthlyTimeCalculateArray(monthly)

    const xAxisLabels = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']

    const xAxisWidth = 250;

    return (
        <>
            <View style={{
                padding: 20,
                borderRadius: 20,
                paddingLeft: 0,
                marginBottom: 50
            }}>
                <Titulo>
                    Horas trabalhadas
                </Titulo>
                <View style={{ paddingRight: 30, alignItems: 'center', padding: 10 }}>
                    <BarChart
                        showYAxisIndices
                        noOfSections={4}
                        maxValue={maxValue}
                        data={barData}
                        barBorderRadius={4}
                        isAnimated
                        width={xAxisWidth}
                        xAxisColor={'#ffff'}
                        yAxisColor={'#ffff'}
                        xAxisLabelTextStyle={{
                            color: "#fff",
                            fontFamily: theme.FONTS.Poppins_400Regular, // Defina a fonte desejada
                            fontSize: 13,
                        }}
                        xAxisLabelTexts={xAxisLabels}
                        yAxisTextStyle={{
                            color: "#fff",
                            fontFamily: theme.FONTS.Poppins_400Regular, // Defina a fonte desejada
                            fontSize: 13, // Defina o tamanho da fonte desejado
                        }}
                        renderTooltip={(t: IItem) => {
                            return (
                                <View
                                    style={{
                                        marginBottom: 15,
                                        marginLeft: 0,
                                        backgroundColor: '#ffff',
                                        paddingHorizontal: 6,
                                        paddingVertical: 4,
                                        borderRadius: 4,
                                    }}>
                                    <Text>{t.value}h</Text>
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
        </>
    )
}