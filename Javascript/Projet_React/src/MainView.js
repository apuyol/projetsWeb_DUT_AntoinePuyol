import React from 'react';
import unknown from './unknown.png'
import Book from './Book.js'


class MainView extends React.Component {
    render() {
        let items = this.props.books.map((item, index) => {
            let object = item.volumeInfo
            let img = unknown
            if('imageLinks' in object){
                img = object.imageLinks.thumbnail
            };

            let desc = object.description

            let title = object.title

            return <Book key={index} thumbnail={img} title={title} desc={desc}/>
        });

        return (
            <div className='MainView'>
                    {items}
            </div>);
    }
}

export default MainView