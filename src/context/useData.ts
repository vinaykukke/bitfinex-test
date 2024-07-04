import { Dispatch, useContext } from "react";
import DataContext from "./DataContext";
import { IInitialState } from "./state";

interface IData {
  state: IInitialState;
  dispatch: Dispatch<any>;
  loading: boolean;
}

const useData = (): IData => useContext(DataContext);

export default useData;
