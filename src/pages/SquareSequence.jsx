import BgLight from "../components/BgLight.jsx";
import NavButton from "../components/NavButton.jsx";
import {useState} from "react";

function generateNextInSequence(currentSequence){
    return [...currentSequence, Math.floor(Math.random() * 9)]
}

export default function SquareSequence(){
    const [isStarted, setIsStarted] = useState(false)
    const [isLost, setIsLost] = useState(false)
    
    const [sequence, setSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);
    const [gameStatus, setGameStatus] = useState('Watch the sequence');
    
    function startNewRound(currentSequence){
        setIsLost(false)
        const newSequence = generateNextInSequence(currentSequence)
        setSequence(newSequence)
        setPlayerSequence([])
        setCurrentStep(0)
        setGameStatus('Watch the sequence');
        playSequence(newSequence)
    }
    
    function playSequence(sequence){
        sequence.forEach((num, index) => {
            setTimeout(() => {
                highlightSquare(num)
                if (index === sequence.length - 1){
                    setTimeout(() => {
                        setGameStatus('Your turn');
                        setIsPlayerTurn(true)
                    }, 1000)
                    setTimeout(() => {
                    }, 750)
                }
            }, (index + 1) * 1000)
        })
    }
    
    function highlightSquare(num){
        const square = document.getElementById(`square-${num}`)
        square.classList.remove('bg-c-orange')
        square.classList.add('bg-amber-200')
        setTimeout(() => {
            square.classList.add('bg-c-orange')
            square.classList.remove('bg-amber-200')
        }, 500)
    }
    
    function handleSquareClick(num){
        console.log(num)
        if (!isPlayerTurn) return
        const newPlayerSequence = [...playerSequence, num]
        setPlayerSequence(newPlayerSequence)
        highlightSquare(num)
        
        if (newPlayerSequence[currentStep] !== sequence[currentStep]){
            setGameStatus('You lost!')
            setIsLost(true)
            setIsPlayerTurn(false)
            setTimeout(() => {
                setIsStarted(false)
                setGameStatus(null)
            }, 2000)
            return
        }
        
        if (newPlayerSequence.length === sequence.length){
            setGameStatus('Next round!')
            setIsPlayerTurn(false)
            setTimeout(() => startNewRound(sequence), 2000)
            return
        }
        
        setCurrentStep(currentStep + 1)
    }
    
    function handleStartGame(){
        setIsStarted(true)
        startNewRound([])
    }
    
    return (
        <div className={'bg-black h-[100svh] w-screen flex justify-center items-center font-anonPro relative'}>
            <NavButton text={'Home'}/>
            {(!isStarted && !isLost) &&
                <div onClick={handleStartGame}
                     className={'text-c-orange w-[80%] h-[80%] full-flex text-xl md:text-3xl xl:text-4xl'}>Click
                    Anywhere to
                    Start...</div>}
            {(!isStarted && isLost) &&
                <div className={'w-[80%] h-[80%] full-flex'} onClick={handleStartGame}>
                    <span className={'text-c-orange text-xl text-center md:text-3xl xl:text-4xl'}>You Lost. Click Anywhere to restart...</span>
                    <span className={'text-white absolute bottom-10 text-3xl'}>Current Score: 00</span>
                    <span className={'text-gray-500 absolute bottom-4 text-xl'}>Your High Score: 00</span>
                </div>
            }
            {isStarted && (
                <div
                    className={'absolute bottom-4 w-[80%] h-[85%] flex flex-col items-center'}>
                    <span
                        className={'text-white text-xl absolute md:text-2xl lg:text-3xl xl:text-5xl'}>{gameStatus}</span>
                    <div className={'grid grid-cols-3 relative top-[25%] gap-2 lg:top-[15%]'}>
                        {[...Array(9)].map((_, index) => (
                            <div
                                key={index}
                                id={`square-${index}`}
                                className="w-16 h-16 bg-c-orange rounded-lg md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 z-10"
                                onClick={() => handleSquareClick(index)}
                            ></div>
                        ))}
                    </div>
                    <span className={'text-white absolute bottom-6 text-3xl'}>Current Score: 00</span>
                    <span className={'text-gray-500 absolute bottom-0 text-xl'}>Your High Score: 00</span>
                </div>
            )}
            <BgLight className={'absolute left-[50%] translate-x-[-50%] bottom-0'}/>
        </div>
    )
}