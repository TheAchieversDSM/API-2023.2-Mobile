import { NavigationContainer } from "@react-navigation/native";
import { checkTaskLogs, checkTokenValidity } from "../utils/utils";
import { StackRoutes } from "./stack.routes";
import { AuthRoutes } from "./auth.routes";
import React, { useEffect } from "react";
import { useAuth } from "../hooks/auth";
import { api } from "../service/api";

export function Routes() {
    const { userToken, signOut } = useAuth();

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (userToken) {
                checkTokenValidity(userToken, signOut);
            }
        }, 3600 * 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [userToken, signOut]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (userToken) {
                await checkTaskLogs(userToken);
            }
        }, 86400000);
        return () => {
            clearInterval(intervalId);
        };
    }, [userToken])

    useEffect(() => {
        if (userToken) {
            api.interceptors.request.use((config) => {
                config.headers.Authorization = `Bearer ${userToken}`;
                return config;
            });
        }
    }, [userToken]);

    return (
        <NavigationContainer>
            {userToken ? <StackRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}
