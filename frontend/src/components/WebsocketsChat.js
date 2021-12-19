import React, { Component, useEffect, useState, useContext } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Card, Avatar, Input, Typography } from 'antd';
import 'antd/dist/antd.css';
import styles from '../styles/WebsocketsChat.module.css'
import {AppContext} from './AppContext'

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

const client = new W3CWebSocket('ws://127.0.0.1:8000');

function WebsocketChat() {

    const { loggedInInfo } = useContext(AppContext);

    const [userChatInfo, setUserChatInfo ] = useState({userName: loggedInInfo.email, isLoggedIn: true, messages: []})
    const [searchVal, setSearchVal] = useState({})


  const onButtonClicked = () => {
    client.send(JSON.stringify({
      type: "message",
      msg: searchVal.searchVal,
      user: userChatInfo.userName
    }));
    setSearchVal({ searchVal: '' })
  }
  useEffect(()=>{
    client.onopen = () => {
        console.log('WebSocket Client Connected');
      };
      client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        console.log('got reply! ', dataFromServer);
        if (dataFromServer.type === "message") {
            setUserChatInfo((state) =>
            ({userName: loggedInInfo.email, 
                isLoggedIn: true,
              messages: [...state.messages,
              {
                msg: dataFromServer.msg,
                user: dataFromServer.user
              }]
            })
          );
        }
      };
  },[]) 
    
 
    return (
      <div className={styles.main} id='wrapper'>
        <div>
          <div className={styles.title}>
            <Text id="main-heading" type="secondary" style={{ fontSize: '36px' }}>Websocket Chat: {userChatInfo.userName}</Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50 }} id="messages">
            {userChatInfo.messages.map((message) => {

              return (<Card key={message.msg} style={{ width: 300, margin: '16px 4px 0 4px', alignSelf: userChatInfo.userName === message.user ? 'flex-end' : 'flex-start' }} loading={false}>
                <Meta
                  avatar={
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{message.user[0].toUpperCase()}</Avatar>
                  }
                  title={message.user+":"}
                  description={message.msg}
                />
              </Card> )
})}
          </div>
          <div className={styles.bottom}>
            <Search
              placeholder="input message and send"
              enterButton="Send"
              value={searchVal.searchVal}
              size="large"
              onChange={(e) => setSearchVal({ searchVal: e.target.value })}
              onSearch={onButtonClicked}
            />
          </div> 
        </div>
  
      </div>
    )
}
export default WebsocketChat
