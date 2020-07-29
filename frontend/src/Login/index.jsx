import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import MyContext from "../context";
const ENDPOINT = "http://127.0.0.1:4001";

export default function Login(props) {
  const { apelido, setApelido } = props;
  const history = useHistory();
  const { setLoad } = props;

  return (
    <MyContext.Consumer>
      {prop => {
        const submit = () => {
          if (apelido) {
            const socket = socketIOClient(ENDPOINT);
            setLoad(true);
            history.push('/welcome');
            prop.updateSock('socket', socket);
          }
        }

        const changeApelido = async e => {
          await setApelido(e.target.value)
        }

        return (
          <>
            <input placeholder='Apelido' value={apelido} onChange={changeApelido} />
            <button onClick={submit}>
              Entrar
          </button>
          </>
        )
      }}
    </MyContext.Consumer>
  );
}