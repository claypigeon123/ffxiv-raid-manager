/*
Later

import { useState, useEffect } from 'react';

export const WebsocketComponent = ({ on = false }) => {

    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (on) {
            connect();
        } else {
            disconnect()
        }
    }, [on]) //eslint-disable-line react-hooks/exhaustive-deps

    const connect = () => {
        let socket = new WebSocket(`ws://${ process.env.REACT_APP_ENDPOINT_URI ? process.env.REACT_APP_ENDPOINT_URI.split("//")[1] : "localhost:9000"}/ws/notifications`)

        socket.onopen = open => {
            setConnected(true);
        }

        socket.onmessage = message => {
            console.log(JSON.parse(message.data));
        }

        socket.onerror = error => {
            setConnected(false);
        }

        socket.onclose = close => {
            setConnected(false);
        }

        setSocket(socket);
    }

    const disconnect = () => {
        if (!connected) {
            return;
        }

        socket.close();
    }

    return <></>
};*/