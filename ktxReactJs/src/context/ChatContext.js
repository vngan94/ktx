import { createContext, useContext, useReducer } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    // chatId: "null",
    // user: {},
    userName: "",
    idTo: "",
    groupId: "",
    loadDb: 0,
    idLastMessage: "",
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          userName: action.payload.fullName,
          idTo: action.payload.id,
          groupId: action.payload.haveConnection
            ? action.payload.haveConnection.id
            : "",
          loadDb: state.loadDb,
          idLastMessage: action.payload.lastMessage
            ? action.payload.lastMessage.id
            : "",
        };
      case "LOAD_DB":
        return {
          userName: state.userName,
          idTo: state.id,
          groupId: state.groupId,
          loadDb: ++state.loadDb,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
