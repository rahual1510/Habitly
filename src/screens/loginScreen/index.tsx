import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import useLogin from './hooks/useLogin';
import LoaderView from '../../utils/components/loaderView';
import { useStyles } from './styles';

const LoginScreen = () => {
    const {
        state: { loading, email, password, emailError, passwordError, signup, signInError },
        callbacks: { onEmailChange, onPasswordChange, handleLogin, onFooterPress },
    } = useLogin();

    const { styles } = useStyles();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Habitly</Text>
            <TextInput
                style={[styles.input, (emailError || signInError) ? styles.errorInput : null]}
                placeholder="Email"
                value={email}
                onChangeText={onEmailChange}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <TextInput
                style={[styles.input, (passwordError || signInError) ? styles.errorInput : null]}
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={onPasswordChange}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            {signInError ? <Text style={styles.errorText}>{signInError}</Text> : null}
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>{signup ? 'Sign Up' : 'Sign In'}</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <TouchableOpacity activeOpacity={0.5} onPress={onFooterPress}>
                    <Text style={styles.footerText}>{signup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</Text>
                </TouchableOpacity>
            </View>
            {loading ? <LoaderView /> : null}
        </View>
    );
};

export default LoginScreen;

