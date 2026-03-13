import { Formik } from "formik";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function SignInForm() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>

            <Formik initialValues={{email: "", password: ""}}
                validationSchema={SignInSchema}
                onSubmit={(values, {resetForm}) => {

                    Alert.alert("Success", "Signed in successfully!");

                    resetForm();
                    console.log("Sign In Data:", values);
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid,
                }) => (
                
                    <View>
                        <TextInput placeholder="Email"
                            style={styles.input}
                            keyboardType="email-address"
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                        />
                        {touched.email && errors.email && (
                            <Text style={styles.error}>{errors.email}</Text>
                        )}

                        <TextInput placeholder="Password"
                            style={styles.input}
                            secureTextEntry
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                        />
                        {touched.password && errors.password && (
                            <Text style={styles.error}>{errors.password}</Text>
                        )}

                        <Button title="Sign In" onPress={() => handleSubmit()} disabled={!isValid} />
                    </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    error: {
        color: "red",
        marginBottom: 10,
    }
})