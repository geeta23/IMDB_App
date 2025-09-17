import React from "react";
import Banner from "./Banner";
import Movies from "./Movies";
// API to use
// https://api.themoviedb.org/3/trending/movie/day?api_key=api_key&language=en-US&page=1
function Home(){
    return (
        <div>
            <Banner/>
            <Movies/>
        </div>
    )
}

export default Home;