import React from 'react'
import { Alert } from 'antd'

const AlertError = () => {
  return (
    <div>
      <Alert
        message="Oops! :("
        description="Something unexpectable happens. Check your internet connection or try again later!"
        type="warning"
      />
    </div>
  )
}

export default AlertError
