'use client'

import { useState } from 'react'

export function blogData() {
  const initialState = {
    posts: [],
    isLoading: false,
    error: null
  }

  const [state, setState] = useState(initialState)
}
