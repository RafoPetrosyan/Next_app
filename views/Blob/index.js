import React, {useEffect} from "react";
import Link from "next/link";
import {isEmpty} from "lodash";
import {fetchListings} from "store/users/operations";
import useParams from "hooks/useParams";
import QueryParams from "utils/queryParams";
import Header from "./Header";

const Blob = (props) => {
    const params = useParams();

    useEffect(() => {
        console.log(params, 'blob')
    }, [params])

    return (
        <div className='blob'>
            <Header/>
            <div className="content"></div>
            <Link href='/'>Home</Link>
            <button onClick={() =>QueryParams.set({name: 'country', value: 'Armenia'})}>Set community</button>
            <button onClick={() => QueryParams.set({name: 'region', value: 'Shirak'})}>Set region</button>
            <button onClick={() => QueryParams.set({name: 'city', value: 'Gyumri'})}>Set city</button>
            <button onClick={() => QueryParams.set({name: 'country', value: ''})}>Set community</button>
            <button onClick={() => QueryParams.set({name: 'region', value: 'Syuniq'})}>Set region</button>
            <button onClick={() => QueryParams.set({name: 'city', value: 'Mexri'})}>Set city</button>
            <div>
                {!isEmpty(props) && <>
                    {props.attributes.about}
                    {props.attributes.first_name}
                </>}
            </div>
        </div>
    )
}

Blob.getInitialProps = async (ctx) => {
    console.log('server query', QueryParams.parseQuery(ctx.query?.slug))
    const {payload} = await ctx.store.dispatch(fetchListings())
    return payload;
}

export default Blob;
