import { useRouter } from "next/router";
import useData from "../../src/context/useData";
import { useEffect } from "react";
import { actions } from "../../src/context/state";

const Person = () => {
  const { state, dispatch } = useData();
  const {query} = useRouter();

  useEffect(() => {
    if (query.id) {
      // @ts-ignore
      const person = state.people.at(parseInt(query.id) - 1);
      dispatch({ type: actions.setPerson, data: person })
    }
  }, [query.id, state.people, dispatch]);

  return (
    <div className="person">
      <div className="person-header">You Chose</div>
      {!state.person && <>
        <div>This route doesnt exist on the nextJS server.</div>
        <div>Go back and choose again.</div>
      </>}
      {state.person && (
        <>
          <div className="details">NAME: {state.person.name}</div>
          <div className="details">DOB: {state.person.birth_year}</div>
          <div className="details">GENDER: {state.person.gender}</div>
          <div className="details">EYE COLOR: {state.person.eye_color}</div>
          <div className="details">WEIGHT: {state.person.mass}</div>
        </>
      )}
    </div>
  );
};

export default Person
