import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ContactItem from "./ContactItem";
import { getContacts } from '../../actions/contacts';
import Spinner from '../layouts/Spinner';

function Contacts({ cont, getContacts }) {
    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);

    const { contacts, loading, filtered } = cont;
    if (contacts && !contacts.length && !loading) return <h4>Please add a contact.</h4>;
    return (
        <div>
            {contacts && !loading ? (<>{
                filtered ?
                    filtered.map(filter => <ContactItem key={filter.id} contact={filter} />)
                    :
                    contacts.map(contact => <ContactItem key={contact._id} contact={contact} />)}</>) : <Spinner />}
        </div>
    );
}

const mapStateToProps = ({ contacts }) => ({
    cont: contacts
});
export default connect(mapStateToProps, { getContacts })(Contacts);
