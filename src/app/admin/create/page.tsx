import CreateProduct from '@/components/CreateProduct';
import AdminLayout from '@/layouts/AdminLayout';

const Admin = (): JSX.Element => {
    return (
        <AdminLayout>
            <CreateProduct />
        </AdminLayout>
    );
};

export default Admin;