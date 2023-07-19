import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { authServiceFactory } from '../services/authService';

import { profileServiceFactory } from '../services/profileService';

// Handling
// Handling

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();

    // Try error
    const [errors, setError] = useState({});
    const [errorEmail, setErrorEmail] = useState({});
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
            if (error) {
                setError(error)
                setTimeout(() => {
                    setError({});
                }, 2000);
            }

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
            if (error) {
                setErrorEmail(error)
                setTimeout(() => {
                    setErrorEmail({})
                }, 2000);
            }

        }

    };

    const onLogout = async () => {
        
        await authService.logout();

        setAuth({});

        // Try logout
        localStorage.removeItem('auth');
        // Try logout

        // This reload page after logout. Use for clear authentication token permision
        window.location.reload();
        // This reload page after logout. Use for clear authentication token permision
    };

    const onProfileEditSubmit = async (values) => {
        const profileId = values.id
        
        const result = await profileService.edit(values.id, values);

        setProfile(state => state.map(x => x.id === values.id ? result : x))

        navigate(`profile/${profileId}`)
    };

    const onChangePassword = async (values) => {
        const profileId = values.id;
        
        const result = await profileService.changePassword(profileId, values)
        
        setProfile(state => state.map(x => x.id === values.id ? result : x))

        navigate(`profile/${profileId}`)
    }

    const onResetPassword = async (values) => {
        await profileService.resetPassword(values)
        navigate('/feedback-enter-mail')
    }

    const onCreateNewPassword = async (password, token) => {
        await profileService.createNewPassword(password, token)
        navigate('/feedback-enter-token')
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
        errorEmail: errorEmail,
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