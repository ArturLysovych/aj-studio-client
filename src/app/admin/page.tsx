'use client'
import { FC, useEffect, useState } from "react";
import ProductsList from "@/components/ProductsList";
import OrdersList from "@/components/OrdersList";
import CreateProduct from "@/components/CreateProduct";
import '../globals.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Admin: FC = (): JSX.Element => {
    // const [activePage, setActivePage] = useState<string>('products');
    const [usersData, setUsersData] = useState<any>({});
    const [ordersData, setOrdersData] = useState<any>({});
    const [pendingCount, setPendingCount] = useState<number>(0);
    const [chartData, setChartData] = useState<any>({});
    const [chartLabels, setChartLabels] = useState<string[]>([]);
    const [chartLabelData, setChartLabelData] = useState<any[]>([]);
    // const handleSetActivePage = (page: string) => { setActivePage(page); };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch('http://localhost:5000/admin/new-user-count-last-week');
                const userData = await userResponse.json();
                setUsersData(userData);
    
                const orderResponse = await fetch('http://localhost:5000/admin/new-order-count-last-week');
                const orderData = await orderResponse.json();
                setOrdersData(orderData);
    
                const pendingResponse = await fetch('http://localhost:5000/orders/pending');
                const pendingData = await pendingResponse.json();
                setPendingCount(pendingData.length);

                const chartResponse = await fetch('http://localhost:5000/admin/orders-for-chart');
                const chartData = await chartResponse.json();
                setChartData(chartData);

                if (chartData !== null && typeof chartData === 'object' && Object.keys(chartData).length !== 0) {
                    const labels = Object.keys(chartData.chartInfo).map((week: any) => chartData.chartInfo[week].date + ' -');
                    const data = Object.keys(chartData.chartInfo).map((week: any) => chartData.chartInfo[week].count);

                    setChartLabels(labels);
                    setChartLabelData(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    // useEffect(() => {
    //     if (chartData !== null && typeof chartData === 'object' && Object.keys(chartData).length !== 0) {
    //         const labels = Object.keys(chartData).map(week => chartData[week].date);
    //         console.log(labels);
    //         setChartLabels(labels);
    //     }
    // }, [chartData]);
    

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Sales Details',
            },
        },
    };

    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: 'sales',
                data: chartLabelData,
                borderColor: '#4379EE',
                backgroundColor: '#4379EE',
            }
        ],
    };

    return (
        <div className="w-full h-auto flex justify-between items-center">
            <div className="w-[75px] h-full items-center relative z-10">
                <div className="h-screen w-[75px] left-0 top-0 pt-[25px] fixed z-20 flex flex-col items-center gap-[25px] bg-red-500">
                    <div className="h-[40px] w-[40px] bg-blue-500"></div>
                    <div className="h-[40px] w-[40px] bg-blue-500"></div>
                    <div className="h-[40px] w-[40px] bg-blue-500"></div>
                    <div className="h-[40px] w-[40px] bg-blue-500"></div>
                    <div className="h-[40px] w-[40px] bg-blue-500"></div>
                    <div className="h-[40px] w-[40px] bg-blue-500"></div>
                </div>
            </div>
            <div className="w-[calc(100%-75px)] h-full bg-green-500 flex flex-col">
                <div className="w-full h-[75px] bg-purple-500 flex justify-between items-center p-[25px]">
                    <div className="flex items-center gap-[5px]">
                        <p>O</p>
                        <input type="text" placeholder="Search" className="w-[120px]" />
                    </div>
                    <div className="flex gap-[5px]">
                        <div className="w-[50px] h-[50px] bg-yellow-500 rounded-full"></div>
                        <div className="flex flex-col">
                            <h2 className="font-medium">Moni Roy</h2>
                            <p>Admin</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col p-[25px] gap-[25px]">
                    <h2 className="text-2xl">Dashboard</h2>
                    <div className="flex flex-wrap gap-[25px]">
                        {/* Info card */}
                        <div className="w-[300px] h-[170px] rounded-lg bg-white flex flex-col justify-between p-[24px]">
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-[20px]">
                                    <p>Total Users</p>
                                    <h2 className="text-2xl font-medium">{ usersData?.newUserCount?.totalUsers || 'Loading...' }</h2>
                                </div>
                                <div className="w-[60px] h-[60px] rounded-3xl bg-purple-500"></div>
                            </div>
                            <div className="">
                            <h2><span className="text-green-500">+{ usersData?.newUserCount?.newUserCount || 'Loading...' }</span> new from this week</h2>
                            </div>
                        </div>
                        {/* Info card */}
                        <div className="w-[300px] h-[170px] rounded-lg bg-white flex flex-col justify-between p-[24px]">
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-[20px]">
                                    <p>Total Orders</p>
                                    <h2 className="text-2xl font-medium">{ ordersData?.newOrderCount?.totalOrders || 'Loading...' }</h2>
                                </div>
                                <div className="w-[60px] h-[60px] rounded-3xl bg-yellow-500"></div>
                            </div>
                            <div className="">
                                <h2><span className="text-green-500">+{ ordersData?.newOrderCount?.newOrderCount || 'Loading...' }</span> new from this week</h2>
                            </div>
                        </div>

                        {/* Info card */}
                        <div className="w-[300px] h-[170px] rounded-lg bg-white flex flex-col justify-between p-[24px]">
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-[20px]">
                                    <p>Total Pending</p>
                                    <h2 className="text-2xl font-medium">{ pendingCount || 'Loading...' }</h2>
                                </div>
                                <div className="w-[60px] h-[60px] rounded-3xl bg-orange-500"></div>
                            </div>
                            <div className="">
                                <h2>All orders in pending</h2>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg w-[300px]">
                        <Line options={options} data={data} />
                    </div>
                </div>
            </div>
            {/* <div className="appContainer flex flex-col items-center justify-around"> */}
                {/* <h2 className="w-full flex justify-center items-center bg-green-500">ADMIN PANEL</h2>
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
                {activePage === 'create-product' && <CreateProduct />} */}
            {/* </div> */}
        </div>
    )
}

export default Admin;
