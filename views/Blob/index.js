import React, {useEffect} from "react";
import Link from "next/link";
import {isEmpty} from "lodash";
import {fetchListings} from "../../store/users/operations";
import useParams from "../../hooks/useParams";
// import "./style.scss";

const Blob = (props) => {
    const {setQueryParams} = useParams();

    return (
        <div className='blob'>
            <div className="content"></div>
            <Link href='/'>Home</Link>
            <Link href='/profile/account'>Account</Link>
            <button onClick={() => setQueryParams({name: 'country', value: 'Armenia'})}>Set community</button>
            <button onClick={() => setQueryParams({name: 'region', value: 'Shirak'})}>Set region</button>
            <button onClick={() => setQueryParams({name: 'city', value: 'Gyumri'})}>Set city</button>
            <button onClick={() => setQueryParams({name: 'country', value: ''})}>Set community</button>
            <button onClick={() => setQueryParams({name: 'region', value: 'Syuniq'})}>Set region</button>
            <button onClick={() => setQueryParams({name: 'city', value: 'Mexri'})}>Set city</button>
            <div>
                {!isEmpty(props) && <>
                    {props.attributes.about}
                    {props.attributes.first_name}
                </>}
            </div>
        </div>
    )
}

Blob.getInitialProps = async ({store}) => {
    const {payload} = await store.dispatch(fetchListings())
    return payload;
}

export default Blob;
