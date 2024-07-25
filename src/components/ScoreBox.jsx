export default function ScoreBox({title}){
    const game = title.split(' ').join("")
    
    let highScore = 0
    localStorage.getItem(game) && (highScore = localStorage.getItem(game))
    console.log(highScore)
    
    return (
        <div className={'flex flex-col items-center text-white'}>
            <div className={'flex justify-center items-center orange-stroke w-72 h-16 rounded-3xl gap-4 pl-2 relative'}>
                <div
                    className={'rounded-full orange-stroke aspect-square w-12 grid place-content-center absolute left-2 text-xl'}>{highScore}
                </div>
                <span className={'text-xl'}>{title}</span>
            </div>
        </div>
    )
}