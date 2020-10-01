import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

const NavBar = ({ title, icon, isAuthenticated, user, logout, history }) => {
    const authLinks = (
        <>
            <li>Hello, {user && user.name}</li>
            <li>
                <a href='#!' onClick={() => logout(history)}>
                    <i className='fas fa-sign-out-alt'></i>
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </>
    )
    const guestLinks = (
        <>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </>
    )
    return (
        <div className="navbar bg-primary">
            <h1><i className={icon}></i> {title}</h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

NavBar.defaultProps = {
    title: 'Contact Directory',
    icon: 'fas fa-id-card-alt'
}

const mapStateToProps = ({ auth: { isAuthenticated, user } }) => ({
    isAuthenticated, user
})
export default connect(mapStateToProps, { logout })(withRouter(NavBar))