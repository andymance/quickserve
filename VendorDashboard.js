import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, ChefHat, Clock, MenuSquare, Package, PieChart, ShoppingBag, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const VendorInterface = () => {
    const [activeOrders, setActiveOrders] = useState([
        { id: '001', status: 'preparing', items: ['Adobo', 'Rice'], time: '10:30 AM', customerName: 'Juan Dela Cruz' },
        { id: '002', status: 'ready', items: ['Sinigang', 'Rice'], time: '10:35 AM', customerName: 'Maria Santos' }
    ]);

    const [inventory, setInventory] = useState([
        { item: 'Rice', quantity: 50, unit: 'kg', status: 'normal' },
        { item: 'Cooking Oil', quantity: 5, unit: 'L', status: 'low' }
    ]);

    const [menuItems, setMenuItems] = useState([
        { id: 1, name: 'Adobo', price: 85, category: 'Main Dish', status: 'available', dailyLimit: 50, sold: 12 },
        { id: 2, name: 'Sinigang', price: 90, category: 'Main Dish', status: 'available', dailyLimit: 40, sold: 8 },
        { id: 3, name: 'Pancit', price: 75, category: 'Noodles', status: 'unavailable', dailyLimit: 30, sold: 0 },
        { id: 4, name: 'Rice', price: 15, category: 'Sides', status: 'available', dailyLimit: 200, sold: 45 }
    ]);

    const salesData = [
        { name: 'Mon', sales: 2400, orders: 45 },
        { name: 'Tue', sales: 1398, orders: 28 },
        { name: 'Wed', sales: 3800, orders: 68 },
        { name: 'Thu', sales: 3908, orders: 72 },
        { name: 'Fri', sales: 4800, orders: 89 }
    ];

    const popularItems = [
        { name: 'Adobo', orders: 156 },
        { name: 'Rice', orders: 142 },
        { name: 'Sinigang', orders: 98 },
        { name: 'Pancit', orders: 75 }
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">UB Canteen Dashboard</h1>
                    <p className="text-gray-600">Welcome back, Vendor</p>
                </header>

                <Tabs defaultValue="orders" className="space-y-4">
                    <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-4">
                        <TabsTrigger value="orders" className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            Orders
                        </TabsTrigger>
                        <TabsTrigger value="menu" className="flex items-center gap-2">
                            <MenuSquare className="h-4 w-4" />
                            Menu
                        </TabsTrigger>
                        <TabsTrigger value="inventory" className="flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4" />
                            Inventory
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="flex items-center gap-2">
                            <PieChart className="h-4 w-4" />
                            Analytics
                        </TabsTrigger>
                    </TabsList>

                    {/* Orders Tab */}
                    <TabsContent value="orders" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-orange-500" />
                                        Active Orders
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {activeOrders.map(order => (
                                        <div key={order.id} className="p-4 border rounded-lg mb-2 last:mb-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium">Order #{order.id}</p>
                                                    <p className="text-sm text-gray-600">{order.customerName}</p>
                                                    <ul className="mt-2">
                                                        {order.items.map((item, idx) => (
                                                            <li key={idx} className="text-sm">{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Menu Tab */}
                    <TabsContent value="menu" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span>Menu Management</span>
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
                                        Add New Item
                                    </button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {menuItems.map(item => (
                                        <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                                            <div className="space-y-1">
                                                <h3 className="font-medium">{item.name}</h3>
                                                <p className="text-sm text-gray-600">{item.category}</p>
                                                <p className="text-sm">₱{item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span>{item.sold}/{item.dailyLimit}</span>
                                                <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>{item.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Additional Tabs */}
                    {/* Add Inventory, Analytics, and Kitchen contents as in your second code */}
                </Tabs>
            </div>
        </div>
    );
};

export default VendorInterface;

