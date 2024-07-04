import { useEffect } from "react";
import useData from "../src/context/useData";
import { actions } from "../src/context/state";
import Cards from "../src/components/Cards";
import styles from "../styles/Starwars.module.css"

const StarWars = () => {
  const { state, dispatch } = useData();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://swapi.dev/api/people')

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
    
      const data = await res.json()
      dispatch({ type: actions.setPeople, data: data.results })
    };

    getData()
  }, [dispatch]);

  return (
    <div className={styles.row}>
      {state.people.map((person, i) => <Cards name={person.name} key={i} />)}
    </div>
  )
}

export default StarWars;