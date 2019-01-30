import React from 'react'
import Feedback from '../Feedback'
import '../Search/index.sass'

class Login extends React.Component {
    state = { email: '', password: ''}

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })
    
    handleFormSubmit = event => {
        event.preventDefault()
        
        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }

    handleOnRegister = event => {
        event.preventDefault()

        const { props: { onToRegister }} = this

        onToRegister()
    }
    
    render() {
        const { handleEmailInput, handlePasswordInput, handleFormSubmit,handleOnRegister, props: { feedback } } = this

        return <section className="container-fluid">
            <form onSubmit={handleFormSubmit} className="col-12">
                <div className="input-group col-12 m-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Email</span>
                </div>
                <input className="form-control rainbow" name="email" type="email" placeholder="something@example.com" onChange={handleEmailInput}></input>
                </div>
                <div className="input-group col-12 m-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Password</span>
            </div>
            <input className="form-control rainbow" name="password" type="password" placeholder="3xampl3" onChange={handlePasswordInput}></input>
            </div>
            <button className="btn btn-primary login__btn" type="submit">Log In</button>
            <button className="ml-2 btn btn-default" onClick={handleOnRegister}>Register</button>

            </form>

            {feedback && <Feedback message={feedback} level=""/>}

            </section>
    }
}

export default Login
