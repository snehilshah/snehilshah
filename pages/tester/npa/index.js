import DesignSVG from '../../../public/tester/design.svg';

export default function tester() {
    return (
        <main className='flex items-center justify-center flex-col'>
            <div className='text-7xl text-center p-8'>
                <h1 className=''>This page is only for testing purposes only</h1>
                <h2 className='text-red-700'>Please go away</h2>
            </div>
            <div className="flex w-full flex-col justify-center items-center gap-8">
                <img src='/tester/create.png' alt='Create' />
                <img src='/tester/macos.jpg' alt='macos' />
                <img src='/tester/windows.jpg' alt='windows' />
                <img src='/tester/design.svg' alt='svg design' />
            </div>
        </main>
    )
}
