import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Titulo } from "./styled";
import { useTheme } from "styled-components";

export const Coluna = () => {

    const theme = useTheme()

    const barData = [
        { value: 30, frontColor: '#02A8EE' },
        { value: 80, frontColor: '#02A8EE' },
        { value: 95, frontColor: '#02A8EE' },
        { value: 50, frontColor: '#02A8EE' },
        { value: 20, frontColor: '#02A8EE' },
        { value: 30, frontColor: '#02A8EE' },
        { value: 80, frontColor: '#02A8EE' },
        { value: 95, frontColor: '#02A8EE' },
        { value: 50, frontColor: '#02A8EE' },
        { value: 20, frontColor: '#02A8EE' },
        { value: 50, frontColor: '#02A8EE' },
        { value: 20, frontColor: '#02A8EE' },
    ];

    const xAxisLabels = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']

    const xAxisWidth = 250;

    const textStyle = {
        title: { fontFamily: "YourTitleFont", fontSize: 20, color: "black" },
        xAxisLabel: { fontFamily: "YourLabelFont", fontSize: 12, color: "gray" },
        yAxisLabel: { fontFamily: "YourLabelFont", fontSize: 12, color: "gray" },
    };

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
                        maxValue={100}
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
                        renderTooltip={() => {
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
                                    <Text>20</Text>
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
        </>
    )
}