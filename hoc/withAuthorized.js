import {useSelector} from "react-redux";
import Router from 'next/router';
import {useEffect, useState} from "react";

const withAuthorized = (Component) => (props) => {
    const {isUserAuthorized} = useSelector(({users}) => users);

    useEffect(() => {
        (async () => {
            if(isUserAuthorized) return;
            await Router.replace('/');
        })()
    }, [isUserAuthorized]);

    if (!isUserAuthorized) return;
    return <Component {...props} />
}

export default withAuthorized;


// const withData = (Component) => {
//     const WithData = ({ data }) => {
//         return <Component data={data} />;
//     };
//
//     WithData.getInitialProps = async (ctx) => {
//         // Fetch data here
//         const data = await fetch('/api/data');
//
//         return {
//             data,
//             ...(Component.getInitialProps
//                 ? await Component.getInitialProps(ctx)
//                 : {}),
//         };
//     };
//
//     return WithData;
// };
