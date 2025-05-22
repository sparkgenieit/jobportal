import './nz-map.css'
import { useEffect, useState } from "react";
import ImageMapper from 'react-img-mapper';
import { setLocation, setInfo } from '../helpers/slices/generalSlice';
import { useDispatch } from 'react-redux';
import http from "../helpers/http";



const handleWidth = () => {
    const windowWidth = window.innerWidth;
    let currentWidth;
    if (windowWidth > 768) {
        currentWidth = Math.round((45 / 100) * windowWidth);
    } else {
        currentWidth = Math.round((90 / 100) * windowWidth);
    }
    return currentWidth > 648 ? 648 : currentWidth;
};

const areas = [
    { id: "Label Taranaki", shape: "rect", coords: [269, 235, 386, 274] },
    { shape: "rect", id: "Label Nelson", coords: [260, 335, 360, 370] },
    { shape: "rect", id: "Label Manawatu-Whanganui", coords: [658, 277, 948, 315] },
    { shape: "rect", id: "Label Auckland", coords: [230, 96, 355, 133] },
    { shape: "rect", id: "Label Gisborne", coords: [735, 169, 860, 203] },
    { shape: "rect", id: "Label Hawke's Bay", coords: [721, 227, 890, 260] },
    { shape: "rect", id: "Label Wellington", coords: [660, 330, 810, 370] },
    { shape: "rect", id: "Label Marlborough", coords: [580, 370, 750, 410] },
    { shape: "rect", id: "Label Canterbury", coords: [525, 460, 680, 500] },
    { shape: "rect", id: "Label Otago", coords: [430, 590, 520, 630] },
    { shape: "rect", id: "Label West Coast", coords: [115, 430, 270, 470] },
    { shape: "rect", id: "Label Southland", coords: [0, 607, 142, 645] },
    { shape: "rect", id: "Label Bay of Plenty", coords: [653, 93, 826, 132] },
    { shape: "rect", id: "Label Tasman", coords: [150, 370, 250, 410] },
    { shape: "rect", id: "Label Northland", coords: [586, 24, 720, 62] },
    { shape: "rect", id: "Label Waikato", coords: [290, 150, 400, 200] },
];

export default function NZMap() {
    const dispatch = useDispatch();
    const [mapWidth] = useState(handleWidth());

    const mapClick = async (e) => {
        const city = e.id.replace("Label", "").trim();
        try {
           const response = await http.get(`/cms/?category=regions&page=${city.toLowerCase()}`);
           console.log('response123',response.data.content);
            dispatch(setInfo(response.data.content));
            dispatch(setLocation({ show: true, city }));
        } catch (error) {
            console.error("API fetch error:", error);
        }
    };

    return (
        <div className='flex justify-center'>
            <ImageMapper
                src="/Nz-map/NZRegionsMapFinalVersion_files/image051.gif"
                map={{ name: "Nz-Map", areas }}
                width={mapWidth}
                imgWidth={948}
                active={false}
                onClick={mapClick}
                alt="New Zealand Map"
            />
        </div>
    );
}