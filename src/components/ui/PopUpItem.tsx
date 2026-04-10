import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from './button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './select';

type PopUpItemProps = {
    array: string[];
    value: string;
    onChange: (val: string) => void;
    title?: string;
}

const PopUpItem = ({ array, value, onChange, title }: PopUpItemProps) => {

    const handleNext = () => {
        const currentIndex = array.indexOf(value);

        const newIndex = (currentIndex + 1) % array.length;
        onChange(array[newIndex])
    }

    const handlePrev = () => {
        const currentIndex = array.indexOf(value);
        const newIndex = (currentIndex - 1 + array.length) % array.length;
        onChange(array[newIndex])
    }


    return (
        <div className='flex flex-col'>
            <span className="text-white mb-2 font-light">{title}</span>

            <div className="flex flex-row">
                <Button onClick={handlePrev} className="bg-[#ababab] rounded-none px-4 py-6 text-gray-600 cursor-pointer hover:bg-[#b3b3b3]"><ArrowLeft /></Button>
                <Select value={value} onValueChange={onChange}>
                    <SelectTrigger className="bg-white h-12 rounded-none flex items-center px-3 w-40 text-md">
                        <SelectValue placeholder={value} />
                    </SelectTrigger>
                    <SelectContent className='overflow-y-auto max-h-125'>
                        <SelectGroup>
                            {array.map((time) => (
                                <SelectItem key={time} value={time}>
                                    {time}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button onClick={handleNext} className="bg-[#ababab] cursor-pointer  rounded-none px-4 py-6 text-gray-600 hover:bg-[#b3b3b3]"><ArrowRight /></Button>
            </div>
        </div>
    )
}

export default PopUpItem
