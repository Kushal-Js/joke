import React, { Component } from 'react'
import axios from 'axios'
import './Joke.css';

export class Joke extends Component {
    constructor() {
        super()
        this.state = {
            jokes: [],
            error: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.firstName = React.createRef();
        this.lastName = React.createRef();
    }

    handleChange = () => {
        let newJoke = '';
        let fName = this.firstName.current.value;
        let lName = this.lastName.current.value;
        if (fName || lName) {
            axios.get('http://api.icndb.com/jokes/random', {
                params: {
                    firstName: fName,
                    lastName: lName
                }
            })
                .then(response => {
                    newJoke = response.data.value.joke;
                    this.setState({
                        error: '',
                        jokes: [...this.state.jokes, newJoke]
                    });
                })
        } else {
            this.setState({
                error: 'PLease enter a name!'
            });
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="text-center header">
                    <h3>Enter full name to get the joke!</h3>
                </div>
                <div className="row">
                    <div className="col-md-3" />
                    <form className="jokeForm col-md-6">
                        <div className="form-row">
                            <label className="label">First Name:</label>
                            <input className="form-control" type="text" ref={this.firstName}></input>
                            <span className="alert-warning">{this.state.error}</span>
                        </div>
                        <div className="form-row">
                            <label className="label">Last Name:</label>
                            <input className="form-control" type="text" ref={this.lastName}></input>
                            <span className="alert-warning">{this.state.error}</span>

                        </div>
                        <div className="form-group jokeBtn">
                            <input className="btn btn-primary" type="button" value="Get Joke" onClick={this.handleChange}></input>
                        </div>
                    </form>
                    <div className="col-md-3" />
                </div>
                <div className="justify-content-center jokeBox">
                    <ul className="row list-group">
                        {this.state.jokes.map((joke, index) => {
                            return <li className="list-group-item listColor" key={index}>{joke}</li>
                        })}
                    </ul>
                </div>

            </div>
        )
    }
}