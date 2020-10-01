import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/auth'
import { setAlert } from '../../actions/alert'
import { withRouter } from 'react-router-dom'

function Register({ history, registerUser, setAlert, auth: { error, isAuthenticated } }) {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = user
    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            setAlert('Passwords do not match.', 'danger');
        } else {
            registerUser(user)
            setUser({
                name: '',
                email: '',
                password: '',
                password2: ''
            })
        }

    }
    useEffect(() => {
        if (isAuthenticated) {
            history.push('/')
        }

        // eslint-disable-next-line
    }, [isAuthenticated])
    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name='name'
                        value={name}
                        required
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name='email'
                        value={email}
                        required
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name='password'
                        value={password}
                        required
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                        type="password"
                        name='password2'
                        value={password2}
                        required
                        onChange={(e) => setUser({ ...user, password2: e.target.value })}
                    />
                </div>
                <div>
                    <input type='submit' value='Register' className='btn btn-primary btn-block' />
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { registerUser, setAlert })(withRouter(Register))
