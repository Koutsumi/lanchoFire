import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login  from './pages/login/Login';
import NewAccount from './pages/newAccount/NewAccount';
import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard'
import Burguer from './pages/burguers/burguer';
import Drink from './pages/drinks/drinks';
import SideDish from './pages/sideDish/sideDish';
import Lanche from './pages/lanche/lanche'
//import Erro from './pages/Erro'

function RoutesApp(){
    return(
        <Router>

        <Routes>

            <Route path="/" element = {<Home/>}/>
            <Route path="/newAccount" element = {<NewAccount/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/admin" element = {<Dashboard/>}/>
            <Route path="/admin/burguer" element = {<Burguer/>}/>
            <Route path="/admin/drinks" element = {<Drink/>}/>
            <Route path="/admin/sidedish" element = {<SideDish/>}/>

            <Route path='/lanche/:id' element={<Lanche/>}/>
            
        </Routes>
        
        </Router>
    )
}
export default RoutesApp