import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export class RequestError extends Error {
    code: number

    constructor(message: string, code: number) {
        super(message)
        this.name = 'RequestError'
        this.code = code
    }
}
