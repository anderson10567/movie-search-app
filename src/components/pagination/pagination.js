import React from 'react'
import { Pagination } from 'antd'
import PropTypes from 'prop-types';

const PaginationList = ({ totalMovies, isSearching, currentPage, getPageSearch, getPageRated }) => {


  const handleChange = (page) => {
    const onChangePage = isSearching ? getPageSearch : getPageRated
    onChangePage(page)
    window.scrollTo(0, 0)
  }

  return (
    <div className="pagination-section">
      <Pagination
        align="center"
        pageSize={20}
        current={currentPage}
        total={totalMovies}
        showSizeChanger={false}
        onChange={handleChange}
      />
    </div>
  )
}
PaginationList.propTypes = {
  totalMovies: PropTypes.number.isRequired,
  isSearching: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  getPageSearch: PropTypes.func.isRequired,
  getPageRated: PropTypes.func.isRequired,
};


export default PaginationList
