import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    

    async function handleLogin(ev) {
        ev.preventDefault()
        try{
            const {data} = await axios.post('/login' , {email,password});
            setUser(data);
            alert('Login Successful');

            setRedirect(true);

        }
        catch (e){
            alert('Login Failed');
        }
    }

    if (redirect){
        return<Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className=" max-w-lg mx-auto" onSubmit={handleLogin}>

                    <input type="email" 
                        placeholder='your@email.com' 
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)}
                    />

                    <input type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)}
                    />

                    <button className="login">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account?  <Link className="underline text-blue-600" to={'/register'}> Register Here!</Link>
                    </div>
                </form> 
            </div>
        </div>
    )
}