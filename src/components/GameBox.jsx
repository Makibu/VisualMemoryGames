import infoIcon from '../assets/info.svg'
import cursorIcon from '../assets/cursor-01.svg'
import PlayButton from "./PlayButton.jsx";

export default function GameBox({title = 'Game name'}){
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
        
    }
    if (title === 'Reaction Time'){
        content =
            <div className={'text-c-orange'}>
                <span className={'text-2xl'}>Click!</span>
                <img src={cursorIcon} alt="Cursor icon" className={'rotate-12'}/>
                <span>246ms</span>
            </div>
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
    }
    
    const redirection = title.split(' ').join('-')
    
    return (
        <div
            className={'bg-transparent orange-stroke rounded-3xl w-72 h-[400px] shadow-orangeNeon relative flex justify-center'}>
            <div className={'w-64 h-64 mt-4 flex justify-center items-center'}>{content}</div>
            <img alt='infoIcon' src={infoIcon} className={'absolute top-3 right-3 cursor-pointer'}/>
            <span className={'text-3xl absolute bottom-[90px] text-white'}>{title}</span>
            <PlayButton moveTo={redirection}/>
        </div>
    )
}