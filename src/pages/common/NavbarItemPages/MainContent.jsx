import Ads from '../Ads/Ads'
import { useState, useEffect } from 'react';

import CategorySpecifyAd from './CategorySpecifyAd'
import { useParams } from 'react-router-dom'
import http from "../../../helpers/http";


export default function MainContent() {

    
    const params = useParams()
    const {name,topic} = params;
      const [content, setContent] = useState('');
    console.log(name,topic);
    useEffect(() => {
        const fetchPageContent = async () => {
            try {
              const response = await http.get(`/cms/?category=${name}&page=${topic}`);
              setContent(response?.data?.content || '');
              
            } catch (err) {
              console.error("Error fetching page content:", err);
              setContent('');
              
            }
           
        };
    
        fetchPageContent();
      }, [name, topic]);

    return (
        <div className='grid lg:grid-cols-4'>

            <div className='lg:col-span-3 text-sm'>
                <CategorySpecifyAd page={params.topic} category= {params.name}/>
                <div className='min-h-[70vh] py-6 px-3' >
                {content ? (
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    ) : (
                        <p>Loading Content...</p>
                    )}
                    
                </div>
            </div>


            <div>
                <Ads />
            </div>
        </div>

    )
}
