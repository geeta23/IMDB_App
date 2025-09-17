import { useState } from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import WatchList from './Components/WatchList'
import {Routes, Route} from 'react-router-dom'
import WatchListContextWrapper from './context/WatchlistContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
    {/* <WatchListContextWrapper> */}
      <Routes>
          <Route path="/watchlist" element={<WatchList/>} />
          <Route path="/" element={<Home/>}/>
      </Routes>
     {/*  */}
    </>
  )
}

export default App
// </WatchListContextWrapper>