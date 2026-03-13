import { Formik } from "formik";
import { useState } from "react"; // ADDED useState
import { Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

const employeeSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.com$/, "Email must be a valid email"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  department: Yup.string().required("Department is required"),
  position: Yup.string().required("Position is required"),
});

export default function EmployeeForm() {

  const [message, setMessage] = useState(""); // ADDED state for success message
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{ name: "", email: "", phone: "", department: "", position: "" }}
          validationSchema={employeeSchema}
          onSubmit={(values, {resetForm}) => {
            console.log(values);
            setMessage("Employee information submitted successfully!"); // ADDED success message on submit
            resetForm();            
          }}
          
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
             
              <View style={styles.row}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  placeholder="Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  style={[styles.input, touched.name && errors.name ? styles.inputError : null]}
                />
              </View>
              {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

              <View style={styles.row}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
                />
              </View>
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <View style={styles.row}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  placeholder="Phone"
                  keyboardType="numeric"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  style={[styles.input, touched.phone && errors.phone ? styles.inputError : null]}
                />
              </View>
              {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

              <View style={styles.row}>
                <Text style={styles.label}>Department</Text>
                <TextInput
                  placeholder="Department"
                  onChangeText={handleChange("department")}
                  onBlur={handleBlur("department")}
                  value={values.department}
                  style={[styles.input, touched.department && errors.department ? styles.inputError : null]}
                />
              </View>
              {touched.department && errors.department && <Text style={styles.error}>{errors.department}</Text>}

              <View style={styles.row}>
                <Text style={styles.label}>Position</Text>
                <TextInput
                  placeholder="Position"
                  onChangeText={handleChange("position")}
                  onBlur={handleBlur("position")}
                  value={values.position}
                  style={[styles.input, touched.position && errors.position ? styles.inputError : null]}
                />
              </View>
              {touched.position && errors.position && <Text style={styles.error}>{errors.position}</Text>}

              <Button title="Submit" onPress={() => handleSubmit()} />

              {message !== "" && (
                <Text style = {styles.success}>
                  {message}
                </Text>
              )} 
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",       // horizontal layout
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    width: 100, 
    fontWeight: "bold",
  },
  input: {
    flex: 1, // take up remaining space
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    marginBottom: 5,
    marginLeft: 100,   // align with input field
  },

  success: {
    color: "skyblue",
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  }
});


