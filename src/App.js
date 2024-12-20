import React,{useState} from 'react'
import SinglePlayer from './components/SinglePlayer'
import Multiplayer from './components/Multiplayer'
import { Routes, Route } from'react-router-dom'

const App = () => {
  return (
<> 


<Routes>
  <Route path="singleplayer" element={<SinglePlayer/>} />
  <Route path="multiplayer" element={<Multiplayer/>} />
</Routes>

</>
  )
}

export default App