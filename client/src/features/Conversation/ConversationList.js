import { Divider } from "@mui/material";
import React from "react";
import { useConversationListQuery } from "./converseApi";
import { useDispatch, useSelector } from "react-redux";
import { setChatPartner, setConversation } from "./converseSlice";
import Profile_avatar from "../../images/profile_2.png";

const ConversationList = () => {
  const dispatch = useDispatch();
  const { user: loggedUser } = useSelector((state) => state.user);
  const { data: ConversationUsers } = useConversationListQuery(loggedUser?._id);

  return (
    <div className="w-full md:w-[25%] md:h-screen bg-secondary ">
      <div className="flex justify-center items-center my-6">
        <img
          src={Profile_avatar}
          alt="profile"
          className=" rounded-full h-16 w-16"
        />
        <div className="flex flex-col ml-6">
          <h3 className="text-xl">{loggedUser?.fullName}</h3>
          <p className="text-md font-light">account</p>
        </div>
      </div>
      <Divider />
      <div>
        <h4 className="my-6 ml-10 text-lg font-semibold text-blue-600">
          Messages
        </h4>
        <div className="flex flex-col mt-5">
          {ConversationUsers?.map(({ user, conversationId }, index) => {
            return (
              <div key={index} className="mx-10 cursor-pointer">
                <div
                  className="flex my-5"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setConversation({chatPartner:user, conversationId}));
                  }}
                >
                  <img
                    src={Profile_avatar}
                    alt="contact_image"
                    className="rounded-full h-14 w-14 mr-6"
                  />
                  <div className="flex flex-col justify-center">
                    <h4 className="font-semibold text-sm">{user.fullName}</h4>
                    <p className="text-sm font-medium text-gray-400">
                      available
                    </p>
                  </div>
                </div>
                {index + 1 < ConversationUsers.length && <Divider />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
