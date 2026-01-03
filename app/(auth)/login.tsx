import { API_URL } from "@/src/api/client";
import { useAuth } from "@/src/auth/AuthProvider";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

export default function Login() {
  const {signIn} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordHidden, setPasswordHidden]  =  useState(true);

  const onLoginPress = async () => {
    setError(null);
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers:  { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password}),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg ||  "Login Failed");
      }

      const data: { accessToken: string } = await res.json();

      if (!data?.accessToken) {
        throw new Error("No access token was returned from the server");
      }

      await signIn(data.accessToken);
    } catch (e) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHidePassword = () => {
    setPasswordHidden(!passwordHidden);
  }

  return (
    <View style={{ flex:1, padding: 16,  justifyContent: "center", gap: 12 }}>
      {/* Some text above the fields */}
      <Text style={{ fontSize: 28, fontWeight: "700" }}>
        Login
      </Text>
      {/* show error message if it exists */}
      {error ? (
        <Text style={{ color: "red" }}>
          {error}
        </Text>
      ): null}
      {/* email */}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}
      />
      {/* password */}
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        autoComplete="password"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}
      />
      {/* Button */}
      <Pressable
        onPress={onLoginPress}
        disabled={isLoading}
        style={
          ({ pressed }) => ({
            backgroundColor: isLoading ? "#999" : "#000",
            paddingVertical: 14,
            borderRadius: 12,
            opacity: pressed ? 0.85 : 1,
            alignItems: "center",
          })}
      >
        {
          isLoading ? 
          (
            <ActivityIndicator/>
          ): (
            <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
              Login
            </Text>
          )
        }
      </Pressable>
    </View>
  )
}