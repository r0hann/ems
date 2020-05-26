import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSingleEmployee } from '../redux/actions/employeesActions';
import { loadEmployeeDetail } from '../redux/actions/employeeDetailActions';
import { loadEmployeeContact } from '../redux/actions/employeeContactActions';
import { loadDepartments } from '../redux/actions/departmentsActions';
import { loadDesignations } from '../redux/actions/designationsActions';
// import { loadDesignations } from '../redux/actions/identity';
// import { loadDesignations } from '../redux/actions/designationsActions';
// import { loadDesignations } from '../redux/actions/designationsActions';
// import { loadDesignations } from '../redux/actions/designationsActions';
// import { loadDesignations } from '../redux/actions/designationsActions';
// import { loadDesignations } from '../redux/actions/designationsActions';
// import { loadDesignations } from '../redux/actions/designationsActions';
// import auth from '../services/authService';
import UserDetailForm from './userDetailForm';
import ListGroup from './common/listGroup';
import columnList from './common/detailColumnList';
import DocumentForm from './documentForm';
import EmployeeContactForm from './employeeContactForm';
import EmployeeIdentityForm from './employeeIdentityForm';
import EmployeeFamilyForm from './employeeFamilyForm';
import EmployeeAccountForm from './employeeAccountForm';
import EmployeeInsuranceForm from './employeeInsuranceForm';
import EmployeeLanguageForm from './employeeLanguageForm';
import EmployeeQualificationForm from './employeeQualificationForm';
import EmployeeServiceForm from './employeeeServiceFrom';
import EmployeeServiceDetailForm from './employeeServiceDetailForm';
import EmployeeSkillForm from './employeeSkillForm';

class EditDetailByAdmin extends Component {
  state = { editUser: false, selectedDetail: {}, userId: null };

  async componentDidMount() {
    const userId = this.props.match.params.id;
    // const {
    //   loadSingleEmployee,
    //   loadEmployeeContact,
    //   loadEmployeeDetail,
    //   loadDepartments,
    //   loadDesignations
    // } = this.props;
    // try {
    //   await loadDepartments();
    //   await loadDesignations();
    //   await loadSingleEmployee(userId);
    //   await loadEmployeeContact(userId);
    //   await loadEmployeeDetail(userId);
    // } catch (error) {
    // }
    this.setState({ selectedDetail: columnList.tabColumnList[0], userId });
  }

  handleEditUser = () => {
    this.setState({ editUser: true });
  };

  handleCancelEdit = () => {
    this.setState({ editUser: false });
  };

  handleDetailSelect = selectedItem => {
    this.setState({ selectedDetail: selectedItem });
  };

  render() {
    const { employeeDetail, departments, designations, loading } = this.props;
    const { selectedDetail, userId } = this.state;
    return (
      <React.Fragment>
        {!loading && (
          <div className='row justify-content-center'>
            <div className='card col-8 m-4' style={{ padding: '0px' }}>
              <div className='card-header'>
                <h4>Employee Details</h4>
              </div>
              <div className='card-body row'>
                <div
                  className='col-3 card-list'
                  style={{
                    paddingLeft: '0'
                  }}>
                  <ListGroup
                    style={{
                      paddingLeft: '0'
                    }}
                    className='card-list-group'
                    items={columnList.tabColumnList}
                    valueProperty='name'
                    textProperty='label'
                    selectedItem={selectedDetail}
                    onItemSelect={this.handleDetailSelect}
                  />
                </div>
                <div className='col'>
                  {selectedDetail.name === 'userdetail' && (
                    <UserDetailForm
                      onCancelEdit={this.handleCancelEdit}
                      employeeDetail={employeeDetail}
                      departments={departments}
                      designations={designations}
                    />
                  )}

                  {selectedDetail.name === 'document' && (
                    <DocumentForm userId={userId}></DocumentForm>
                  )}
                  {selectedDetail.name === 'contact' && (
                    <EmployeeContactForm userId={userId}></EmployeeContactForm>
                  )}
                  {selectedDetail.name === 'identity' && (
                    <EmployeeIdentityForm
                      userId={userId}></EmployeeIdentityForm>
                  )}
                  {selectedDetail.name === 'family' && (
                    <EmployeeFamilyForm userId={userId}></EmployeeFamilyForm>
                  )}
                  {selectedDetail.name === 'insurance' && (
                    <EmployeeInsuranceForm
                      userId={userId}></EmployeeInsuranceForm>
                  )}
                  {selectedDetail.name === 'account' && (
                    <EmployeeAccountForm userId={userId}></EmployeeAccountForm>
                  )}
                  {selectedDetail.name === 'language' && (
                    <EmployeeLanguageForm
                      userId={userId}></EmployeeLanguageForm>
                  )}
                  {selectedDetail.name === 'qualification' && (
                    <EmployeeQualificationForm
                      userId={userId}></EmployeeQualificationForm>
                  )}
                  {selectedDetail.name === 'service' && (
                    <EmployeeServiceForm userId={userId}></EmployeeServiceForm>
                  )}
                  {selectedDetail.name === 'servicedetail' && (
                    <EmployeeServiceDetailForm
                      userId={userId}></EmployeeServiceDetailForm>
                  )}
                  {selectedDetail.name === 'skill' && (
                    <EmployeeSkillForm userId={userId}></EmployeeSkillForm>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const getFullname = user => {
  const { salutation, fname, mname, lname } = user;
  let fullname = [fname, mname, lname].filter(x => x !== '').join(' ');
  if (salutation) fullname = salutation + '.' + fullname;
  return fullname;
};

function mapStateToProps(state) {
  return {
    departments: state.departments,
    designations: state.designations,
    loading: state.apiCallInProgress > 0,
    employeeDetail: state.employeeDetail,
    employeeContact: state.employeeContact,

    employee: state.employee
      ? {
          ...state.employee,
          fullname: state.employee.detail
            ? getFullname(state.employee.detail)
            : '',
          departmentName: state.employee.detail
            ? state.departments.find(
                d => d.id === state.employee.detail.department
              ).name
            : '',
          designationName: state.employee.detail
            ? state.designations.find(
                d => d.id === state.employee.detail.designation
              ).name
            : ''
        }
      : {}
  };
}

const mapDispatchToProps = {
  loadSingleEmployee,
  loadEmployeeContact,
  loadEmployeeDetail,
  loadDepartments,
  loadDesignations
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDetailByAdmin);
