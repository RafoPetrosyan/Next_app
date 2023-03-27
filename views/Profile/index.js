import React from "react";
import Link from "next/link";
import {isEmpty} from "lodash";
import {useDispatch} from "react-redux";
import {userLogAuth} from "../../store/users";
import {fetchProducts} from "../../store/users/operations";
import withAuthorized from "../../hoc/withAuthorized";

const Profile = (props) => {
    const dispatch = useDispatch();

    const handleLogAuth = () => {
        dispatch(userLogAuth())
    }

    return (
        <div>
            <Link href='/'>Home</Link>
            <Link href='/listings'>Listings</Link>
            <Link href='/profile/account'>Account</Link>
            <button onClick={handleLogAuth}>Log Auth</button>
            <div>
                {!isEmpty(props) && Object.values(props)?.map(item => (
                    <p key={item.id}>{item.attributes.email}</p>
                ))}
            </div>
        </div>
    )
}

Profile.getInitialProps = async (ctx) => {
    const {payload} = await ctx.store.dispatch(fetchProducts())
    return payload;
}

export default withAuthorized(Profile);
