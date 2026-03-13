import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter(); // get the navigation router

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome to the Employee Management</Text>
      
      <View style={styles.button}>
        <Button title="Employee Form" onPress={() => router.push("./employeeForm")} />
      </View>

      <View style={styles.button}>
        <Button title="Sign Up" onPress={() => router.push("./signUp")} />
      </View>
                       
      <View style={styles.button}>
              <Button title="Sign In" onPress={() => router.push("./signIn")} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
    width: "60%",
    borderRadius: 5,
    overflow: "hidden",

  }


});
