import GameBox from "./GameBox.jsx";

export default function GameContent(){
    return (
        <div className={'grid grid-cols-1 gap-32 my-20 md:grid-cols-2 xl:grid-cols-3'}>
            <GameBox title={'Square Sequence'}/>
            <GameBox title={'Grid Recall'}/>
            <GameBox title={'Words Memory'}/>
            <GameBox title={'Reaction Time'}/>
            <GameBox title={'Number Memory'}/>
            <GameBox title={'Color Memory'}/>
        </div>
    )
}