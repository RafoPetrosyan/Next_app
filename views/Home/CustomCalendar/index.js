import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {ScrollMenu} from 'react-horizontal-scrolling-menu';
import {range} from "lodash";
import moment from "moment";
import {LeftArrow, RightArrow} from "./Arrows";
import CalendarCard from "./CalendarCard";
import useParams from "../../../hooks/useParams";
import QueryParams from "../../../utils/queryParams";

const CustomCalendar = () => {
    const [firstMonth, setFirstMonth] = useState('');
    const [selected, setSelected] = useState([]);
    const [selectedDay, setSelectedDay] = useState([]);
    const params = useParams();

    /** range days **/
    const rangeDays = useMemo(() => {
        const days = selected.length === 2 ? range(selected[0], selected[1]) : [];
        if(days.length) days.shift();
        return days;
    }, [selected]);

    console.log(params, 'CustomCalendar')
    console.log(selectedDay)

    /** all day arr **/
    const days = useMemo(() => {
        const data = [];
        for (let i = 0; i < 250; i++) {
            data.push({id: i, day: moment().add(i, 'days').format()});
        }
        return data;
    }, []);

    const changeFirstMoth = useCallback((leftItemId) => {
        setFirstMonth(moment(days.find(e => e.id === leftItemId).day).format("MMMM"));
    }, [days]);

    /** on select handler **/
    const onSelect = (date) => {
        if(selected.length === 2) {
            setSelected([date.id]);
            setSelectedDay([moment(date.day).format('L')]);
            return;
        }
        // QueryParams.set({name: 'day', value: moment(date.day).format('L')});
        setSelected([...selected, date.id]);
        setSelectedDay([...selectedDay, moment(date.day).format('L')]);
    };

    return (
        <div className="customCalendar">
            <p className="firstMoth">{firstMonth}</p>
            <ScrollMenu
                scrollContainerClassName='scrollContainer'
                wrapperClassName='scrollWrapper'
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
            >
                {days.map(date =>
                    <div key={date.id} onClick={() => onSelect(date)}>
                        <CalendarCard data={date} selected={selected} rangeDays={rangeDays} changeFirstMoth={changeFirstMoth}/>
                    </div>
                )}
            </ScrollMenu>
        </div>
    );
}

export default CustomCalendar;
