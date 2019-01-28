//#region register

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

    render() {
        const { handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmInput, handleFormSubmit } = this

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
        <button className="ml-2 btn btn-default">Log In</button>
        </form></section>
    }
}

//#endregion

//#region login

class Login extends React.Component {
    state = { email: '', password: ''}

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }
    
    render() {
        const { handleEmailInput, handlePasswordInput, handleFormSubmit, props: { feedback } } = this

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
            <button className="ml-2 btn btn-default" >Register</button>

            </form>

            {feedback && <Feedback message={feedback} level=""/>}
            {/* {!this.state.isHidden && <Register />} */}

            </section>
    }
}

//#endregion

function Feedback({ message, level }) {
    return <section className={`col-11 ml-5 m-2 alert alert-danger feedback ${level ? `feedback--${level}` : ''}`}>{message}</section>
}

class App extends React.Component {
    /* constructor() {
        super()
        this.state = {
            isHidden: true
        }
    } */
    state = { loginFeedback: '' }

    /* toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    } */

    handleRegister = (name, surname, email, password, passwordConfirm) => {
        try {
            logic.register(name, surname, email, password, passwordConfirm, user => {
                console.log(user)
            })
        } catch ({message}) {
            console.error(message)
        }
    }

    handleLogin = (email, password) => {
        try {
            logic.login(email, password, user => {
                console.log('You have been successfully registered')

                this.setState({ loginFeedback: '' })
            })
        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }
    }
    
    render() {

        const { state : { loginFeedback }, handleLogin, handleRegister } = this

        return <main className="app">
        <Login onLogin={handleLogin} feedback={loginFeedback}/>
        <Register onRegister={handleRegister}/>
        
        </main>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))