import React from 'react'
import { connect } from 'react-redux'

function Alerts({ alert }) {
    return (
        <div>
            {
                alert.length > 0 &&
                alert.map(a => <div key={a.id} className={`alert alert-${a.type}`}>
                    <i className='fas.fa-info-circle'></i>{a.msg}
                </div>)}

        </div>
    )
}

const mapStateToProps = ({ alert }) => ({
    alert
})
export default connect(mapStateToProps)(Alerts)
