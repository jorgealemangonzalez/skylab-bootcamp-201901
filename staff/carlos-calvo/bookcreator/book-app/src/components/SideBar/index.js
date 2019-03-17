import React, {Component, Fragment} from 'react'
import { Link, withRouter  } from "react-router-dom";
import logic from '../../logic'
import './index.sass'
class SideBar extends Component {

    logoutUser =() => {
        this.props.logoutUser()
    }

    render() {
        return (
            <Fragment>
                        <div class="sidenav">
                            <label for="toggle">&#9776;</label>
                            <input type="checkbox" id="toggle"/>
                            <div class="sidenav__menu">
                                <img width = "30px" height="30px" src="https://www.misskatecuttables.com/uploads/shopping_cart/9363/large_books-on-shelf.png"></img>
                                <Link className="sidenav__text" to="/home/newbook">New Book <i className="fas fa-plus-square"></i></Link>
                                <Link className="sidenav__text" to="/home/yourbooks">Your Books <i className="fas fa-swatchbook"></i></Link>
                                <Link className="sidenav__text" to="/home/templatebooks">Templates <i class="fas fa-hat-wizard"></i></Link>
                                <Link className="sidenav__text" to="/home/profile">Your Profile <i className="far fa-user"></i></Link>
                                <Link className="sidenav__text" to="/home/contact">Contact Us <i className="far fa-envelope"></i></Link>
                                <Link className="sidenav__text" to ="/welcome" onClick={this.logoutUser}> <span>LogOut</span> <i className="fas fa-sign-out-alt"></i></Link>
                        </div>
                    </div>
            </Fragment>
        )
    }
}
export default SideBar;