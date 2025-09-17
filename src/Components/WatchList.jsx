import React, {useState, useEffect} from "react";
// if I don't mention file name then index.js is taken as a default file to fetch the values
import genreids from "../constants";
import { createCookieSessionStorage, createMemorySessionStorage } from "react-router-dom";

function WatchList(){
    const [watchList, setWatchList] = useState([]);
    const [search, setSearch] = useState("");
    const [genreList, setGenreList] = useState([]);
    const [currGenre, setCurrGenre] = useState("All Genre");

    const handleFilter = (genre) => {
        setCurrGenre(genre);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    useEffect(()=>{
        const moviesInLocalStorage = JSON.parse( localStorage.getItem('movies'));
        setWatchList(moviesInLocalStorage);
    }, []);

    useEffect( () => {
        let temp = watchList.map((movie) => {
            return genreids[movie.genre_ids[0]]
        });
        temp = new Set(temp);
        setGenreList(["All Genre", ...temp]);
    }, [watchList]);

    const genre = (genID) =>{
        return genreids[genID];
    }

    const handleAscending = () => {
        const sortAscending = watchList.sort( (movieObjA, movieObjB) => {
            return movieObjA.vote_average - movieObjB.vote_average;
        })

        setWatchList([...sortAscending]);
    }

    const handleDescending = () => {
        const sortAscending = watchList.sort( (movieObjA, movieObjB) => {
            return movieObjB.vote_average - movieObjA.vote_average;
        })

        setWatchList([...sortAscending]);
    }
    return (
        <>
            <div className="flex justify-center m-4">
                {genreList.map( (genre) => {
                    const isActive = currGenre==genre;
                    const baseStyles = "flex justify-center item-center h-[3rem] w-[8rem] rounded-lg text-white font-bold mx-4 hover:cursor-pointer";
                    const bgColor = isActive ? "bg-blue-400" : "bg-gray-400/50";
                    
                    return (<div onClick={() => handleFilter(genre)} className={`${baseStyles} ${bgColor}`}>
                        {genre}
                    </div>)
                })}
            </div>
            <div className="flex justify-center my-10">
                <input type="text" placeholder="Search Movie" 
                className=" h-[3rem] w-[18rem] bg-gray-200 px-4 outline-none border border-gray-300" 
                onChange={handleSearch}
                value={search}/>
            </div>
            <div className="overflow-hidden rounded-lg border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className = "px-6 py-4 font-medium text-gray-900">Name</th>
                            <th>
                                <div className="flex">
                                    <div>
                                        <i onClick={handleDescending} className="fa-solid fa-arrow-up mx-1 hover: cursor-pointer"></i>
                                        Ratings
                                        <i onClick={handleAscending} className="fa-solid fa-arrow-down mx-1 hover: cursor-pointer"></i>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="flex">
                                    <div>Popularity</div>
                                </div>
                            </th>
                            <th>
                                <div className="flex">
                                    <div>Genre</div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        { watchList
                        .filter( (movie) => {
                            if(currGenre == "All Genre")
                                return true;
                            else
                                return currGenre == genreids[movie.genre_ids[0]];
                        })
                        .filter( (movie) => {
                            return movie.title.toLowerCase().includes( search.toLowerCase());
                        })
                        .map((movie) => (
                                <tr className="hover: bg-gray-50" key={movie.id}>
                                    <td className="flex items-center px-6 py-4 font-normal text-gray-900 gap-4">
                                        <img className="h-[6rem] w-[10rem] object-fit object-cover rounded-r-lg" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />
                                        <div className="font-medium text-gray-700 text-sm">{movie.title}</div>
                                    </td>
                                    <td className="pl-6 py-4">{movie.vote_average}</td>
                                    <td className="pl-6 py-4">{movie.popularity}</td>
                                    <td className="pl-2 py-4">{genre(movie.genre_ids[0])}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default WatchList;