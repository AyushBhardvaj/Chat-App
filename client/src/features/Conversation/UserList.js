import React from "react";
import { useNewConversationQuery, useUsersListQuery } from "./converseApi";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/material";
import { setChatPartner, setConversation } from "./converseSlice";
import Profile_avatar from "../../images/profile_2.png";

const UserList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const { data: usersList } = useUsersListQuery();
  

  const handleUserSelect = (e, user) => {
    try {
      e.preventDefault();
      dispatch(setConversation({chatPartner:user, conversationId:""}));
    } catch (error) {}
  };

  return (
    <div className="w-full md:w-[25%]  overflow-scroll">
      <div>
        <h4 className="my-6 ml-10 text-lg font-semibold text-blue-600">
          Users
        </h4>
        <div className="flex flex-col mt-5">
          {usersList?.map((user, index) => {
            return (
              <div key={index} className="mx-10 cursor-pointer">
                <div
                  className="flex my-5"
                  onClick={(e) => {
                    handleUserSelect(e, user);
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
                {index + 1 < usersList?.length && <Divider />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserList;
