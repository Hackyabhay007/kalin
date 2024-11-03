// src/pages/admin/dashboard/AdminDashboard.jsx
import AdminLayout from '@/pages/admin/layout'; // Adjust this import according to your layout file path
import Dashboard from './Dashboard';

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <Dashboard />
        </AdminLayout>
    );
}
