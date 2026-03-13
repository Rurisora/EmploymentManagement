import React from "react";
import { Button, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter(); // get the navigation router

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      
      <Button 
        title="Employee Form"
        onPress={() => router.push("./employeeForm")}
      />
    </View>
  );
}



