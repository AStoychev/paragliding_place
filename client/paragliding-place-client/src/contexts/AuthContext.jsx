import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { authServiceFactory } from '../services/authService';

import { profileServiceFactory } from '../services/profileService';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();

    // Try error
    const [errors, setErrors] = useState("");
    const catchServerError = (error, message) => {
        if (error) {
            setErrors(message)
            setTimeout(() => {
                setErrors("");
            }, 2500);
        }
    }
    // Try error

    const authService = authServiceFactory(auth.token);

    const profileService = profileServiceFactory()
    const [profile, setProfile] = useState([])

    const onLoginSubmit = async (data) => {
        const redirectTo = data.path
        try {
            const result = await authService.login(data);
            setAuth(result);
            navigate(`${redirectTo}`);

        } catch (error) {
            console.log('There is a problem')
            catchServerError(error, "Email or password don't match!")
        }
    };

    const onRegisterSubmit = async (values) => {
        const { confirmPassword, ...registerData } = values;
        if (confirmPassword !== registerData.password) {
            return;
        }
        try {
            const result = await authService.register(registerData);
            setAuth(result);
            navigate('/');
        } catch (error) {
            console.log('There is a problem')
            catchServerError(error, "We’re sorry. This email or usesrname already exists…")
        }
    };

    const onLogout = async () => {
        try {
            await authService.logout();
            setAuth({});
            // Try logout
            localStorage.removeItem('auth');
            // Try logout
            // This reload page after logout. Use for clear authentication token permision
            window.location.reload();
            // This reload page after logout. Use for clear authentication token permision
        } catch (error) {
            catchServerError(error, "There is some problem with logout!")
        }
    };

    const onProfileEditSubmit = async (values) => {
        const profileId = values.id
        try {
            const result = await profileService.edit(values.id, values);
            setProfile(state => state.map(x => x.id === values.id ? result : x));
            navigate(`profile/${profileId}`);
        } catch (error) {
            catchServerError(error, "There is some problem with Profile edit!");
        }
    };

    const onChangePassword = async (values) => {
        const profileId = values.id;
        try {
            const result = await profileService.changePassword(profileId, values);
            setProfile(state => state.map(x => x.id === values.id ? result : x));
            navigate(`profile/${profileId}`);
        } catch (error) {
            catchServerError(error, "There is some problem with change password!");
        }
    }

    const onResetPassword = async (values) => {
        try {
            await profileService.resetPassword(values);
            navigate('/feedback-enter-mail');
        } catch (error) {
            if (error) {
                setErrors("There is a problem with reset password please check email addres is correct!")
            }
            // catchServerError(error, "There is a problem with reset password please check email addres is correct!")
        }
    }

    const onCreateNewPassword = async (password, token) => {
        try {
            await profileService.createNewPassword(password, token);
            navigate('/feedback-enter-token');
        } catch (error) {
            catchServerError(error, "There is a problem with reset password!");
        }
    }


    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        onProfileEditSubmit,
        onChangePassword,
        onResetPassword,
        onCreateNewPassword,
        userId: auth.user_id,
        password: auth.password,
        token: auth.token,
        userEmail: auth.email,
        userName: auth.username,
        isAuthenticated: !!auth.token,
        userAuth: auth,
        userAge: auth.age,
        userFirstName: auth.first_name,

        // isAuthenticated: !!auth.accessToken,

        thisError: errors,
    };

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
}

// not necessary

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};