import ProductsList from '@/components/ProductsList';
import AdminLayout from '@/layouts/AdminLayout';

const Admin = (): JSX.Element => {
    return (
        <AdminLayout>
            <ProductsList />
        </AdminLayout>
    );
};

export default Admin;