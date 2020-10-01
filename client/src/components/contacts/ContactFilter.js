import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { filterContact, clearFilter } from '../../actions/contacts'

const ContactFilter = ({ filterContact, clearFilter, filtered }) => {
    const text = useRef('')
    useEffect(() => {
        if (!filtered) {
            text.current.value = ''
        }
    })
    const handleChange = (e) => {
        if (text.current.value) { filterContact(e.target.value) } else {
            clearFilter()
        }
    }

    return (
        <div>
            <form>
                <input ref={text} type='text' placeholder='Filter Contacts...' onChange={handleChange} />
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    filtered: state.contacts.filtered
})
export default connect(mapStateToProps, { filterContact, clearFilter })(ContactFilter)
