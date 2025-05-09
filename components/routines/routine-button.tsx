'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

interface RoutineButtonProps {
  routineName: string;
}

export default function RoutineButton({ routineName }: RoutineButtonProps) {
    return (
        <div className="flex items-center rounded-lg  border border-gray-200 dark:border-gray-700 shadow-sm p-2 bg-white dark:bg-black">
            <Button variant="ghost" className="flex-1 hover:bg-transparent lg:px-48 sm:px-24 text-start">
                {routineName}
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon"  >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Routine</DropdownMenuItem>
                    <DropdownMenuItem>Delete Routine</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            
        </div>
    )
}