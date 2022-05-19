import React from 'react';


class Book extends React.Component {

    render() {
        return(
            <div className='book'>
            <h4>{this.props.title}</h4>
            <p>{this.props.desc}</p>
            <img src={this.props.thumbnail}/>
            </div>
        );
    }
}

export default Book ;