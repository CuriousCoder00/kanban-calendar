import React from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CalendarHeader = () => {
  return (
    <header className='sticky top-0 z-10 flex flex-col items-start justify-start p-4 bg-gradient-header w-full'>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-white font-bold text-lg">Your Schedule</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default CalendarHeader
