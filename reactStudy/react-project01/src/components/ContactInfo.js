import React from 'react';

export default class ContactInfo extends React.Component {
    render(){
        return(
            <div onClick={this.props.onClick}>{this.props.contact.name}</div> //props로 이벤트를 넘겨줌
        )
    }
}