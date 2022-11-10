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
} from "./messageActions";

export const initialState = {
  messages: [],
  friends: [],
  messageSendSuccess: false,
  messageGetSuccess: false,
};

export const messageReducer = (state, action) => {
  const { type, payload } = action;

  if (type === FRIEND_SUCCESS) {
    return {
      ...state,
      friends: payload.friends,
    };
  }

  if (type === MSG_SUCCESS) {
    return {
      ...state,
      messageGetSuccess: true,
      messages: payload.messages,
    };
  }

  if (type === MSG_SEND_SUCCESS) {
    return {
      ...state,
      messageSendSuccess: true,
      messages: [...state.messages, payload.message],
    };
  }

  if (type === SOCKET_MESSAGE_SEND) {
    return {
      ...state,
      messages: [...state.messages, payload.message],
    };
  }

  if (type === UPDATE_FRIEND_MESSAGE) {
    const index = state.friends.findIndex(
      f =>
        f.friendInfo._id === payload.messageInfo.recieverId ||
        f.friendInfo._id === payload.messageInfo.senderId
    );

    state.friends[index].messageInfo = payload.messageInfo;
    state.friends[index].messageInfo.status = payload.status;

    return state;
  }

  if (type === SEEN_MESSAGE) {
    const index = state.friends.findIndex(
      f =>
        f.friendInfo._id === payload.messageInfo.recieverId ||
        f.friendInfo._id === payload.messageInfo.senderId
    );

    state.friends[index].messageInfo.status = "seen";

    return {
      ...state,
    };
  }

  if (type === DELIVERED_MESSAGE) {
    const index = state.friends.findIndex(
      f =>
        f.friendInfo._id === payload.messageInfo.recieverId ||
        f.friendInfo._id === payload.messageInfo.senderId
    );

    state.friends[index].messageInfo.status = "delivered";

    return {
      ...state,
    };
  }

  if (type === UPDATE) {
    const index = state.friends.findIndex(f => f.friendInfo._id === payload.id);
    if (state.friends[index].messageInfo) {
      state.friends[index].messageInfo.status = "seen";
    }
    return {
      ...state,
    };
  }

  if (type === SEEN_ALL) {
    const index = state.friends.findIndex(
      f => f.friendInfo._id === payload.recieverId
    );

    state.friends[index].messageInfo.status = "seen";

    return {
      ...state,
    };
  }

  if (type === CLEAR_MESSAGE_SEND_SUCCESS) {
    return {
      ...state,
      messageSendSuccess: false,
    };
  }

  if (type === CLEAR_MESSAGE_GET_SUCCESS) {
    return {
      ...state,
      messageGetSuccess: false,
    };
  }

  return state;
};
