/** @format */

import React from 'react';

const style = {
    padding: '50px',
    background: 'green',
    color: 'white',
    fontSize: '30px',
    fontWeight: 'bold'
};

const offStyle = {...style};
offStyle.background = 'grey';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            on: props.on
        };
    }

    handleToggle = () => {
        this.setState({on: !this.state.on});
    };
    render() {
        if (this.state.on) {
            return (
                <div style={style}>
                    I AM ON{' '}
                    <button className="btn-toggle" onClick={this.handleToggle}>
                        Turn Me OFF
                    </button>
                </div>
            );
        }
        return (
            <div style={offStyle}>
                I AM OFF{' '}
                <button className="btn-toggle" onClick={this.handleToggle}>
                    Turn Me ON
                </button>
            </div>
        );
    }
}
