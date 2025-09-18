import { Provider } from "./context/provider.tsx";
import MainComponent from "./component/main-component.tsx";
// import { OpenfortButton } from "@openfort/react";

import "./App.css";

function App() {
    return (
        <Provider>
            <main
                style={{
                    padding: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    width: "100vw",
                }}
            >
                {/*<OpenfortButton showAvatar={true} showBalance={true} label={"Login"} />*/}
                <MainComponent />
            </main>
        </Provider>
    );
}

export default App;
