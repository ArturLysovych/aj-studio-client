import Dashboard from '@/components/DashBoard';
import AdminLayout from '@/layouts/AdminLayout';

const Admin = (): JSX.Element => {
    return (
        <AdminLayout>
            <Dashboard />
        </AdminLayout>
    );
};

export default Admin;