import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import MyContext from '../context';
const ENDPOINT = "http://127.0.0.1:4001";

export default props => {
    const history = useHistory();
    let socket;
    const { apelido } = props;
    useEffect(() => {
        if (!props.load) {
            history.push('/');
        }
    }, []);

    return (
        <MyContext.Consumer>
            {prop => {
                const { socket } = prop.state;
                if (socket) {
                    socket.emit('login',apelido);
                }
                return (
                    <p>
                        Hello World!
                        Welcome to the home!
                    </p>
                )
            }}
        </MyContext.Consumer>
    )
}