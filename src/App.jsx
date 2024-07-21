import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import {useEffect} from "react";
import SquareSequence from "./pages/SquareSequence.jsx";
import GridRecall from "./pages/GridRecall.jsx";
import WordsMemory from "./pages/WordsMemory.jsx";
import ReactionTime from "./pages/ReactionTime.jsx";
import NumberMemory from "./pages/NumberMemory.jsx";
import ColorMemory from "./pages/ColorMemory.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: '/Square-Sequence',
        element: <SquareSequence/>
    },
    {
        path: '/Grid-Recall',
        element: <GridRecall/>
    },
    {
        path: '/Words-Memory',
        element: <WordsMemory/>
    },
    {
        path: '/Reaction-Time',
        element: <ReactionTime/>
    },
    {
        path: '/Number-Memory',
        element: <NumberMemory/>
    },
    {
        path: '/Color-Memory',
        element: <ColorMemory/>
    }
])

function App(){
    useEffect(() => {
        document.documentElement.classList.add('no-scrollbar');
        document.body.classList.add('no-scrollbar');
    }, []);
    
    return <RouterProvider router={router}></RouterProvider>
}

export default App
