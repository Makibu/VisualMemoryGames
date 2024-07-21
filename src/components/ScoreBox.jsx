export default function ScoreBox({title}){
    return (
        <div className={'flex flex-col items-center text-white'}>
            <div className={'flex justify-center items-center orange-stroke w-72 h-16 rounded-3xl gap-4 pl-2 relative'}>
                <div
                    className={'rounded-full orange-stroke aspect-square w-12 flex items-center justify-center absolute left-2 text-2xl'}>00
                </div>
                <span className={'text-xl'}>{title}</span>
            </div>
        </div>
    )
}