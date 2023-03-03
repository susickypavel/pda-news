import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/base";
import { TestComponent } from "./src/components/test-component";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello, World!</Text>
      <Text>Má to fast refresh, cool 😎</Text>
      <Button>Click</Button>
      <TestComponent />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
