import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login  from './pages/login/Login';
import NewAccount from './pages/newAccount/NewAccount';
//import Erro from './pages/Erro'

function RoutesApp(){
    return(
        <Router>

        <Routes>

            <Route path="/" element = {<Login/>}/>
            <Route path="/newAccount" element = {<NewAccount/>}/>

            
        </Routes>
        
        </Router>
    )
}
export default RoutesApp