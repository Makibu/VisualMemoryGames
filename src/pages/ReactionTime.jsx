import NavButton from "../components/NavButton.jsx";
import BgLight from "../components/BgLight.jsx";
import {useRef, useState} from "react";

export default function ReactionTime(){
    const [isStarted, setIsStarted] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isFallstart, setIsFallstart] = useState(false)
    
    const [isGreen, setIsGreen] = useState(false)
    const [startTime, setStartTime] = useState()
    const [userTime, setUserTime] = useState()
    const timeRef = useRef()
    
    if (!localStorage.getItem('ReactionTime')){
        localStorage.setItem('ReactionTime', '0')
    }
    
    let highScore = 0
    if (localStorage.getItem('ReactionTime')){
        highScore = +localStorage.getItem('ReactionTime')
    }
    if ((highScore > userTime) && highScore !== 0){
        localStorage.setItem('ReactionTime', `${userTime}`)
    }
    if (highScore === 0 && userTime){
        localStorage.setItem('ReactionTime', `${userTime}`)
    }
    
    function handleButtonActions(){
        setIsSubmitted(false)
        setIsStarted(true)
        setIsFallstart(false)
        timeRef.current = setTimeout(() => {
            setIsGreen(true)
            setStartTime(performance.now())
        }, Math.random() * 3000 + 1000)
    }
    
    function handleTimeCheck(){
        const endTime = performance.now()
        const timeInMs = endTime - startTime
        console.log(timeInMs)
        setUserTime(Math.floor(timeInMs))
        setIsStarted(false)
        setIsSubmitted(true)
        setIsGreen(false)
    }
    
    function handleFallStart(){
        setIsFallstart(true)
        setIsStarted(false)
        setIsSubmitted(true)
        setIsGreen(false)
        clearTimeout(timeRef.current)
    }
    
    
    function handleStartGame(){
        setIsStarted(true)
        handleButtonActions()
    }
    
    return (
        <div
            className={'bg-black h-[100svh] w-screen full-flex font-anonPro relative'}>
            <NavButton text={'Home'}/>
            
            {/*Initial state*/}
            {(!isStarted && !isSubmitted) &&
                <div onClick={handleStartGame}
                     className={'text-c-orange w-[80%] h-[80%] flex items-center justify-center text-xl md:text-3xl xl:text-4xl'}>
                    Click Anywhere to Start...
                </div>
            }
            
            {/*After Click State*/}
            {(!isStarted && isSubmitted) &&
                <div onClick={handleStartGame}
                     className={'text-c-orange w-[80%] h-[80%] flex items-center justify-center text-xl md:text-3xl xl:text-4xl'}>
                    {isFallstart && (
                        <div className={'absolute bottom-4 w-[80%] h-[90%] full-flex flex-col'}>
                            <span className={'text-lg md:text-2xl lg:text-3xl xl:text-5xl'}>
                                You clicked to fast...
                            </span>
                            <span
                                className={'text-gray-500 text-sm md:text-lg lg:text-xl xl:text-3xl'}>
                                Click anywhere to restart!
                            </span>
                        </div>
                    )}
                    {!isFallstart && (
                        <div className={'absolute bottom-4 w-[80%] h-[90%] full-flex flex-col'}>
                            <span
                                className={'text-lg md:text-xl lg:text-2xl xl:text-5xl'}>
                                Your reaction time is: {userTime}ms!
                            </span>
                            <span
                                className={'text-gray-500 text-sm md:text-lg lg:text-xl xl:text-3xl'}>
                                Click anywhere to restart.
                            </span>
                        </div>
                    )}
                </div>
            }
            
            {/*Ingame state*/}
            {isStarted && (
                <div
                    className={'absolute bottom-4 w-[80%] h-[90%] full-flex flex-col'}>
                    <div className={'w-[50%] h-[30%] relative'}>
                        <div
                            className={`rounded-3xl w-full h-full shadow-orangeNeon ${isGreen ? 'bg-lime-400' : 'bg-red-400'}`}
                            onClick={isGreen ? handleTimeCheck : handleFallStart}></div>
                    </div>
                </div>
            )}
            <span
                className={'text-gray-500 absolute bottom-0 text-md md:text-lg lg:text-xl '}>Your Best Time Ever: {highScore.toString().padStart(3, '0')}ms</span>
            <BgLight className={'absolute left-[50%] translate-x-[-50%] bottom-0'}/>
        </div>
    )
}