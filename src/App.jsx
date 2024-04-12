import React from 'react'
import Todos from "./pages/Todos"
import "./App.css"

const App = () => {
  return (
    <div className='App'>
      <h1 className='text-center'>Zustand CRUD</h1>
        <Todos />
    </div>
  )
}

export default App