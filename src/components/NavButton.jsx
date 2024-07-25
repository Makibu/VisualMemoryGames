import {useNavigate} from "react-router-dom";

export default function NavButton(){
    const navigate = useNavigate()
    
    function handleRelocate(){
        navigate('/')
        setTimeout(() => {
            window.scrollTo({
                top: innerHeight + 70,
                behavior: 'smooth'
            })
        }, 100)
        
    }
    
    return (
        <div onClick={handleRelocate}
             className={`cursor-pointer bg-transparent border-c-orange border-[1px] border-solid rounded-3xl w-24 h-8 text-xl text-c-orange grid place-content-center absolute top-3`}>Home</div>
    )
}