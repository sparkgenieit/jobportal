import Ads from '../Ads/Ads'
import CategorySpecifyAd from './CategorySpecifyAd'
import { useParams } from 'react-router-dom'


export default function MainContent() {
    const params = useParams()
console.log(params);
    return (
        <div className='grid lg:grid-cols-4'>

            <div className='lg:col-span-3 text-sm'>
                <CategorySpecifyAd page={params.topic} category= {params.name}/>
                <div className='min-h-[70vh] py-6 px-3' >
                    <h1>The Thrill of Bungy Jumping: Conquering Fear, One Leap at a Time</h1>
                    <p>Imagine standing on the edge of a towering bridge, overlooking a breathtaking gorge, with the world stretching out beneath your feet. The wind rushes past, and your heart pounds as you prepare to take a leap of faith. This is bungy jumping—an adrenaline-pumping adventure that’s as much about confronting your fears as it is about the exhilarating freefall.</p>
                    <h2>What is Bungy Jumping?</h2>
                    <p>Bungy jumping (also spelled bungee) is an extreme sport where participants jump from a high structure, such as a bridge, crane, or platform, while connected to a long elastic cord. The cord stretches and recoils, providing a thrilling experience of freefall and rebound. Some jumps even occur from helicopters or hot air balloons, adding an extra layer of excitement.</p>
                    <h3>A Brief History</h3>
                    <p>The origins of bungy jumping can be traced back to the "land diving" ritual of the Vanuatu tribes in the South Pacific. Young men would leap from wooden towers with vines tied to their ankles as a test of bravery. Modern bungy jumping as we know it began in 1979 when members of the Oxford University Dangerous Sports Club conducted the first recorded jump from the Clifton Suspension Bridge in England. The sport gained global attention in 1988 when A.J. Hackett made an iconic jump from the Eiffel Tower, leading to the establishment of commercial bungy jumping ventures worldwide.</p>
                    <h3>The Science Behind the Thrill</h3>
                    <p>The thrill of bungy jumping is rooted in both physics and psychology. The elastic cord absorbs the kinetic energy of the fall, decelerating you smoothly before recoiling. This creates the sensation of weightlessness and controlled freefall, which is both terrifying and exhilarating. Psychologically, bungy jumping triggers a surge of adrenaline, a hormone that heightens your senses and provides an unmatched rush.</p>
                    <h3>Why Do People Bungy Jump?</h3>
                    <ul className='list-disc'>
                        <li>Conquering Fear: For many, bungy jumping is a personal challenge—a way to face and overcome their fears.</li>
                        <li>Adrenaline Rush: The combination of freefall, height, and the unknown provides an unparalleled thrill.</li>
                        <li>Sense of Accomplishment: The leap requires courage and trust, offering a profound sense of achievement once completed.</li>
                        <li>Memorable Experiences: Bungy jumping often takes place in stunning locations, making it an unforgettable adventure.</li>
                    </ul>
                    <h3>Preparing for Your Jump</h3>
                    <p>If you’re considering bungy jumping, here are a few tips to ensure a safe and enjoyable experience:</p>
                    <ul className='list-disc'>
                        <li>Choose a Reputable Operator: Safety is paramount, so select an operator with excellent reviews and safety records.</li>
                        <li>Dress Comfortably: Wear snug-fitting clothes and secure your belongings to avoid losing anything during the jump.</li>
                        <li>Trust the Experts: Listen to the instructions provided by the crew, and don’t hesitate to ask questions.</li>
                        <li>Embrace the Moment: Focus on the experience and try to enjoy the ride. The initial fear is often replaced by exhilaration!</li>
                    </ul>
                    <h2>The Takeaway</h2>
                    <p>Bungy jumping is more than just a daring activity; it’s a journey into the depths of your courage and resilience. Each jump is a reminder that sometimes, the biggest rewards in life come from taking the boldest leaps. Whether you’re an adventure enthusiast or a first-timer looking to push your boundaries, bungy jumping offers an unforgettable experience that will leave you feeling empowered and alive.</p>
                    <h5>So, are you ready to take the plunge?</h5>
                </div>
            </div>


            <div>
                <Ads />
            </div>
        </div>

    )
}
