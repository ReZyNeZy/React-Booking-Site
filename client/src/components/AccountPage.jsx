import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function AccountPage ()
{
    const [redirect, setRedirect] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);
    let {subpage} = useParams();

    if (subpage === false)
        {
            subpage = 'profile';
        }

    function whichPage(type=null){
        let classes = 'inline-flex gap-1 p-2 px-6 rounded-full rounded-full';

        if (type === subpage)
            {
                classes +=  'text-white rounded-full text-white  bg-primary';
            }
        else{
            classes += 'bg-gray-200 bg-gray-200';
        }

            return (classes);
    }

    if (redirect)
    {
        return (<Navigate to={redirect} />)
    }

    async function logOut()
    {
       await axios.post('/logout');
       setRedirect('/');
       setUser(null);
    }

    if (subpage === undefined)
        {
            subpage = 'profile';
        }

    if (!ready)
        {
            return('Loading...');
        }

    if (ready && !user && !redirect)
        {
            return <Navigate to={'/login'} />
        }

    return(

        <div>
            <AccountNav/>

            {subpage === 'profile' && (

                <div className="text-center max-w-lg mx-auto">

                    Logged in as {user.name} ({user.email}) <br/>
                    <button onClick={logOut} className="login max-w-md mt-2">Logout</button>

                </div>

            )}

            {subpage === 'places' && (

                <PlacesPage/>

            )}

        </div>
    )
}
