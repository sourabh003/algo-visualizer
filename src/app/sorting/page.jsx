'use client';;
import Header from '@/components/layout/Header';
import Stats from '@/components/layout/Stats';
import { delay, generateUniqueArray } from '@/lib/utilities';
import { cn } from '@/lib/utils'
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
    const [algorithm, setAlgorithm] = useState('quick')
    const [array, setArray] = useState([])
    const [arraySize, setArraySize] = useState(20)
    const [isLoading, setIsLoading] = useState(false)

    const [executionTime, setExecutionTime] = useState(0)
    const [delayTime, setDelayTime] = useState(25)


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
            <Header
                algorithms={algorithms}
                arraySize={arraySize}
                setArraySize={setArraySize}
                algorithm={algorithm}
                setAlgorithm={setAlgorithm}
                delayTime={delayTime}
                setDelayTime={setDelayTime}
                runAlgorithm={runSort}
                reset={reset}
                isLoading={isLoading}
            />

            <div className="flex-1 flex flex-col p-2">
                <div className='p-2 justify-between flex'>
                    <Stats
                        executionTime={executionTime}
                        arraySize={arraySize}
                        delayTime={delayTime}
                    />
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