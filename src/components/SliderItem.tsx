import Image from 'next/image'
import arrow from '../assets/images/arrow.svg';
import firstImage from '../assets/images/slider/slider-1.svg'

const SliderItem = ({ className, arrows }: { className: string, arrows: boolean }): JSX.Element => {
    return (
        <div className={`w-[340px] h-full ${className} flex px-[10px] rounded-3xl relative`}>
            {arrows ? (
                <div className="absolute w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center left-[-20px] top-[50%] mt-[-25px] shadow-2xl shadow-black z-30 cursor-pointer">
                    <Image src={arrow} alt='arrow icon' />
                </div>
            ): null}
            
            <div className="h-full w-[50%] flex flex-col items-start justify-center">
                <h2>Are you ready to <span className='font-bold'>lead the way</span></h2>
                <p>Luxury meets ultimate sitting comfort</p>
                <button className='bg-black w-[120px] h-[50px] lg:w-[155px] lg:h-[60px] text-[#D0AD37] text-[20px] rounded-3xl'>Discover </button>
                </div>
                <div className="w-[50%] h-full flex justify-center items-center relative">
                <p className='absolute z-10 text-[80px] font-bold text-[#F5CF94]'>HOT</p>
                <Image src={firstImage} alt='slide image' className='bg-opacity-50 z-20 absolute bottom-[0]' />
            </div>

            {arrows ? (
                <div className="absolute w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center right-[-20px] top-[50%] mt-[-25px] shadow-2xl shadow-black rotate-180 z-30 cursor-pointer">
                    <Image src={arrow} alt='arrow icon' />
                </div>
            ): null}
        </div>
    )
}

export default SliderItem;