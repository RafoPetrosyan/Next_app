import {useDispatch} from "react-redux";
import {useState} from "react";
import {userSignIn} from "../../store/users/operations";

function useContainer() {
    const [email, setEmail] = useState('petrosyanrafo0@gmail.com')
    const [password, setPassword] = useState('12345678')
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userSignIn({values: {email, password}, rememberMe: true}))
    }

    return {
        handleSubmit,
        setPassword,
        setEmail,
        email,
        password
    }
}

export default useContainer;
