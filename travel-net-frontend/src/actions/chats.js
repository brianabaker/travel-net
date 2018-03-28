import ChatApi from "../services/chatApi";

// import { push } from "react-router-redux";

export const FETCHING_CHAT = "FETCHING_CHAT";
export const FETCHED_CHAT = "FETCHED_CHAT";
export const SENT_MESSAGE = "SEND_MESSAGE"

export function fetchChat(currentUser, friend) {
  return function(dispatch) {
    console.log("dispatch", currentUser, friend);
    dispatch({ type: "FETCHING_CHAT" });
    ChatApi.fetchChat(currentUser, friend).then(chatroomJSON => {
      console.log(chatroomJSON)
      dispatch({type: "FETCHED_CHAT", payload: chatroomJSON})
    })
  };
}

export function sendMessage(chatroomId, currentUser, content){
  return function(dispatch){
    dispatch({type: "SENDING_MESSAGE"})
    ChatApi.sendMessage(chatroomId, currentUser, content).then(chatJSON => {
      dispatch({type: "SEND_MESSAGE", payload: chatJSON.chatroom})
    })
  }
}
