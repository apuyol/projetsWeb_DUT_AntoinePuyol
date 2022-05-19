import './App.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MainView from './MainView';
import axios from 'axios'


class App extends React.Component {

    state = {
        books : [],
        page : 1,
        title : ""
    }

    changeTitle=items=>{
        this.setState({title : items})
        this.getBook(items, this.state.page)
    }

    changePage = value =>{
        this.setState({page : value})
        this.getBook(this.state.title, value)
    }
    
    getBook = (t,p) => {
        let url = 'https://www.googleapis.com/books/v1/volumes?q=' + t + "&startIndex=" + ((p - 1) * 10)
        axios.get(url).then(result => {
            const books = result.data.items
            this.setState({books : books})
        });
    }


    render() {
        return(
            <div className='App'>
            <Header updateTitle={this.changeTitle} turnPage={this.changePage} loadBook={this.getBook}/>
            <MainView books={this.state.books}/>
            <Footer turnPage={this.changePage} page={this.state.page} loadBook={this.getBook}/>
            </div>
        )
        }
    }
export default App;