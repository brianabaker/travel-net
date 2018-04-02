import ChatApi from "../services/chatApi";

// import { push } from "react-router-redux";

export const FETCHING_CHAT = "FETCHING_CHAT";
export const FETCHED_CHAT = "FETCHED_CHAT";
export const SENT_MESSAGE = "SEND_MESSAGE"
export const SHOW_CHAT = "SHOW_CHAT"
export const ADD_MESSAGE = "ADD_MESSAGE"

export function showChat() {
  return function(dispatch){
    dispatch({type: "SHOW_CHAT"})
  }
}

export function addMessage(message) {
  return {type: "ADD_MESSAGE", payload: message}
}

export function fetchChat(currentUser, friend) {
  return function(dispatch) {
    dispatch({ type: "FETCHING_CHAT" });
    ChatApi.fetchChat(currentUser, friend).then(chatroomJSON => {
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
