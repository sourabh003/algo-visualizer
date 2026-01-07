'use client';;
import Header from '@/components/layout/Header';
import Stats from '@/components/layout/Stats';
import { delay, generateDistinctArray, generateUniqueArray } from '@/lib/utilities';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const algorithms = [
    { id: 'linear', label: 'Linear Search' },
    { id: 'binary', label: 'Binary Search' },
]

const colorPalette = {
    'target': ['bg-red-300', 'border-red-600', 'text-red-900'],
    'reached': ['bg-sky-500', 'border-sky-600', 'text-sky-900', 'animate-pulse'],
    'search': ['bg-teal-500', 'border-teal-600', 'text-teal-900'],
    'default': ['bg-purple-300', 'border-purple-400', 'text-purple-900'],
    'divider': ['bg-yellow-300', 'border-yellow-400', 'text-yellow-900'],
}

export default function Searching() {
    const [algorithm, setAlgorithm] = useState('linear')
    const [array, setArray] = useState([])
    const [arraySize, setArraySize] = useState(20)
    const [isLoading, setIsLoading] = useState(false)

    const [executionTime, setExecutionTime] = useState(0)
    const [delayTime, setDelayTime] = useState(25)
    const [target, setTarget] = useState(null)

    const runSearch = useCallback(async () => {
        if (!target) {
            return toast.error("Please pick a target by clicking on any box!");
        }
        setIsLoading(true)

        switch (algorithm) {
            case 'binary':
                await binarySearch(target);
                break;
            case 'linear':
                await linearSearch(target);
                break;
            default:
                setIsLoading(false);
                return toast.error("No Algorithm Selected!");
        }
    }, [algorithm, array, delayTime, target])

    function reset() {
        setExecutionTime(0)
        const newArray = generateDistinctArray(arraySize, false)
        setArray(newArray)
        newArray.forEach(item => {
            const box = document.getElementById(`box-${item}`);
            if (box) {
                box.classList.remove(...colorPalette.search);
                box.classList.remove(...colorPalette.reached);
                box.classList.remove(...colorPalette.target);
                box.classList.remove(...colorPalette.divider);
                box.classList.add(...colorPalette.default);
            }
        })
        updateTarget(null)
    }

    useEffect(() => {
        setArray(generateDistinctArray(arraySize, false))
    }, [arraySize])

    function highlightBox(item, type) {
        const box = document.getElementById(`box-${item}`);
        if (box) {
            if (type === 'divider') {
                box.classList.add(...colorPalette.divider);
                return;
            }
            if (type === "reached") {
                box.classList.add(...colorPalette.reached);
                return;
            }
            box.classList.add(...colorPalette.search);
        }
    }

    function highlightRange(start, end) {
        for (let i = start; i <= end; i++) {
            const box = document.getElementById(`box-${array[i]}`);
            if (box) {
                box.classList.add(...colorPalette.search);
            }
        }
    }

    async function binarySearch(target) {
        let left = 0;
        let right = array.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            highlightBox(array[mid], 'divider');
            await delay(delayTime);
            recursiveBinarySearch(target, left, right);
            return;
        }
    }

    async function recursiveBinarySearch(target, left, right) {
        if (left > right) {
            return;
        }

        const mid = Math.floor((left + right) / 2);
        if (array[mid] !== target) {
            highlightBox(array[mid], 'divider');
        }
        await delay(delayTime);

        if (array[mid] === target) {
            highlightBox(array[mid], 'reached');
            setIsLoading(false);
            setExecutionTime((Math.abs(right - left) + 1) * delayTime);
            toast.success(`Target ${target} found at index ${mid}!`);
            return;
        } else if (array[mid] < target) {
            highlightRange(left, mid);
            await delay(delayTime);
            return recursiveBinarySearch(target, mid + 1, right);
        } else {
            highlightRange(mid, right);
            await delay(delayTime);
            return recursiveBinarySearch(target, left, mid - 1);
        }
    }

    async function linearSearch(target) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] !== target) {
                highlightBox(array[i]);
                await delay(delayTime);
            } else {
                highlightBox(array[i], 'reached');
                setIsLoading(false);
                setExecutionTime((i + 1) * delayTime);
                toast.success(`Target ${target} found at index ${i}!`);
                return;
            }
        }
    }

    function updateTarget(item) {
        setTarget(prev => {
            const prevBox = document.getElementById(`box-${prev}`);
            if (prevBox) {
                prevBox.classList.remove(...colorPalette.target);
                prevBox.classList.add(...colorPalette.default);
            }
            return item
        })

        if (item !== null) {
            const box = document.getElementById(`box-${item}`);
            if (box) {
                box.classList.remove(...colorPalette.default);
                box.classList.add(...colorPalette.target);
            }
        }
    }



    return (
        <div className='h-screen flex flex-col'>
            <Header
                sliderMax={70}
                algorithms={algorithms}
                arraySize={arraySize}
                setArraySize={setArraySize}
                algorithm={algorithm}
                setAlgorithm={setAlgorithm}
                delayTime={delayTime}
                setDelayTime={setDelayTime}
                runAlgorithm={runSearch}
                reset={reset}
                isLoading={isLoading}
            />

            <div className="flex-1 flex flex-col p-2">
                <div className='p-2 justify-between flex'>
                    <Stats
                        algorithm={'searching'}
                        target={target}
                        executionTime={executionTime}
                        arraySize={arraySize}
                        delayTime={delayTime}
                    />
                </div>

                <div className="w-full flex flex-col items-center flex-1 justify-center">
                    <div className="w-full flex items-center justify-between gap-[1px] md:gap-1 rounded-lg">
                        {array.map((item, i) => (
                            <div
                                key={item}
                                id={`box-${item}`}
                                onClick={() => updateTarget(item)}
                                className={cn(
                                    'cursor-pointer hover:scale-95',
                                    "flex-1 flex items-center justify-center border transition-all aspect-square rounded-sm",
                                    colorPalette.default,
                                    // Logic for 30 / 60 breakpoints
                                    array.length > 60
                                        ? "min-w-[4px] text-[6px]" // Super slim for 60+
                                        : array.length > 30
                                            ? "min-w-[10px] text-[10px]" // Medium for 30-60
                                            : "min-w-[20px] text-sm font-bold" // Large for < 30
                                )}
                            >
                                {/* Hide text if it's too cramped (over 60 items) on mobile */}
                                <span className={cn(
                                    "select-none",
                                    array.length > 60 ? "hidden lg:block" :
                                        array.length > 30 ? "hidden md:block" : "block"
                                )}>
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}