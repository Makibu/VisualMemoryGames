import {Link} from "react-router-dom";

export default function PlayButton({hero, moveTo}){
    let cssClasses = `grid text-center absolute cursor-pointer bg-transparent orange-stroke rounded-md h-16 place-content-center text-c-orange text-4xl `
    
    if (hero){
        cssClasses += 'w-72 bottom-32 shadow-orangeNeon'
    }else{
        cssClasses += 'w-52 bottom-4'
    }
    
    function handleScroll(){
        window.scrollTo({
            top: window.innerHeight + 70,
            behavior: 'smooth'
        })
    }
    
    return (
        <>
            {hero && <div className={cssClasses} onClick={handleScroll}>PLAY</div>}
            {!hero && <Link to={`/${moveTo}`} className={cssClasses}>PLAY</Link>}
        </>
    )
}