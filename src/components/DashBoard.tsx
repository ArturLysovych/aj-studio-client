'use client'
import { FC, useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import users_icon from '../assets/images/admin/customers.svg';
import orders_icon from '../assets/images/admin/orders.svg';
import pending_icon from '../assets/images/admin/pendings.svg';
import Image from "next/image";

const Dashboard: FC = (): JSX.Element => {
    const [usersData, setUsersData] = useState<any>({});
    const [ordersData, setOrdersData] = useState<any>({});
    const [pendingCount, setPendingCount] = useState<number>(0);
    const [chartLabels, setChartLabels] = useState<string[]>([]);
    const [chartLabelData, setChartLabelData] = useState<any[]>([]);
  
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
        <div className="w-full flex flex-col p-[25px] gap-[25px] md:gap-[30px]">
            <h2 className="text-[32px] font-medium">Dashboard</h2>
            <div className="flex flex-wrap gap-[25px]">
                {/* Info card */}
                <div className="w-[300px] h-[170px] rounded-2xl shadow-sm bg-white flex flex-col justify-between p-[24px]">
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-[20px]">
                            <p>Total Users</p>
                            <h2 className="text-2xl font-medium">{ usersData?.newUserCount?.totalUsers || 'Loading...' }</h2>
                        </div>
                        <div className="w-[60px] h-[60px] rounded-3xl bg-[#8280FF] bg-opacity-40 flex justify-center items-center">
                            <Image src={users_icon} alt='icon' />
                        </div>
                    </div>
                    <div className="">
                    <h2><span className="text-green-500">+{ usersData?.newUserCount?.newUserCount || 'Loading...' }</span> new from this week</h2>
                    </div>
                </div>
                {/* Info card */}
                <div className="w-[300px] h-[170px] rounded-2xl shadow-sm bg-white flex flex-col justify-between p-[24px]">
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-[20px]">
                            <p>Total Orders</p>
                            <h2 className="text-2xl font-medium">{ ordersData?.newOrderCount?.totalOrders || 'Loading...' }</h2>
                        </div>
                        <div className="w-[60px] h-[60px] rounded-3xl bg-[#FEC53D] bg-opacity-30 flex justify-center items-center">
                            <Image src={orders_icon} alt='icon' />
                        </div>
                    </div>
                    <div className="">
                        <h2><span className="text-green-500">+{ ordersData?.newOrderCount?.newOrderCount || 'Loading...' }</span> new from this week</h2>
                    </div>
                </div>
                {/* Info card */}
                <div className="w-[300px] h-[170px] rounded-2xl shadow-sm bg-white flex flex-col justify-between p-[24px]">
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-[20px]">
                            <p>Total Pending</p>
                            <h2 className="text-2xl font-medium">{ pendingCount || 'Loading...' }</h2>
                        </div>
                        <div className="w-[60px] h-[60px] rounded-3xl bg-[#FF0000] bg-opacity-20 flex justify-center items-center">
                            <Image src={pending_icon} alt='icon' />
                        </div>
                    </div>
                    <div className="">
                        <h2>All orders in pending</h2>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg w-[300px] flex justify-center items-center md:w-[600px] md:h-[320px] lg:w-[1100px] lg:h-[550px]">
                <Line options={options} data={data} />
            </div>
        </div>
    )
}

export default Dashboard;
