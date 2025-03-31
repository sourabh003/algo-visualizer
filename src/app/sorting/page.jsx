'use client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { delay, generateUniqueArray } from '@/lib/utilities';
import { cn } from '@/lib/utils'
import { ChevronLeft, Database, Hourglass, Play, RefreshCcw, StopCircle, Timer } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


const algorithms = [
    {
        id: 'quick',
        label: 'Quick Sort',
    },
    {
        id: 'merge',
        label: 'Merge Sort',
    }, {
        id: 'selection',
        label: 'Selection Sort',
    }, {
        id: 'insertion',
        label: 'Insertion Sort',
    }, {
        id: 'bubble',
        label: 'Bubble Sort',
    }
]

export default function Sorting() {
    const [algorithm, setAlgorithm] = useState('')
    const [array, setArray] = useState([])
    const [arraySize, setArraySize] = useState(20)
    const [isLoading, setIsLoading] = useState(false)

    const [executionTime, setExecutionTime] = useState(0)
    const [delayTime, setDelayTime] = useState(25)

    const controller = new AbortController()


    const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = "Execution in progress!, Please stop the execution before exiting"; // Standard way to show a warning
    };

    useEffect(() => {
        let interval;

        if (isLoading) {
            // window.addEventListener("beforeunload", handleBeforeUnload);

            interval = setInterval(() => {
                setExecutionTime(prev => prev + 10)
            }, 10);
        } else {
            clearInterval(interval)
        }

        return () => {
            clearInterval(interval)
            // window.removeEventListener("beforeunload", handleBeforeUnload);
        }
    }, [isLoading])

    async function runSort() {

        let promiseFunc = null;
        switch (algorithm) {
            case 'quick':
                promiseFunc = quickSort;
                break;
            case 'merge':
                promiseFunc = mergeSort;
                break;
            case 'selection':
                promiseFunc = selectionSort;
                break;
            case 'insertion':
                promiseFunc = insertionSort;
                break;
            case 'bubble':
                promiseFunc = bubbleSort;
                break;
            default:
                toast.error('Select an algorithm')
                return;
        }
        if (!promiseFunc) return;

        setIsLoading(true)

        let promise = new Promise((resolve, reject) => {
            controller.signal.addEventListener("abort", () => {
                reject(new Error("Operation aborted"));
            });
            promiseFunc().then(resolve).catch(reject)
        })

        toast.promise(promise, {
            loading: 'Just a moment!',
            error: (error) => {
                if (error.message == "AbortError") return 'Execution terminated!';
                return 'Oops! Try again'
            },
            success: "Voila!"
        })

        promise.catch(err => {
            console.log({ err })
        }).finally(() => setIsLoading(false))
    }

    function reset() {
        setExecutionTime(0)
        setArray(generateUniqueArray(arraySize))
    }

    async function insertionSort() {
        let arr = [...array]

        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // if current element is greater than next element
                let j = i;
                // reverse iteration from current index to first index
                while (j >= 0) {
                    // checking if current item is greater than previous item
                    if (arr[j] > arr[j + 1]) {
                        // if yes, swapping the eleemnts
                        highlightSingleElement(j, false, 'yellow')
                        highlightSingleElement(j + 1, false, 'yellow')
                        await delay(delayTime)
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                        highlightSingleElement(j, true)
                        highlightSingleElement(j + 1, true)
                        setArray([...arr])
                    } else {
                        // if no, then breaking the inner loop, item reached the right position
                        break;
                    }
                    j--;
                }

            }
        }
    }

    async function bubbleSort() {
        let arr = [...array];

        let sortedIdx = arr.length - 1;
        while (sortedIdx > 0) {
            let i = 0;
            while (i < sortedIdx) {
                if (arr[i] > arr[i + 1]) {

                    highlightSingleElement(i, false, 'yellow')
                    highlightSingleElement(i + 1, false, 'yellow')

                    await delay(delayTime)
                    let temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;

                    highlightSingleElement(i, true)
                    highlightSingleElement(i + 1, true)

                    setArray([...arr])
                }
                i++;
            }
            sortedIdx--;
        }
    }

    function highlightSingleElement(i, normal = false, color = "#30BC8D") {
        document.getElementById("bar-" + i).style.backgroundColor = normal ? "#7AF2A8" : color;
    }

    async function selectionSort() {
        let arr = [...array]

        let sortedIndex = 0;
        for (let i = 0; i < arr.length; i++) {
            let smallestIndex = sortedIndex;

            highlightSingleElement(sortedIndex, false)
            await delay(delayTime)

            for (let j = sortedIndex; j < arr.length; j++) {
                highlightSingleElement(j, false, 'yellow')
                await delay(delayTime)
                if (arr[j] < arr[smallestIndex]) {
                    smallestIndex = j;
                }
                highlightSingleElement(j, true)
            }

            let temp = arr[sortedIndex]
            arr[sortedIndex] = arr[smallestIndex];
            arr[smallestIndex] = temp;
            await delay(delayTime)
            highlightSingleElement(sortedIndex, true)
            sortedIndex++;

            setArray([...arr])
        }
    }

    /**
     * Quick sort
     */

    async function quickSort() {
        let arr = [...array];
        // setExecutionTime(Date.now())
        await sort(arr, 0, arr.length - 1)

        setArray([...arr])
    }

    async function sort(arr, l, r) {
        if (l < r) {
            let i = l - 1;
            let j = l;
            let pivot = r;

            highlightSingleElement(pivot, false, 'red')
            await delay(delayTime);

            while (j < pivot) {
                if (arr[j] >= arr[pivot]) {
                    highlightSingleElement(j, false, 'yellow')
                    await delay(delayTime)
                    highlightSingleElement(j, true)
                    j++;
                } else {
                    // incrementing i before and j after swapping

                    if (i >= 0) highlightSingleElement(i, false, 'yellow')
                    highlightSingleElement(j, false, 'yellow')
                    await delay(delayTime);
                    if (i >= 0) highlightSingleElement(i, true)
                    highlightSingleElement(j, true)

                    swap(arr, ++i, j++)

                    highlightSingleElement(i, false, 'yellow')
                    highlightSingleElement(j, false, 'yellow')
                    await delay(delayTime);
                    highlightSingleElement(i, true)
                    highlightSingleElement(j, true)
                }


            }
            highlightSingleElement(pivot, true)
            swap(arr, ++i, pivot);

            setArray([...arr])

            await sort(arr, l, i - 1)
            await sort(arr, i + 1, r)
        }
    }

    function swap(arr, idx1, idx2) {
        let temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }

    /**
     * Quick sort END
     */

    /**
     * Merge sort
     */

    function hightlightRange(l, r, normal = false) {
        for (let i = l; i <= r; i++) {
            // document.getElementById("array-item-" + i).style.backgroundColor = normal ? "white" : "#ecf2bc";
            document.getElementById("bar-" + i).style.backgroundColor = normal ? "#7AF2A8" : 'yellow';
        }
    }

    async function mergeSort() {
        let arr = [...array]
        await divide(arr, 0, arr.length - 1)
    }

    async function divide(arr, l, r) {
        if (l < r) {
            let m = Math.floor(l + (r - l) / 2);

            await delay(delayTime)
            await divide(arr, l, m);
            await delay(delayTime)
            await divide(arr, m + 1, r);

            hightlightRange(l, r);
            await delay(delayTime);

            merge(arr, l, m, r);
            hightlightRange(l, r, true);
            setArray([...arr])
        }
    }

    function merge(arr, l, m, r) {
        let n1 = m - l + 1;
        let n2 = r - m;

        let leftArr = [];
        let rightArr = [];

        // Filling the left temp array
        for (let i = 0; i < n1; i++) {
            leftArr[i] = arr[l + i];
        }

        // Filling the right temp array
        for (let j = 0; j < n2; j++) {
            rightArr[j] = arr[m + 1 + j];
        }

        // doing comparision and sorting items accordingly
        let i = 0,
            j = 0,
            k = l;
        while (i < n1 && j < n2) {
            if (leftArr[i] < rightArr[j]) {
                arr[k] = leftArr[i++];
            } else {
                arr[k] = rightArr[j++];
            }
            k++;
        }

        // checking if leftArr still has items
        if (i < n1) {
            while (i < n1) {
                arr[k++] = leftArr[i++];
            }
        }

        // checking if rightArr still has items
        if (j < n2) {
            while (j < n2) {
                arr[k++] = rightArr[j++];
            }
        }
    }

    /**
     * Merge sort END
     */

    useEffect(() => {
        reset()
    }, [arraySize])

    return (
        <div className='h-screen flex flex-col'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between bg-[#090B13] text-white items-center md:p-2 gap-2'>

                <div className='flex p-2 w-full md:col-span-2 lg:col-span-1 items-center justify-center lg:justify-start py-2 lg:py-0'>
                    <Link href={'/'} className="flex transition 300 hover:text-blue-400 cursor-pointer">
                        <ChevronLeft />
                    </Link>
                    <h4 className='ml-2 text-md lg:text-xl flex-1 text-center lg:text-start font-bold'>Sorting Visualiser</h4>
                </div>


                <div className='h-full flex items-center px-3 lg:px-0 col-span-1'>
                    <p className="text-sm w-fit">Array size</p>
                    <div className='flex-1 ml-4'>
                        <Slider
                            disabled={isLoading}
                            onValueChange={(newValue) => setArraySize(newValue)}
                            defaultValue={[arraySize]}
                            max={100}
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

                    <Button disabled={isLoading} onClick={runSort} variant={'default'} className={'bg-blue-400 text-black hover:bg-gray-200 !disabled:bg-gray-200 disabled:text-gray-700 cursor-pointer'}>
                        <Play /> <span className='hidden md:block'>Run</span>
                    </Button>

                    <Button disabled={isLoading} onClick={reset} variant={'outlined'} className={'border cursor-pointer hover:text-gray-400 hover:border-gray-400'}>
                        <RefreshCcw />
                        <span className='hidden md:block'>Reset</span>
                    </Button>

                </div>
            </div>

            <div className="flex-1 flex flex-col p-2">
                <div className='p-2 justify-between flex'>

                    <div className="">
                        <div className='text-white flex items-center'>
                            <Timer className='w-5' />
                            <div className='ml-2'>Execution time: <span className='text-teal-500 font-bold'>{executionTime / 1000}s</span></div>
                        </div>

                        <div className='text-white flex items-center mt-2'>
                            <Database className='w-5' />
                            <div className='ml-2'>Input size: <span className='text-teal-500 font-bold'>{arraySize}</span></div>
                        </div>

                        <div className='text-white flex items-center mt-2'>
                            <Hourglass className='w-5' />
                            <div className='ml-2'>Execution delay: <span className='text-teal-500 font-bold'>{delayTime}ms</span></div>
                        </div>
                    </div>

                    {/* {isLoading && (
                        <Button
                            onClick={() => {
                                controller.abort()
                            }}
                            variant={'destructive'}
                            className={'cursor-pointer bg-red-400'}
                        >

                        </Button>
                    )} */}
                </div>

                <div className="w-full flex flex-col items-center flex-1 justify-center">
                    <div className='flex items-end gap-[1px] justify-center'>
                        {array.map((item, i) => (
                            <div
                                id={`bar-${i}`}
                                key={i}
                                className={cn("bg-green-300 border-green-400",
                                    array.length > 50 ? "w-[2px] md:w-[6px] lg:w-[12px]" : "w-[5px] md:w-[12px] lg:w-[28px]"
                                )}
                                style={{ height: item * 2 + "px" }}>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
