import React, {useContext} from "react";
import {VisibilityContext} from "react-horizontal-scrolling-menu";
import {Button} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

export const LeftArrow = () => {
    const {isFirstItemVisible, scrollPrev} = React.useContext(VisibilityContext);
    return (
        <Button type='text' disabled={!!isFirstItemVisible} onClick={() => scrollPrev()} className='calendarArrow'>
            <LeftOutlined />
        </Button>
    );
}

export const RightArrow = () => {
    const {isLastItemVisible, scrollNext} = useContext(VisibilityContext);
    return (
        <Button type='text' disabled={!!isLastItemVisible} onClick={() => scrollNext()} className='calendarArrow'>
            <RightOutlined />
        </Button>
    );
}
