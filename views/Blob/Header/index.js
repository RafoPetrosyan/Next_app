import React, {useEffect} from 'react';
import QueryParams from "../../../utils/queryParams";
import useParams from "../../../hooks/useParams";

const Header = () => {
    const params = useParams();

    useEffect(() => {
        console.log(params, 'header')
    }, [params])
    return (
        <div>
            <button onClick={() => QueryParams.set({name: 'anun', value: 'Poxos'})}>hh</button>
        </div>
    );
};

export default Header;
