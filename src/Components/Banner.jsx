import React, { useState, useEffect } from "react";
import backgroundImg from "..\\Images\\eric-muhr-8zskmq_yL6Q-unsplash.jpg";
import axios from "axios";

function Banner(){
    const [bannerImage, setBannerImage] = useState("");
    const [tiltle, setTitle] = useState("");

    useEffect(()=>{
        axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=d38894a1036abeaf8a1fa9032a9166c0&language=en-US&page=1")
        .then((response) => {
            console.log(response.data);
            const firstMovie = response.data.results[0];
            const firstMovieTitle = firstMovie.title;
            const firstMoviePoster = firstMovie.backdrop_path;

            setBannerImage(`https://image.tmdb.org/t/p/original/${firstMoviePoster}`);
            setTitle(firstMovieTitle);
        });
    }, []);
    return (
        <>
        {/* md: h-[75vh] -> make the banner responsive */}
        <div className="h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end " style={{backgroundImage:`url(${bannerImage})`}}>
            <div className="text-white w-full text-center text-2xl">
                {tiltle}
            </div>
        </div>

        </>
    );
}

export default Banner;