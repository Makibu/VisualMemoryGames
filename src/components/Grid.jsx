export default function Grid({sequence, playerSequence, onClick, isLit, gridColsCount}){
    const gridClasses = {
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        7: 'grid-cols-7',
        8: 'grid-cols-8',
        9: 'grid-cols-9',
    }
    
    return (
        <div className={'w-[80%] h-[80%] full-flex'}>
            <div className={`grid gap-2 ${gridClasses[gridColsCount]}`}>
                {Array.from({length: gridColsCount ** 2}, (_, i) => (
                    <div
                        key={i}
                        className={`w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 ${sequence.includes(i) && isLit ? 'bg-c-orange' : 'orange-stroke'} ${playerSequence.includes(i) ? 'bg-amber-400' : ''}`}
                        onClick={() => onClick(i)}
                    />
                ))}
            </div>
        </div>
    )
}