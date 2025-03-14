import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostAd from './PostAd'
import PostSpecificPageAd from './PostSpecificPageAd'

export default function PageDeciderBasedOnType() {
    const { type } = useParams()

    useEffect(() => {
        document.title = "Post Ad"
    }, [])

    switch (type) {
        case 'specific-page':
            return <PostSpecificPageAd  pageType='specific-page'/>
            case 'b2b':
                return <PostSpecificPageAd  pageType='b2b'/>
        case 'edit':
            return null
        case 'view':
            return null
        default:
            return <PostAd pageType={type}/>
    }
}
