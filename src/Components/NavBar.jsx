import React from "react";
import {Link} from "react-router-dom";

function NavBar(){
    return (
        <>
        <div className="flex space-x-8 items-center pl-3 py-4">
            <Link className="text-blue-500 text-3xl font-bold" to="/">Movies</Link>
            <Link className="text-blue-500 text-3xl font-bold" to="/watchList">WatchList</Link>
        </div>
        </>
    );
}

export default NavBar;