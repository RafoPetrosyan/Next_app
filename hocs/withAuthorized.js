import {useSelector} from "react-redux";
import {useRouter} from 'next/router';
import {useEffect} from "react";

const withAuthorized = (Component) => (props) => {
    const router = useRouter();
    const {isUserLogged} = useSelector(({users}) => users);

    const onUpdateHandler = () => {
        if(isUserLogged) return;
        router.replace('/');
    }

    useEffect(onUpdateHandler,[isUserLogged]);

    if (!isUserLogged) return;
    return <Component {...props} />
}

export default withAuthorized;
