import { Providers } from "./context/provider.tsx";
import { OpenfortButton } from "@openfort/react";

import './App.css'

function App() {

  return (
    <Providers>
      <h1>Naira Pay</h1>
        <OpenfortButton />
    </Providers>
  )
}

export default App
