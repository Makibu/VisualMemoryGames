import NavButton from "../components/NavButton.jsx";
import BgLight from "../components/BgLight.jsx";
import {useState} from "react";

const wordsArray = [
    'bade', 'bare', 'bard', 'boar', 'brad', 'bred', 'fane', 'fare', 'fate',
    'feud', 'lard', 'laze', 'maze', 'mire', 'moat', 'mood', 'pane', 'pear',
    // 'peer', 'sear', 'seed', 'teal', 'tear', 'toad', 'tore', 'wade', 'ward',
    // 'ware', 'wade', 'wove', 'writ', 'worn', 'yarn', 'year',
    'abandon', 'ballast', 'baronet', 'bastard', 'bizarre', 'cabaret', 'calibre', 'candled',
    'carried', 'dawdled', 'defiant', 'emulate', 'entropy', 'fanfare', 'feather', 'frantic',
    'garnish', 'hurdled', 'lambert', 'magnate', 'melodic', 'moisten', 'ostrich', 'parallel',
    // 'pardons', 'rampage', 'ransack', 'revered', 'rosette', 'torment', 'unearth', 'venture',
    // 'wandered', 'wrestle',
    'abandonment', 'admonishing', 'ballistics', 'belligerent', 'biomedical', 'blasphemous',
    'candlestick', 'caterwauling', 'clairvoyant', 'desperation', 'elucidation', 'fermentation',
    'fortification', 'grandiloquent', 'gravitational', 'inconvenient', 'infatuation',
    'juxtaposition', 'magnanimously', 'marginalized', 'nondisclosure', 'ornamentation',
    // 'perpendicular', 'prestidigitation', 'reminiscent', 'restoration', 'signification',
    // 'subordination', 'surreptitiously', 'telecommunication', 'transfiguration', 'ventriloquist',
    // 'vocabulary', 'xenotransplantation'
]

export default function WordsMemory(){
    const [isStarted, setIsStarted] = useState(false)
    const [isLost, setIsLost] = useState(false)
    
    const [currentWord, setCurrentWord] = useState('');
    const [wordHistory, setWordHistory] = useState([]);
    
    function generateNewWord(){
        const randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)]
        setCurrentWord(randomWord)
    }
    
    function handleStartGame(){
        setIsLost(false)
        setIsStarted(true)
        setWordHistory([])
        setCurrentWord('')
        generateNewWord()
    }
    
    function handleButtonClick(isNew){
        const hasAppearedBefore = wordHistory.includes(currentWord)
        const correct = (isNew && !hasAppearedBefore) || (!isNew && hasAppearedBefore)
        if (correct){
            setWordHistory([...wordHistory, currentWord])
            generateNewWord()
        }else{
            setIsLost(true)
            setIsStarted(false)
        }
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
                <div className={'text-c-orange full-flex flex-col gap-4'}>
                    <span className={'text-2xl md:text-3xl lg:text-4xl xl:text-5xl'}>{currentWord}</span>
                    <div className={'full-flex gap-6'}>
                        <button onClick={() => handleButtonClick(false)}
                                className={'w-16 h-8 orange-stroke rounded-md'}>Seen
                        </button>
                        <button onClick={() => handleButtonClick(true)}
                                className={'w-16 h-8 orange-stroke rounded-md'}>New
                        </button>
                    </div>
                </div>
            )}
            <span className={'text-white absolute bottom-10 text-3xl'}>Current Score: 00</span>
            <span className={'text-gray-500 absolute bottom-4 text-xl'}>Your High Score: 00</span>
            <BgLight className={'absolute left-[50%] translate-x-[-50%] bottom-0'}/>
        </div>
    )
}