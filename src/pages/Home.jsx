import Hero from "../components/Hero.jsx";
import GameContent from "../components/GameContent.jsx";
import ScoresContent from "../components/ScoresContent.jsx";
import copyrightIcon from "../assets/copyright.svg"

export default function HomePage(){
    return (
        <div
            className={'min-h-screen bg-c-black w-screen font-anonPro relative flex flex-col items-center scroll-smooth'}>
            <Hero/>
            <GameContent/>
            <span className={'text-white text-2xl mt-10 md:text-4xl'}>Your Highest Scores</span>
            <ScoresContent/>
            {/*<NavBar/>*/}
            <span className={'absolute bottom-0 left-0 text-gray-500 flex gap-2'}>Maciej Budzich <img
                src={copyrightIcon}
                alt="copyright"/> 2024</span>
        </div>
    )
}