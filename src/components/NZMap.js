import './nz-map.css'
import { useContext, useState } from "react";
import ImageMapper from 'react-img-mapper';
import { JobsContext } from '../helpers/Context';

export default function NZMap() {
    const { setLocationPopup } = useContext(JobsContext);


    const windowWidth = window.innerWidth;


    const mapWidth = (55 / 100) * windowWidth

    const mapClick = (e) => {
        setLocationPopup({
            show: true,
            city: e.id
        })
    }

    const areas = [
        // These are the co-ordinates of the Labels on the map
        { id: "Taranaki", shape: "rect", coords: [269, 235, 386, 274] },
        { shape: "rect", id: "Nelson", coords: [260, 335, 360, 370], },
        { shape: "rect", id: "Manawatu-Whanganui", coords: [658, 277, 948, 315] },
        { shape: "rect", id: "Auckland", coords: [230, 96, 355, 133] },
        { shape: "rect", id: "Gisborne", coords: [735, 169, 860, 203] },
        { shape: "rect", id: "Hawke's Bay", coords: [721, 227, 890, 260] },
        { shape: "rect", id: "Wellington", coords: [660, 330, 810, 370] },
        { shape: "rect", id: "Marlborough", coords: [580, 370, 750, 410] },
        { shape: "rect", id: "Canterbury", coords: [525, 460, 680, 500] },
        { shape: "rect", id: "Otago", coords: [430, 590, 520, 630] },
        { shape: "rect", id: "West Coast", coords: [115, 430, 270, 470] },
        { shape: "rect", id: "Southland", coords: [0, 607, 142, 645] },
        { shape: "rect", id: "Bay of Plenty", coords: [653, 93, 826, 132] },
        { shape: "rect", id: "Tasman", coords: [150, 370, 250, 410] },
        { shape: "rect", id: "Northland", coords: [586, 24, 720, 62] },
        { shape: "rect", id: "Waikato", coords: [290, 150, 400, 200] },


        // These are the co-ordinates of the regions in the map
        { shape: "rect", id: "Auckland", coords: [468, 101, 527, 138] },
        { shape: "rect", id: "Northland", coords: [410, 3, 498, 90] },
        { shape: "poly", id: "Gisborne", coords: [600, 215, 629, 160, 660, 170, 621, 238] },
        { shape: "poly", id: "Bay of Plenty", coords: [540, 161, 555, 250, 627, 170] },
        { shape: "poly", id: "Canterbury", coords: [300, 520, 350, 560, 445, 437, 416, 414] },
        { shape: "poly", id: "West Coast", coords: [240, 530, 250, 540, 405, 418, 397, 350] },
        { shape: "rect", id: "Wellington", coords: [500, 340, 545, 380] },
        { shape: "rect", id: "Manawatu-Whanganui", coords: [500, 230, 560, 330] },
        { shape: "poly", id: "Marlborough", coords: [417, 406, 430, 425, 477, 390, 464, 342] },
        { shape: "poly", id: "Tasman", coords: [405, 410, 400, 325, 422, 324, 436, 376] },
        { shape: "poly", id: "Nelson", coords: [437, 373, 472, 334, 427, 324] },
        { shape: "poly", id: "Otago", coords: [285, 668, 274, 590, 236, 570, 287, 520, 349, 573] },
        { shape: "poly", id: "Southland", coords: [238, 532, 287, 706, 197, 706, 168, 599] },
        { shape: "poly", id: "Hawke's Bay", coords: [570, 316, 553, 270, 596, 220, 623, 245] },
        { shape: "poly", id: "Waikato", coords: [490, 225, 530, 222, 531, 251, 553, 242, 548, 188, 533, 117, 496, 157] },
        { shape: "poly", id: "Taranaki", coords: [502, 228, 500, 282, 457, 252] },
    ]

    return (
        <>
            <div className=' d-flex justify-content-center'>

                <ImageMapper
                    src="/Nz-map/NZRegionsMapFinalVersion_files/image051.gif"
                    map={{ name: "Nz-Map", areas }}
                    width={mapWidth}
                    imgWidth={948}
                    active={false}
                    onClick={(e) => { mapClick(e) }}
                    alt="New Zealand Map"
                />

            </div>

        </>
    )
} 