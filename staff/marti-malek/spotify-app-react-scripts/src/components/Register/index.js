import React from 'react'
import Feedback from '../Feedback'
import '../Search/index.sass'

class Register extends React.Component {
    state = { name: '', surname: '', email: '', password: '', passwordConfirm: ''}

    handleNameInput = event => this.setState({ name: event.target.value })

    handleSurnameInput = event => this.setState({ surname: event.target.value })

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handlePasswordConfirmInput = event => this.setState({ passwordConfirm: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirm }, props: { onRegister }} = this

        onRegister(name, surname, email, password, passwordConfirm)
    }

    handleOnLogin = event => {
        event.preventDefault()

        const { props: { onToLogin }} = this

        onToLogin()
    }

    render() {
        const { handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmInput, handleFormSubmit, handleOnLogin, props: { feedback } } = this

        return <section className="container-fluid">
        <form onSubmit={handleFormSubmit}>
        <div className="input-group col-12 m-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Name</span>
            </div>
            <input className="form-control mr-3 rainbow" name="name" type="text" placeholder="John" onChange={handleNameInput}></input>
        </div>
        <div className="input-group col-12 m-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Surname</span>
            </div>
            <input className="form-control mr-3 rainbow" name="surname" type="text" placeholder="Doe" onChange={handleSurnameInput}></input>
        </div>
        <div className="input-group col-12 m-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Email</span>
            </div>
            <input className="form-control mr-3 rainbow" name="email" type="email" placeholder="something@example.com" onChange={handleEmailInput}></input>
        </div>
        <div className="input-group col-12 m-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Password</span>
            </div>
            <input className="form-control mr-3 rainbow" name="password" type="password" placeholder="3xampl3" onChange={handlePasswordInput}></input>
        </div>
        <div className="input-group col-12 m-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Confirm Password</span>
            </div>
            <input className="form-control mr-3 rainbow" name="confirm" type="password" placeholder="3xampl3" onChange={handlePasswordConfirmInput}></input>
        </div>
        <button className="btn btn-primary login__btn" type="submit">Register</button>
        <button className="ml-2 btn btn-default" onClick={handleOnLogin}>Log In</button>
        </form>
        
        {feedback && <Feedback message={feedback} level=""/>}
        
        </section>
    }
}

export default Register