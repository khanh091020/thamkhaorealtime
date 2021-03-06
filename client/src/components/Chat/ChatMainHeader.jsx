import React from "react";
import CallRoundedIcon from "@material-ui/icons/CallRounded";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import { format } from "timeago.js";

import { Avatar } from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import { socket } from "../../App";
import joiner from "functions/classNameJoiner";
import useChat from "../../customHooks/useChat";

const ChatMainHeader = ({
  mobileActivePanel,
  setMobileActivePanel,
  setActivePanel,
  activePanel,
  startCalling,
}) => {
  const { activeConversation, onlineUsers, setActiveConversation } = useChat();

  function setPanel() {
    if (window.innerWidth <= 768) {
      setMobileActivePanel({
        right: true,
        left: false,
        main: false,
      });
    } else {
      setActivePanel({
        ...activePanel,
        right: !activePanel.right,
      });
    }
  }
  function isOnline(otherEndId) {
    const onlineUser = onlineUsers.find(
      (userObj) => userObj.userId === otherEndId
    );
    if (onlineUser) {
      return true;
    }
    return false;
  }

  const avatar = joiner(
    "avatar",
    isOnline(activeConversation.otherEnd?._id) && "circle-multiple"
  );

  const userStatus = joiner(
    "user-status",
    isOnline(activeConversation.otherEnd?._id) && "online"
  );

  const otherEndName =
    activeConversation.memberNickNames &&
    activeConversation.memberNickNames[activeConversation.otherEnd?._id]
      ? activeConversation.memberNickNames[activeConversation.otherEnd?._id]
      : activeConversation.otherEnd?.name;

  const lastOnline = format(
    onlineUsers.find((u) => u.userId === activeConversation.otherEnd?._id)
      ?.lastActivity || activeConversation.otherEnd?.lastActivity,
    "vi_VN"
  );
  return (
    <div className="chat__main__header">
      {!mobileActivePanel.left && (
        <div
          onClick={() => {
            if (window.innerWidth <= 768) {
              setMobileActivePanel({
                right: false,
                left: true,
                main: false,
              });
            }
            socket.emit("leaveRoom", activeConversation.id);
            setActiveConversation({});
          }}
          className="showIcon-mobile"
        >
          <ArrowBackRoundedIcon />
        </div>
      )}

      {activeConversation.conversationType === "OneOne" ? (
        <>
          <div className="chatInfo">
            <div className={avatar}>
              <div className="circle"></div>
              <div className="circle"></div>
              <img src={activeConversation.otherEnd?.photo?.url} alt="" />
              <span className={userStatus} />{" "}
            </div>

            <div className="info">
              <b className="name">{otherEndName}</b>
              <div className="lastActivity">
                {!isOnline(activeConversation.otherEnd?._id)
                  ? lastOnline
                  : "online"}
              </div>
            </div>
          </div>
          <div className="recipientActions">
            {!Object.values(activeConversation.block || {}).some(Boolean) && (
              <>
                {" "}
                <div className="phoneCall">
                  <CallRoundedIcon />
                </div>
                <div
                  className="videoChat"
                  onClick={() => startCalling("videoCall")}
                >
                  <VideocamRoundedIcon />
                </div>
              </>
            )}

            <div className="moreActions" onClick={setPanel}>
              <MoreVertRoundedIcon />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="chatInfo">
            {activeConversation.conversationPhoto ? (
              <img src={activeConversation.conversationPhoto.url} alt="" />
            ) : (
              <AvatarGroup max={5}>
                {activeConversation.members.map((participant) => (
                  <Avatar
                    key={participant._id}
                    alt={participant.name}
                    src={participant.photo.url}
                  />
                ))}
              </AvatarGroup>
            )}
            -{" "}
            <div>
              {<p>{activeConversation.conversationName || "Chat Name"}</p>}
            </div>
          </div>
          <div className="recipientActions">
            <div className="phoneCall">
              <CallRoundedIcon />
            </div>
            <div className="videoChat">
              <VideocamRoundedIcon />
            </div>
            <div className="moreActions" onClick={setPanel}>
              <MoreVertRoundedIcon />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatMainHeader;
