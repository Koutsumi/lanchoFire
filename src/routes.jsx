import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login  from './pages/login/Login';
import NewAccount from './pages/newAccount/NewAccount';
import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard'
//import Erro from './pages/Erro'

function RoutesApp(){
    return(
        <Router>

        <Routes>

            <Route path="/" element = {<Home/>}/>
            <Route path="/newAccount" element = {<NewAccount/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/admin" element = {<Dashboard/>}/>


            
        </Routes>
        
        </Router>
    )
}
export default RoutesApp