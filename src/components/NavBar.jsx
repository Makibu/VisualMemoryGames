import NavSegment from "./NavSegment.jsx";

export default function NavBar(){
    return (
        <div
            className={'absolute flex flex-col gap-3 top-[75%] ml-4 md:top-[50%] md:translate-y-[-50%]'}>
            <NavSegment text={'Start'} active/>
            <NavSegment text={'Games'}/>
            <NavSegment text={'Stats'}/>
        </div>
    )
}
// top-[75%] left-4 flex flex-col gap-3 lg:top-[50%] md:translate-y-[-50%] ml-[-100%]