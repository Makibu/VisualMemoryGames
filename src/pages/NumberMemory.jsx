import NavButton from "../components/NavButton.jsx";
import BgLight from "../components/BgLight.jsx";
import {useEffect, useRef, useState} from "react";

export default function NumberMemory(){
    const [isStarted, setIsStarted] = useState(false)
    const [isLost, setIsLost] = useState(false)
    
    const [number, setNumber] = useState(String(Math.floor(Math.random() * 10)))
    const [currentStep, setCurrentStep] = useState(1)
    const [timeLeft, setTimeLeft] = useState(3000)
    // const timeLeft = useRef(3000)
    
    const intervalId = useRef()
    
    function generateNewNumber(){
        let array = []
        for (let i = 0; i < currentStep; i++){
            array.push(Math.floor(Math.random() * 10))
        }
        setNumber(array.join(''))
    }
    
    function handleStartTimer(){
        if (intervalId.current){
            clearInterval(intervalId.current);
        }
        setTimeLeft(3000);
        intervalId.current = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                if (prevTimeLeft <= 1000){
                    clearInterval(intervalId.current);
                    intervalId.current = null;
                    setIsLost(true);
                    setIsStarted(false);
                    return 0;
                }
                return prevTimeLeft - 1000;
            });
        }, 1000)
    }
    
    function handleStartGame(){
        setIsStarted(true);
        setIsLost(false);
        setCurrentStep(1);
        generateNewNumber();
        handleStartTimer();
    }
    
    useEffect(() => {
        return () => {
            if (intervalId.current){
                clearInterval(intervalId.current);
            }
        };
    }, []);
    
    return (
        <div className={'bg-black h-[100svh] w-screen flex justify-center items-center font-anonPro relative'}>
            <NavButton text={'Home'}/>
            {(!isStarted && !isLost) &&
                <div onClick={handleStartGame}
                     className={'text-c-orange w-[80%] h-[80%] flex items-center justify-center text-xl md:text-3xl xl:text-4xl'}>Click
                    Anywhere to
                    Start...</div>}
            {isStarted && (
                <div
                    className={'absolute bottom-4 w-[80%] h-[90%] full-flex flex-col'}>
                    <div className={'full-flex flex-col'}>
                        <span className={'text-2xl text-white md:text-3xl lg:text-4xl'}>{number}</span>
                        <div className={'w-48 h-2 rounded-full orange-stroke relative'}>
                            <div className={`h-full bg-c-orange`} style={{width: `${(timeLeft / 3000) * 100}%`}}></div>
                        </div>
                    </div>
                    <span className={'text-white absolute bottom-6 text-3xl'}>Current Score: 00</span>
                    <span className={'text-gray-500 absolute bottom-0 text-xl'}>Your High Score: 00</span>
                </div>
            )}
            <BgLight className={'absolute left-[50%] translate-x-[-50%] bottom-0'}/>
        </div>
    )
}