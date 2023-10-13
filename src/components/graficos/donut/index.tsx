import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Legenda, TextDonut, Titulo } from "./styled";
import { ITaskCheck } from "../../../interfaces/functions";

export const Donut = (values: ITaskCheck) => {

  const pieData = [
    { value: values.done, color: '#67d207' },
    { value: values.doing, color: '#ebae11' },
    { value: values.todo, color: '#de0300' },
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



  return (
    <>
      <View
        style={{ marginBottom: 20 }}
      >
        <Titulo>
          Tarefas do mês
        </Titulo>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <PieChart
            data={pieData}
            donut
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={'#222328'}
            centerLabelComponent={() => {
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TextDonut
                    style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                    {values?.done}%
                  </TextDonut>
                  <TextDonut style={{ fontSize: 14, color: 'white' }}>concluídas</TextDonut>
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
            <Legenda style={{ color: 'white' }}>A Fazer: {values?.todo.toFixed(2)}%</Legenda>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
            {renderDot('#ebae11')}
            <Legenda style={{ color: 'white' }}>Progresso: {values?.doing.toFixed(2)}%</Legenda>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#67d207')}
            <Legenda style={{ color: 'white' }}>Concluído: {values?.done.toFixed(2)}%</Legenda>
          </View>
        </View>
      </View>
    </>
  )
}