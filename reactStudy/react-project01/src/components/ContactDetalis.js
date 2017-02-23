import React from 'react';

export default class ContactDetalis extends  React.Component{
    render (){

        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );
        const blank =(<div>Not Selected</div>);
        return (
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? details :blank}
            </div>
        )
    }
}

ContactDetalis.defaultProps ={
    contact :{
        name : '' ,
        phone : ''
    }
};