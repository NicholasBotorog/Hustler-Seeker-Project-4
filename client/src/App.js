import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/auth/user/')
      console.log(data)
    }
    getData()
  })

  return <h1>Hello World</h1>
}

export default App
