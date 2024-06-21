import { useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function BookingWidget ({place}) {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState ('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('')
    const {user} = useContext(UserContext);
    let numberOfNights = 0;

    useEffect(() => {

        setName(user.name);

    }, [user]);

    if (checkIn && checkOut) {

        numberOfNights = differenceInCalendarDays(new Date(checkOut) , new Date(checkIn));
    }

    async function bookPlace() {

        const response = await axios.post('/booking' , {
            checkIn, checkOut, numberOfGuests,
            name, phone, place:place._id, price:numberOfNights * place.price,
        });
        const bookingId = response.data._id;

        setRedirect('/account/bookings/' + bookingId);
    }

    if (redirect) {

       return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white shadow rounded-2xl p-2">
                <div className="text-2xl text-center"> <b>Price: </b> {place.price} / per night 
                </div> 
                <div className="border rounded-2xl text-left">
                    <div className="flex">
                        <div className="py-3 px-4 border-r">
                            <label>Arrival Date: </label>
                            <input 
                                type="date" 
                                value={checkIn} 
                                onChange={ev => setCheckIn(ev.target.value)} 
                            />
                        </div>
                        <div className="py-3 px-4">
                            <label>Departure Date: </label>
                            <input 
                                type="date" 
                                value={checkOut} 
                                onChange={ev => setCheckOut(ev.target.value)} 
                            />
                        </div>
                    </div>
                </div>
                <div>

                <label className="text-left">Guests: </label>
                <input 
                    type="number" 
                    value={numberOfGuests} 
                    onChange={ev => setNumberOfGuests(ev.target.value)}
                /> 

                </div>
                {numberOfNights > 0 && (

                    <div className="text-left py-3 px-4 border-t"> 
                        <label className="">Your Full Name: </label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                        />
                        <label className="">Phone #: </label>
                        <input 
                            type="tel" 
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)}
                        />
                    </div>
                )}
            <button onClick={bookPlace} className="login">
                Book this place 
                {numberOfNights > 0 && (

                    <span>  ${numberOfNights * place.price}</span>
                )}
                </button>
        </div>
    )
}