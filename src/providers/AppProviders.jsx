import React from "react";
import { Provider } from "react-redux";
import { store } from "react-redux"; 
import { LoadingProvider, useLoading } from "../context/LoadingContext";
import { setLoadigInstance } from "../context/LoadingContextHandler";

function LoadingConnector() {
    const loading = useLoading();
    setLoadigInstance(loading);
    return null;
}

export default function AppProviders({ children }) {
    return ( 
        <Provider store={store}>
            <LoadingProvider>
                <LoadingConnector />
                {children}
            </LoadingProvider>
        </Provider>
    );
}