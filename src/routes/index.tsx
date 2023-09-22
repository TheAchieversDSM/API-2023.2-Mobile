import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./stack.routes";
import { useAuth } from "../hooks/auth";
import { checkTokenValidity, decodeJsonWebToken } from "../utils/utils";
import { AuthRoutes } from "./auth.routes";

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
