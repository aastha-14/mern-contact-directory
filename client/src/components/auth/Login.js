import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { userLogin } from '../../actions/auth'
import { setAlert } from '../../actions/alert'
import { withRouter } from 'react-router-dom'

function Login({ userLogin, auth, setAlert, history }) {
    const { isAuthenticated } = auth
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const { email, password } = user

    function handleSubmit(e) {
        e.preventDefault()
        userLogin(user)
        setUser({
            email: '',
            password: ''
        })
    }
    useEffect(() => {
        if (isAuthenticated) {
            history.push('/')
        }
        //eslint-disable-next-line
    }, [isAuthenticated])
    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        required
                        onChange={e => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        required
                        onChange={e => setUser({ ...user, password: e.target.value })}
                    />
                </div>
                <div>
                    <input type='submit' value='Login' className='btn btn-primary btn-block' />
                </div>
            </form>
        </div>
    )
}
const mapStateToProps = ({ auth }) => ({
    auth
})
export default connect(mapStateToProps, { userLogin, setAlert })(withRouter(Login))
