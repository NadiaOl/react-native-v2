import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "../Home";
import { authStateCahngeUser } from "../redux/auth/authOperations";


const Main = () => {
    const { stateChange } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authStateCahngeUser());
    }, []);

    const routing = Home(stateChange);
    useEffect(() => {}, []);
    return <NavigationContainer>{routing}</NavigationContainer>;
    };

export default Main;