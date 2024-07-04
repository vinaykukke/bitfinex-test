# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Please note

Here i am using [SWAPI](https://swapi.dev/) a star wars API to fetch all the data. The code can be found in `pages/star-wars.tsx`

# Explanation of the questions asked in the Email

## Generate URL

This placed as a button at `http://localhost:3000/star-wars`.
The generated URL will be displayed in an alert in the browser. The code can be found in `pages/star-wars.tsx`

```javascript
function generateUrl(params: IParms) {
    const baseUrl = "http://testurl.bitfinx.com/";
    const queryString = Object.entries(params)
        .filter(([key, value]) => value !== '')  // Filter out empty parameters
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)  // Encode key and value
        .join('&');  // Join them with '&'

    return `${baseUrl}?${queryString}`;
  }
```

## Redux

There are several way to fetch data from an API and store in a Redux store.

### Traditional Method

- Set Up Redux Store.
- Define actions and reducers to handle data fetching.
- If necessary, combine multiple reducers.
- Wrap your app with the Redux Provider.
- Create a component that fetches data and displays it.
- Render your data-fetching component within your main app component.

### Using Context API

> **A working demo of this is within this project.**

- Create a state / store as i have done is `src/context/state.ts`
- Define actions such as:

```typescript
enum actions {
  setPeople = "SET_PEOPLE",
  setPerson = "SET_PERSON"
}
```

- Define the reducer, as i have done in the same file `src/context/state.ts` 
- Setup a `useData()` hook to as i have done in `src/context/useData.ts`
- Setup a context using `createContext<any>(null);`
- Setup a prodiver to pass the context on to the children
- Wrap your app with the Redux Provider.
```javascript
export default function App({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  )
}
```
- Fetch dats using the `useEffects` and dispatch to the result to the store like so

```javascript
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
```

- Consume the data from the store in any of the children components using
```javascript
const { state, dispatch } = useData();
```

## Explanation of Code Refactor:

1. **Mapping volume unit to element IDs**: The volume unit to element ID mapping is stored in the `volumeUnitElements` object for cleaner and more maintainable code. Also it has a constant look up time since we are using a key value store.
2. **Element selection**: We use the mapped value from `volumeUnitElements` to select the element.
3. **Check element existence**: Instead of checking if the element exists by comparing it to `null`, we check if the element selection returned a jQuery object with a length greater than 0. Here im assuming the `$` is for jQuery.
4. **Override currencies list**: The result of `window.APP.util.initCurrenciesList()` is returned directly.


```javascript
var volumeSetup = function () {
    // Setup volume unit interface
    var volumeUnit = window.APP.util.getSettings('ticker_vol_unit').toUpperCase();
    var volumeUnitElements = {
        'FIRSTCCY': '#tickervolccy_0',
        'USD': '#tickervolccy_USD',
        'BTC': '#tickervolccy_BTC',
        'ETH': '#tickervolccy_ETH'
    };
    
    var element = $(volumeUnitElements[volumeUnit]);

    if (element.length) {
        element.prop("checked", true);
    }

    // Override currencies list
    return window.APP.util.initCurrenciesList();
};
```