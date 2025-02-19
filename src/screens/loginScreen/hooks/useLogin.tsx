import { useContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { UserContext } from '../../../context/userContext';
import { useNavigation } from '@react-navigation/native';
import SCREEN_NAMES from '../../../navigation/screenNames';
import { Keyboard } from 'react-native';

const useLogin = () => {
    const { navigate } = useNavigation();
    const { login } = useContext(UserContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [signup, setSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('dummy1@gmail.com');
    const [password, setPassword] = useState<string>('123456');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [signInError, setSignInError] = useState<string>('');


    const setUserData = (user) => {
        setEmail('');
        setPassword('');
        login({ email: email, uid: user?.user?.uid });
        setLoading(false);
        navigate(SCREEN_NAMES.HABIT);
    };
    const validateForm = () => {
        let valid = true;
        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Enter a valid email');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            valid = false;
        } else {
            setPasswordError('');
        }

        return valid;
    };

    const handleLogin = () => {
        Keyboard.dismiss();
        if (validateForm()) {
            setLoading(true);
            signup ? signUp() : signIn();
        }
    };

    const signIn = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                setUserData(user);
            })
            .catch(error => {
                if (error.code === 'auth/invalid-credential') {
                    setSignInError('Invalid email or password');
                }
                setLoading(false);
            });
    };

    const signUp = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                setUserData(user);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setEmailError('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    setEmailError('That email address is invalid!');
                }
                setLoading(false);
            });
    };

    const onFooterPress = () => {
        signInError && setSignInError('');
        emailError && setEmailError('');
        passwordError && setPasswordError('');
        setSignUp((prevValue) => !prevValue);
    };

    const onEmailChange = (text: string) => {
        setEmail(text);
        setEmailError('');
        signInError && setSignInError('');
    };

    const onPasswordChange = (text: string) => {
        setPassword(text);
        setPasswordError('');
        signInError && setSignInError('');
    };

    return {
        state: {
            loading,
            signup,
            email,
            password,
            emailError,
            passwordError,
            signInError,
        },
        callbacks: {
            handleLogin,
            onFooterPress,
            onEmailChange,
            onPasswordChange,
        },
    };
};

export default useLogin;
