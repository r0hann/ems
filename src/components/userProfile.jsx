import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import _ from 'lodash';
import Form from './common/form';
import { loadSingleEmployee } from '../redux/actions/employeesActions';
import { loadEmployeeDetail } from '../redux/actions/employeeDetailActions';
import { loadDepartments } from '../redux/actions/departmentsActions';
import { loadDesignations } from '../redux/actions/designationsActions';
import {
  loadEmployeeContact,
  deleteEmployeeContact
} from '../redux/actions/employeeContactActions';
import {
  loadEmployeeDocument,
  deleteEmployeeDocument
} from '../redux/actions/employeeDocumentActions';
import {
  loadEmployeeAccount,
  deleteEmployeeAccount
} from '../redux/actions/employeeAccountActions';
import {
  loadEmployeeIdentity,
  deleteEmployeeIdentity
} from '../redux/actions/employeeIdentityActions';
import {
  loadEmployeeFamily,
  deleteEmployeeFamily
} from '../redux/actions/employeeFamilyActions';
import {
  loadEmployeeInsurance,
  deleteEmployeeInsurance
} from '../redux/actions/employeeInsuranceActions';
import {
  loadEmployeeLanguage,
  deleteEmployeeLanguage
} from '../redux/actions/employeeLanguageActions';
import {
  loadEmployeeQualification,
  deleteEmployeeQualification
} from '../redux/actions/employeeQualificationActions';
import {
  loadEmployeeServices,
  deleteEmployeServices
} from '../redux/actions/employeeServiceActions';
import {
  loadEmployeeServiceDetail,
  deleteEmployeeServiceDetail
} from '../redux/actions/employeeServiceDetailActions';
import { loadEmployeeSkill, deleteEmployeeSkill } from '../redux/actions/employeeSkillActions';
import { loadCountries } from './../redux/actions/countryActions';
import { loadEmployeeRoles } from './../redux/actions/configActions';
import auth from '../services/authService';
import LabelText from './common/labelText';
import columnList from './common/detailColumnList';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from './common/imageAvatar';
import * as UrlConst from './constants/urlConstants';
import { getFullname } from './helper/commonHelper';
import UrlListGroup from './common/UrlListGroup';

const userAuth = auth.getCurrentUser();

class UserProfile extends Form {
  /**
   * @param {selectedDetail with name and id} slectedDetail
   * @param {contain data of respective detail i.e data of all the employeeskills} itemDetail
   * @param {data of selected detail} editItemDetail
   */
  state = {
    error: '',
    editUser: false,
    selectedDetail: {},
    itemDetail: [],
    labelColumnList: [],
    editItemDetail: null,
    userId: null,
    slug: null,
    noAccess: false
  };

  constructor(props) {
    super(props);
    const userId = this.props.match.params.id;
    // if (userId !== userAuth.sub && userAuth.role !== 'admin')
    //   return this.props.history.replace(UrlConst.EMPLOYEE_DETAIL_URL);
  }

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const user = auth.getCurrentUser();
    const userId = this.props.match.params.id;
    const slug = this.props.match.params.slug;
    const noAccess = userId && userAuth.role !== 'admin';
    this.setState({ noAccess });
    this.setState({
      labelColumnList: columnList.userColumn,
      editUser: false,
      userId: userId ? userId : user.sub,
      slug
    });
    // if (userId && userAuth.role !== 'admin')
    //   return this.props.history.replace(UrlConst.EMPLOYEE_DETAIL_URL);
    // else {
    this.getAllTheData(userId ? userId : user.sub);
    this.loadSelectedData(slug);
    // }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidUpdate(prevProps, prevState) {
    const user = auth.getCurrentUser();
    let userId = null;

    const paramId = this.props.match.params.id;
    const prevSlug = prevState.slug;
    const slug = this.props.match.params.slug;
    if (paramId) {
      userId = paramId;
    } else userId = user.sub;

    if (prevState.userId !== userId) {
      this.getAllTheData(userId);
      this.loadSelectedData(slug);
      this.setState({
        userId,
        editUser: false,
        slug
      });
    } else if (prevSlug !== slug) {
      this.loadSelectedData(slug);
      this.setState({
        editUser: false,
        slug
      });
    }
  }

  getAllTheData = userId => {
    try {
      this.props.loadEmployeeRoles();
      this.props.loadCountries();
      this.props.loadDepartments();
      this.props.loadDesignations();
      this.props.loadSingleEmployee(userId);
    } catch (error) {
      throw error;
    }
  };

  loadSelectedData = async columnName => {
    const profileColumns = columnList.profileListColumn;
    const userId = this.props.match.params.id;

    switch (columnName) {
      case profileColumns.user:
        await this.props.loadSingleEmployee(userId);
        break;
      case profileColumns.userdetail:
        await this.props.loadEmployeeDetail(userId);
        break;
      case profileColumns.document:
        await this.props.loadEmployeeDocument(userId);
        break;
      case profileColumns.contact:
        await this.props.loadEmployeeContact(userId);
        break;
      case profileColumns.identity:
        await this.props.loadEmployeeIdentity(userId);
        break;
      case profileColumns.family:
        await this.props.loadEmployeeFamily(userId);
        break;
      case profileColumns.account:
        await this.props.loadEmployeeAccount(userId);
        break;
      case profileColumns.insurance:
        await this.props.loadEmployeeInsurance(userId);
        break;
      case profileColumns.language:
        await this.props.loadEmployeeLanguage(userId);
        break;
      case profileColumns.qualification:
        await this.props.loadEmployeeQualification(userId);
        break;
      case profileColumns.services:
        await this.props.loadEmployeeServices(userId);
        break;
      case profileColumns.servicedetail:
        await this.props.loadEmployeeServiceDetail(userId);
        break;
      case profileColumns.skill:
        await this.props.loadEmployeeSkill(userId);
        break;
      default:
        break;
    }
  };
  deleteSelected = async deleteItem => {
    const profileColumns = columnList.profileListColumn;
    const columnName = this.props.match.params.slug;
    switch (columnName) {
      case profileColumns.document:
        await this.props.deleteEmployeeDocument(deleteItem);
        break;
      case profileColumns.contact:
        await this.props.deleteEmployeeContact(deleteItem);
        break;
      case profileColumns.identity:
        await this.props.deleteEmployeeIdentity(deleteItem);
        break;
      case profileColumns.family:
        await this.props.deleteEmployeeFamily(deleteItem);
        break;
      case profileColumns.account:
        await this.props.deleteEmployeeAccount(deleteItem);
        break;
      case profileColumns.insurance:
        await this.props.deleteEmployeeInsurance(deleteItem);
        break;
      case profileColumns.language:
        await this.props.deleteEmployeeLanguage(deleteItem);
        break;
      case profileColumns.qualification:
        await this.props.deleteEmployeeQualification(deleteItem);
        break;
      case profileColumns.services:
        await this.props.deleteEmployeServices(deleteItem);
        break;
      case profileColumns.servicedetail:
        await this.props.deleteEmployeeServiceDetail(deleteItem);
        break;
      case profileColumns.skill:
        await this.props.deleteEmployeeSkill(deleteItem);
        break;
      default:
        break;
    }
  };

  handleCancelEdit = () => {
    const columnName = this.props.match.params.slug;
    this.loadSelectedData(columnName);
    this.setState({
      editUser: false
    });
    // this.handleDetailSelect(this.state.selectedDetail);
  };

  // handleDetailSelect = selectedItem => {
  //   this.loadSelectedData(selectedItem.name);
  //   this.setState({
  //     selectedDetail: selectedItem,
  //     editItemDetail: {},
  //     editUser: false
  //   });
  // };

  handleAddDetail = () => {
    const slug = this.state.slug;
    slug === 'userdetail'
      ? this.setState({
          editItemDetail: this.props.employeeDetail,
          editUser: true
        })
      : this.setState({
          editItemDetail: {},
          editUser: true
        });
  };

  handleEditItem = item => {
    const editItemDetail = { ...item };

    this.setState({
      editItemDetail,
      editUser: true
    });
  };

  getStyle = itemDetail => {
    return itemDetail.length > 1
      ? {
          borderRadius: '7px',
          margin: '10px',
          background: '#F5F5F5',
          padding: '10px'
        }
      : { padding: '10px', margin: '10px' };
  };

  getSelectedData = () => {
    const slug = this.props.match.params.slug;
    const selectedDetail = columnList.tabColumnList[slug];
    const { propsName, SelectedForm } = selectedDetail;
    const { [propsName]: itemDetail } = this.props;
    const labelColumnList = columnList[selectedDetail.labelColumn];

    return {
      itemDetail,
      selectedDetail,
      labelColumnList,
      SelectedForm,
      propsName
    };
  };

  setLabelText = (itemDetail, selectedDetail, labelColumnList) => {
    const userId = this.props.match.params.id;
    if (itemDetail && itemDetail.length === 0) {
      return <p>N/A</p>;
    } else if (itemDetail) {
      return Array.isArray(itemDetail) ? (
        itemDetail.map(item => (
          <LabelText
            userId={userId}
            onItemClick={this.handleEditItem}
            key={item.id}
            selectedDetail={selectedDetail}
            columns={labelColumnList}
            onDelete={this.deleteSelected}
            unEditable={columnList.unEditableDetailColumn}
            unDeleteable={columnList.unDeleteDetailByUserColumn}
            item={item}
            styled={this.getStyle(itemDetail)}
          />
        ))
      ) : Object.keys(itemDetail).length > 0 ? (
        <LabelText
          userId={userId}
          onItemClick={this.handleEditItem}
          columns={labelColumnList}
          selectedDetail={selectedDetail}
          unEditable={columnList.unEditableDetailColumn}
          unDeleteable={columnList.unDeleteDetailByUserColumn}
          item={itemDetail}
          styled={{ padding: '10px', margin: '10px' }}
        />
      ) : (
        <p>N/A</p>
      );
    }
    return <p>N/A</p>;
  };

  handleTabClick = tabName => {
    this.props.history.push(`/user-profile/${this.state.userId}/${tabName}`);
  };

  render() {
    const { loading, ...rest } = this.props;
    const { editUser, userId, editItemDetail } = this.state;
    const {
      itemDetail,
      selectedDetail,
      labelColumnList,
      SelectedForm,
      propsName
    } = this.getSelectedData();
    // if (this.props.match.params.id && userAuth.role !== 'admin') {
    //   return <Redirect to={UrlConst.EMPLOYEE_DETAIL_URL} />;
    // }
    return (
      <React.Fragment>
        <div className='row justify-content-center'>
          <div
            className='card-list col-2'
            style={{
              marginTop: '1.4rem',
              marginRight: '0',
              paddingLeft: '0'
            }}>
            <UrlListGroup
              style={{
                paddingLeft: '0'
              }}
              userId={userId}
              tabDetailList={columnList.tabColumnList}
              tabList={columnList.profileTabList}
              className='card-list-group'
              valueProperty='name'
              onTabClick={this.handleTabClick}
              textProperty='label'
              selectedItem={selectedDetail}
              // onItemSelect={this.handleDetailSelect}
            />
          </div>
          <div className='card col-7 m-4' style={{ padding: '0' }}>
            <div>
              <ImageAvatar />
            </div>
            <div className='card-header'>
              {!editUser &&
                columnList.unAddDetailColumn.includes(selectedDetail.name) &&
                (!itemDetail || Object.keys(itemDetail).length === 0) && (
                  <button className='btn btn-link pull-right' onClick={this.handleAddDetail}>
                    <i className='fa fa-plus-square fa-lg' aria-hidden='true' />
                  </button>
                )}
              {!editUser && !columnList.unAddDetailColumn.includes(selectedDetail.name) && (
                <button className='btn btn-link pull-right' onClick={this.handleAddDetail}>
                  <i className='fa fa-plus-square fa-lg' aria-hidden='true' />
                </button>
              )}
              {/* <h6 className='pull-right'>Height</h6> */}
              <Typography component='h1' variant='h5'>
                Employee Profile
              </Typography>
            </div>
            <div className='card-body row'>
              <div className='col'>
                {!editUser && this.setLabelText(itemDetail, selectedDetail, labelColumnList)}
                {editUser && (
                  <SelectedForm
                    {...rest}
                    userId={userId}
                    propsName={propsName}
                    editItemDetail={editItemDetail}
                    onCancelEdit={this.handleCancelEdit}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const getName = (options, service, name) => {
  if (service.detail)
    options.find(option => {
      if (service.detail && option.id === service[name]) {
        return service[name].name;
      } else return '';
    });
};

const getDataName = (options, service, name) => {
  let data = {};
  if (service && Object.keys(service.length > 0))
    data = options.find(option => {
      if (option.id === service[name]) {
        return option.name;
      } else return '';
    });
  return data && Object.keys(data).length > 0 ? data.name : '';
};

const getEmployeeDetails = (departments, designations, detail, countries) => {
  let employeeDetail = {};
  if (Object.keys(detail).length > 0) {
    const genderData = columnList.genderColumn.find(gender => gender.id === detail.gender);
    const bloodData = columnList.bloodColumn.find(blood => blood.id === detail.blood_group);
    const branchData = columnList.branchColumn.find(branch => branch.id === detail.branch);
    employeeDetail = {
      ...detail,
      fullname: detail ? getFullname(detail) : '',
      supervisor_name: detail.supervisor ? getFullname(detail.supervisor.detail) : '',
      gender_name: genderData ? genderData.name : '',
      blood_group_name: bloodData ? bloodData.name : '',
      branch_name: branchData ? branchData.name : '',
      departmentName: getDataName(departments, detail, 'department'),
      designationName: getDataName(designations, detail, 'designation'),
      countryName: getDataName(countries, detail, 'country'),
      nationalityName: getDataName(countries, detail, 'nationality')
    };
  }
  return employeeDetail;
};

const languageData = languages => {
  const rating = columnList.languageRating;
  return languages
    ? languages.map(lang => {
        const speak = rating.find(rate => rate.id == lang.speaking).label;
        const read = rating.find(rate => rate.id == lang.reading).label;
        const write = rating.find(rate => rate.id == lang.writing).label;
        return { ...lang, speak, read, write };
      })
    : null;
};

function mapStateToProps(state) {
  return {
    countries: state.countries,
    departments: state.departments,
    designations: state.designations,
    loading: state.apiCallInProgress > 0,
    employeeDocument: state.employeeDocument,
    employeeContact: state.employeeContact,
    employeeAccount: state.employeeAccount,
    employeeIdentity: state.employeeIdentity,
    employeeFamily: state.employeeFamily,
    employeeInsurance: state.employeeInsurance,
    employeeLanguage: languageData(state.employeeLanguage),
    employeeQualification: state.employeeQualification,

    employeeServices: Array.isArray(state.employeeServices)
      ? state.employeeServices.map(empService => {
          return {
            ...empService,
            departmentName: getName(state.departments, empService, 'department'),
            designationName: getName(state.designations, empService, 'designation')
          };
        })
      : null,
    employeeServiceDetail: Array.isArray(state.employeeServiceDetail)
      ? state.employeeServiceDetail.map(empServiceDetail => {
          return {
            ...empServiceDetail,
            departmentName: getName(state.departments, empServiceDetail, 'department'),
            designationName: getName(state.designations, empServiceDetail, 'designation')
          };
        })
      : null,
    employeeSkill: state.employeeSkill,

    employee:
      state.employee && Object.keys(state.employee).length > 0
        ? {
            ...state.employee,
            fullname: state.employee.detail ? getFullname(state.employee.detail) : '',
            departmentName: getName(state.departments, state.employee, 'department'),
            designationName: getName(state.designations, state.employee, 'designation')
          }
        : {},

    employeeDetail:
      state.employeeDetail &&
      getEmployeeDetails(
        state.departments,
        state.designations,
        state.employeeDetail,
        state.countries
      )
  };
}

const mapDispatchToProps = {
  loadSingleEmployee,
  loadEmployeeDocument,
  loadEmployeeContact,
  loadEmployeeDetail,
  loadEmployeeIdentity,
  loadEmployeeAccount,
  loadEmployeeFamily,
  loadEmployeeInsurance,
  loadEmployeeLanguage,
  loadEmployeeQualification,
  loadEmployeeServices,
  loadEmployeeServiceDetail,
  loadEmployeeSkill,
  loadDepartments,
  loadDesignations,
  loadCountries,
  loadEmployeeRoles,
  deleteEmployeeContact,
  deleteEmployeeDocument,
  deleteEmployeeAccount,
  deleteEmployeeIdentity,
  deleteEmployeeFamily,
  deleteEmployeeInsurance,
  deleteEmployeeLanguage,
  deleteEmployeeQualification,
  deleteEmployeServices,
  deleteEmployeeServiceDetail,
  deleteEmployeeSkill
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
