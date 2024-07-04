import { useEffect } from "react";
import useData from "../src/context/useData";
import { actions } from "../src/context/state";
import Cards from "../src/components/Cards";
import styles from "../styles/Starwars.module.css"

interface IParms {
  width: number;
  height: number;
  locale: string;
  toolbar_bg: string;
  interval: string;
  pair: string;
}

const params: IParms = {
  width: 360,
  height: 300,
  locale: 'en',
  toolbar_bg: '',
  interval: '3h',
  pair: 'BTC_USD',
};

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

  function generateUrl(params: IParms) {
    const baseUrl = "http://testurl.bitfinx.com/";
    const queryString = Object.entries(params)
        .filter(([key, value]) => value !== '')  // Filter out empty parameters
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)  // Encode key and value
        .join('&');  // Join them with '&'

    return `${baseUrl}?${queryString}`;
  }

  const handleClick = () => alert(generateUrl(params))

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>List of characters</h1>
      <h3 className={styles.subheader}>Choose one to see the details</h3>
      <div className={styles.row}>
        {state.people.map((person, i) => <Cards name={person.name} key={i} id={i+1} />)}
      </div>
      <button className={`${styles.button} ${styles.button1}`} onClick={handleClick}>Generate URL</button>
    </main>
  )
}

export default StarWars;