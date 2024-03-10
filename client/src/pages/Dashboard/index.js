import React, { useEffect, useRef, useState } from "react";
import Profile_avatar from "../../images/profile_2.png";
import { Divider, useMediaQuery } from "@mui/material";
import Input from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  useConversationListQuery,
  useNewConversationQuery,
  useUsersListQuery,
} from "../../features/Conversation/converseApi";
import {
  useGetMesssagesQuery,
  useSendMessageMutation,
} from "../../features/Chat/chatApi";
import ConversationList from "../../features/Conversation/ConversationList";
import { setChatPartner } from "../../features/Conversation/converseSlice";
import ChatSpace from "../../features/Chat/ChatSpace";
import UserList from "../../features/Conversation/UserList";

const Dashboard = () => {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery("(max-width: 600px)");

  const { chatPartner } = useSelector((state) => state.conversation);

  return (
    <div className="w-screen flex flex-col md:flex-row overflow-scroll">
      {isMobile ? !chatPartner && <ConversationList /> : <ConversationList />}

      {/* Middle Part */}
      <ChatSpace />

      {/* Right Part */}
      <UserList />
    </div>
  );
};

export default Dashboard;
