import React from 'react'
import { connect } from "react-redux"
import { deleteContact, clearContact, setCurrentContact } from "../../actions/contacts"

const ContactItem = ({ contact, clearContact, deleteContact, setCurrentContact }) => {
    const { _id, name, email, phone, type } = contact

    function handleDelete() {
        deleteContact(_id)
        clearContact()
    }
    return (
        <div className="card bg-light">
            <h3 className='text-primary text-left'>
                {name}{' '}
                <span style={{ float: 'right' }}
                    className={
                        'badge ' +
                        (type === 'professional' ? 'badge-success' : 'badge-primary')
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {email && (<li><i className='fa fa-envelope-open'></i>{email}</li>)}
                {phone && (<li><i className='fa fa-phone'></i>{phone}</li>)}
            </ul>
            <p
                className='btn btn-dark btn-sm'
                onClick={() => setCurrentContact(contact)}
            >Edit
            </p>
            <p className='btn btn-danger btn-sm' onClick={handleDelete}>Delete</p>

        </div>
    )
}

export default connect(null, { deleteContact, clearContact, setCurrentContact })(ContactItem)