import { createContext, useEffect, useState } from "react";

// create context
const WatchListContext = createContext();

// provide context
export default function WatchListContextWrapper({childern}){
    const [watchlist, setWatchList] = useState([]);

    const addToWatchList = (movieObj) => {
        // for any change always create a new reference so that react will identify the change render
        // on screen directly
        const updatedWatchList = [...watchlist, movieObj]; // watchList.concat(movieObj)
        setWatchList(updatedWatchList);
        console.log(updatedWatchList);
        localStorage.setItem('movies', JSON.stringify(updatedWatchList));
    }

    const removeFromWatchList = (movieObj) => {
        const filteredWatchList = watchlist.filter((movie) => movie.id != movieObj.id);
        setWatchList(filteredWatchList);
        console.log(filteredWatchList);
        localStorage.setItem('movies', JSON.stringify(filteredWatchList));
    } 
    
    // this will help to persist the data even when I close the browser, as it will fetch data 
    // from browser local storage 
    useEffect(() => {
        const moviesInLocalStorage = JSON.parse(localStorage.getItem('movies'));
        if(moviesInLocalStorage){
            setWatchList(moviesInLocalStorage);
        }
    }, [])
    
    
    return (
        <WatchListContext.Provider value={{addToWatchList, removeFromWatchList, watchlist, setWatchList}}>
            {childern}
        </WatchListContext.Provider>
    )
}

export {WatchListContext};