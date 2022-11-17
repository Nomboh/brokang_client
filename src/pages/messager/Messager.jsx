import React, { useReducer, useRef, useState } from "react";
import "./messager.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { useProduct } from "../../context/productContext";
import { initialState, messageReducer } from "../../context/messageReducer";
import { toast, ToastContainer } from "react-toastify";
import {
  CLEAR_MESSAGE_GET_SUCCESS,
  CLEAR_MESSAGE_SEND_SUCCESS,
  DELIVERED_MESSAGE,
  FRIEND_SUCCESS,
  MSG_SEND_SUCCESS,
  MSG_SUCCESS,
  SEEN_ALL,
  SEEN_MESSAGE,
  SOCKET_MESSAGE_SEND,
  UPDATE,
  UPDATE_FRIEND_MESSAGE,
} from "../../context/messageActions";
import uploadFiles from "../sell/uploadFiles";
import debouncer from "../../utils/debounce";
import useSound from "use-sound";
import notificationSound from "../../audio/notification.mp3";
import sendingSound from "../../audio/sending.mp3";
import { seenMessage, updateMessage } from "../../context/messageApiCalls";

function Messager() {
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [activeUser, setActiveUser] = useState(null);
  const [socketMessage, setSocketMessage] = useState("");
  const [typingMessage, setTypingMessage] = useState("");

  const { setSelectedChat, selectedChat } = useProduct();
  const { user } = useAuth();

  const socket = useRef();
  const [searchParams, setSearchParam] = useSearchParams();

  const friendId = searchParams.get("conversation");

  const [state, dispatch] = useReducer(messageReducer, initialState);

  const { messageSendSuccess, messages, messageGetSuccess } = state;

  const [notificationSPlay] = useSound(notificationSound);
  const [sendingSPlay] = useSound(sendingSound);

  useEffect(() => {
    socket.current = io("https://brokang-chat.herokuapp.com");

    socket.current.on("getMessage", msg => {
      setSocketMessage(msg);
    });

    socket.current.on("getTypingMessage", data => {
      setTypingMessage(data);
    });

    socket.current.on("getSeenMessage", msg => {
      dispatch({
        type: SEEN_MESSAGE,
        payload: {
          messageInfo: msg,
        },
      });
    });

    socket.current.on("getDeliveredMessage", msg => {
      dispatch({
        type: DELIVERED_MESSAGE,
        payload: {
          messageInfo: msg,
        },
      });
    });

    socket.current.on("seenSuccess", data => {
      dispatch({
        type: SEEN_ALL,
        payload: data,
      });
    });
  }, []);

  //********Post socket message*******
  useEffect(() => {
    if (socketMessage && selectedChat) {
      if (
        socketMessage.senderId === selectedChat.friendInfo._id &&
        socketMessage.recieverId === user._id
      ) {
        dispatch({
          type: SOCKET_MESSAGE_SEND,
          payload: {
            message: socketMessage,
          },
        });

        seenMessage(socketMessage, dispatch);

        socket.current.emit("seenMessage", socketMessage);

        dispatch({
          type: UPDATE_FRIEND_MESSAGE,
          payload: {
            messageInfo: socketMessage,
            status: "seen",
          },
        });
      }
    }
    setSocketMessage("");
  }, [socketMessage, selectedChat, user._id]);

  //********send socket notification message*******
  useEffect(() => {
    if (
      socketMessage &&
      socketMessage.senderId !== friendId &&
      socketMessage.recieverId === user._id
    ) {
      notificationSPlay();
      toast(`${socketMessage.senderName} send you a message`, {
        type: "success",
        autoClose: 5000,
        position: "top-center",
        bodyStyle: {
          fontSize: "22px",
        },
      });

      updateMessage(socketMessage, dispatch);

      socket.current.emit("deliveredMessage", socketMessage);

      dispatch({
        type: UPDATE_FRIEND_MESSAGE,
        payload: {
          messageInfo: socketMessage,
          status: "delivered",
        },
      });
    }
  }, [socketMessage, user._id, notificationSPlay, friendId]);

  //********add user to socket*******
  useEffect(() => {
    socket.current.emit("addUser", user._id, user);
  }, [user]);

  //********get active user in socket*******
  useEffect(() => {
    socket.current.on("getUser", users => {
      const filteredActiveUser = users.filter(u => u.userId !== user._id);
      setActiveUser(filteredActiveUser);
    });
  });

  //********Get all conversations*******
  useEffect(() => {
    const getFriends = async () => {
      const { data } = await axiosInstance().get("/conversation");

      dispatch({
        type: FRIEND_SUCCESS,
        payload: {
          friends: data,
        },
      });
    };

    getFriends();
  }, []);

  //********get selected chat fallback*******
  useEffect(() => {
    const getCon = async () => {
      try {
        const { data } = await axiosInstance().get("/conversation/" + friendId);
        setSelectedChat(data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    if (!selectedChat) {
      getCon();
    }
  }, [selectedChat, friendId, setSelectedChat]);

  //********Get all messages of current user*******
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axiosInstance().get(
          "/message/" + selectedChat?.friendInfo._id
        );
        dispatch({
          type: MSG_SUCCESS,
          payload: {
            messages: res?.data,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedChat) {
      getMessages();
    }
  }, [selectedChat]);

  //********send socket messages after messages send to thge database*******
  useEffect(() => {
    if (messageSendSuccess) {
      socket.current.emit("sendMessage", messages[messages.length - 1]);

      dispatch({
        type: UPDATE_FRIEND_MESSAGE,
        payload: {
          messageInfo: messages[messages.length - 1],
        },
      });

      dispatch({ type: CLEAR_MESSAGE_SEND_SUCCESS });
    }
  }, [messageSendSuccess, messages]);

  //********Get messages unseen*******
  useEffect(() => {
    if (messages.length > 0) {
      if (
        messages[messages.length - 1].senderId !== user._id &&
        messages[messages.length - 1].status !== "seen"
      ) {
        dispatch({
          type: UPDATE,
          payload: {
            id: friendId,
          },
        });

        socket.current.emit("seen", {
          senderId: friendId,
          recieverId: user._id,
        });
        seenMessage({ _id: messages[messages.length - 1]._id }, dispatch);
      }
    }

    dispatch({
      type: CLEAR_MESSAGE_GET_SUCCESS,
    });
  }, [messageGetSuccess, friendId, messages, user._id]);

  //********handle selected conversation*******
  const handleSelectedConversation = conversation => async () => {
    setSearchParam({ conversation: conversation.friendInfo._id });
    const { data } = await axiosInstance().get(
      "/conversation/" + conversation.friendInfo._id
    );
    setSelectedChat(data);
    setActive(false);
  };

  //********send message handler*******
  const handleSend = async e => {
    e.preventDefault();
    sendingSPlay();
    const data = {
      senderName: user.name,
      recieverId: selectedChat.friendInfo._id,
      message: !message ? "😄" : message,
    };

    try {
      const result = await axiosInstance().post("/message", data);
      dispatch({
        type: MSG_SEND_SUCCESS,
        payload: {
          message: result.data.message,
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }

    socket.current.emit("typingMessage", {
      senderId: user._id,
      recieverId: selectedChat.friendInfo._id,
      message: "",
    });

    setMessage("");
  };

  //********send image handler*******
  const handleImages = async e => {
    const file = e.target.files[0];
    const currentTime = new Date().getTime();
    const imageName =
      Math.floor(Math.random() * 10000000) +
      "_" +
      currentTime +
      "." +
      file.name.split(".").pop();

    const imgUrl = await uploadFiles(file, "chat", imageName);

    sendingSPlay();

    const data = {
      senderName: user.name,
      recieverId: selectedChat.friendInfo._id,
      image: imgUrl,
    };

    try {
      const result = await axiosInstance().post("/message/image-send", data);
      dispatch({
        type: MSG_SEND_SUCCESS,
        payload: {
          message: result.data.message,
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }

    socket.current.emit("sendMessage", {
      senderId: user._id,
      senderName: user.name,
      recieverId: selectedChat.friendInfo._id,
      message: {
        text: "",
        image: imgUrl,
      },
      time: new Date(),
    });
  };

  //********input handler*******
  const handleInput = e => {
    setMessage(e.target.value);

    socket.current.emit("typingMessage", {
      senderId: user._id,
      recieverId: selectedChat.friendInfo._id,
      message: e.target.value,
    });

    const debounce = debouncer(() => {
      socket.current.emit("typingMessage", {
        senderId: user._id,
        recieverId: selectedChat.friendInfo._id,
        message: "",
      });
    }, 3000);

    debounce();
  };

  return (
    <div className="chat">
      <div className="chat_container">
        <ToastContainer />
        <Sidebar
          active={active}
          setActive={setActive}
          activeUser={activeUser}
          friendId={friendId}
          conversations={state.friends}
          setSearchParam={setSearchParam}
          handleSelectedConversation={handleSelectedConversation}
        />
        <Chat
          active={active}
          handleSend={handleSend}
          setActive={setActive}
          messages={state.messages}
          message={message}
          handleInput={handleInput}
          handleImages={handleImages}
          typingMessage={typingMessage}
        />
      </div>
    </div>
  );
}

export default Messager;
