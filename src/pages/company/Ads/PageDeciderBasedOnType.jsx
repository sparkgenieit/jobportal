import React from 'react'
import { useParams } from 'react-router-dom'
import PostAd from './PostAd'
import PostSpecificPageAd from './PostSpecificPageAd'

export default function PageDeciderBasedOnType() {
    const { type } = useParams()
    switch (type) {
        case 'specific-page':
            return <PostSpecificPageAd />
        case 'edit':
            return null
        case 'view':
            return null
        default:
            return <PostAd />
    }
}
