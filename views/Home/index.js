import React, {useState} from "react";
import Link from "next/link";
import useContainer, {getInitialProps} from "./hook";
import {useDispatch} from "react-redux";
import {userSignIn} from "../../store/users/operations";

const Home = () => {
    const {} = useContainer();
    const [email, setEmail] = useState('petrosyanrafo0@gmail.com')
    const [password, setPassword] = useState('12345678')
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userSignIn({values: {email, password}, rememberMe: true}))
    }
    return (
        <div className='homePage'>
            <form onSubmit={handleSubmit}>
                <input type='email' value={email} onChange={({target: {value}}) => setEmail(value)} />
                <input type='password' value={password} onChange={({target: {value}}) => setPassword(value)} />
                <button type={'submit'}>Sign In</button>
            </form>
        </div>
    )
}
Home.getInitialProps = getInitialProps;
export default Home;
