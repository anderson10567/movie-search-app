import React from 'react'
import { Tabs } from 'antd'
import './tab.css'
import PropTypes from 'prop-types';

const Tab = ({ getRated, getSearch, setSelectedTab }) => {
    const items = [
        {
            key: '1',
            label: 'Search',
        },
        {
            key: '2',
            label: 'Rated',
        },
    ]

    const onChange = (key) => {
        if (key === '1') {
            getSearch()
            setSelectedTab('Search')
        } else if (key === '2') {
            getRated()
            setSelectedTab('Rated')
        }
    }

    return <Tabs defaultActiveKey="1" items={items} onChange={onChange} centered />
}
Tab.propTypes = {
    getRated: PropTypes.func.isRequired,
    getSearch: PropTypes.func.isRequired,
    setSelectedTab: PropTypes.func.isRequired,
};
export default Tab
