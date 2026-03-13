import { Formik } from "formik";
import { useState } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
    fullName: Yup.string().matches(/^[A-Za-z\s]+$/, "Name cannot contain numbers or special characters").min(2, "Full Name must be at least 2 characters").required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password must match").required("Confirm Password is required")
});

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmPassword] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <Formik
                initialValues={{
                    fullName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values, {resetForm}) => {
                    console.log("Sign Up Data:", values);
                    
                    Alert.alert("Success", "Account created successfully!");

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

                            <TextInput placeholder="Full Name"
                            style={styles.input}
                            onChangeText={handleChange("fullName")}
                            onBlur={handleBlur("fullName")}
                            value={values.fullName}
                            />
                            {touched.fullName && errors.fullName && (
                                <Text style={styles.error}>{errors.fullName}</Text>
                            )}

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
                            
                            <View style={styles.passwordContainer}>
                                <TextInput placeholder="Password"
                                style={styles.input}
                                secureTextEntry={!showPassword}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                value={values.password}
                                />

                                <View style={styles.rowBelow}>
                                    <Text style={styles.error}> {touched.password && errors.password ? errors.password : " "}</Text>

                                    <Pressable onPress={() => setShowPassword(!showPassword)} style={({pressed}) => [styles.toggle, pressed && { opacity: 0.5}]}>
                                        <Text>{showPassword ? "Hide" : "Show"}</Text>
                                    </Pressable>
                                </View>                                
                            </View>
                            
                            <View style = {styles.passwordContainer}>
                                <TextInput placeholder="Confirm Password"
                                style={styles.input}
                                secureTextEntry
                                onChangeText={handleChange("confirmPassword")}  
                                onBlur={handleBlur("confirmPassword")}
                                value={values.confirmPassword}
                                />
                                <View style={styles.rowBelow}>
                                    <Text style={styles.error}> {touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : " "}</Text>

                                    <Pressable onPress={() => setShowConfirmPassword(!showConfirmedPassword)} style={({ pressed }) => [styles.toggle, pressed && {opacity: 0.5}]}>
                                        <Text>{showConfirmedPassword ? "Hide" : "Show"}</Text>
                                    </Pressable>

                                  
                                </View>

                            </View>




                            <Button title="Sign Up" onPress={() => handleSubmit()} disabled={!isValid} />  
 
                        </View>
                    )}
                </Formik>
        </View>
    );
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
    passwordContainer: {
        marginBottom: 10,
    },

    rowBelow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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

    error: {
        color: "red",
        flexShrink: 1,
    }
});