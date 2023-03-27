import React, {useEffect, useState} from "react";
import Link from "next/link";
import {isEmpty} from "lodash";
import {useDispatch} from "react-redux";
import {userLogAuth} from "../../store/users";
import {fetchProducts} from "../../store/users/operations";
import withAuthorized from "../../hoc/withAuthorized";

const Profile = (props) => {
    const dispatch = useDispatch();
    const [productData, setProductData] = useState({})
    const handleLogAuth = () => {
        dispatch(userLogAuth())
    }

    useEffect(() => {
        (async () => {
            if (isEmpty(props)) {
               const {payload} = await dispatch(fetchProducts());
               await setProductData(payload);
            }
        })()
        setProductData(props)
    }, []);

    return (
        <div>
            <Link href='/'>Home</Link>
            <Link href='/profile/account'>Account</Link>
            <button onClick={handleLogAuth}>Log Auth</button>
            <div>
                {!isEmpty(productData) && Object.values(productData)?.map(item => (
                    <p key={item.id}>{item.attributes.email}</p>
                ))}
            </div>
        </div>
    )
}

Profile.getInitialProps = async ({store}) => {
    const {payload} = await store.dispatch(fetchProducts())
    return payload;
}

export default withAuthorized(Profile);
