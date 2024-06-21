import { useState } from "react";

export default function PhotoGallery({place}) {

    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return(

            <div className=" absolute inset-0 bg-black  min-h-screen"> 
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <button onClick={() => setShowAllPhotos(false)} className="rounded-full p-2 bg-white fixed shadow shadow-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                        </button>
                    </div>
                    {place?.photos.length > 0 && place.photos.map(photo => (

                    <div>
                        <img src={'http://localhost:4321/uploads/' + photo} />
                    </div>
                    ))}
            </div>
        </div> 
        )
    }
    

    return(

        <div className="relative">

            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div>

                    {place.photos?.[0] && (

                        <div>
                            <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4321/uploads/' + place.photos[0]} />
                        </div>
                    )}

                </div>
                <div className="overflow-hidden">
                    {place.photos?.[1] && (
                    
                        <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4321/uploads/' + place.photos[1]} />                       
                    )}
                    <div className="border">
                        {place.photos?.[2] && (
            
                            <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover relative top-2"  src={'http://localhost:4321/uploads/' + place.photos[2]} />
                            
                        )}
                    </div>
                </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className="flex absolute bottom-2 right-2 py-2 px-2 rounded-2xl bg-white shadow-md shadow-gray-500 ">
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
                Show All Photos
            </button>
        </div>
    )
}