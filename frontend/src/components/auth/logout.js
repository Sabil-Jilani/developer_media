
import PropTypes from 'prop-types';
import { logout } from '../../action/auth';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const Logout = ({logout})=> {
    const navigate=useNavigate();
    logout(navigate);
}

Logout.propTypes = {
    logout:PropTypes.func.isRequired
}

export default connect(null,{logout})(Logout) 