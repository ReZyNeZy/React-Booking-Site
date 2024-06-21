export default function PlacePic({place, index=0, className=null}){

 if (!place.photos?.length) {

    return '';
 }

 if (!className) {

    className = 'object-cover';
 }

    return (    
        <img className={className} src={'http://localhost:4321/uploads/'+place.photos[index]} alt="" />       
    );
}