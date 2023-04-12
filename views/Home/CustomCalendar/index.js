import React, {useState, useContext, useMemo} from 'react';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import moment from "moment";

const LeftArrow = () => {
    const {isFirstItemVisible, scrollPrev} = React.useContext(VisibilityContext);
    return (
        <button disabled={!!isFirstItemVisible} onClick={() => scrollPrev()}>
            Left
        </button>
    );
}

const RightArrow = () => {
    const {isLastItemVisible, scrollNext} = useContext(VisibilityContext);
    return (
        <button disabled={!!isLastItemVisible} onClick={() => scrollNext()}>
            Right
        </button>
    );
}

const Card = ({date, id, handleClick}) => {
    return (
        <div onClick={handleClick(id)} className='customCalendarCard' tabIndex={0}>
            <p className='month'>{date?.month}</p>
            <p className='day'>{date.day}</p>
        </div>
    );
}

const CustomCalendar = () => {

    const days = useMemo(() => {
        const data = [];
        for (let i = 0; i < 186; i++) {
            const day = moment().add(i, 'days').format("L").split('/')[0];
            data.push({
                id: i,
                day,
                month: (i === 0 || day === '01') ? moment().add(i, 'days').format("MMMM") : '',
            });
        }
        return data;
    }, []);

    const [selected, setSelected] = useState([]);
    const isItemSelected = (id) => !!selected.find((el) => el === id);

    const handleClick = (id) => ({getItemById, scrollToItem}) => {
        const itemSelected = isItemSelected(id);
        setSelected((currentSelected) => itemSelected ? currentSelected.filter((el) => el !== id) : currentSelected.concat(id));
    };

    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {days.map((date, index) => <Card handleClick={handleClick} key={index} date={date}/>)}
        </ScrollMenu>
    );
}

export default CustomCalendar;
