import OrdersList from '@/components/OrdersList';
import AdminLayout from '@/layouts/AdminLayout';

const Orders = (): JSX.Element => {
    return (
        <AdminLayout>
            <OrdersList />
        </AdminLayout>
    );
};

export default Orders;