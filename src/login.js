import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange =this.handleChange.bind(this)
    this.login =this.login.bind(this)
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login(e){
    e.preventDefault();
    axios.post('/api/login', this.state)
      .then((response)=>{
        if(response.data.isSuccesful){
          this.props.history.push('/home')
        }else{
          alert(`A new user has been created with this email and password /n
                Please try logging in again. 
          `)
        }
      })
  }
  
  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <form>
            <input placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} type="text"/>
            <br/>  
            <input placeholder="Password"  name="password" value={this.state.password} onChange={this.handleChange} type="text"/>
            <br/>
          <button type="submit" onClick={this.login}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
