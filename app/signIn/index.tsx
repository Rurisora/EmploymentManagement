
import { Formik } from "formik";
import { useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function SignInForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>

            <Formik initialValues={{email: "", password: ""}}
                validationSchema={SignInSchema}
                onSubmit={(values, {resetForm}) => {
                    console.log("Sign In Data:", values);
                    setMessage("Sign In success. Welcome back")
                    resetForm();

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
                        <View style={styles.showPasswordContainer}>
                            <TextInput placeholder="Password"
                                style={styles.input}
                                secureTextEntry={!showPassword}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                value={values.password}
                            />
                            <View style={styles.rowBelow}>
                                <Text style={styles.error}> {touched.password && errors.password ? errors.password : " "}</Text>

                                <Pressable onPress={() => setShowPassword(!showPassword)} style={({pressed}) => [styles.toggle, pressed && {opacity: 0.5}]}>
                                    <Text>{showPassword ? "Hide" : "Show"}</Text>
                                </Pressable>
                            </View>
                        </View>

                        <Button title="Sign In" onPress={() => handleSubmit()} disabled={!isValid} />
                        
                        {message !== "" && (
                            <Text style={styles.success}>
                                {message}
                            </Text>
                        )}                         
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
    showPasswordContainer: {
        marginBottom: 10,
    },
    rowBelow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    error: {
        color: "red",
        marginBottom: 10,
    },
    toggle: {
        marginLeft: 10,
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 2,
        minWidth: 60,
        alignItems: "center",
        justifyContent: "center",
    },

    success: {
    color: "skyblue",
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
    },
})