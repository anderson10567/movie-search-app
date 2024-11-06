import React from 'react'
import { Spin } from 'antd'

import './spinner.css'

const contentStyle = {
  height: '100vh',
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
}

const content = <div style={contentStyle} />

const LoadingSpinner = () => {
  return (
    <div className="loadingspinner-section">
      <Spin tip="Loading" size="large">
        {content}
      </Spin>
    </div>
  )
}

export default LoadingSpinner
