import ScoreBox from "./ScoreBox.jsx";

export default function ScoresContent(){
    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 mt-10 mb-20'}>
            <ScoreBox title={'Square Sequence'}/>
            <ScoreBox title={'Grid Recall'}/>
            <ScoreBox title={'Words Memory'}/>
            <ScoreBox title={'Reaction Time'}/>
            <ScoreBox title={'Number Memory'}/>
            <ScoreBox title={'Color Memory '}/>
        </div>
    )
}