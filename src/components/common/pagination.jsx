import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class Pagination extends Component {
  render() {
    const { itemCount, pageSize, currentPage, onPageClick } = this.props;
    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
      <nav aria-label='Page navigation example' style={{ marginTop: '10px' }}>
        <ul className='pagination'>
          {pages.map(page => (
            <li
              className={currentPage === page ? 'page-item active' : 'page-item'}
              key={page}
              onClick={() => onPageClick(page)}>
              <Link className='page-link' to='#'>
                {page}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired
};

export default Pagination;
