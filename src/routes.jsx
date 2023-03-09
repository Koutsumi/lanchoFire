import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login  from './pages/login/Login';
import NewAccount from './pages/newAccount/NewAccount';
import Home from './pages/home/Home'
//import Erro from './pages/Erro'

function RoutesApp(){
    return(
        <Router>

        <Routes>

            <Route path="/" element = {<Login/>}/>
            <Route path="/newAccount" element = {<NewAccount/>}/>
            <Route path="/home" element = {<Home/>}/>

            
        </Routes>
        
        </Router>
    )
}
export default RoutesApp