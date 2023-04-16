import React, {useCallback} from "react";
import Link from "next/link";
import dynamic from 'next/dynamic'
import {Button, Radio, Select} from "antd";
import {FormattedMessage} from "react-intl";
import {useRouter} from "next/router";
import moment from "moment";
import 'moment/locale/hy-am';
import 'moment/locale/ru';
import 'moment/locale/en-gb';
import Cookies from "../../utils/cookies";
import useContainer from "./hook";
import {momentLocales} from "../../constants";
import CustomCalendar from './CustomCalendar';
const SocialLogin = dynamic(() => import('./SocialLogin'), {
    ssr: false,
});

const Home = () => {
    const {handleSubmit, setEmail, setPassword, email, password} = useContainer();
    const router = useRouter();

    const handleChange = useCallback((val)=> {
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: val });
        Cookies.setCookie(null, 'language', val);
        moment.locale(momentLocales[val]);
    }, [router]);

    return (
        <div className='home'>
            <form onSubmit={handleSubmit} className='content'>
                <input type='email' value={email} onChange={({target: {value}}) => setEmail(value)}/>
                <input type='password' value={password} onChange={({target: {value}}) => setPassword(value)}/>
                <button type={'submit'}>Sign In</button>
                <Button><FormattedMessage id="yup.mixed.required"/></Button>
                <SocialLogin />
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
            <Link href='/blob'>Blob</Link>
            <div style={{marginTop: 100}}>
                <CustomCalendar />
            </div>
        </div>
    )
}

Home.getInitialProps = async () => {
    console.log(4444)
}
export default Home;
