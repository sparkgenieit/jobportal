import './display-block-ads.css';
import Tooltip from '../Tooltip';


const AdBlock = () => {
    return (
        <Tooltip tooltipText={"ad"} size={10} >
            <div>
                <img className="ad-block" src="https://via.placeholder.com/300" alt="ad" />
            </div>
        </Tooltip>
    )
}



export default function DisplayAdBlocks() {

    const ads = new Array(500).fill(0);

    return (
        <div className="ad-container">
            <div className='flex flex-wrap'>
                {ads?.map((ad, index) => (
                    <AdBlock key={index} />
                ))
                }
            </div>
        </div>
    )
}