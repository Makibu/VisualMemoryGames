import NavButton from "../components/NavButton.jsx";
import BgLight from "../components/BgLight.jsx";
import {useRef, useState} from "react";
import Grid from "../components/Grid.jsx";


const initialCols = 3
const initialSquares = 3

function generateRandomSquares(count, gridTilesCount){
    const squares = new Set()
    while (squares.size < count){
        squares.add(Math.floor(Math.random() * gridTilesCount))
    }
    return Array.from(squares)
}

export default function GridRecall(){
    const [isStarted, setIsStarted] = useState(false)
    const [isLost, setIsLost] = useState(false)
    
    const [sequence, setSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);
    const [gameStatus, setGameStatus] = useState('');
    const [currentRound, setCurrentRound] = useState(1)
    
    const gridCols = useRef(initialCols)
    const litSquares = useRef(initialSquares)
    
    const [score, setScore] = useState(0)
    
    if (!localStorage.getItem('GridRecall')){
        localStorage.setItem('GridRecall', '0')
    }
    
    let highScore = 0
    if (localStorage.getItem('GridRecall')){
        highScore = +localStorage.getItem('GridRecall')
    }
    if (highScore < score){
        localStorage.setItem('GridRecall', `${score}`)
    }
    
    function startNewGame(){
        const newSequence = generateRandomSquares(litSquares.current, gridCols.current ** 2)
        setSequence(newSequence)
        setPlayerSequence([])
        setIsPlayerTurn(false)
        setGameStatus('Memorize the sequence!')
        
        const timer = setTimeout(() => {
            setIsPlayerTurn(true)
            setGameStatus('Your turn!')
        }, 1500)
        
        return () => clearTimeout(timer)
    }
    
    function handleSquareClick(index){
        if (!isPlayerTurn) return
        if (playerSequence.includes(index)) return
        if (!sequence.includes(index)){
            setGameStatus('You lose!')
            setIsPlayerTurn(false)
            setScore(0)
            
            setTimeout(() => {
                setCurrentRound(1)
                litSquares.current = initialSquares
                gridCols.current = initialCols
                setIsStarted(false)
                setIsLost(true)
                setGameStatus(null)
                setSequence([])
                setPlayerSequence([])
            }, 1500)
            return
        }
        
        const newPlayerSequence = [...playerSequence, index]
        setPlayerSequence(newPlayerSequence)
        
        if (newPlayerSequence.length === litSquares.current){
            const sortedPlayerSequence = [...newPlayerSequence].sort((a, b) => a - b)
            const sortedSequence = [...sequence].sort((a, b) => a - b)
            
            if (sortedPlayerSequence.every((val, i) => val === sortedSequence[i])){
                setCurrentRound(prevState => prevState + 1)
                setGameStatus("You won! Next round...")
                setScore(prevState => prevState + 1)
                setTimeout(() => {
                    setIsPlayerTurn(false)
                    setSequence([])
                    setPlayerSequence([])
                    if (currentRound % 3 === 2 && gridCols.current < 9){
                        gridCols.current += 1
                    }
                    litSquares.current += 1
                }, 1000)
                setTimeout(() => {
                    startNewGame()
                }, 2000)
            }
            // setIsPlayerTurn(false)
        }
    }
    
    function handleStartGame(){
        setIsStarted(true)
        setIsLost(false)
        startNewGame()
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
                </div>
            }
            {(isStarted && !isLost) && (
                <div
                    className={'absolute bottom-4 w-[80%] h-[85%] flex flex-col items-center'}>
                    <span
                        className={'text-white text-xl absolute md:text-2xl lg:text-3xl xl:text-5xl'}>{gameStatus}</span>
                    <Grid sequence={sequence} playerSequence={playerSequence} onClick={handleSquareClick}
                          isLit={!isPlayerTurn} gridColsCount={gridCols.current}/>
                </div>
            )}
            <span
                className={'text-white absolute bottom-6 text-3xl'}>Current Score: {score.toString().padStart(2, '0')}</span>
            <span
                className={'text-gray-500 absolute bottom-0 text-xl'}>Your High Score: {highScore.toString().padStart(2, '0')}</span>
            <BgLight className={'absolute left-[50%] translate-x-[-50%] bottom-0'}/>
        </div>
    )
}

// let seq = []
// for (let i = 0; i < currentRound; i++){
//     seq.push(colorOptions[Math.floor(Math.random() * colorOptions.length)])
// }