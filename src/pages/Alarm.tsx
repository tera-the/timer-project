import { AlarmClock, Clock, X } from "lucide-react"
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { Button } from "../components/ui/button"
import H1 from "../components/ui/H1"
import { Input } from "../components/ui/input"
import PopUpItem from "../components/ui/PopUpItem"
import { Separator } from "../components/ui/separator"
import Span from "../components/ui/Span"
import ALARM_VALUES from "../consts/consts"
import audioSound from '../assets/alarm.mp3'
import useLocalStorage from "../hooks/useLocalStorage"

const Alarm = () => {
    const [time, setTime] = useState(new Date())
    const [popupOpened, setIsPopupOpened] = useState(false)
    const [hour, setHour] = useLocalStorage("alarm-hour", ALARM_VALUES.ALARM_HOUR);
    const [minute, setMinute] = useLocalStorage("alarm-minute", ALARM_VALUES.ALARM_MINUTE);
    const [title, setTitle] = useLocalStorage("alarm-title", ALARM_VALUES.ALARM_TITLE);
    const [alarmStarted, setAlarmStarted] = useLocalStorage("alarm-started", false);
    const [timeToAlarm, setTimeToAlarm] = useState<number>(0);
    const [isRinging, setIsRinging] = useState(false);
    const [error, setError] = useState('');
    const [isTesting, setIsTesting] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio(audioSound)
        audioRef.current.loop = true;

        return () => {
            audioRef.current?.pause();
            audioRef.current = null
        }
    }, [])

    useEffect(() => {
        const timer = window.setInterval(() => {
            setTime(new Date())
        }, 1000);

        return () => clearInterval(timer);
    }, [])

    useEffect(() => {
        if (!alarmStarted) return;

        const now = new Date();
        const alarmTime = new Date();

        alarmTime.setHours(Number(hour), Number(minute), 0, 0);

        const diff = alarmTime.getTime() - now.getTime();

        if (diff <= 0 && diff > -1000) {
            handleRinging();
            return;
        }

        if (diff < 0) {
            alarmTime.setDate(alarmTime.getDate() + 1)
        }

        const nextDiff = alarmTime.getTime() - now.getTime();
        setTimeToAlarm(nextDiff);
    }, [time, hour, minute, alarmStarted])


    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }

    const timeOptions: Intl.DateTimeFormatOptions = {
        timeStyle: "medium",
        hour12: false,
    }

    const date = time.toLocaleDateString('en-US', dateOptions)
    const formattedTime = time.toLocaleTimeString(undefined, timeOptions)
    const formattedDate = date.replace(',', ' -')

    const closePopup = () => setIsPopupOpened(false);

    const openPopup = () => {
        setAlarmStarted(false);
        setIsRinging(false);
        setIsPopupOpened(true);
    }

    const handleCloseAlarm = () => {
        setAlarmStarted(false);
        setTitle(ALARM_VALUES.ALARM_TITLE);
    }

    const handleStart = () => {
        if (!title.trim()) {
            setError("Enter the title");
            return;
        }

        setError("");
        setAlarmStarted(true);
        closePopup();
    }

    const handleRinging = () => {
        setIsRinging(true);
        setAlarmStarted(false);

        audioRef.current?.play().catch((err) => {
            alert('Error' + err)
        })
    }

    const handleStopRinging = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsRinging(false);
    }

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setTitle(value)

        if (value.trim()) {
            setError("");
        }
    }

    const handleTestSound = () => {
        setIsTesting(true);
        audioRef.current?.play().catch((err) => {
            alert('Error' + err)
        })
    }

    const handleStopTesting = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsTesting(false);
    }

    const hoursArray = Array.from({ length: 24 }, (_, i) =>
        i.toString().padStart(2, '0')
    )

    const minutesArray = Array.from({ length: 60 }, (_, i) =>
        i.toString().padStart(2, '0')
    )

    const totalSeconds = Math.floor(timeToAlarm / 1000);

    const hoursLeft = Math.floor(totalSeconds / 3600);
    const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
    const secondsLeft = totalSeconds % 60;

    return (
        <div className='pt-85 flex flex-col items-center'>
            <div className="flex flex-col items-center justify-center text-center mb-13 select-none">
                <H1 className="mb-2">
                    {formattedTime}
                </H1>

                <Span>
                    {formattedDate}
                </Span>
            </div>

            {popupOpened && (
                <div
                    className="bg-black/50 fixed inset-0 flex items-center justify-center p-4"
                    onClick={() => closePopup()}>

                    <div className=" bg-[#737373] w-full max-w-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 bg-[#393939]">
                            <span className="text-white text-2xl font-normal">Alarm setting</span>
                            <X className="cursor-pointer" color="#bbb" onClick={closePopup} size={18} />
                        </div>

                        <div className="bg-[#737373] p-4 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <PopUpItem title='Hour' value={hour} onChange={setHour} array={hoursArray} />
                                <PopUpItem title='Minute' value={minute} onChange={setMinute} array={minutesArray} />
                            </div>
                            <div className="flex gap-2 flex-col">
                                <span className="text-white font-light">Title</span>
                                <Input placeholder="Alarm at.." className="bg-white rounded-none flex items-center px-4 py-3 flex-1" value={title}
                                    onChange={handleTitle} />
                            </div>
                            {error && (
                                <span className="text-red-500 text-sm font-normal text-center">
                                    {error}
                                </span>
                            )}
                        </div>

                        <Separator className="my-2" />


                        <div className="p-4 flex items-center justify-between">

                            {isTesting ?
                                <Button className="px-7 font-normal text-white cursor-pointer tracking-wide rounded-none bg-red-500 hover:bg-red-500 py-2"
                                    onClick={handleStopTesting}
                                >
                                    Stop
                                </Button>
                                :
                                <Button className="px-7 font-normal text-black cursor-pointer tracking-wide rounded-none bg-white hover:bg-gray-300 py-2"
                                    onClick={handleTestSound}
                                >
                                    Test
                                </Button>
                            }

                            <div className="flex gap-3">
                                <Button className="px-7 text-black cursor-pointer font-normal rounded-none bg-white hover:bg-gray-300 py-2" onClick={closePopup}>
                                    Cancel
                                </Button>
                                <Button onClick={handleStart} className="px-7 text-white font-normal rounded-none bg-green-500 hover:bg-green-600 cursor-pointer py-2">
                                    Start
                                </Button>
                            </div>
                        </div>

                    </div>

                </div>
            )}

            {isRinging && (
                <div
                    className="bg-black/50 fixed inset-0 flex items-center justify-center p-4"
                    onClick={() => closePopup()}>

                    <div className=" bg-[#737373] w-full max-w-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 bg-[#393939]">
                            <span className="text-white text-2xl font-normal">Alarm</span>
                            <X className="cursor-pointer" color="#bbb"
                                onClick={handleStopRinging}
                                size={18} />
                        </div>

                        <div className="bg-[#737373] p-4 flex flex-col gap-4 justify-center items-center">
                            <AlarmClock size={50} color="oklch(70.4% 0.191 22.216)" className="mb-5" />
                            <Span className="text-white">{title}</Span>

                            <Span className="text-white text-2xl">
                                {String(hour).padStart(2, "0")}:
                                {String(minute).padStart(2, "0")}
                            </Span>
                        </div>

                        <Separator className="my-2" />


                        <div className="p-4 flex items-center justify-center">
                            <Button className="px-7 font-normal text-white cursor-pointer tracking-wide rounded-none bg-red-400 hover:bg-red-500 py-2"
                                onClick={handleStopRinging}
                            >
                                OK
                            </Button>
                        </div>

                    </div>

                </div>
            )}

            <Button onClick={() => openPopup()} className="bg-green-500 hover:bg-green-600 cursor-pointer font-normal rounded-none">Set an alarm</Button>

            {alarmStarted && (
                <div className="w-200 mt-25 max-w-full bg-[#111] flex flex-col items-center justify-center p-6 text-orange-400">
                    <div className="mb-4">
                        <Span>
                            {title}
                        </Span>
                    </div>

                    <h1 className='text-2xl mb-2 text-orange-400 font-clock flex items-center gap-2'>
                        <Clock color={'oklch(75% 0.183 55.934)'} size={23} />
                        {hour}:{minute}
                    </h1>

                    <h1 className='mb-5 text-sm text-orange-400 font-clock flex items-center gap-2'>
                        <Clock color={'oklch(75% 0.183 55.934)'} size={15} />
                        {String(hoursLeft).padStart(2, "0")}:
                        {String(minutesLeft).padStart(2, "0")}:
                        {String(secondsLeft).padStart(2, "0")}
                    </h1>

                    <Button className="px-7 text-white font-normal rounded-none bg-red-500 hover:bg-red-600 cursor-pointer py-2"
                        onClick={handleCloseAlarm}
                    >
                        Disable alarm
                    </Button>

                </div>
            )}

        </div>
    )
}

export default Alarm
