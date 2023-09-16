import { View, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { FC } from "react";

export default function _Card({
  Icon,
  children,
  style,
}: {
  Icon: FC<any>;
  children: any;
  style?: any;
}) {
  return (
    <Card
      mode="outlined"
      style={[
        {
          backgroundColor: "#fafafa",
          borderColor: "rgba(0,0,0,0.1)",
          marginTop: 10,
        },
        style,
      ]}
    >
      <Card.Content>
        <View style={styles.cardItem}>
          <View style={styles.iconWrapper}>
            <Icon />
          </View>
          <View style={styles.cardItemText}>{children}</View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  cardItemText: {
    flexGrow: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});
