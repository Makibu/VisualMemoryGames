import React, {useEffect, useState} from 'react'
import BgLight from "../components/BgLight.jsx"
import NavButton from "../components/NavButton.jsx"

const colorOptions = [
    "rgb(245 158 11)", /*bg-amber-500*/
    "rgb(252 165 165)", /*bg-red-300*/
    "rgb(217 249 157)", /*bg-lime-200*/
    "rgb(147 197 253)", /*bg-blue-300*/
    "rgb(192 132 252)", /*bg-purple-400*/
]

//Generating random color from colorOptions Array
function getRandomColor(){
    const randomIndex = Math.floor(Math.random() * colorOptions.length)
    return colorOptions[randomIndex]
}

//Looping trough colors on click
function getNextColor(currentColor){
    const currentIndex = colorOptions.indexOf(currentColor)
    const nextIndex = (currentIndex + 1) % colorOptions.length
    return colorOptions[nextIndex]
}

export default function ColorMemory(){
    const [isStarted, setIsStarted] = useState(false)
    const [isLost, setIsLost] = useState(false)
    
    const [currentRound, setCurrentRound] = useState(1)
    const [sequence, setSequence] = useState([])
    const [userSequence, setUserSequence] = useState([])
    const [isPlayerTurn, setIsPlayerTurn] = useState(false)
    const [showProgress, setShowProgress] = useState(false)
    
    const [gameStatus, setGameStatus] = useState()
    
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    
    useEffect(() => {
        const savedHighScore = localStorage.getItem('ColorMemory') || '0';
        setHighScore(parseInt(savedHighScore, 10));
    }, []);
    
    useEffect(() => {
        if (score > highScore){
            setHighScore(score);
            localStorage.setItem('ColorMemory', score.toString());
        }
    }, [score, highScore]);
    
    //Game mechanics
    
    //Game start init
    function handleStartGame(){
        setIsStarted(true)
        setIsLost(false)
        setUserSequence([])
        setSequence([])
        setCurrentRound(1)
        setGameStatus('Remember Colors!')
    }
    
    //User square clicks
    function handleSquareClick(index){
        if (isPlayerTurn){
            const updatedColors = userSequence.map((color, i) =>
                i === index ? getNextColor(color) : color
            )
            setUserSequence(updatedColors)
        }
    }
    
    //Checking if user match colors correctly
    function handleCheckClick(){
        if (!isPlayerTurn) return
        
        if (sequence.every((color, index) => color === userSequence[index])){
            setGameStatus('')
            setShowProgress(true)
            setScore(prevState => prevState + 1)
            setTimeout(() => {
                setCurrentRound(currentRound + 1)
                setGameStatus('Remember Colors!')
            }, 1000)
        }else{
            setIsStarted(false)
            setScore(0)
            setIsLost(true)
        }
        
        setUserSequence([])
        setIsPlayerTurn(false)
    }
    
    
    useEffect(() => {
        if (isStarted){
            const colors = Array.from({length: currentRound}, function (){
                return getRandomColor()
            })
            setSequence(colors)
            setUserSequence(colors)
            setIsPlayerTurn(false)
            
            const timer = setTimeout(function (){
                setGameStatus('Rematch colors!')
                setUserSequence(Array.from({length: currentRound}, function (){
                    return "white"
                }))
                setIsPlayerTurn(true)
            }, 3000)
            
            return function (){
                clearTimeout(timer)
            }
        }
    }, [isStarted, currentRound])
    
    
    useEffect(() => {
        let timer
        if (showProgress){
            timer = setTimeout(() => {
                setShowProgress(false)
            }, 1000)
        }
        return () => clearTimeout(timer)
    }, [showProgress])
    
    
    return (
        <div className="bg-black h-[100svh] w-screen flex justify-center items-center font-anonPro relative">
            <NavButton text="Home"/>
            {isStarted && <div className={'absolute text-c-orange top-52 text-2xl'}>{gameStatus}</div>}
            {(!isStarted && !isLost) && (
                <div
                    onClick={handleStartGame}
                    className="text-orange-500 w-[80%] h-[80%] flex justify-center items-center text-xl md:text-3xl xl:text-4xl text-center cursor-pointer"
                >
                    Click Anywhere to Start...
                </div>
            )}
            
            {(!isStarted && isLost) && (
                <div className="w-[80%] h-[80%] flex flex-col justify-center items-center relative"
                     onClick={handleStartGame}>
                    <span className="text-orange-500 text-xl text-center md:text-3xl xl:text-4xl">
                        You Lost. Click Anywhere to restart...
                    </span>
                </div>
            )}
            
            {isStarted && !showProgress && (
                <div className="w-[80%] h-[80%] full-flex flex-col">
                    <div className="flex flex-wrap justify-center mb-4">
                        {userSequence.map((color, index) => (
                            <div
                                key={index}
                                className="w-16 h-16 m-2 cursor-pointer rounded-md"
                                style={{backgroundColor: color}}
                                onClick={() => handleSquareClick(index)}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleCheckClick}
                        className="orange-stroke w-24 h-10 text-c-orange text-2xl rounded"
                    >
                        Check
                    </button>
                </div>
            )}
            
            {(isStarted && showProgress) && (
                <div className="flex flex-col items-center justify-center">
                    <div className="text-c-orange text-2xl mb-2">Next round!</div>
                    <div className="relative w-64 h-2 bg-transparent orange-stroke rounded overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-c-orange rounded progress-bar"
                             style={{width: '100%'}}/>
                    </div>
                </div>
            )}
            <span
                className={'text-white absolute bottom-10 text-3xl'}>Current Score: {score.toString().padStart(2, '0')}</span>
            <span
                className={'text-gray-500 absolute bottom-4 text-xl'}>Your High Score: {highScore.toString().padStart(2, '0')}</span>
            <BgLight className="absolute left-[50%] transform translate-x-[-50%] bottom-0"/>
        </div>
    )
}
