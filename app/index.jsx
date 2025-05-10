import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>     

      <Link href="/(auth)/signup" style={styles.link}>Signup</Link>
      <Link href="/(auth)" style={styles.link}>Login</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    color: "blue",
    marginTop: 10,
  },
});
