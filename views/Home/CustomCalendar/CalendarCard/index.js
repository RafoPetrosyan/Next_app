import React, {useContext, useEffect, useMemo} from "react";
import {VisibilityContext} from "react-horizontal-scrolling-menu";
import {isEmpty} from "lodash";
import moment from "moment/moment";

const CalendarCard = ({data, selected, rangeDays, changeFirstMoth}) => {
    const {getPrevElement} = useContext(VisibilityContext);
    const leftElement = getPrevElement();
    const leftItem = isEmpty(leftElement) ? 0 : +leftElement.index;
    const day = moment(data.day).format('DD');

    const dayClassName = useMemo(() => {
        let cls = 'day';
        if(selected.includes(data.id)) cls += ' selectedDay';
        if(rangeDays.includes(data.id)) cls += ' rangeDay';
        return cls;
    }, [selected, rangeDays]);

    /** get weekend day **/
    const weekends = useMemo(() => moment(data.day).day() === 6 || moment(data.day).day() === 0, [data]);

    useEffect(() => {
        changeFirstMoth(leftItem)
    }, [leftItem])

    return (
        <div className='customCalendarCard' tabIndex={0}>
            <p className='month'> {day === '01' && moment(data.day).format("MMMM")}</p>
            <div className={dayClassName}>
                <p className={weekends ? 'weekDay weekends' : 'weekDay'}>
                    {moment(data.day).format("ddd")}
                </p>
                <p className={weekends ? 'dayNumber weekends' : 'dayNumber'}>{day}</p>
            </div>
        </div>
    );
}

export default CalendarCard;
