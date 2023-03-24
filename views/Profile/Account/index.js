import React from 'react';
import axios from "axios";

const Account = (props) => {
    console.log(props, 'Account')
    return (
        <div>
           account
        </div>
    );
};

Account.getInitialProps = async () => {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return data;
}

export default Account;
