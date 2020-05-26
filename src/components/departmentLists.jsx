import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  loadDepartments,
  deleteDepartment
} from '../redux/actions/departmentsActions';
import ListGroup from './common/listGroup';
import AlertDialog from './common/alertDialog';
import auth from '../services/authService';
import DepartmentForm from './departmentForm';
import * as UrlConst from './constants/urlConstants';

class DepartmentLists extends Component {
  state = {
    pageSize: 10,
    currentPage: 1,
    selectedDepartment: null,
    dialogOpen: true,
    editDepartment: false
  };

  userAuth = auth.getCurrentUser();

  componentDidMount() {
    this.props.loadDepartments();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.departments.length > 0 &&
      this.props.departments !== prevProps.departments
    ) {
      this.initiateDepartment();
    }
  }

  initiateDepartment = () => {
    const { departments } = this.props;
    const { selectedDepartment } = this.state;
    if (!selectedDepartment)
      this.setState({
        selectedDepartment: departments[0],
        editDepartment: false
      });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1
    });
  };

  handleDelete = async () => {
    const { deleteDepartment } = this.props;
    try {
      await deleteDepartment(this.state.selectedDepartment);
      this.setState({
        selectedDepartment: this.props.departments[0],
        editDepartment: false
      });
    } catch (error) {}
  };

  handleEdit = () => {
    this.setState({ editDepartment: true });
  };

  handleCancel = () => {
    this.handleDepartmentSelect(this.state.selectedDepartment);
    this.setState({ editDepartment: false });
  };

  handleDepartmentSelect = department => {
    const filterDepartment = this.props.departments.filter(
      d => d.id === department.id
    );
    this.setState({ selectedDepartment: filterDepartment[0] });
  };

  render() {
    if (auth.getCurrentUser().role !== 'admin')
      return <Redirect to={UrlConst.EMPLOYEE_DETAIL_URL} />;
    const { departments, loading, ...rest } = this.props;
    const { selectedDepartment, editDepartment } = this.state;
    return (
      <React.Fragment>
        {!loading && (
          <div>
            <h2>Department Lists</h2>

            <div className='row'>
              <div className='col-3 card-list'>
                <ListGroup
                  style={{
                    maxHeight: 'calc(100vh - 150px)',
                    overflowY: 'auto'
                  }}
                  className='card-list-group'
                  items={departments}
                  selectedItem={selectedDepartment}
                  onItemSelect={this.handleDepartmentSelect}
                />
              </div>
              <div className='col'>
                <div className='row'>
                  <h4 className='col-2'>Detail</h4>
                  {selectedDepartment && (
                    <div className='col'>
                      <div className='pull-right m-2'>
                        <AlertDialog
                          iconType='delete'
                          label='Delete Department'
                          labelText={`Delete ${selectedDepartment.name}.Are you sure?`}
                          onAction={this.handleDelete}
                        />
                      </div>
                      <button
                        className='btn btn-outline-primary btn-sm m-2 pull-right'
                        onClick={this.handleEdit}>
                        <i
                          className='fa fa-pencil-square-o fa-lg'
                          aria-hidden='true'
                        />
                      </button>
                      <Link
                        className='btn btn-primary btn-sm m-2 pull-right'
                        to='/department/new'>
                        Add Department
                      </Link>
                    </div>
                  )}
                </div>
                <div className='card'>
                  <div className='card-body'>
                    {!editDepartment && (
                      <p style={{ fontSize: '15px' }}>
                        {selectedDepartment ? selectedDepartment.detail : ''}
                      </p>
                    )}
                    {editDepartment && selectedDepartment && (
                      <DepartmentForm
                        department={selectedDepartment}
                        onCancelEdit={this.handleCancel}
                        {...rest}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

DepartmentLists.propTypes = {
  deleteDepartment: PropTypes.func.isRequired,
  loadDepartments: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    departments: state.departments,
    loading: state.apiCallInProgress > 0
  };
}

const mapDispatchToProps = {
  loadDepartments,
  deleteDepartment
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentLists);
