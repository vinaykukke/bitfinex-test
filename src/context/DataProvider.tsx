import { useReducer, useCallback, useEffect, useState } from "react";
import DataContext from "./DataContext";
import { reducer, actions, initialState } from "./state";

const DataProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [ready, setReady] = useState(false);
  // const [loading, setLoading] = useState(false);

  const value = {
    state,
    dispatch,
    // loading,
  };

  return (
    <>
      <DataContext.Provider value={value}>
        {props.children}
      </DataContext.Provider>
    </>
  );
};

export default DataProvider;
