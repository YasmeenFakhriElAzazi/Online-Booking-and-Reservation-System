  import { useState } from 'react'
  import './App.css';
  import { BrowserRouter,Routes,Route } from 'react-router-dom';
  import Navbar from '../src/components/shared components/Navbar/Navbar';
  import Signup from './components/Signup/Signup';
  import Signin from './components/Signin/Signin';
  import Home from './pages/user pages/Home/Home';
  import Admin from './pages/admin pages/Admin';
  import Reservation from './pages/user pages/Reservation/Reservation';
import SuperAdmin from './pages/superAdminPages/SuperAdmin';


  function App() {
    return (
      <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navbar />}>
              <Route index element={<Home/>}/>
              <Route path='/signup' element={<Signup trigger={false}/>}/>
              <Route path='/signin' element={<Signin />}/>
              <Route path='/admin' element={<Admin />}/>
              <Route path='/reservation' element={<Reservation />}/>
              <Route path='/superAdmin' element={<SuperAdmin />}/>
            </Route>
          </Routes>
      </BrowserRouter>
      </>
    )
  }

  export default App
