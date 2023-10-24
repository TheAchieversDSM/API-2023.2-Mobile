import React from "react";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { useTheme } from 'styled-components';
import * as M from "./styled";

export default function Multiselect() {
    const [selected, setSelected] = React.useState([]);
    const theme = useTheme()
  
    const data = [
        {key:'2', value:'Appliances'},
        {key:'3', value:'Cameras'},
        {key:'5', value:'Vegetables'},
        {key:'6', value:'Diary Products'},
        {key:'7', value:'Drinks'},
    ]
    
    return (
        <>
            <M.MultiView>
                <M.MultiCont>
                    <MultipleSelectList
                        setSelected={(val: React.SetStateAction<never[]>) => setSelected(val)}
                        data={data}
                        save="value"
                        label="Compartilhar tarefa com"
                        notFoundText='Usuário não encontrado'
                        fontFamily="theme.FONTS.Poppins_400Regular"
                        labelStyles={{
                            fontFamily: theme.FONTS.Poppins_400Regular,
                            fontSize: 18
                        }}
                        badgeStyles={{backgroundColor: "#de0300"}}
                        badgeTextStyles={{fontFamily: theme.FONTS.Poppins_500Medium,}}
                        itemStyles={{ fontFamily: theme.FONTS.Poppins_400Regular, fontSize: 16 }}
                    />
                </M.MultiCont>
            </M.MultiView>
        </>
    )
}