import { NavigationContainer } from "@react-navigation/native";
import { checkTokenValidity } from "../utils/utils";
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

    return (
        <NavigationContainer>
            {userToken ? <StackRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}
