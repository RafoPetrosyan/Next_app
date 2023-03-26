import React from "react";
import Link from "next/link";
import {isEmpty} from "lodash";
import {fetchProducts} from "../../store/users/operations";
import withAuthorized from '../../hoc/withAuthorized';

const Profile = (props) => {
    return (
        <div>
            <Link href='/'>Home</Link>
            <Link href='/profile/account'>Account</Link>
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
