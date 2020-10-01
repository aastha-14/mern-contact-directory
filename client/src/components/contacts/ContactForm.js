import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { addContact, clearContact, updateContact } from '../../actions/contacts'

function ContactForm({ addContact, currentContact, clearContact, updateContact }) {
    useEffect(() => {
        if (currentContact) {
            setContact(currentContact)
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [currentContact])

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })

    const { name, email, phone, type } = contact

    function handleSubmit(e) {
        e.preventDefault()
        if (currentContact) {
            updateContact(contact)

            clearContact()
        } else {
            addContact(contact)
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2 className='text-primary'>{currentContact ? 'Edit Contact' : 'Add Contact'}</h2>
            <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={e => setContact({ ...contact, name: e.target.value })}
            />
            <input
                type='text'
                placeholder='Email'
                name='email'
                value={email}
                onChange={e => setContact({ ...contact, email: e.target.value })}
            />
            <input
                type='text'
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange={e => setContact({ ...contact, phone: e.target.value })}
            />
            <h5>Contact Type</h5>
            <input type='radio' name='type' value='personal' checked={type === 'personal'} onChange={e => setContact({ ...contact, type: e.target.value })}
            />Personal{' '}
            <input type='radio' name='type' value='professional' checked={type === 'professional'} onChange={e => setContact({ ...contact, type: e.target.value })}
            />Professional
            <div>
                <input type='submit' value={currentContact ? 'Update Contact' : 'Add Contact'} className='btn btn-primary btn-block' />
            </div>
            {currentContact && <div>
                <button className='btn btn-white btn-block' onClick={() => clearContact()}>Clear</button>
            </div>}
        </form>
    )
}
const mapStateToProps = (state) => ({
    currentContact: state.contacts.contact,
})
export default connect(mapStateToProps, { addContact, clearContact, updateContact })(ContactForm)
