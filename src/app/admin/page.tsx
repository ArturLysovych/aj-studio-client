'use client'
import { FC, useState } from "react";
import ProductsList from "@/components/ProductsList";
import OrdersList from "@/components/OrdersList";
import CreateProduct from "@/components/CreateProduct";
import '../globals.css'

const Header: FC = (): JSX.Element => {
    const [activePage, setActivePage] = useState<string>('products');

    const handleSetActivePage = (page: string) => {
        setActivePage(page);
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="appContainer flex flex-col items-center justify-around">
                <h2 className="w-full flex justify-center items-center bg-green-500">ADMIN PANEL</h2>
                <nav>
                    <ul className="flex gap-[20px] m-[20px]">
                        <li className="cursor-pointer bg-slate-500 p-[5px] text-white">
                            <p
                                onClick={() => handleSetActivePage('products')}
                                className={activePage === 'products' ? 'active' : ''}
                            >
                                Products
                            </p>
                        </li>
                        <li className="cursor-pointer bg-slate-500 p-[5px] text-white">
                            <p
                                onClick={() => handleSetActivePage('orders')}
                                className={activePage === 'orders' ? 'active' : ''}
                            >
                                Orders
                            </p>
                        </li>
                        <li className="cursor-pointer bg-slate-500 p-[5px] text-white">
                            <p
                                onClick={() => handleSetActivePage('create-product')}
                                className={activePage === 'create-product' ? 'active' : ''}
                            >
                                Create
                            </p>
                        </li>
                    </ul>
                </nav>
                {activePage === 'products' && <ProductsList />}
                {activePage === 'orders' && <OrdersList />}
                {activePage === 'create-product' && <CreateProduct />}
            </div>
        </div>
    )
}

export default Header;
