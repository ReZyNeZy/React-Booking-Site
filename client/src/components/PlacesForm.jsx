import PhotoUploader from "../PhotoUploader.jsx";
import PerkLabels from "../PerkLabels";
import { useState, useEffect } from "react";
import AccountNav from "../AccountNav.jsx";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesForm() {

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [info, setInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setmaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(100);

    useEffect(() => {
        if(!id){
            return;
        }
            axios.get('/places/'+id).then(response => {

                const {data} = response;
                setTitle(data.title);
                setAddress(data.address);
                setAddedPhotos(data.photos);
                setDescription(data.description);
                setPerks(data.perks);
                setInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setmaxGuests(data.maxGuests);
                setPrice(data.price);
            });

        

    }, [id])

    function inputHeader(text){
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    function inputDescription(text)
    {
        return (
            <p className="text-gray-500 tet-sm">{text} </p>
        );
    }

    function preInput(header, description){
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description)}

            </>
        )
    }

    async function savePlace(ev){

        ev.preventDefault();
        const placeData = {

            title, address, addedPhotos, 
            description, perks, info, 
            checkIn, checkOut, maxGuests, price,
        };

        if (id){
            //update
            await axios.put('/places',  {
                id , ...placeData
            });
            setRedirect(true);
    
        } else {

            //new place
        await axios.post('/places',  placeData);
            setRedirect(true);
        }
        
    }

    if (redirect){

        return (<Navigate to={'/account/places'} />)
    }

    return(


        
        <div>
            <AccountNav/>
        <form onSubmit={savePlace}>
            {preInput("Title" , "Title should be short and sweet")}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: Apartment" />
            
            {preInput("Address" , "Address for your rented space")}
                <input type="text"  value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
            
            {preInput("Photos" , "More is better")}    
            <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

            {preInput("Description" , "Descripe your place")}  
            <textarea  value={description} onChange={ev => setDescription(ev.target.value)} />

            {preInput("Perks" , "Select all that apply")}  
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                <PerkLabels selected={perks} onChange={setPerks}/>
            </div>

            {preInput("Extra Info" , "House Rules ect...")}
            <textarea  value={info} onChange={ev => setInfo(ev.target.value)} />

            {preInput("Check In/Out and # of Guests" , "Times to check in and out. Remember that check in and out is a window of time")}
            
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 ">
                <div>
                    <h3 className="mt-2 -mb-2"> Check In</h3>
                    <input type="text"  
                    value={checkIn} 
                    onChange={ev => setCheckIn(ev.target.value)} 
                    placeholder="9:00" />

                </div>
                <div>
                    <h3> Check Out</h3>
                    <input type="text" 
                    value={checkOut} 
                    onChange={ev => setCheckOut(ev.target.value)} 
                    placeholder="5:00" />

                </div>
                <div>
                    <h3> # of Guests</h3>
                    <input type="number" value={maxGuests} onChange={ev => setmaxGuests(ev.target.value)} />
                </div>
                <div>
                    <h3> Price per night</h3>
                    <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} />
                </div>
            </div>
            <div>
                <button className="login my-4">Save Place</button>
            </div>

        </form>
    </div>
    )
}