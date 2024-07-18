//import './App.css'
import { useState } from 'react'
import { People } from './components/People';

function App() {

  const [persons, setPersons] = useState([
    {
      id: 1,
      name: "Carolina",
      role: "Frontend Developer",
      img: "https://bootdey.com/img/Content/avatar/avatar3.png"
    },
    {
      id: 2,
      name: "Carlos",
      role: "Backend Developer",
      img: "https://bootdey.com/img/Content/avatar/avatar6.png"
    },
    {
      id: 3,
      name: "Pedro",
      role: "Fullstack Developer",
      img: "https://bootdey.com/img/Content/avatar/avatar1.png"
    }
  ]);

  return (
    <div className='App'>
      <div className='container'>
        <People persons={persons} setPersons={setPersons}/>
      </div>
    </div>
  )
}

export default App
