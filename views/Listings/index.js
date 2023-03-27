import React from "react";
import Link from "next/link";
import {isEmpty} from "lodash";
import {useDispatch} from "react-redux";
import {userLogAuth} from "../../store/users";
import {fetchListings} from "../../store/users/operations";

const Listings = (props) => {
    const dispatch = useDispatch();
    const handleLogAuth = () => {
        dispatch(userLogAuth())
    }

    return (
        <div>
            <Link href='/'>Home</Link>
            <Link href='/profile/account'>Account</Link>
            <button onClick={handleLogAuth}>Log Auth</button>
            <div>
                {!isEmpty(props) && <>
                    {props.attributes.about}
                    {props.attributes.first_name}
                </>}
            </div>
        </div>
    )
}

Listings.getInitialProps = async ({store}) => {
    const {payload} = await store.dispatch(fetchListings())
    return payload;
}

export default Listings;
