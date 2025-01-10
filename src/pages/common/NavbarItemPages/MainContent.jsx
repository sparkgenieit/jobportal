import React from 'react'
import CategorySpecifyAd from './CategorySpecifyAd'
import { useParams } from 'react-router-dom'

export default function MainContent() {
    const params = useParams()


    return (
        <>
            <CategorySpecifyAd />
            <div className='min-h-[70vh]' >MainContent</div>
        </>
    )
}
