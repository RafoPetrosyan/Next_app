import {useDispatch} from "react-redux";
import {useState} from "react";
import {userSignIn} from "../../store/users/operations";

function useContainer() {
    const [email, setEmail] = useState('vazgen.galstyan@rubygarage.org')
    const [password, setPassword] = useState('123235vV')
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
        password,
    }
}

export default useContainer;
