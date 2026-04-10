import { EllipsisVertical, Monitor, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { timezones } from '../assets/timezones';
import PopupNoButton from '../components/PopupNoButton';
import { Button } from '../components/ui/button';
import { Card, CardDescription, CardTitle } from '../components/ui/card';
import H1 from '../components/ui/H1';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import Span from '../components/ui/Span';

const Clock = () => {
    const [time, setTime] = useState(new Date());
    const [openedIndex, setOpenedIndex] = useState<null | number>(null);
    const [popupOpened, setIsPopupOpened] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
    const [zones, setZones] = useState(timezones);
    const [editCity, setEditCity] = useState('asd');
    const [editTitle, setEditTitle] = useState('');

    useEffect(() => {

        const timer = window.setInterval(() => {
            setTime(new Date());
        }, 1000);


        return () => clearInterval(timer);
    }, [])

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }

    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }

    const getTimezone = (tz: string) => {
        return time.toLocaleTimeString('en-US', {
            timeZone: tz,
            hour: '2-digit',
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        })
    }

    const formattedTime = time.toLocaleTimeString(undefined, timeOptions)
    const formattedDate = time.toLocaleDateString(undefined, dateOptions).replace(',', ' -')

    const closePopup = () => {
        setIsPopupOpened(false);
        setSelectedIndex(null)
        setOpenedIndex(null)
    }
    const openPopup = (index: number) => {
        setSelectedIndex(index)

        const zone = zones[index];
        setEditCity(zone.city);
        setEditTitle(`${zone.city} Timezone`);

        setIsPopupOpened(true);
        setOpenedIndex(null);
    }

    const hoverLinkLogic = (index: number) => {
        return `${selectedIndex === index ? 'bg-hover-link' : 'bg-[#111]'}`;
    }

    const whiteTextLogic = (index: number) => {
        return `${selectedIndex === index ? 'text-white' : 'text-orange-400'}`;
    }

    const handleEditCity = (value: string) => {
        if (selectedIndex === null) return;

        const oldCity = editCity;

        setEditCity(value);

        if (editTitle === '' || editTitle === `${oldCity} Timezone` || editTitle === `${value} Timezone`) {
            setEditTitle(`${value} Timezone`);
        }
    }

    const handleEdit = () => {
        if (selectedIndex === null) return;

        const newZone = timezones.find(z => z.city === editCity);
        if (!newZone) return;

        const updated = [...zones];

        updated[selectedIndex] = {
            ...newZone,
            city: editTitle || newZone.city,
        }

        setZones(updated)
        closePopup();

    }

    const handleBeginning = (index: number) => {
        if (index === 1) return;

        const zoneArray = [...zones];

        const [item] = zoneArray.splice(index, 1);
        zoneArray.unshift(item);

        setZones(zoneArray);
        setOpenedIndex(null);
    }


    const handleUp = (index: number) => {
        if (index === 0) return;

        const zoneArray = [...zones];

        const temp = zoneArray[index];
        zoneArray[index] = zoneArray[index - 1];
        zoneArray[index - 1] = temp;

        setZones(zoneArray);
        setOpenedIndex(null);
    }


    const handleDown = (index: number) => {
        if (index === zones.length - 1) return;

        const zoneArray = [...zones];

        const currentIndex = zoneArray[index];
        zoneArray[index] = zoneArray[index + 1];
        zoneArray[index + 1] = currentIndex;

        setZones(zoneArray);
        setOpenedIndex(null);
    }

    const handleDelete = (index: number) => {
        const zoneArray = [...zones];

        const updated = zoneArray.filter((_, i) => i !== index);

        setZones(updated);
        setOpenedIndex(null);
    }


    return (
        <div className='flex flex-col pt-85 items-center'>
            <Span className='mb-5'>Precise time</Span>

            <H1 className='mb-5'>{formattedTime}</H1>

            <Span className='text-4xl'>{formattedDate}</Span>

            {/* Timezones */}

            <div className='grid grid-cols-3 gap-4 mt-40'>
                {zones.map((timezone, index) => (
                    <div key={timezone.city}>
                        <Card className={`relative rounded-none w-60 ${hoverLinkLogic(index)}`}>
                            <div className='flex items-center justify-between'>
                                <CardTitle className={`${whiteTextLogic(index)} truncate p-4 font-light text-xl`}>{timezone.city}</CardTitle>

                                <div className='mt-1 flex items-center gap-2'>
                                    <Monitor className='cursor-pointer' size={20}
                                        color={`${selectedIndex === index ? '#fff' : 'oklch(75% 0.183 55.934)'}`}
                                    />
                                    <EllipsisVertical
                                        className='cursor-pointer'
                                        size={20}
                                        color={`${selectedIndex === index ? '#fff' : 'oklch(75% 0.183 55.934)'}`}
                                        onClick={() => setOpenedIndex(openedIndex === index ? null : index)} />
                                </div>

                                {openedIndex === index && (
                                    <div className='absolute top-13 right-0 z-10 min-w-40  bg-[#484848] flex flex-col'>
                                        <Button className='text-white justify-start py-6 px-7 font-extralight text-md cursor-pointer rounded-none hover:bg-hover-link' variant={'link'} onClick={() => openPopup(index)}>Edit</Button>

                                        <Separator className='bg-[#bbbbbb]' />

                                        <Button onClick={() => handleBeginning(index)} className='text-white justify-start py-5 px-7 font-extralight text-md cursor-pointer rounded-none hover:bg-hover-link' variant={'link'}>To the beginning</Button>
                                        <Button onClick={() => handleUp(index)} className='text-white justify-start py-5 px-7 font-extralight text-md cursor-pointer rounded-none hover:bg-hover-link' variant={'link'}>Up</Button>
                                        <Button onClick={() => handleDown(index)} className='text-white justify-start py-5 px-7 font-extralight text-md cursor-pointer rounded-none hover:bg-hover-link' variant={'link'}>Down</Button>

                                        <Separator className='bg-[#bbbbbb]' />

                                        <Button onClick={() => handleDelete(index)} className='text-white justify-start py-6 px-7 font-extralight text-md cursor-pointer rounded-none hover:bg-hover-link' variant={'link'}>Delete</Button>
                                    </div>
                                )}

                            </div>

                            <Separator className={`${selectedIndex === index ? 'bg-white' : 'bg-[#393939]'}`} />

                            <div className='py-4'>
                                <CardDescription className={`text-4xl ${whiteTextLogic(index)} font-clock mt-1 text-center`}>{getTimezone(timezone.timezone)}</CardDescription>
                                <CardDescription className={`${whiteTextLogic(index)} text-lg text-center mt-2`}>{timezone.offset}</CardDescription>
                            </div>

                        </Card>
                    </div>
                ))
                }
            </div >

            {popupOpened && (
                <div
                    className="bg-black/50 fixed inset-0 flex items-center justify-center p-4"
                    onClick={() => closePopup()}>

                    <div className=" bg-[#737373] w-full max-w-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 py-6 bg-background-link">
                            <span className="text-white text-2xl font-light">Edit</span>
                            <X className="cursor-pointer" color="#bbb" onClick={closePopup} size={18} />
                        </div>

                        <div className="bg-[#737373] p-4 flex flex-col gap-3">

                            <div>
                                <p className='text-md text-white mb-3'>City</p>

                                <PopupNoButton
                                    array={timezones.map(c => c.city)}
                                    value={editCity}
                                    onChange={handleEditCity} />
                            </div>


                            <div>
                                <p className='text-md text-white mb-3'>Title</p>

                                <Input
                                    className='bg-white h-10 rounded-none flex items-center px-3 w-full text-lg' value={editTitle}
                                    onChange={(e) => setEditTitle(e.currentTarget.value)} />
                            </div>

                        </div>

                        <Separator className='my-2' />

                        <div className="bg-[#737373] p-4 flex justify-end gap-2">
                            <Button onClick={closePopup} size={'default'} variant={'cancel'}>Cancel</Button>
                            <Button onClick={handleEdit} size={'default'} variant={'ok'}>OK</Button>
                        </div>

                    </div>

                </div>
            )}

        </div >
    )
}

export default Clock
