import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  plusIconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    top: -25,
    width: 50,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderLeftWidth: 4,
    transform: [{rotate: "45deg"}],
    borderLeftColor: "#393939",
    borderRightColor: "#393939",
    borderTopColor: "#393939",
    borderBottomColor: "#393939",
    borderWidth: 5,
  },
});
