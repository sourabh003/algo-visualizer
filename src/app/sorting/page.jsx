'use client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { delay, generateUniqueArray } from '@/lib/utilities';
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';


const algorithms = [
    {
        id: 'quick',
        label: 'Quick Sort',
    }, {
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
    const [algorithm, setAlgorithm] = useState('selection')
    const [array, setArray] = useState([])
    const [arraySize, setArraySize] = useState(10)
    const [isLoading, setIsLoading] = useState(false)




    async function runSort() {
        setIsLoading(true)

        let promise;
        switch (algorithm) {
            case 'quick':
                promise = quickSort();
                break;
            case 'merge':
                promise = mergeSort()
                break;
            case 'selection':
                promise = selectionSort();
                break;
            case 'insertion':
                promise = quickSort();
                break;
            case 'bubble':
                promise = quickSort();
                break;
            default:
                toast.error('Select an algorithm')
                setIsLoading(false)
                return;
        }
        if (!promise) return;
        toast.promise(promise, { loading: 'Just a sec!', error: 'Oops! Try again', success: "Voila!" })
        promise.finally(() => setIsLoading(false))
    }

    function insertionSort() {

    }

    function bubbleSort() {

    }

    function hightlight2(i, normal = false, color = "#30BC8D") {
        document.getElementById("bar-" + i).style.backgroundColor = normal ? "#7AF2A8" : color;
    }

    async function selectionSort() {
        let arr = [...array]

        console.log('before => ', arr)

        let sortedIndex = 0;
        for (let i = 0; i < arr.length; i++) {
            let smallestIndex = sortedIndex;

            hightlight2(sortedIndex, false, 'red')

            for (let j = sortedIndex; j < arr.length; j++) {
                hightlight2(j, false, 'yellow')
                await delay(50)
                if (arr[j] < arr[smallestIndex]) {
                    smallestIndex = j;
                }
                hightlight2(j, true)
            }
            hightlight2(sortedIndex, true)

            let temp = arr[sortedIndex]
            arr[sortedIndex] = arr[smallestIndex];
            arr[smallestIndex] = temp;

            sortedIndex++;

            setArray([...arr])
        }

        console.log('after => ', arr)
    }

    async function quickSort() {

    }

    /**
     * Merge sort
     */

    function hightlight(l, r, normal = false) {
        for (let i = l; i <= r; i++) {
            // document.getElementById("array-item-" + i).style.backgroundColor = normal ? "white" : "#ecf2bc";
            document.getElementById("bar-" + i).style.backgroundColor = normal ? "#7AF2A8" : "#30BC8D";
        }
    }

    async function mergeSort() {
        let arr = [...array]
        await divide(arr, 0, arr.length - 1)
    }

    async function divide(arr, l, r) {
        if (l < r) {
            let m = Math.floor(l + (r - l) / 2);

            await delay(100)
            await divide(arr, l, m);
            await delay(100)
            await divide(arr, m + 1, r);

            hightlight(l, r);
            await delay(100);

            merge(arr, l, m, r);
            hightlight(l, r, true);
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
        setArray(generateUniqueArray(arraySize))
    }, [arraySize])

    return (
        <div className='h-screen flex flex-col'>
            <div className='flex justify-between bg-[#090B13] text-white items-center p-3'>
                <h4 className=''>Sorting Visualiser</h4>

                <div className='w-[50%] h-full flex items-center'>
                    <p className="text-sm w-fit">Set array</p>
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

                <div>
                    <Select disabled={isLoading} value={algorithm} onValueChange={(newValue) => setAlgorithm(newValue)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                            {algorithms.map(a => (
                                <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>


                <div className="flex gap-2">
                    <Button disabled={isLoading} onClick={runSort} variant={'default'} className={'bg-white text-black hover:bg-gray-200 !disabled:bg-gray-200 disabled:text-gray-700'}>
                        Sort
                    </Button>

                    <Button disabled={isLoading} onClick={() => setArray(generateUniqueArray(arraySize))} variant={'outlined'} className={'border'}>
                        Reset
                    </Button>
                </div>

            </div>

            <div className="flex-1 grid place-items-center">
                <div className='p-2'>

                    <div className='flex items-end gap-[1px]'>
                        {array.map((item, i) => (
                            <div
                                id={`bar-${i}`}
                                key={i}
                                className={cn("bg-green-300 border-green-400 ",
                                    array.length > 50 ? "w-[12px]" : "w-[28px]"
                                )}
                                style={{ height: item * 2 + "px" }}>
                            </div>
                        ))}
                    </div>
                    {/* <div className='flex gap-[1px]'>
                        {array.map((item, i) => (
                            <div id={`array-item-${i}`} key={i} className={`w-[28px] flex flex-col h-[50%] justify-end`}>
                                <div className='p-1 text-sm grid place-items-center'>{item}</div>
                            </div>
                        ))}
                    </div> */}
                </div>

            </div>
        </div>
    )
}
