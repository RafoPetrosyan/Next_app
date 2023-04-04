import React, {useCallback, useEffect, useState} from "react";
import useContainer from "./hook";
import Link from "next/link";
import {Button, Radio, Select} from "antd";
import {FormattedMessage} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import {changeLanguages} from "../../store/intl/action";

const Home = () => {
    const {handleSubmit, setEmail, setPassword, email, password} = useContainer();
    const language = useSelector(state => state.intl)
    const dispatch = useDispatch()
    const handleChange = useCallback((val) => {
        dispatch(changeLanguages(val))
    }, [])

    return (
        <div className='homePage'>
            <form onSubmit={handleSubmit}>
                <input type='email' value={email} onChange={({target: {value}}) => setEmail(value)}/>
                <input type='password' value={password} onChange={({target: {value}}) => setPassword(value)}/>
                <button type={'submit'}>Sign In</button>
                <Button><FormattedMessage id="yup.mixed.required"/></Button>
                <h3><FormattedMessage id="yup.string.min"/></h3>
                <Select
                    defaultValue={language.locale}
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
