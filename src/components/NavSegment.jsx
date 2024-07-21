export default function NavSegment({text, active}){
    return (
        <div className={'flex items-center gap-2'}>
            <div
                className={`rounded-full aspect-square w-4 ${active ? 'bg-c-orange' : 'bg-transparent border-[0.5px] border-solid border-c-orange'}`}></div>
            <span className={`${active ? 'text-c-orange' : 'text-grayDark'}`}>{text}</span>
        </div>
    )
}