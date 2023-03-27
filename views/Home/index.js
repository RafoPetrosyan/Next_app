import React from "react";
import useContainer from "./hook";
import Link from "next/link";

const Home = () => {
    const {handleSubmit, setEmail, setPassword, email, password} = useContainer();

    return (
        <div className='homePage'>
            <form onSubmit={handleSubmit}>
                <input type='email' value={email} onChange={({target: {value}}) => setEmail(value)} />
                <input type='password' value={password} onChange={({target: {value}}) => setPassword(value)} />
                <button type={'submit'}>Sign In</button>
            </form>
            <Link href='/profile'>Profile</Link>
        </div>
    )
}

Home.getInitialProps = async () => {

}
export default Home;
