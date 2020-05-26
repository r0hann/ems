import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import ListGroup from './common/listGroup';
import AlertDialog from './common/alertDialog';
import {
  loadDesignations,
  deleteDesignation
} from './../redux/actions/designationsActions';
import auth from '../services/authService';
import DesignationForm from './designationForm';
import * as UrlConst from './constants/urlConstants';

class DesignationLists extends Component {
  state = {
    pageSize: 10,
    currentPage: 1,
    selectedDesignation: null,
    editDesignation: false
  };

  componentDidMount() {
    this.props.loadDesignations();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.designations.length > 0 &&
      this.props.designations !== prevProps.designations
    ) {
      this.initiateDesignation();
    }
  }

  initiateDesignation = () => {
    const { designations } = this.props;

    const { selectedDesignation } = this.state;
    if (!selectedDesignation)
      this.setState({
        selectedDesignation: designations[0],
        editDesignation: false
      });
  };

  handleDesignationSelect = designation => {
    const filterDesignation = this.props.designations.filter(
      d => d.id === designation.id
    );
    this.setState({
      selectedDesignation: filterDesignation[0]
    });
  };

  handleEdit = () => {
    this.setState({ editDesignation: true });
  };

  handleCancel = () => {
    this.handleDesignationSelect(this.state.selectedDesignation);
    this.setState({ editDesignation: false });
  };

  handleDelete = async () => {
    const { deleteDesignation } = this.props;
    try {
      await deleteDesignation(this.state.selectedDesignation);
      this.setState({
        selectedDesignation: this.props.designations[0],
        editDesignation: false
      });
    } catch (error) {}
  };

  render() {
    if (auth.getCurrentUser().role !== 'admin')
      return <Redirect to={UrlConst.EMPLOYEE_DETAIL_URL} />;

    const { designations, loading, ...rest } = this.props;
    const { selectedDesignation, editDesignation } = this.state;
    return (
      <React.Fragment>
        {!loading && !designations && (
          <div>
            <p>error</p>
          </div>
        )}
        {!loading && designations.length > 0 && (
          <div>
            <h2>Designation Lists</h2>
            <div className='row'>
              <div className='col-3 card-list'>
                <ListGroup
                  style={{
                    maxHeight: 'calc(100vh - 150px)',
                    overflowY: 'auto'
                  }}
                  className='card-list-group'
                  items={designations}
                  selectedItem={selectedDesignation}
                  onItemSelect={this.handleDesignationSelect}
                />
              </div>
              <div className='col'>
                <div className='row'>
                  <h4 className='col-2'>Detail</h4>
                  <div className='col'>
                    {/* <button
                      className='btn btn-danger btn-sm m-2 pull-right'
                      onClick={this.renderAlertDialog}>
                      Delete
                    </button> */}

                    {selectedDesignation && (
                      <div>
                        <div className='pull-right m-2'>
                          <AlertDialog
                            iconType='delete'
                            label='Delete Designation'
                            labelText={`Delete ${selectedDesignation.name}.Are you sure?`}
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
                          to='/designation/new'>
                          Add Designation
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className='card'>
                  <div className='card-body'>
                    {!editDesignation && (
                      <p style={{ fontSize: '15px' }}>
                        {selectedDesignation ? selectedDesignation.detail : ''}
                      </p>
                    )}
                    {editDesignation && selectedDesignation && (
                      <DesignationForm
                        selectedDesignation={selectedDesignation}
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

DesignationLists.propTypes = {
  loadDesignations: PropTypes.func.isRequired,
  deleteDesignation: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    designations: state.designations,
    loading: state.apiCallInProgress > 0
  };
}

const mapDispatchToProps = {
  loadDesignations,
  deleteDesignation
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignationLists);
