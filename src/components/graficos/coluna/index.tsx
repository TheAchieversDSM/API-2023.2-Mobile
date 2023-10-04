import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export const Coluna = () => {
    const barData = [
        {value: 30, frontColor: '#4ABFF4'},
        {value: 80, frontColor: '#79C3DB'},
        {value: 95, frontColor: '#28B2B3'},
        {value: 50, frontColor: '#4ADDBA'},
        {value: 20, frontColor: '#91E3E3'},
        {value: 30, frontColor: '#4ABFF4'},
        {value: 80, frontColor: '#79C3DB'},
        {value: 95, frontColor: '#28B2B3'},
        {value: 50, frontColor: '#4ADDBA'},
        {value: 20, frontColor: '#91E3E3'},
        {value: 50, frontColor: '#4ADDBA'},
        {value: 20, frontColor: '#91E3E3'},
    ];

    const xAxisLabels = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']

    const xAxisWidth = 250;

    return(
        <>
            <View style={{
                padding: 20,
                borderRadius: 20,
                paddingLeft: 0,
            }}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                    Horas trabalhadas
                </Text>
                <View style={{paddingRight: 30, alignItems: 'center', padding: 10}}>
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
                        xAxisLabelTextStyle={{color: '#fff', textAlign: 'center'}}
                        xAxisLabelTexts={xAxisLabels}
                        yAxisTextStyle={{color: '#fff'}}
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