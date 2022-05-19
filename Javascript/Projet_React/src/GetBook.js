import React from 'react';
import axios from 'axios'
import { Book } from './Book';
import leftArrow from './leftArrow.png'
import rightArrow from './rightArrow.png'
import unknown from './unknown.png'

class Header extends React.Component {


    getBook() {
        let url = 'https://www.googleapis.com/books/v1/volumes?q=' + this.state.title + "&startIndex=" + ((this.props.page - 1) * 10)
        axios.get(url).then(result => {
            const books = result.data.items
            this.props.update(books)
        });
    }

    render() {

        return (
            <div className='header'>
                <input type="text" id="search" onChange={(event) => {
                    console.log(event.target.value)
                    this.props.turnPage(1)
                    this.setState({ title: event.target.value }, () => this.getBook())
                }
                }>
                </input>
            </div>);
    }
}

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


class Footer extends React.Component {

    render() {

        return (
            <div className='Footer'>
                <button type="button" onClick = {
                        ()=>{
                            if(this.props.page>1){
                                this.props.turnPage(this.props.page-1)
                                Header.getBook()
                            }
                        }
                    }><img src={leftArrow} height ="30" width="30" /></button>

                    <p> {this.props.page}</p>

                    <button type="button" onClick={
                        ()=>{
                            this.props.turnPage(this.props.page+1)
                            Header.getBook()
                        }
                    }><img src={rightArrow} height ="30" width="30" /></button>
            </div>);
    }
}
export { Header, MainView, Footer };