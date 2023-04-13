import React, {useState, useContext, useMemo} from 'react';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {isEmpty, range} from "lodash";
import moment from "moment";
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
const Card = ({data, selected, rangeDays}) => {
    const {getPrevElement} = useContext(VisibilityContext);
    const leftElement = getPrevElement();
    const leftItem = isEmpty(leftElement) ? 0 : +leftElement.index + 1;
    const day = moment(data.day).format('DD');

    if(+leftItem === +data.id) {
        console.log(moment(data.day).format('DD'))
    }

    const dayClassName = useMemo(() => {
        let cls = 'day';
        if(selected.includes(data.id)) cls += ' selectedDay';
        if(rangeDays.includes(data.id)) cls += ' rangeDay';
        return cls;
    }, [selected, rangeDays]);

    /** get weekend day **/
    const weekends = useMemo(() => moment(data.day).day() === 6 || moment(data.day).day() === 0, [data]);

    return (
        <div className='customCalendarCard' tabIndex={0}>
            {+leftItem === +data.id && <p className='hh'>hhhhh</p>}
            <p className='month'> {(day === '01' || +leftItem === +data.id) ? moment(data.day).format("MMMM") : ''}</p>
            <div className={dayClassName}>
                <p className={weekends ? 'weekDay weekends' : 'weekDay'}>
                    {moment(data.day).format("ddd")}
                </p>
                <p className={weekends ? 'dayNumber weekends' : 'dayNumber'}>{day}</p>
            </div>
        </div>
    );
}

const CustomCalendar = () => {
    const [selected, setSelected] = useState([]);
    const rangeDays = useMemo(() => {
        const days = selected.length === 2 ? range(selected[0], selected[1]) : [];
        if(days.length) days.shift();
        return days;
    }, [selected]);

    /** all day arr **/
    const days = useMemo(() => {
        const data = [];
        for (let i = 0; i < 200; i++) {
            data.push({id: i, day: moment().add(i, 'days')});
        }
        return data;
    }, []);

    /** on select handler **/
    const onSelect = (id) => {
        if(selected.length === 2) {
            setSelected([id]);
            return;
        }
        setSelected([...selected, id]);
    };

    return (
        <div className="customCalendar">
            <ScrollMenu scrollContainerClassName='scrollContainer' wrapperClassName='scrollWrapper' LeftArrow={LeftArrow} RightArrow={RightArrow}>
                {days.map(date =>
                    <div key={date.id} onClick={() => onSelect(date.id)}>
                        <Card data={date} selected={selected} rangeDays={rangeDays}/>
                    </div>
                )}
            </ScrollMenu>
        </div>
    );
}

export default CustomCalendar;
