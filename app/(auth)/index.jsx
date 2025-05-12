import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import {Image} from "expo-image";
import styles from '../../assets/styles/login.styles';
import COLORS from '../../constants/colors';
import { useAuthStore } from '../../store/authStore';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, isLoading, login } =useAuthStore();

  const handleLogin = async () => {
    const result = await login(user, password);
        if(!result.success) Alert.alert("Error", result.error)
  }
  return (
    <KeyboardAvoidingView 
    style={{flex:1}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <View style={styles.container}>
      {/* Illustration */}
      <View style={styles.topIllustration}>
        <Image 
        source={require("../../assets/images/undraw1.png")}
        style={styles.topIllustration}
        />
      </View>
      <View style={styles.card}>
        <View style={styles.formContainer}>
          {/* EMAIL */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder='Enter your email'
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
              />
            </View>
          </View>
          {/* PASSWORD */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              {/* LEFT ICON */}
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.placeholderText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              {/* EYE ICON */}
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Dont have an account?</Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.link}>Sing UP</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <Text>Dont</Text>
        </View>        
      </View>
    </View>
    </KeyboardAvoidingView>
  )
}