import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ARNavigationScreen() {
  const { floor } = useLocalSearchParams();

  return (
    <View>
      <Text>Selected floor: {floor}</Text>
    </View>
  );
}
