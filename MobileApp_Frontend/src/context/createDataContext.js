import React, { useReducer } from "react";
// Used to create and automate any kind of new Context we want. Context for Blog or something else....
export default (reducer, actions, initialState) => {
  const Context = React.createContext();
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //actions=== { addBlogPost : (dispatch)=>{return()=>{}}}
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state: state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
