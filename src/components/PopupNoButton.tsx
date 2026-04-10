import { Select, SelectItem, SelectContent, SelectGroup, SelectTrigger, SelectValue } from './ui/select';

type PopupTypes = {
    array: string[];
    value: string;
    onChange: (value: string) => void;
}

const PopupNoButton = ({ array, onChange, value }: PopupTypes) => {
    return (
        <div className="flex flex-row">
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="bg-white text-black h-10 rounded-none flex items-center px-3 w-full text-md">
                    <SelectValue />
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
        </div>
    )
}

export default PopupNoButton
