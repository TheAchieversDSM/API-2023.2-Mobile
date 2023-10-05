import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Legenda, TextDonut, Titulo } from "./styled";

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
            style={{marginBottom: 20}}
          >
            <Titulo>
                Tarefas do mês
            </Titulo>
            <View style={{padding: 20, alignItems: 'center'}}>
              <PieChart
                data={pieData}
                donut
                sectionAutoFocus
                radius={90}
                innerRadius={60}
                innerCircleColor={'#222328'}
                centerLabelComponent={() => {
                  return (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      <TextDonut
                        style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                        47%
                      </TextDonut>
                      <TextDonut style={{fontSize: 14, color: 'white'}}>Tarefas</TextDonut>
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
          {renderDot('#de0300')}
          <Legenda style={{color: 'white'}}>A Fazer: 5%</Legenda>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#ebae11')}
          <Legenda style={{color: 'white'}}>Progresso: 16%</Legenda>
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
          {renderDot('#67d207')}
          <Legenda style={{color: 'white'}}>Concluído: 47%</Legenda>
        </View>
      </View>
          </View>
        </>
    )
}