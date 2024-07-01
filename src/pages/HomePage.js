import React, { useEffect, useState } from "react";
import {
  Navbar,
  Page,
  Messages,
  MessagesTitle,
  Message,
  Messagebar,
  Link,
  f7ready,
  f7,
} from "framework7-react";

const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

export default () => {
  const [typingMessage, setTypingMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messagesData, setMessagesData] = useState([]);
  const [temperature, setTemperature] = useState(0.7);

  useEffect(() => {
    f7ready(() => {
      // read from local storage
      const messagesData = JSON.parse(localStorage.getItem("messagesData"));
      if (messagesData) setMessagesData(messagesData);
 
      updateSettings();
    });
  }, []);

  const updateSettings = () => {
    const temperatureSetting = JSON.parse(localStorage.getItem("temperature"));
    if (temperatureSetting) setTemperature(temperatureSetting);
  };

  const isFirstMessage = (message, index) => {
    const previousMessage = messagesData[index - 1];
    if (message.isTitle) return false;
    if (
      !previousMessage ||
      previousMessage.type !== message.type ||
      previousMessage.name !== message.name
    )
      return true;
    return false;
  };

  const isLastMessage = (message, index) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (
      !nextMessage ||
      nextMessage.type !== message.type ||
      nextMessage.name !== message.name
    )
      return true;
    return false;
  };

  const isTailMessage = (message, index) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (
      !nextMessage ||
      nextMessage.type !== message.type ||
      nextMessage.name !== message.name
    )
      return true;
    return false;
  };

  const sendMessage = async () => {
    const text = messageText.trim();

    if (text.length === 0) return;

    const newMessagesData = [...messagesData];
    newMessagesData.push({
      type: "sent",
      text: text,
    });

    setMessagesData(newMessagesData);
    setMessageText("");

    // Show loading indicator
    setTypingMessage(true);

    // AI response
    await wait(3000);

    // AI response, call groq API
const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        temperature: 0.7,
        messages: newMessagesData
          .map((message) => ({
            role: message.type === "sent" ? "user" : "assistant",
            content: message.text,
          }))
          .slice(-6),
        model: "llama3-70b-8192",
      }),
    }
  );
  
  const responseJson = await response.json();
  
  if (responseJson.choices.length > 0) {
    const responseText = responseJson.choices[0].message.content;
    newMessagesData.push({
      type: "received",
      text: responseText,
    });
  
    setMessagesData(newMessagesData);
  }
    // Stop loading indicator
    setTypingMessage(false);
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 儲存
  localStorage.setItem("key", "value");

  // 讀取
  localStorage.getItem("key");

  useEffect(() => {
    f7ready(() => {
      // read from local storage
      const messagesData = JSON.parse(localStorage.getItem("messagesData"));
      if (messagesData) setMessagesData(messagesData);
    });
  }, []);

  return (
    <Page>
      <Navbar title="Messages">
        <Link slot="nav-right" href="/settings/">
          Settings
        </Link>
      </Navbar>

      <Messagebar
        value={messageText}
        onInput={(e) => setMessageText(e.target.value)}
      >
        <Link slot="inner-end" onClick={sendMessage}>
          Send
        </Link>
      </Messagebar>

      <Messages>
        <MessagesTitle>Conversation</MessagesTitle>

        {messagesData.map((message, index) => (
          <Message
            key={index}
            type={message.type}
            name={message.name}
            first={isFirstMessage(message, index)}
            last={isLastMessage(message, index)}
            tail={isTailMessage(message, index)}
          >
            {message.text}
          </Message>
        ))}
        {typingMessage && (
          <Message
            type="received"
            typing={true}
            first={true}
            last={true}
            tail={true}
            header={`AI is typing`}
          />
        )}
      </Messages>
    </Page>
  );
};
