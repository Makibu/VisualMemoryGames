import NavButton from "../components/NavButton.jsx";
import BgLight from "../components/BgLight.jsx";

export default function WordsMemory(){
    return (
        <div className={'bg-black h-[100svh] w-screen flex justify-center items-center font-anonPro relative'}>
            <NavButton text={'Home'}/>
            
            <BgLight className={'absolute left-[50%] translate-x-[-50%] bottom-0'}/>
        </div>
    )
}