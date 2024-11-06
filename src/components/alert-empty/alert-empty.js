import React from 'react'
import { ConfigProvider, Alert } from 'antd'

const AlertEmpty = () => {
  return (
    <div className="alert-empty">
      <ConfigProvider
        theme={{
          components: {
            Alert: {
              defaultPadding: '30px 30px',
            },
          },
        }}
      >
        <Alert type="info" message="Sorry! There is no movie with such name" />
      </ConfigProvider>
    </div>
  )
}

export default AlertEmpty
