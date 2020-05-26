import React, { Component } from 'react';
import { connect } from 'react-redux';
// import _ from 'lodash';
import {
  loadEmployeeStatus,
  loadEmployeeRoles,
  loadAccessLinks,
  loadFiscalYears
} from './../redux/actions/configActions';
// import { paginate } from './../utils/paginate';
import ListGroup from './common/listGroup';
import columnList from './column.detail/configColumnDetail';
import MaterialTableS from './common/materialTableS';
import auth from './../services/authService';

class ConfigDetail extends Component {
  isAdmin = false;
  state = {};

  constructor(props) {
    super(props);
    const userAuth = auth.getCurrentUser();
    this.state = {
      configDetails: [],
      selectedItem: {},
      sortColumn: { path: 'id', order: 'asc' }
    };
    this.isAdmin = userAuth.role === 'admin';
  }

  componentDidMount() {
    this.props.loadEmployeeStatus();
    this.props.loadEmployeeRoles();
    this.props.loadAccessLinks();
    this.props.loadFiscalYears();
    this.setState({ selectedItem: columnList.tabsColumnList[0] });
  }

  //   handleDelete = async calendar => {
  //     await this.props.deleteCalendar(calendar);
  //   };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  pageDetail = {
    currentPage: 1,
    pageSize: 15
  };

  handleItemSelect = selectedItem => {
    const { labelColumn } = selectedItem;
    this.setState({
      selectedItem,
      sortColumn: columnList[labelColumn]
    });
  };

  getDetailData = () => {
    const { selectedItem, sortColumn } = this.state;
    const { labelColumn, propsName } = selectedItem;
    const { [propsName]: itemDetails } = this.props;
    const columnDetail = columnList[labelColumn];
    return {
      itemDetails,
      sortColumn,
      selectedItem,
      columnDetail
    };
  };

  render() {
    // const { selectedItem, configDetails, sortColumn } = this.state;
    const { itemDetails, selectedItem, columnDetail } = this.getDetailData();
    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-5'>
            <h2>Config Detail</h2>
          </div>

          {/* <div className='col'>
            {userAuth && (
              <Link className='btn btn-primary btn-sm m-2 pull-right' to='/calendar/new'>
                Add Holiday
              </Link>
            )}
          </div> */}
        </div>
        <div className='row'>
          <div className='col-3 card-list'>
            <ListGroup
              style={{
                maxHeight: 'calc(100vh - 150px)',
                overflowY: 'auto'
              }}
              valueProperty='name'
              textProperty='label'
              className='card-list-group'
              items={columnList.tabsColumnList}
              selectedItem={selectedItem}
              onItemSelect={this.handleItemSelect}
            />
          </div>
          <div className='col'>
            {itemDetails && itemDetails.length > 0 && (
              <MaterialTableS
                rows={itemDetails}
                columns={columnDetail}
                isAdmin={this.isAdmin}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    empStatuses: state.empStatuses,
    empRoles: state.empRoles,
    accessLinks: state.accessLinks,
    fiscalYears: state.fiscalYears,
    loading: state.apiCallInProgress > 0
  };
}

const mapDispatchToProps = {
  loadEmployeeStatus,
  loadEmployeeRoles,
  loadAccessLinks,
  loadFiscalYears
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigDetail);
