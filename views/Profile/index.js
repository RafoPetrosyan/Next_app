import React from "react";
import { fetchProducts} from "../../store/users/operations";
import Link from "next/link";
import {useSelector} from "react-redux";
import {isEmpty} from "lodash";

const data = {models: [{title: 'dadsa', id: 1}, {title: 'ewdwdwdwfd', id: 2}]}

const Profile = () => {
    const {products} = useSelector(({users}) => users);
    return (
        <div>
            <Link href='/'>Home</Link>
            <div>
                {!isEmpty(products) && products?.models?.map(item => (
                    <p key={item.id}>{item.title}</p>
                ))}
            </div>
        </div>
    )
}

Profile.getInitialProps = async (ctx) => {
    await ctx.store.dispatch(fetchProducts({}))
}

export default Profile;
