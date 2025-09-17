import React, {useState, useEffect, useContext} from "react";
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";
import axios from "axios";
import {WatchListContext} from "../context/WatchlistContext";
import { useDispatch, useSelector } from "react-redux";
import paginationSlice from "../redux/paginationSlice";

function Movies(){
    const [movies, setMovies] = useState([]);
    //const {addToWatchList, removeFromWatchList, watchlist} = useContext(WatchListContext);
    const [watchlist, setWatchList] = useState([]);
    //const [pageNo, setPageNo] = useState(1);
    const {pageNo} = useSelector((state) => state.pagination);
    const dispatch = useDispatch();

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

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=d38894a1036abeaf8a1fa9032a9166c0&language=en-US&page=${pageNo}`)
        .then((response) => {
            console.log(response.data.results);

            setMovies(response.data.results);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [pageNo]);

    const handleNext = () =>{
        // setPageNo(pageNo+1);
        dispatch( paginationSlice.actions.handleNext());
    }

    const handlePrev = () => {
        // if(pageNo == 1){
        //     setPageNo(1)
        // }
        // else{
        //     setPageNo(pageNo-1);
        // }
        dispatch(paginationSlice.actions.handlePrev());
    }

    return (
        <>
        <div>
            <div className="text-2xl font-bold text-center m-5">
                <h1>Trending Movies</h1>
            </div>
            <MovieCard movies={movies} addToWatchList = {addToWatchList} watchList={watchlist} removeFromWatchList = {removeFromWatchList}/>
            <Pagination pageNo={pageNo} nextFun = {handleNext} prevFun = {handlePrev}/>
        </div>
        </>
    );
}

export default Movies;