import { Navigate,Outlet } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const privateRoutes = ({isAuthenticated}) => {
  return (
   isAuthenticated ? <Outlet/>:<Navigate to="/login"/>
  )
}

privateRoutes.propTypes={
  isAuthenticated:PropTypes.bool.isRequired
}

const mapStateToPropes=(state)=>({
    isAuthenticated :state.authReducer.isAuthenticated
})
export default connect(mapStateToPropes,null) (privateRoutes)
