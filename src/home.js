import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: ''
    }
    this.getUserEmail = this.getUserEmail.bind(this);
  }
  
  getUserEmail(){
    axios.get(`/api/getUserEmail`)
      .then((response)=>{
        if(response.data.isLoggedin){
          this.setState({
            email:response.data.email
          })
        }else{
          this.props.history.push('/')
        }

      })
  }

  render() {
    return (
      <div className="App">
            <h1>You are logged in</h1>
            <h5>{this.state.email}</h5>
            <button onClick={this.getUserEmail}>Get User Email</button>
      </div>
    );
  }
}

export default App;
