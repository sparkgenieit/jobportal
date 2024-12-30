import styles from './DisplayAds.module.css';
import ToolTip from '../Tooltip';


const AdBlock = () => {
    return (
        <ToolTip tooltipText={"ad"} size={10} >
            <div>
                <img className={styles.adblock} src="https://via.placeholder.com/300" alt="ad" />
            </div>
        </ToolTip>
    )
}



export default function DisplayAdBlocks() {

    const ads = new Array(500).fill(0);

    return (
        <div className={styles.adcontainer}>
            <div className='d-flex flex-wrap'>
                {
                    ads?.map((ad, index) => (
                        <AdBlock key={index} />
                    ))
                }
            </div>
        </div>
    )
}