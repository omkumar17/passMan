import { useState } from 'react'
import Navbar from './components/Navbar'
import Form from './components/Form'
import Display from './components/Display'
import { context } from './context/context'
import { contextEdit } from './context/context'



import './App.css'

function App() {
  const [form, setForm] = useState([]);
  const [edit, setEdit] = useState("");

  return (
    <>
      <context.Provider value={[form,setForm]}>
      <contextEdit.Provider value={[edit,setEdit]}>
        <Navbar />
        <Form />
        <Display/>
        </contextEdit.Provider>
        </context.Provider>
      
    </>
  )
}

export default App
