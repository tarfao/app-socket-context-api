import React, { useState } from "react";
import Login from "./Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Welcome from './Welcome';
import MyContext from "./context";

function App() {
  const [load, setLoad] = useState(false);
  const [sock, setScok] = useState({ socket: false });
  const [apelido, setApelido] = useState("");

  const updateSock = async (key, val) => {
    await setScok({ ...sock, [key]: val });
  }
  
  return (
    <MyContext.Provider value={{ state: sock, updateSock }}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact render={props => <Login
            {...props}
            setLoad={setLoad}
            apelido={apelido}
            setApelido={setApelido} />} />
          <Route path='/welcome' render={props => <Welcome {...props} load={load} apelido={apelido}/>} />
        </Switch>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;