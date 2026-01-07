import { Crosshair, Database, Hourglass, Timer } from 'lucide-react'
import React, { memo } from 'react'

const Stats = ({
    algorithm = "sorting",
    executionTime,
    arraySize,
    delayTime,
    target = null
}) => {
    return (
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

            {algorithm === "searching" && <div className='text-white flex items-center mt-2'>
                <Crosshair className='w-5' />
                <div className='ml-2'>Target: <span className='text-teal-500 font-bold'>{target ?? "null"}</span></div>
            </div>}

        </div>
    )
}

export default memo(Stats);