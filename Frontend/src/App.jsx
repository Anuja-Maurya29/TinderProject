import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import {BrowserRouter,Routes,Route,} from 'react-router-dom'
import Routing from './router/Routing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Feed from './pages/Feed'


function App() {
 

  return (
    <>
    <BrowserRouter basename='/'>
   <Routing/>
    </BrowserRouter>
    </>
  )
}

export default App
