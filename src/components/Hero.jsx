import BgLight from "./BgLight.jsx";
import NavButton from "./NavButton.jsx";
import PlayButton from "./PlayButton.jsx";

export default function Hero(){
    return (
        <div
            className={'h-[100svh] w-screen flex justify-center items-center text-center flex-col gap-3 pb-16 relative'}>
            <BgLight/>
            <NavButton text={'Login'}/>
            <div
                className={'bg-transparent border-c-orange border-solid border-[1px] w-56 h-8 rounded-md flex items-center justify-start gap-4 pl-2 mb-8 lg:w-80 lg:h-12 lg:pl-6 lg:gap-6'}>
                <div className={'bg-c-orange rounded-full aspect-square w-4'}></div>
                <span className={'text-white lg:text-xl'}>Best memory games!</span>
            </div>
            <span className={'text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl'}>Sharpen Your <font
                className={'text-c-orange'}>Mind</font></span>
            <span className={'text-grayLight md:text-2xl'}>Visual Memory Games!</span>
            <PlayButton hero/>
        </div>
    )
}