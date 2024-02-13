import '../globals.css'
import Header from '@/components/Header';
import Slider from '@/components/Slider';
import ProductsContainer from '@/components/ProductsContainer';

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <div className="container px-[10px] flex flex-col justify-center items-center">
        {/* Header */}
        <Header />
        {/* Slider */}
        <Slider />
        {/* Catalog */}
        <ProductsContainer />
      </div>
    </div>
  );
}
