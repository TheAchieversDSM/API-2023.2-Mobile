import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  tab: {
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  focus: {
    borderTopColor: "#de0300",
    borderTopWidth: 2,
  },
  plusIconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    top: -30,
    width: 55,
    backgroundColor: "#de0300",
    borderRadius: 10,
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderLeftWidth: 4,
    transform: [{rotate: "45deg"}],
    borderLeftColor: "transparent",
    borderRightColor: "#393939",
    borderTopColor: "#393939",
    borderBottomColor: "#393939",
    borderWidth: 5,
  },
  plusIconStyled: {
    color: "#F2F2F2",
    transform: [{rotate: "-45deg"}],
  },
});
