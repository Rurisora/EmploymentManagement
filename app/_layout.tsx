import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#f2f2f2" },
        headerTintColor: "#333",
      }}
    />
  );
}