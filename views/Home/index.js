import React from "react";

const Home = () => {
    return (
        <>
            Home
        </>
    )
}

Home.getInitialProps = async (ctx) => {
    console.log(ctx, 'Home page getInitialProps')
}

export default Home;