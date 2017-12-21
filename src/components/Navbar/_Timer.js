import React, {Component} from 'react';

import {getShortMonth, addZeroBefore} from "../../utils/index";

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dateNow: new Date()
        };

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({
            dateNow: new Date()
        })
    }

    render() {
        const dateNow = this.state.dateNow;

        const hours = addZeroBefore(dateNow.getHours());
        const minutes = addZeroBefore(dateNow.getMinutes());
        const seconds = addZeroBefore(dateNow.getSeconds());

        const date = addZeroBefore(dateNow.getDate());
        const month = getShortMonth(dateNow);
        const year = dateNow.getFullYear();

        return (
            <div className="Timer">
                <span className="Timer__hours">{hours}:</span>
                <span className="Timer__minutes">{minutes}:</span>
                <span className="Timer__seconds">{seconds}</span>
                <span className="Timer__separator">
                </span>
                <span className="Timer__date">{date}</span>
                <span className="Timer__month">{month}</span>
                <span className="Timer__year">{year}</span>
            </div>
        )
    }
}

export default Timer;