import React from "react";
import { fetchProducts} from "../../store/users/operations";
import Link from "next/link";
import {useSelector} from "react-redux";
import {isEmpty} from "lodash";

const Profile = () => {
    const {products} = useSelector(({users}) => users)
    console.log(products)
    return (
        <div>
            <Link href='/'>Home</Link>
            {products?.models?.[0]?.title}
            {/*<div>*/}
            {/*    {!isEmpty(products) && products?.models?.map(item => (*/}
            {/*        <p key={item.id}>{item.title}</p>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    )
}

Profile.getInitialProps = async (ctx) => {
    await ctx.store.dispatch(fetchProducts({}))
}

export default Profile;
