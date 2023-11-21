import { AuthAction, AuthContextActions, AuthContextType, AuthPropsLogin, AuthState, AuthUserData } from "../interfaces/auth";
import { useMemo, createContext, ReactNode, useReducer, useEffect, useContext } from "react";
import { getToken, removeToken, setToken } from "../utils/utils";
import { AxiosError, AxiosResponse } from 'axios';
import { api } from "../service/api"

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        status: 'idle',
        userToken: null,
    })

    useEffect(() => {
        const initState = async () => {
            try {
                const userToken = await getToken()
                if (userToken !== null) {
                    dispatch({ type: 'SIGN_IN', token: userToken })
                } else {
                    dispatch({ type: 'SIGN_OUT' })
                }
            } catch (e) {
                console.log(e)
            }
        }

        initState()
    }, [])

    const authActions: AuthContextActions = useMemo(
        () => ({
            signIn: async (data: AuthPropsLogin) => {
                try {
                    const login: AxiosResponse<AuthUserData> = await api.post("/user/login", data)
                    dispatch({ type: 'SIGN_IN', token: login.data.token })
                    await setToken(login.data.token)
                } catch (error: AxiosError | any) {
                    if (error.response) {
                        if (error.response.status === 401) {
                            const authenticationError = error.response.data.error;
                            return authenticationError;
                        }
                    }
                }
            },
            signOut: async () => {
                await removeToken()
                dispatch({ type: 'SIGN_OUT' })
            },
        }),
        []
    )

    return (
        <AuthContext.Provider value={{ ...state, ...authActions }}>
            {children}
        </AuthContext.Provider>
    )
}

const AuthReducer = (prevState: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...prevState,
                status: 'signIn',
                userToken: action.token,
            }
        case 'SIGN_OUT':
            return {
                ...prevState,
                status: 'signOut',
                userToken: null,
            }
    }
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be inside an AuthProvider with a value')
    }
    return context
}