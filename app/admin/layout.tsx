import React from 'react';
// import AdminSidebar from './components/AdminSidebar'; // Giả sử bạn có sidebar
// import AdminHeader from './components/AdminHeader';   // Giả sử bạn có header

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            {/* <AdminSidebar /> */} {/* Sidebar chung cho admin */}
            <main className="flex-1 flex flex-col">
                {/* <AdminHeader /> */} {/* Header chung cho admin */}
                {children} {/* Đây là nơi các layout con (như BlogAdminLayout) và page sẽ được render */}
            </main>
        </div>
    );
}