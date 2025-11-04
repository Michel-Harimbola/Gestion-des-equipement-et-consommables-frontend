import { Provider } from "react-redux";
import { store } from "../redux/store/store"; 
import { LoadingProvider, useLoading } from "../context/LoadingContext";
import { setLoadingInstance } from "../context/LoadingContextHandler";

function LoadingConnector() {
    const loading = useLoading();
    setLoadingInstance(loading);
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