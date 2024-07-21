export default function BgLight({className}){
    return (
        <div
            className={`aspect-square w-56 bg-c-orange absolute bottom-20 blur-[230px] md:w-72 md:blur-[280px] lg:w-80 lg:blur-[300px] ${className}`}></div>
    )
}