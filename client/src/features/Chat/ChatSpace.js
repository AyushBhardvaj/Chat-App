import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useGetMesssagesQuery, useSendMessageMutation } from "./chatApi";
import Profile_avatar from "../../images/profile_2.png";
import { Backdrop, CircularProgress, Input } from "@mui/material";

const ChatSpace = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = io("http://localhost:4000");
  const messageRef = useRef();

  const { user } = useSelector((state) => state.user);
  const { chatPartner, conversationId } = useSelector(
    (state) => state.conversation
  );
  const { data: conversationMessages, isLoading: messagesLoading } =
    useGetMesssagesQuery(
      {
        conversationId,
        receiverId: chatPartner?._id,
      },
      { skip: !chatPartner }
    );
  const [sendMessage, { isLoading: messageSending, error }] =
    useSendMessageMutation();
  //   const { data: newConversationMessages } = useNewConversationQuery(
  //     chatPartner._id,
  //     {
  //       skip: conversationId && chatPartner,
  //     }
  //   );

  const handleMessage = async (e) => {
    try {
      e.preventDefault();
      socket?.emit("sendMessage", {
        conversationId,
        message,
        receiverId: chatPartner._id,
        senderId: user._id,
      });
      const { data: sentMessage } = await sendMessage({
        conversationId,
        message,
      });
      setMessage("");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setMessages(conversationMessages ? conversationMessages : []);
  }, [conversationMessages]);

  useEffect(() => {
    socket?.emit("addUser", user?._id);
    socket?.on("getUsers", (users) => {
      console.log(users);
    });
    socket?.on("getMessage", (data) => {
      console.log(data);
      console.log(messages);
      setMessages((prev) => [...prev, data]);
    });
  }, [socket]);

  useEffect(() => {
    messageRef?.current?.scrollIntoView("smooth");
  }, [messages]);

  return (
    <div className=" w-full md:w-[50%] bg-white ">
      {messagesLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={messagesLoading}
        >
          <CircularProgress color="inherit" />{" "}
        </Backdrop>
      ) : chatPartner ? (
        <div className=" h-screen flex flex-col items-center">
          <div className="w-[75%] h-[4rem] shadow-md bg-secondary my-10 rounded-full flex items-center">
            <img
              src={Profile_avatar}
              alt="profile"
              className=" rounded-full h-10 w-10 ml-16 cursor-pointer"
            />
            <div className="flex flex-col justify-center ml-5 mr-auto">
              <h4 className="font-semibold text-sm">{chatPartner.fullName}</h4>
              <p className="text-sm font-medium text-gray-400">online</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-phone-call mr-10 cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
              <path d="M15 7a2 2 0 0 1 2 2"></path>
              <path d="M15 3a6 6 0 0 1 6 6"></path>
            </svg>
          </div>
          <div className="h-[75%] border-b w-full overflow-y-scroll overflow-x-hidden">
            <div className="px-6 py-6">
              {messages?.length > 0
                ? messages?.map(({ message, sender }, index) => {
                    if (sender === user._id) {
                      return (
                        <div
                          key={index}
                          className="max-w-[45%] bg-blue-700 text-white font-normal ml-auto rounded-lg rounded-tr-none pl-4 py-2 my-3"
                        >
                          {message}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={index}
                          className="bg-secondary max-w-[45%] font-medium rounded-lg rounded-tl-none pl-4 py-2 my-3"
                        >
                          {message}
                        </div>
                      );
                    }
                  })
                : ""}
              <div ref={messageRef}></div>
            </div>
          </div>
          <div className="h-[25%] w-full flex flex-col justify-center px-6">
            <div className="flex w-full items-center gap-4">
              <Input
                placeholder="Enter your message..."
                className="w-3/4 "
                inputClassName="rounded-full h-12 border-0 shadow-md ring-0 outline-none px-8 bg-light"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`icon icon-tabler icon-tabler-send ml-2 cursor-pointer ${
                  !message && `pointer-events-none`
                }`}
                width="32"
                height="32"
                viewBox="0 0 24 24"
                strokeWidth="0"
                stroke="currentColor"
                fill="blue"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={handleMessage}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M10 14l11 -11"></path>
                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-plus cursor-pointer"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="blue"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 5l0 14"></path>
                <path d="M5 12l14 0"></path>
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div>No Conversation selected</div>
      )}
    </div>
  );
};

export default ChatSpace;
