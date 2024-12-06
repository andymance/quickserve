import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AdminInterface = () => {
    const [vendors] = useState([
        { id: 1, name: 'Main Canteen', status: 'active', revenue: 45000, orders: 312 },
        { id: 2, name: 'Coffee Corner', status: 'active', revenue: 15000, orders: 145 },
        { id: 3, name: 'Snack Bar', status: 'suspended', revenue: 0, orders: 0 }
    ]);

    const revenueData = [
        { month: 'Jan', revenue: 42000, orders: 2800 },
        { month: 'Feb', revenue: 38000, orders: 2600 },
        { month: 'Mar', revenue: 45000, orders: 3100 }
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">UB Canteen Admin Portal</h1>
                            <p className="text-gray-600">System Administration Dashboard</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-full">
                                <Bell className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-full">
                                <Settings className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </header>

                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="vendors">Vendors</TabsTrigger>
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm text-gray-600">Total Revenue</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-2xl font-bold">₱125,000</span>
                                        <span className="text-green-600 text-sm">↑ 12%</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm text-gray-600">Active Users</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-2xl font-bold">1,125</span>
                                        <span className="text-green-600 text-sm">↑ 5%</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm text-gray-600">Active Vendors</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-2xl font-bold">6/8</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm text-gray-600">System Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-2">
                                        <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                                        <span className="font-medium">Operational</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Revenue Overview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-80">
                                        <LineChart width={500} height={300} data={revenueData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                                            <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
                                        </LineChart>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>System Alerts</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Alert>
                                        <AlertDescription>
                                            System maintenance scheduled for Sunday, 2 AM
                                        </AlertDescription>
                                    </Alert>
                                    <Alert>
                                        <AlertDescription>
                                            2 vendors require license renewal
                                        </AlertDescription>
                                    </Alert>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="vendors" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span>Vendor Management</span>
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
                                        Add New Vendor
                                    </button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {vendors.map(vendor => (
                                        <div key={vendor.id} className="flex justify-between items-center p-4 border rounded-lg">
                                            <div>
                                                <h3 className="font-medium">{vendor.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    Revenue: ₱{vendor.revenue.toLocaleString()} | Orders: {vendor.orders}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${vendor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {vendor.status}
                                                </span>
                                                < button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                                                    Manage
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="users" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>User Statistics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {users.map(category => (
                                        <div key={category.id} className="p-4 border rounded-lg">
                                            <h3 className="font-medium">{category.name}</h3>
                                            <div className="mt-2 flex items-center gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-600">Total Users</p>
                                                    <p className="text-lg font-medium">{category.count}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Active Users</p>
                                                    <p className="text-lg font-medium">{category.active}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Activity Rate</p>
                                                    <p className="text-lg font-medium">
                                                        {Math.round((category.active / category.count) * 100)}%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Security Settings</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-4 border rounded-lg">
                                            <div>
                                                <h3 className="font-medium">Two-Factor Authentication</h3>
                                                <p className="text-sm text-gray-600">Required for all admin accounts</p>
                                            </div>
                                            <button className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                                                Enabled
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center p-4 border rounded-lg">
                                            <div>
                                                <h3 className="font-medium">Password Policy</h3>
                                                <p className="text-sm text-gray-600">Minimum 12 characters, includes symbols</p>
                                            </div>
                                            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">
                                                Configure
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Access Logs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="p-2 text-sm">
                                            <p className="text-gray-600">Admin login - System Update</p>
                                            <p className="text-xs text-gray-500">Today, 10:45 AM</p>
                                        </div>
                                        <div className="p-2 text-sm">
                                            <p className="text-gray-600">Vendor permission update</p>
                                            <p className="text-xs text-gray-500">Today, 09:30 AM</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default AdminInterface;