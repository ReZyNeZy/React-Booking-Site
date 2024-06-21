import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PhotoGallery from "../PhotoGallery";
import AddressLink from "../AddressLink";

export default function PlaceInfoPage () {

    const {id} = useParams();
    const [place,setPlace] = useState(null);

    useEffect(() => {

        if (!id) {

            return;
        }

        axios.get('/places/'+id).then(response => {

            setPlace(response.data);
        });

    }, [id]);

    if (!place) return 'loading...';

    

    return (
    
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
        
            <h1 className="text-3xl font-bold"> {place.title} </h1>

            <AddressLink>{place.address}</AddressLink>
            
            <PhotoGallery place={place} /> 

        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">

            <div>
                <div className="py-4">
                    <h2 className="font-semibold text-2xl"> Description</h2>
                    {place.description}
                </div> 
                <b> Check In:</b> {place.checkIn} <br/>
                <b> Check Out:</b> {place.checkOut} <br/>
                <b> # of Guests:</b> {place.maxGuests} <br/>
            </div>
                <BookingWidget place={place} />
        </div>
        <div className="bg-white rounded-2xl px-8 py-8 -mx-8 border-t">
        <div>
            <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="mb-4 mt-1 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
        </div>  
     
    </div>         
    )
}