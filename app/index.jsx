import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function Index() {
  const { user, token, checkAuth, logout } = useAuthStore();
  useEffect(() =>{
    checkAuth();
  }, []);
  return (
    <View style={styles.container}>   
      <Text style={styles.title}> Hello {user?.username}</Text>

      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
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
