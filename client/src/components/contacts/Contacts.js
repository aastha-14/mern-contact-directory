import React from 'react'
import { connect } from 'react-redux'
import ContactItem from "./ContactItem"

function Contacts({ contacts }) {
    const filtered = contacts.filtered
    if (!contacts.contacts.length) return <h4>Please add a contact.</h4>

    return (
        <div>
            {filtered ?
                filtered.map(filter => <ContactItem key={filter.id} contact={filter} />)
                :
                contacts.contacts.map(contact => <ContactItem key={contact.id} contact={contact} />)}
        </div>
    )
}

const mapStateToProps = ({ contacts }) => ({
    contacts
})
export default connect(mapStateToProps)(Contacts)
