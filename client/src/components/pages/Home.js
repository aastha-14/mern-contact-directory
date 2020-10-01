import React, { useEffect } from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from "../contacts/ContactFilter"
import { loadUser } from '../../actions/auth'
import { connect } from "react-redux"

const Home = ({ loadUser }) => {
    useEffect(() => {
        loadUser()
    }, [loadUser])

    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default connect(null, { loadUser })(Home)
