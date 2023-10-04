import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export const Donut = () => {
  const pieData = [
    {value: 40, color: '#67d207'},
    {value: 16, color: '#ebae11'},
    {value: 3, color: '#de0300'},
  ];

  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

    return(
        <>
          <View
          >
            <View style={{padding: 20, alignItems: 'center'}}>
              <PieChart
                data={pieData}
                donut
                sectionAutoFocus
                radius={90}
                innerRadius={60}
                innerCircleColor={'#363637'}
                centerLabelComponent={() => {
                  return (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text
                        style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                        47%
                      </Text>
                      <Text style={{fontSize: 14, color: 'white'}}>Tarefas</Text>
                    </View>
                  );
                }}
              />
            </View>
            <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}>
          {renderDot('#67d207')}
          <Text style={{color: 'white'}}>Concluído: 47%</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#ebae11')}
          <Text style={{color: 'white'}}>Em Progresso: 16%</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}>
          {renderDot('#de0300')}
          <Text style={{color: 'white'}}>A fazer: 40%</Text>
        </View>
      </View>
          </View>
        </>
    )
}