import React from 'react'
import { Input } from 'antd'
import debounce from 'lodash.debounce'
import './searchbar.css'
import PropTypes from 'prop-types';


class SearchBar extends React.Component {
    handleChange = debounce((event) => {
        const { onChange } = this.props
        onChange(event.target.value)
    }, 800)

    render() {
        return <Input className="input" placeholder="Type to search..." size="large" onChange={this.handleChange} />
    }
}
SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
};


export default SearchBar
