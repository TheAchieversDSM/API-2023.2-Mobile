import { NavigationContainer } from "@react-navigation/native";
import { checkTaskLogs, checkTokenValidity } from "../utils/utils";
import { StackRoutes } from "./stack.routes";
import { AuthRoutes } from "./auth.routes";
import React, { useEffect } from "react";
import { useAuth } from "../hooks/auth";

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
            console.log('\x1b[43m\x1b[31m[CheckTaskLogs]\x1b[0m Checagem das task 1 dia')
            if (userToken) {
                await checkTaskLogs(userToken);
            }
        }, 86400000);
        return () => {
            clearInterval(intervalId);
        };
    }, [userToken])

    return (
        <NavigationContainer>
            {userToken ? <StackRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}
