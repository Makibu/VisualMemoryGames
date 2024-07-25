import NavButton from "../components/NavButton.jsx";
import BgLight from "../components/BgLight.jsx";
import {useEffect, useRef, useState} from "react";

export default function NumberMemory(){
    const [isStarted, setIsStarted] = useState(false)
    const [isLost, setIsLost] = useState(false)
    const [isTimeOver, setIsTimeOver] = useState(false)
    const [isNext, setIsNext] = useState(false)
    
    const [number, setNumber] = useState(String(Math.floor(Math.random() * 10)))
    const currentStep = useRef()
    const [timeLeft, setTimeLeft] = useState(3000)
    
    const intervalId = useRef()
    
    const [score, setScore] = useState(0)
    
    if (!localStorage.getItem('NumberMemory')){
        localStorage.setItem('NumberMemory', '0')
    }
    
    let highScore = 0
    if (localStorage.getItem('NumberMemory')){
        highScore = +localStorage.getItem('NumberMemory')
    }
    if (highScore < score){
        localStorage.setItem('NumberMemory', `${score}`)
    }
    
    function handleStartGame(){
        setIsNext(false)
        setIsStarted(true);
        setIsTimeOver(false)
        setIsLost(false);
        currentStep.current = 1
        generateNewNumber();
        handleStartTimer(3000);
    }
    
    function generateNewNumber(){
        let array = []
        for (let i = 0; i < currentStep.current; i++){
            array.push(Math.floor(Math.random() * 10))
        }
        setNumber(array.join(''))
    }
    
    function handleStartTimer(time){
        if (intervalId.current){
            clearInterval(intervalId.current);
        }
        setTimeLeft(time)
        intervalId.current = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                if (prevTimeLeft <= 100){
                    clearInterval(intervalId.current);
                    intervalId.current = null;
                    time === 3000 ? setIsTimeOver(true) : null
                    return 0;
                }
                return prevTimeLeft - 100;
            });
        }, 100)
    }
    
    function handleCheckAnswer(event){
        if (event.key === 'Enter'){
            if (event.target.value === number){
                setIsNext(true)
                setScore(prevState => prevState + 1)
                handleStartTimer(1000)
                setTimeout(() => {
                    setIsNext(false)
                    currentStep.current += 1
                    generateNewNumber()
                    setTimeout(() => {
                        handleStartTimer(3000)
                    }, 100)
                    event.target.value = ''
                }, 1000)
            }else{
                setIsLost(true)
                setIsStarted(false)
                setScore(0)
            }
            setIsTimeOver(false)
        }
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
            {(isStarted && !isTimeOver && !isNext) && (
                <div
                    className={'w-[80%] h-[80%] full-flex flex-col'}>
                    <div className={'full-flex flex-col'}>
                        <span className={'select-none text-2xl text-white md:text-3xl lg:text-4xl'}>{number}</span>
                        <div className={'w-48 h-2 rounded-full orange-stroke relative'}>
                            <div className={`h-full bg-c-orange`} style={{width: `${(timeLeft / 3000) * 100}%`}}></div>
                        </div>
                    </div>
                </div>
            )}
            {(isStarted && !isTimeOver && isNext) && (
                <div
                    className={'w-[80%] h-[80%] full-flex flex-col'}>
                    <div className={'full-flex flex-col'}>
                        <span className={'select-none text-2xl text-white md:text-3xl lg:text-4xl'}>Next one:</span>
                        <div className={'w-48 h-2 rounded-full orange-stroke relative'}>
                            <div className={`h-full bg-c-orange`} style={{width: `${(timeLeft / 1000) * 100}%`}}></div>
                        </div>
                    </div>
                </div>
            )}
            {(isStarted && isTimeOver) && (
                <>
                    <div className={'full-flex flex-col w-[80%] h-[80%]'}>
                        <label htmlFor={'numberInput'} className={'text-c-orange text-2xl md:text-4xl mb-2'}>Enter the
                            answer</label>
                        <input type={'number'} onKeyDown={handleCheckAnswer} id={'numberInput'}
                               className={'text-center rounded-md outline-none bg-transparent orange-stroke appearance-none text-c-orange no-arrows w-72 h-12 text-2xl md:text-3xl md:w-96'}/>
                    </div>
                </>
            )}
            {isLost && (
                <>
                    <div onClick={handleStartGame}
                         className={'text-c-orange w-[80%] h-[80%] text-center full-flex text-xl md:text-3xl xl:text-4xl'}>You
                        Lost. Click anywhere to restart...
                    </div>
                </>
            )}
            <span
                className={'text-white absolute bottom-10 text-3xl'}>Current Score: {score.toString().padStart(2, '0')}</span>
            <span
                className={'text-gray-500 absolute bottom-4 text-xl'}>Your High Score: {highScore.toString().padStart(2, '0')}</span>
            <BgLight className={'absolute left-[50%] translate-x-[-50%] bottom-0'}/>
        </div>
    )
}