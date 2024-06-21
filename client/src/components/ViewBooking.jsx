import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import PhotoGallery from "../PhotoGallery";
import AddressLink from "../AddressLink";
import BookedDates from "../BookedDates";

export default function ViewBooking() {

    const {id} = useParams();
    const [booking,setBooking] = useState(null);

    useEffect(() => {

        axios.get('/getBookings').then(response => {
            const currentBooking = response.data.find(({_id}) => _id === id);
            if(currentBooking){
                setBooking(currentBooking);
            }
        });
    }, [id])

    if(!booking) {

        return 'loading...'
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl font-bold"> {booking.place.title} </h1>
            <AddressLink className="my-2 lock">{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-4 mb-4 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4"> Your Booked Dates </h2> 
                    <BookedDates booking={booking} />    
                </div>
                <div className="bg-primary text-white rounded-2xl p-6">
                    <div>Total Price</div>
                    <div className="text-2xl">${booking.price}</div>
                </div>
            </div>
            <PhotoGallery place={booking.place} />
        </div>
    )
}