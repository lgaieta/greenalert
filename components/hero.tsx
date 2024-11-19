import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
    return (
        <section className='w-full pt-12 md:pt-24 lg:pt-32'>
            <div className='container space-y-10 xl:space-y-16'>
                <div className='grid gap-4 px-10 md:grid-cols-2 md:gap-16'>
                    <div>
                        <h1 className='lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]'>
                            Visualizá los problemas ambientales más comunes
                        </h1>
                    </div>
                    <div className='flex flex-col items-start space-y-4'>
                        <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                            Nuestra página muestra y registra los incidentes ambientales
                            en Argentina a través de nuestro mapa interactivo.
                        </p>
                        <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                            <Button asChild>
                                <Link href='/mapa'>Ver mapa</Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <Image
                    alt='Hero'
                    className='mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover'
                    height='300'
                    src='/map-argentina.webp'
                    width='1270'
                />
            </div>
        </section>
    )
}
