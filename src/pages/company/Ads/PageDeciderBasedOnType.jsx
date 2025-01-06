import React from 'react'
import { useParams } from 'react-router-dom'
import PostAd from './PostAd'

export default function PageDeciderBasedOnType() {
    const { type } = useParams()
    switch (type) {
        case 'post':
            return <PostAd />
        case 'edit':
            return <EditAd />
        case 'view':
            return <ViewAd />
        default:
            return <PostAd />
    }
}
