import { useParams } from "react-router-dom";

function City() {
    const params = useParams()

    const city = params.city


    return (
        <>
            <div className="container-fluid">

                <div className="px-3 py-2">
                    <div className='d-flex justify-content-between my-3'>
                        <h2>{city}</h2>
                        {/* <a type="button" onClick={handleClose}>
                        <span className='border border-dark rounded p-2'><RxCross1 size={"18px"} /></span>
                    </a> */}
                    </div>
                    <div className='d-flex  gap-2 flex-md-row flex-column justify-content-between my-3'>
                        <img style={{ height: "20vh", width: "100%" }} className="rounded" src="https://content.r9cdn.net/rimg/dimg/09/c2/d0aa16e0-city-2575-166c0a657e0.jpg?width=1366&height=768&xhint=1673&yhint=1229&crop=true" />
                        <img style={{ height: "20vh", width: "100%" }} className="rounded" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQptUYv5XAlbkhMn5MjKP2ZaYdJ-XadHrkEENVzISWgyX1cNMs1lmCbsCpny0uo" />
                        <img style={{ height: "20vh", width: "100%" }} className="rounded" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRqDexPvTsSD7a1UZ3TxHRw9bE5nD_ZlZZlZAWAQbfGaE-GEszVIkIvsSE-tx6o" />
                        <img style={{ height: "20vh", width: "100%" }} className="rounded" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRqDexPvTsSD7a1UZ3TxHRw9bE5nD_ZlZZlZAWAQbfGaE-GEszVIkIvsSE-tx6o" />
                        <img style={{ height: "20vh", width: "100%" }} className="rounded" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRqDexPvTsSD7a1UZ3TxHRw9bE5nD_ZlZZlZAWAQbfGaE-GEszVIkIvsSE-tx6o" />
                    </div>
                    <div>
                        <p><strong>Activitiesssss in this region</strong></p>

                        <ul>
                            <li>Sky Tower: Auckland's iconic landmark, offering breathtaking 360-degree views of the city and beyond. You can even do a Sky Walk or a Sky Jump for an adrenaline rush!</li>
                            <li>Auckland Harbour Bridge: Another iconic structure, this bridge is a great spot to walk or cycle for scenic views of the harbor. You can also climb the bridge with AJ Hackett Bungy for a truly unique experience.</li>
                            <li>Waitemata Harbour: The heart of Auckland, this beautiful harbor is home to the Port of Auckland, beaches, and islands. Explore it by ferry, kayak, or yacht. Take a cruise to get a different perspective of the city skyline or head to one of the many islands in the Hauraki Gulf Marine Park for swimming, hiking, and exploring.</li>
                            <li>Museum hopping: Auckland has a number of excellent museums, including the Auckland Museum, which tells the story of Auckland and New Zealand, the Auckland War Memorial Museum, which focuses on military history, and the Kelly Tarlton's Sea Life Aquarium, which is home to a variety of marine life.</li>
                            <li>Exploring nature: Auckland is a great place to get outdoors. Hike or bike ride in the Waitakere Ranges, visit the Auckland Botanic Gardens, or relax on one of the many beaches in the region, like Piha Beach, known for its black sand and great surfing, or Mission Bay, a popular spot for swimming and sunbathing.</li>
                            <li>Wine tasting: Waiheke Island is a short ferry ride from Auckland and is known for its wineries. Spend a day exploring the island, visiting wineries, and sampling some of the best wines in New Zealand.</li>
                        </ul>


                    </div>
                </div>
            </div>
        </>)
}


export default City;