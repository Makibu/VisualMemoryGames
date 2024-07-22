import {useNavigate} from "react-router-dom";

export default function NavButton({text}){
    const navigate = useNavigate()
    
    function handleRelocate(){
        if (text === 'Home'){
            navigate('/')
            setTimeout(() => {
                window.scrollTo({
                    top: innerHeight,
                    behavior: 'smooth'
                })
            }, 100)
        }
        if (text === 'Login'){
        
        }
    }
    
    return (
        <div onClick={handleRelocate}
             className={`cursor-pointer bg-transparent border-c-orange border-[1px] border-solid rounded-3xl w-24 h-8 text-xl text-c-orange grid place-content-center absolute top-3 ${text === 'Login' ? 'right-3' : ''}`}>{text}</div>
    )
}