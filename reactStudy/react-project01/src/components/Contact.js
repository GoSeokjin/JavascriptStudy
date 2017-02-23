import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetalis from './ContactDetalis'

export default  class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword : '',
            selectedKey : -1,
            contactData: [{
                    name: 'Abet',
                    phone: '010-0000-0001'
                },
                {
                    name: 'Betty',
                    phone: '010-0000-0002'
                },
                {
                    name: 'Charlie',
                    phone: '010-0000-0003'
                },
                {
                    name: 'Dei',
                    phone: '010-0000-0004'
                },]
        };
        this.handleChange = this.handleChange.bind(this); // this가 누군지를 알려줘야한다.
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(e){
        this.setState({
            keyword : e.target.value
        });
    };
    handleClick(key){
        this.setState({
            selectedKey : key
        });
        console.log(key , 'ist selected');
    };


    render(){
        const mapToComponents = (data) =>{
            data.sort(); // 오름차순 정렬
            data = data.filter(
                (contact) => {
                    return contact.name.toLowerCase().indexOf(this.state.keyword) >-1;
                }
            )
            return data.map((contact , i) => {
                return <ContactInfo contact={contact} key={i} onClick={()=>this.handleClick(i)}/> //컴포넌트에는 이벤트가 적용되지않는다. Props로 넘어간다 이벤트가
            });
        };
        return (
            <div>
                <h1>Contacts</h1>
                <input name ="keyword" placeholder="Search" vlaue={this.state.keyword} onChange={this.handleChange}/>
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetalis isSelected={this.state.selectedKey != -1 } contact={this.state.contactData[this.state.selectedKey]}/>
            </div>
        )
    }
}