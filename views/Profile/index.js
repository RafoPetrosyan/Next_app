import React from "react";
import Link from "next/link";
import {isEmpty} from "lodash";
import {fetchProducts} from "../../store/users/operations";
import withAuthorized from "../../hocs/withAuthorized";

const Profile = (props) => {
    return (
        <div>
            <Link href='/'>Home</Link>
            <Link href='/profile/account'>Account</Link>
            <div>
                {!isEmpty(props) && props?.models?.map(item => (
                    <p key={item.id}>{item.title}</p>
                ))}
            </div>
        </div>
    )
}

Profile.getInitialProps = async (ctx) => {
   const { payload } = await ctx.store.dispatch(fetchProducts({}))
    return payload
}

export default withAuthorized(Profile);
