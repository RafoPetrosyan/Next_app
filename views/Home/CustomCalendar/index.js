import React, {useState, useContext, useMemo, useEffect} from 'react';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import moment from "moment";
import {isEmpty} from "lodash";
import {Button} from "antd";

/** Left arrow button **/
const LeftArrow = () => {
    const {isFirstItemVisible, scrollPrev} = React.useContext(VisibilityContext);
    return (
        <Button type='text' disabled={!!isFirstItemVisible} onClick={() => scrollPrev()} className='calendarArrow'>
            <LeftOutlined />
        </Button>
    );
}

/** Right arrow button **/
const RightArrow = () => {
    const {isLastItemVisible, scrollNext} = useContext(VisibilityContext);
    return (
        <Button type='text' disabled={!!isLastItemVisible} onClick={() => scrollNext()} className='calendarArrow'>
            <RightOutlined />
        </Button>
    );
}

/** Day Card **/
const Card = ({data, handleClick, setLeftElement}) => {
    const {getPrevElement} = useContext(VisibilityContext);
    const leftElement = getPrevElement();
    const leftItem = isEmpty(leftElement) ? 0 : leftElement.index;
    const day = moment(data.day).format("L").split('/')[0];

    useEffect(() => {
        setLeftElement(leftItem);
    }, [leftItem]);

    return (
        <div onClick={handleClick(data.id)} className='customCalendarCard' tabIndex={0}>
            <p className='month'>
                {(day === '01') ? moment(data.day).format("MMMM") : ''}
            </p>
            <p className='day'>{day}</p>
        </div>
    );
}

const CustomCalendar = () => {
    const [leftElement, setLeftElement] = useState('');
    const [selected, setSelected] = useState([]);

    console.log(selected)

    /** all day arr **/
    const days = useMemo(() => {
        const data = [];
        for (let i = 0; i < 200; i++) {
            data.push({id: i, day: moment().add(i, 'days')});
        }
        return data;
    }, []);

    /** left item id **/
    const leftElementMonth = useMemo(() => {
        return moment(days.find(e => +e.id === +leftElement).day).format("MMMM")
    }, [leftElement]);

    const handleClick = (id) => ({getItemById, scrollToItem}) => {
        if(selected.length > 2) {
            setSelected([id]);
            console.log(4444444444)
        }
        setSelected([...selected, id]);
    };

    return (
        <div className="customCalendar">
            <p className='leftMonth'>{leftElementMonth}</p>
            <ScrollMenu scrollContainerClassName='scrollContainer' wrapperClassName='scrollWrapper' LeftArrow={LeftArrow} RightArrow={RightArrow}>
                {days.map(date =>
                    <Card
                        key={date.id}
                        data={date}
                        handleClick={handleClick}
                        setLeftElement={setLeftElement}
                    />
                )}
            </ScrollMenu>
        </div>
    );
}

export default CustomCalendar;
