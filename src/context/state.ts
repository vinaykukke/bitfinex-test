enum actions {
  setPeople = "SET_PEOPLE",
  setPerson = "SET_PERSON"
}

export interface IInitialState {
  people: any[];
  person: {
    name: string;
    birth_year: string;
    gender: string;
    eye_color: string;
    mass: string;
  }
}

const initialState: IInitialState = {
  people: [],
  person: {
    name: "",
    birth_year: "",
    gender: "",
    eye_color: "",
    mass: ""
  }
};

const reducer = (state: any, action: any) => {
  const { type, data } = action;
  let res: IInitialState;

  switch (type) {
    case actions.setPeople:
      res = { ...state, people: data };
      break;

    case actions.setPerson:
      res = { ...state, person: data };
      break;

    default:
      throw new Error("Undefined reducer action type");
  }

  return res;
};

export { actions, initialState, reducer };
