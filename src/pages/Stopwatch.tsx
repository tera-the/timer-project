import { useEffect, useRef, useState } from 'react';
import { Button } from '../components/ui/button'
import Span2 from '../components/Span2';
import useLocalStorage from '../hooks/useLocalStorage';

type LapType = {
    id: number;
    minutes: string,
    seconds: string,
    milliseconds: string,
}
const Stopwatch = () => {
    const [time, setTime] = useLocalStorage('stopwatch-time', 0);

    const minutes = String(Math.floor(time / 60000)).padStart(2, "0")
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0")
    const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, "0")

    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<LapType[]>([]);

    const intervalRef = useRef<number | undefined>(undefined)

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prev: number) => prev + 10)
            }, 10);
        } else {
            clearInterval(intervalRef.current)
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning])



    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
        setLaps([])
    }


    const handleLap = () => {
        const newId = laps.length > 0
            ? Math.max(...laps.map(lap => lap.id)) + 1
            : 1;

        const newLap = {
            minutes,
            seconds,
            milliseconds,
            id: newId,
        }

        setLaps(prev => [...prev, newLap])
    }

    return (
        <div className='flex flex-col items-center pt-85'>
            <div className="flex items-end justify-center gap-3 mb-10">
                <Span2>{minutes}</Span2>
                <Span2 className="translate-y-1.5">:</Span2>
                <Span2>{seconds}</Span2>

                <Span2 className="text-[90px] translate-y-6 mb-1">
                    .{milliseconds}
                </Span2>
            </div>

            {isRunning ?
                <div className='flex justify-center gap-3 mb-25'>
                    <Button
                        size={'lg'}
                        className="bg-blue-500 hover:bg-blue-600 cursor-pointer font-normal rounded-none"
                        onClick={handleLap}
                    >Lap</Button>

                    <Button
                        size={'lg'}
                        className="bg-red-500 hover:bg-red-600 cursor-pointer font-normal rounded-none"
                        onClick={() => setIsRunning(false)}
                    >Stop</Button>
                </div>
                :
                <div className='flex justify-center gap-3 mb-25'>
                    <Button
                        size={'lg'}
                        className="bg-green-500 hover:bg-green-600 cursor-pointer font-normal rounded-none"
                        onClick={() => setIsRunning(true)}
                    >Start</Button>

                    <Button size={'lg'} className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer font-normal rounded-none"
                        onClick={handleReset}
                    >Reset</Button>
                </div>
            }


            {laps.map(lap => (
                <div
                    className="w-200 max-w-full bg-[#111] flex gap-3 items-center justify-between p-6 text-orange-400 mb-4"
                    key={lap.id}>
                    <span className='text-3xl text-orange-400 font-normal'>
                        Lap {lap.id}
                    </span>

                    <div className="flex items-end justify-center gap-1">
                        <Span2 className='text-3xl'>{lap.minutes}</Span2>
                        <Span2 className="text-3xl translate-y-1">:</Span2>
                        <Span2 className="text-3xl">{lap.seconds}</Span2>

                        <Span2 className="text-lg translate-y-0.3">
                            .{lap.milliseconds}
                        </Span2>
                    </div>
                </div>
            ))}


        </div >
    )
}

export default Stopwatch

// import { useEffect, useState, useRef } from "react";
// import "./styles.css";

// export default function Stopwatch() {
//   const [time, setTime] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     if (isRunning) {
//       intervalRef.current = setInterval(() => {
//         setTime((prev) => prev + 10);
//       }, 10);
//     } else {
//       clearInterval(intervalRef.current);
//     }

//     return () => clearInterval(intervalRef.current);
//   }, [isRunning]);

//   const formatTime = (ms) => {
//     const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
//     const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
//     const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");

//     return `${minutes}:${seconds}.${milliseconds}`;
//   };

//   return (
//     <div className="container">
//       <h1 className="time">{formatTime(time)}</h1>

//       <div className="buttons">
//         <button
//           className="start"
//           onClick={() => setIsRunning(true)}
//         >
//           Start
//         </button>

//         <button
//           className="stop"
//           onClick={() => setIsRunning(false)}
//         >
//           Stop
//         </button>

//         <button
//           className="reset"
//           onClick={() => {
//             setIsRunning(false);
//             setTime(0);
//           }}
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// }
