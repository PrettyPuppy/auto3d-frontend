import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import TaskView from './views/TaskView'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import './App.scss'

function App() {  

  const islogin = localStorage.getItem('username') != null;
  console.log(islogin);

  return (
    <>
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/register" element={ <Register /> } />
        <Route exact path="/task" element={ <TaskView /> } />
      </Routes>
    </>
  )
}

export default App
