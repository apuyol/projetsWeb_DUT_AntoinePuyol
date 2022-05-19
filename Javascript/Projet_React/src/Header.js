import React from 'react';


class Header extends React.Component {
    render() {

        return (
            <div className='header'>
                <input type="text" id="search" onChange={(event) => {
                    this.props.turnPage(1)
                    this.props.updateTitle(event.target.value)
                }
                }>
                </input>
            </div>);
    }
}

export default Header