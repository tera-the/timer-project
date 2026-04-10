import { useEffect, useState } from 'react';
import Arrows from '../components/ui/arrows';
import { Button } from '../components/ui/button';
import { Card, CardTitle } from '../components/ui/card';
import H1 from '../components/ui/H1';

const Timer = () => {
    const [time, setTime] = useState(3601);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        const timer = window.setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            })
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning])

    const formatTime = (num: number) => String(num).padStart(2, "0")
    3601

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const increaseTime = () => setTime(prev => {
        if (isRunning) return prev;
        return prev + 1;
    });

    const increaseTimeMinutes = () => setTime(prev => {
        if (isRunning) return prev;
        return prev + 60;
    });

    const increaseTimeHours = () => setTime(prev => {
        if (isRunning) return prev;
        return prev + 3600;
    });

    const decreaseTime = () => setTime(prev => {
        if (isRunning) return prev;
        return Math.max(0, prev - 1);
    });

    const decreaseTimeMinutes = () => setTime(prev => {
        if (isRunning) return prev;
        return Math.max(0, prev - 60);
    });

    const decreaseTimeHours = () => setTime(prev => {
        if (isRunning) return prev;
        return Math.max(0, prev - 3600);
    });

    const handleStart = () => {
        if (time <= 0) return;

        setIsRunning(true)
    }

    const handleStop = () => {
        setIsRunning(false)
    }

    const resetTimer = () => {
        setIsRunning(false);
        setTime(0)
    }

    return (
        <div className='pt-75 flex flex-col items-center'>
            <div className='mb-10'>
                <Arrows secondOnClick={increaseTime} minuteOnClick={increaseTimeMinutes} hourOnClick={increaseTimeHours} symbol='▲' />

                <div className='flex flex-row justify-center items-center gap-5 mt-2'>
                    <H1 className='text-9xl text-orange-400 font-clock select-none'>{formatTime(hours)}</H1>
                    <H1 className='text-9xl font-clock select-none'>:</H1>
                    <H1 className='text-9xl text-orange-400 font-clock select-none'>{formatTime(minutes)}</H1>
                    <H1 className='text-9xl font-clock select-none'>:</H1>
                    <H1 className='text-9xl font-clock select-none'>{formatTime(seconds)}</H1>
                </div>

                <Arrows secondOnClick={decreaseTime} minuteOnClick={decreaseTimeMinutes} hourOnClick={decreaseTimeHours} symbol='▼' />
            </div>

            <CardTitle className='text-center text-lg mb-13 text-orange-400'>
                {isRunning ? 'Running' : 'Stopped'}
            </CardTitle>

            <div className='flex justify-center gap-3'>
                <Button size={'lg'} onClick={handleStart} className="bg-green-500 hover:bg-green-600 cursor-pointer font-normal rounded-none">Start</Button>

                <Button size={'lg'} onClick={resetTimer} className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer font-normal rounded-none">Reset</Button>

                <Button size={'lg'} onClick={handleStop} className="bg-blue-500 hover:bg-blue-600 cursor-pointer font-normal rounded-none">Stop</Button>
            </div>

        </div>
    )
}

export default Timer
