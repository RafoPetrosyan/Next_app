import React from "react";
import Link from "next/link";
import {fetchProducts} from "../../store/users/operations";
import {useSelector} from "react-redux";
import {isEmpty} from "lodash";

const Profile = (props) => {
    const {products} = useSelector(({users}) => users);

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
    console.log(payload)
    return payload
}

export default Profile;
