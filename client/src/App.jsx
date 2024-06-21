import { useEffect, useState } from 'react'
import {Route, Routes} from 'react-router-dom';
import './App.css'
import IndexPage from './components/IndexPage';
import Login from './components/Login';
import Layout from './Layout';
import RegisterPage from './components/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import AccountPage from './components/AccountPage';
import PlacesPage from './components/PlacesPage';
import PlacesForm from './components/PlacesForm';
import PlaceInfoPage from './components/PlaceInfoPage';
import BookingsPage from './components/BookingsPage';
import ViewBooking from './components/ViewBooking';

axios.defaults.baseURL = "http://localhost:4321";
axios.defaults.withCredentials = true;

function App() {

  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/account' element={<AccountPage/>}/>
        <Route path='/account/places' element={<PlacesPage/>}/>
        <Route path='/account/places/new' element={<PlacesForm/>}/>
        <Route path='/account/places/:id' element ={<PlacesForm />} />
        <Route path='/place/:id' element={<PlaceInfoPage/>}/>
        <Route path='/account/bookings' element={<BookingsPage/>} />
        <Route path='/account/bookings/:id' element={<ViewBooking/>} />
      </Route>
    </Routes>
    </UserContextProvider>
    

  )
}

export default App
