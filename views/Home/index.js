import React, {useCallback} from "react";
import Link from "next/link";
import {Button, Radio, Select} from "antd";
import {FormattedMessage} from "react-intl";
import {useRouter} from "next/router";
import useContainer from "./hook";

const Home = () => {
    const {handleSubmit, setEmail, setPassword, email, password} = useContainer();
    const router = useRouter();

    const handleChange = useCallback((val)=> {
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: val });
    }, [router]);

    return (
        <div className='homePage'>
            <form onSubmit={handleSubmit}>
                <input type='email' value={email} onChange={({target: {value}}) => setEmail(value)}/>
                <input type='password' value={password} onChange={({target: {value}}) => setPassword(value)}/>
                <button type={'submit'}>Sign In</button>
                <Button><FormattedMessage id="yup.mixed.required"/></Button>
                <h3><FormattedMessage id="yup.string.min" values={{min: 5}}/></h3>
                <Select
                    defaultValue={router.locale}
                    onChange={(value) => handleChange(value)}
                    options={[
                        {
                            value: 'am',
                            label: 'Am',
                        },
                        {
                            value: 'en',
                            label: 'Eng',
                        },

                        {
                            value: 'ru',
                            label: 'Ru',
                        },
                    ]}
                />
                <Radio/>
            </form>
            <Link href='/profile'>Profile</Link>
            <Link href='/blob'>Blob</Link>
        </div>
    )
}

Home.getInitialProps = async () => {
    console.log(4444)
}
export default Home;
