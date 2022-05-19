import React from 'react';
import leftArrow from './leftArrow.png'
import rightArrow from './rightArrow.png'

class Footer extends React.Component {

    render() {

        return (
            <div className='Footer'>
                <button type="button" onClick = {
                        ()=>{
                            if(this.props.page>1){
                                this.props.turnPage(this.props.page-1)
                            }
                        }
                    }><img src={leftArrow} height ="30" width="30" /></button>

                    <p> {this.props.page}</p>

                    <button type="button" onClick={
                        ()=>{
                            this.props.turnPage(this.props.page+1)
                        }
                    }><img src={rightArrow} height ="30" width="30" /></button>
            </div>);
    }
}

export default Footer