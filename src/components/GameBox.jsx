import infoIcon from '../assets/info.svg'
import cursorIcon from '../assets/cursor-01.svg'
import PlayButton from "./PlayButton.jsx";
import {useState} from "react";

export default function GameBox({title = 'Game name'}){
    const [isInfo, setIsInfo] = useState(false)
    let description
    
    let content = 's'
    if (title === 'Square Sequence'){
        content =
            <div className={'aspect-square w-[60%] grid grid-cols-3 gap-1 '}>
                {[...Array(9)].map((_, index) => {
                    let extraClasses = '';
                    if (index === 5){
                        extraClasses = 'bg-orange-300'
                    }
                    return <div key={index} className={`rounded-md bg-c-orange ${extraClasses}`}></div>;
                })}
            </div>
        description = "In this game, you'll be working with a 3x3 grid where each round presents a sequence of illuminated squares. Your objective is to watch the sequence carefully and then reproduce it exactly by selecting the squares in the correct order. Each round introduces a longer sequence, testing and improving your memory with each step. Perfect for a quick and engaging challenge!"
    }
    if (title === 'Grid Recall'){
        content =
            <div className={'aspect-square w-[70%] grid grid-cols-5 gap-1'}>
                {[...Array(25)].map((_, index) => {
                    let extraClasses = '';
                    if ([3, 8, 15, 21, 22].includes(index)){
                        extraClasses = 'bg-c-orange'
                    }
                    return <div key={index} className={`rounded-md orange-stroke ${extraClasses}`}></div>;
                })}
            </div>
        description = "In this game, you'll face a grid of squares where some are lit up at the start of each round. Your goal is to remember which squares are illuminated and click on them to replicate the initial pattern. Each round introduces a larger grid and more lit squares, making the challenge progressively harder. Can you keep up and recreate the pattern accurately as the game evolves?"
    }
    if (title === 'Words Memory'){
        content =
            <div className={'flex flex-col text-center text-c-orange items-center gap-4'}>
                <span className={'text-2xl'}>Distinguished</span>
                <div className={'flex gap-4'}>
                    <div className={'orange-stroke w-16 rounded-md'}>New</div>
                    <div className={'orange-stroke w-16 rounded-md'}>Seen</div>
                </div>
            </div>
        description = "In this game, you'll be presented with a word on your screen. Your task is to determine if this word has appeared before. Click \"Seen\" if you recognize the word from earlier in the game, or \"New\" if it’s the first time you're seeing it. This game is designed to test your memory and attention to detail. Improve your recall skills and see how well you can track repeated words!"
    }
    if (title === 'Reaction Time'){
        content =
            <div className={'text-c-orange'}>
                <span className={'text-2xl'}>Click!</span>
                <img src={cursorIcon} alt="Cursor icon" className={'rotate-12'}/>
                <span>246ms</span>
            </div>
        description = "In this game, you’ll measure how quickly you can respond to a visual cue. The challenge is simple: react as fast as possible when the signal appears on your screen. Track your reaction time and see how your speed stacks up!"
    }
    if (title === 'Number Memory'){
        content =
            <div className={'flex flex-col items-center gap-2 text-c-orange'}>
                <span className={'text-2xl'}>123456</span>
                <div className={'orange-stroke w-36 h-2 rounded-md'}>
                    <div className={'w-[70%] bg-c-orange h-full'}></div>
                </div>
                <span className={'text-xl'}>742ms left...</span>
            </div>
        description = "In this game, test your memory by recalling and typing numbers that appear on your screen. Each round presents a number for a short time before it disappears. Your task is to retype the number from memory. As you progress, the numbers get longer, increasing the difficulty. Challenge yourself to remember and input as long number as you can!"
    }
    if (title === 'Color Memory'){
        content =
            <div className={'grid grid-cols-2 place-content-center gap-1'}>
                <div className={'bg-amber-500 w-14 h-14 rounded-md'}></div>
                <div className={'bg-red-300 w-14 h-14 rounded-md'}></div>
                <div className={'bg-blue-300 w-14 h-14 rounded-md'}></div>
                <div className={'bg-purple-400 w-14 h-14 rounded-md'}></div>
            </div>
        description = "In this game, you'll test your memory with a grid of colored squares. Each round, a new square in a random color appears. Your task is to remember the colors and their positions as the number of squares increases. Try to recall and replicate the color pattern as accurately as possible. How many colors can you keep track of as the challenge grows?\n" +
            "\n"
    }
    
    const redirection = title.split(' ').join('-')
    
    function handleInfoShow(){
        setIsInfo(prevState => !prevState)
    }
    
    return (
        <div
            className={'bg-transparent orange-stroke rounded-3xl w-72 h-[400px] shadow-orangeNeon relative flex justify-center'}>
            <img alt='infoIcon' src={infoIcon} className={'absolute top-3 right-3 cursor-pointer z-10'}
                 onClick={handleInfoShow}/>
            {!isInfo && (
                <>
                    <div className={'w-64 h-64 mt-4 flex justify-center items-center'}>{content}</div>
                    <span className={'text-3xl absolute bottom-[90px] text-white'}>{title}</span>
                    <PlayButton moveTo={redirection}/>
                </>
            )}
            {isInfo && (
                <div className={'w-full h-full bg-c-black rounded-3xl relative flex justify-center'}>
                    <span className={'absolute top-3 text-2xl text-white'}>{title}</span>
                    <span className={'text-md leading-4 text-grayLight ml-4 mt-20'}>{description}</span>
                </div>
            )}
        </div>
    )
}