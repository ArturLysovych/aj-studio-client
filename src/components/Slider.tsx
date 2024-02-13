import { FC } from "react"
import SliderItem from "./SliderItem";

const Slider:FC = ():JSX.Element => {
  return (
    <div className="lg:h-[441px] h-[250px] mt-[20px] flex justify-center gap-[40px]">
        <SliderItem className="bg-[#FFDC62]" arrows={false} />
        <SliderItem className="bg-[#FFE2B5]" arrows={true} />
        <SliderItem className="bg-[#D3FBD9]" arrows={false} />  
    </div>
  )
}

export default Slider;