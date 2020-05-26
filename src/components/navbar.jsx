import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as Constants from './constants/mainConstants';
import * as UrlConst from './constants/urlConstants';
import '../App.css';

//Stateless Functional Component sfc
// const handleClick = event => {
//   event.preventDefault();
//   const { toggled } = toggled();
// };

const NavBar = ({ user, handleToggle, username }) => {
  const [showBox, setShowBox] = React.useState(false);

  const navCollapseToggler = () => {
    setShowBox(!showBox);
  };

  // const authorizeUser =
  //   user.role === Constants.ADMIN ||
  //   user.role === Constants.HR ||
  //   user.role === Constants.SUPERVISOR;
  const mainAccess = user.role === Constants.ADMIN || user.role === Constants.HR;
  return (
    <nav
      className='navbar navbar-expand-lg navbar-light bg-light border-bottom'
      style={{ padding: '0px 16px' }}>
      <Link className='navbar-brand' to='/'>
        EMS
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        onClick={navCollapseToggler}
        aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon' />
      </button>

      <div
        className={showBox ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'}
        id='navbarSupportedContent'>
        <div className='navbar-nav mr-auto'>
          <NavLink
            className='nav-item nav-link active focusable'
            to={UrlConst.EMPLOYEE_DETAIL_URL}>
            Employees
          </NavLink>
          {mainAccess && (
            <React.Fragment>
              <NavLink className='nav-item nav-link active focusable' to='/department-lists'>
                Departments
              </NavLink>
              <NavLink className='nav-item nav-link active focusable' to='/designation-lists'>
                Designations
              </NavLink>
            </React.Fragment>
          )}
          <NavLink className='nav-item nav-link active focusable' to='/calendar'>
            Calendar
          </NavLink>
          {user && (
            <div className='nav-item dropdown focusable'>
              <div
                className='nav-link dropdown-toggle focusable'
                id='navbarDropdownMenuLink'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'>
                Leaves
              </div>
              <div
                className='dropdown-menu focusable'
                aria-labelledby='navbarDropdownMenuLink'>
                {mainAccess && (
                  <NavLink
                    className='dropdown-item focusable'
                    to={UrlConst.LEAVE_TYPE_DETAIL_URL}>
                    Leave Types
                  </NavLink>
                )}
                {mainAccess && (
                  <React.Fragment>
                    <NavLink
                      className='dropdown-item focusable'
                      to={UrlConst.LEAVE_BALANCE_ASSIGN_URL}>
                      Assign Leave Balance
                    </NavLink>
                    <NavLink
                      className='dropdown-item focusable'
                      to={UrlConst.LEAVE_BALANCE_DETAIL_URL}>
                      Employee Leave Balance
                    </NavLink>
                  </React.Fragment>
                )}
                <NavLink className='dropdown-item focusable' to='/leave/applicationdetail'>
                  Employee Appication
                </NavLink>
              </div>
            </div>
          )}

          {!user && (
            <NavLink className='nav-item nav-link' to='/login'>
              Login
            </NavLink>
          )}
        </div>
        {user && (
          <React.Fragment>
            <div className='nav-item dropdown'>
              <div className='nav-item nav-link dropdown-toggle focusable' to='/user-profile'>
                <i className='fa fa-user-circle' aria-hidden='true'></i> {username}
              </div>
              <div
                className='dropdown-menu  focusable'
                aria-labelledby='navbarDropdownMenuLink'>
                <NavLink
                  className='dropdown-item focusable'
                  to={`/user-profile/${user.sub}/user`}>
                  My Profile
                </NavLink>
                <NavLink
                  className='dropdown-item focusable'
                  to={UrlConst.USER_LEAVE_REQUEST_URL}>
                  Apply for Leave
                </NavLink>
                <NavLink className='dropdown-item' to={UrlConst.USER_LEAVE_BALANCE_DETAIL_URL}>
                  My Leave Balance
                </NavLink>
                <NavLink className='dropdown-item' to={UrlConst.USER_LEAVE_APP_DETAIL_URL}>
                  My Leave Applications
                </NavLink>
              </div>
            </div>
            <NavLink className='nav-item nav-link ' to='/logout'>
              Logout
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
