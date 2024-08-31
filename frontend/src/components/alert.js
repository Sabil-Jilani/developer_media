import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({alert}) =>alert!==null && alert.length>0 && alert.map(data=>{ 
    console.log(alert)
    return<div key={data.id} className={`alert alert-${data.type}`}>
<h5>{data.massge}</h5>
    </div>}

 
)

Alert.propTypes = {
    alert:PropTypes.array.isRequired
}
const mapStateToProps=state=>({
    alert:state.alertReducer
})
export default connect(mapStateToProps)(Alert)