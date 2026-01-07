import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { ChevronLeft, Play, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

const Header = ({
    sliderMax = 100,
    algorithms,
    arraySize,
    setArraySize,
    algorithm,
    setAlgorithm,
    delayTime,
    setDelayTime,
    runAlgorithm,
    reset,
    isLoading
}) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between bg-[#090B13] text-white items-center md:p-2 gap-2 w-full'>
            <div className='flex p-2 w-full md:col-span-2 lg:col-span-1 items-center justify-center lg:justify-start py-2 lg:py-0'>
                <Link href={'/'} className="flex transition 300 hover:text-blue-400 cursor-pointer">
                    <ChevronLeft />
                </Link>
                <h4 className='ml-2 text-md lg:text-xl flex-1 text-center lg:text-start font-bold'>Searching Visualiser</h4>
            </div>


            <div className='h-full flex items-center px-3 lg:px-0 col-span-1'>
                <p className="text-sm w-fit">Array size</p>
                <div className='flex-1 ml-4'>
                    <Slider
                        disabled={isLoading}
                        onValueChange={(newValue) => setArraySize(newValue)}
                        defaultValue={[arraySize]}
                        max={sliderMax}
                        min={2}
                        step={5}
                        className={cn("", ' rounded-full')}
                    />
                </div>
            </div>

            <div className='p-3 md:p-0 flex items-center gap-2 md:justify-end'>
                <div className='w-full md:w-fit'>
                    <Select className="" disabled={isLoading} value={algorithm} onValueChange={(newValue) => [setAlgorithm(newValue), reset()]}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                            {algorithms.map(a => (
                                <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='w-full md:w-fit'>
                    <Select className="" disabled={isLoading} value={delayTime} onValueChange={(newValue) => [setDelayTime(newValue)]}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Delay" />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 25, 50, 75, 100, 125, 150].map(time => (
                                <SelectItem key={time} value={time}>{time}ms</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button disabled={isLoading} onClick={runAlgorithm} variant={'default'} className={'bg-blue-400 text-black hover:bg-gray-200 !disabled:bg-gray-200 disabled:text-gray-700 cursor-pointer'}>
                    <Play /> <span className='hidden md:block'>Run</span>
                </Button>

                <Button disabled={isLoading} onClick={reset} variant={'outlined'} className={'border cursor-pointer hover:text-gray-400 hover:border-gray-400'}>
                    <RefreshCcw />
                    <span className='hidden md:block'>Reset</span>
                </Button>

            </div>
        </div>
    )
}

export default Header