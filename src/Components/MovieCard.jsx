import React from "react";

function MovieCard({movies, addToWatchList, watchList, removeFromWatchList}){
    const doesMovieExits = (moviesObj) => {
        for(let i=0;i<watchList.length;i++){
            if( watchList[i].id == moviesObj.id)
                return  true;
        }

        return false;
    };

    return (<>
            <div className="flex justify-evenly flex-wrap gap-8">
                {movies.map((moviesObj) => {
                    return ( <div className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover: cursor-pointer flex flex-col" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${moviesObj.poster_path})`}}>
                        {doesMovieExits(moviesObj) ? (<div onClick={ () => removeFromWatchList(moviesObj)}>❌</div>) : (<div onClick={() => addToWatchList(moviesObj)}>😍</div>)}
                        <div className="text-white w-full text-center text-2xl p-2 rounder-lg bg-gray-900/70">{moviesObj.title}</div>
                    </div>)
                })}
            </div>
    </>);
}

export default MovieCard;