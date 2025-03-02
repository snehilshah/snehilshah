import React, { ComponentPropsWithoutRef } from 'react'

const components = {
  h1: props => <h1 className='font-medium pt-12 mb-0' {...props} />
}

export function useMDXComponents() {
  return components
}
