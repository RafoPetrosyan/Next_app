import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {userSignIn} from "../../store/users/operations";
import useParams from "../../hooks/useParams";
import {isEmpty} from "lodash";
import {useRouter} from "next/router";

function useContainer() {
    const [email, setEmail] = useState('vazgen.galstyan@rubygarage.org')
    const [password, setPassword] = useState('123235vV')
    const dispatch = useDispatch();
    const params = useParams();
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userSignIn({values: {email, password}, rememberMe: true}))
    }

    useEffect(() => {
        if(!isEmpty(params)) router.push('events');
    }, [])

    return {
        handleSubmit,
        setPassword,
        setEmail,
        email,
        password,
    }
}

export default useContainer;
