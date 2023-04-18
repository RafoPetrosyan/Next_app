import React, {useCallback, useEffect, useState} from 'react';
import {Button, Input, Popover, Select, Tooltip} from "antd";
import {CloseOutlined, DownOutlined, HeartOutlined, SearchOutlined} from "@ant-design/icons";
import {FormattedMessage, useIntl} from "react-intl";
import {useRouter} from "next/router";
import moment from "moment/moment";
import {momentLocales} from "../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {citiesRequest} from "../../../store/cities/operations";
import {showModal} from "../../../store/modal";
import {categoryRequest} from "../../../store/category/operations";
import _ from 'lodash'

const Header = () => {
    const {formatMessage} = useIntl();
    const [popover, setPopover] = useState(false);
    const [cityTitle, setCityTitle] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();
    const {cities} = useSelector(state => state.cities)
    const {category} = useSelector(state => state.category)
    const citiesContent = (
        <div className='cities-popover'>
            <div className='cities-header'>
                <div className='cities-header-content'>
                    <p><FormattedMessage id={'city'}/></p>
                    <Button onClick={() => setPopover(false)}>
                        <CloseOutlined/>
                    </Button>
                </div>

            </div>
            <div className='cities-main'>
                <ul className='cities-list'>
                    {
                        !_.isEmpty(cities) && cities.map(el => <li onClick={() => handleCheckedCity(el.title)}
                                                                   key={el.id}>{el.title}</li>)
                    }
                </ul>
            </div>
        </div>
    )
    const handleCheckedCity = useCallback((title) => {
        setCityTitle(title);
        setPopover(false)
    }, []);
    const handleChange = useCallback((val) => {
        const {pathname, asPath, query} = router;
        router.push({pathname, query}, asPath, {locale: val});
        moment.locale(momentLocales[val]);
    }, [router]);

    useEffect(() => {
        dispatch(categoryRequest())
        dispatch(citiesRequest())
    }, [router.locale])

    return (
        <div className='header'>
            <div className="header-Content">
                <div className='header-left-content'>
                    <Button className='logo'>Logo</Button>
                    <Popover
                        className='cities'
                        placement="bottomLeft"
                        content={citiesContent}
                        trigger="click"
                        open={popover}
                        onOpenChange={() => setPopover(false)}
                    >
                        <Button className='city-popover'
                                onClick={() => setPopover(true)}>
                            {cityTitle || cities[0]?.title}
                            <DownOutlined/>
                        </Button>
                    </Popover>
                </div>
                <Input
                    className='search'
                    placeholder={formatMessage({id: 'header.searchPlaceholder'})}
                    allowClear prefix={<SearchOutlined/>}/>
                <div className='signIn-Content'>
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
                                label: 'En',
                            },
                            {
                                value: 'ru',
                                label: 'Ru',
                            },
                        ]}
                    />
                    <Tooltip className='like' title="Like">
                        <Button icon={<HeartOutlined/>}/>
                    </Tooltip>
                    <Button onClick={() => dispatch(showModal({modalType: 'SIGN_IN_MODAL'}))}
                            className='signIn-Btn'>
                        <FormattedMessage id={'signIn'}/>
                    </Button>
                </div>
            </div>
            <div className="navigation-bar">
                {
                    !_.isEmpty(category) && category.map(el => <span key={el.id}>{el.title}</span>)
                }
            </div>
        </div>
    );
};

export default Header;
