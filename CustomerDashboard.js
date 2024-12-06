import React, { useState } from "react";
import { Home, Star, ShoppingCart, List, Settings, Bell, User } from "lucide-react";

const App = () => {
    const [view, setView] = useState("home");

    const renderView = () => {
        switch (view) {
            case "home":
                return <HomeView />;
            case "favorites":
                return <FavoritesView />;
            case "cart":
                return <CartView />;
            case "orders":
                return <OrdersView />;
            case "settings":
                return <SettingsView />;
            default:
                return <HomeView />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-10">
                <div className="max-w-4xl mx-auto h-full flex items-center justify-between px-4">
                    <h1 className="text-lg font-bold text-gray-800">QuickServe</h1>
                    <div className="flex items-center space-x-4">
                        <NotificationView />
                        <ProfileView />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mt-16 mb-20 flex-1">{renderView()}</main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 w-full h-16 bg-white shadow-md z-10">
                <div className="max-w-4xl mx-auto h-full flex justify-around items-center px-4">
                    <NavButton
                        icon={<Home size={24} />}
                        label="Home"
                        active={view === "home"}
                        onClick={() => setView("home")}
                    />
                    <NavButton
                        icon={<Star size={24} />}
                        label="Favorites"
                        active={view === "favorites"}
                        onClick={() => setView("favorites")}
                    />
                    <NavButton
                        icon={<ShoppingCart size={24} />}
                        label="Cart"
                        active={view === "cart"}
                        onClick={() => setView("cart")}
                    />
                    <NavButton
                        icon={<List size={24} />}
                        label="Orders"
                        active={view === "orders"}
                        onClick={() => setView("orders")}
                    />
                    <NavButton
                        icon={<Settings size={24} />}
                        label="Settings"
                        active={view === "settings"}
                        onClick={() => setView("settings")}
                    />
                </div>
            </nav>
        </div>
    );
};

/* Nav Button */
const NavButton = ({ icon, label, active, onClick }) => (
    <button
        className={`flex flex-col items-center text-xs ${active ? "text-blue-500" : "text-gray-600"
            }`}
        onClick={onClick}
    >
        {icon}
        <span>{label}</span>
    </button>
);

/* Header Components */
const NotificationView = () => (
    <button className="text-gray-600 hover:text-blue-500">
        <Bell size={24} />
    </button>
);

const ProfileView = () => (
    <button className="text-gray-600 hover:text-blue-500">
        <User size={24} />
    </button>
);

/* Views */
const HomeView = () => (
    <div className="p-4 mt-16 mb-20 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Welcome to QuickServe!</h2>
        <MenuItem />
    </div>
);

const FavoritesView = () => (
    <div className="p-4 mt-16 mb-20 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Favorites</h2>
        <p className="text-gray-600">Your favorite items will appear here.</p>
    </div>
);

const CartView = () => (
    <div className="p-4 mt-16 mb-20 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-600">Items you add to your cart will appear here.</p>
    </div>
);

const OrdersView = () => (
    <div className="p-4 mt-16 mb-20 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Your Orders</h2>
        <p className="text-gray-600">
            View your order history and track current orders here.
        </p>
    </div>
);

const SettingsView = () => (
    <div className="p-4 mt-16 mb-20 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <p className="text-gray-600">Manage your preferences and settings here.</p>
    </div>
);

/* Menu Item Component */
const MenuItem = () => (
    <div className="space-y-4">
        {["Pizza", "Burger", "Pasta", "Salad", "Drinks"].map((item, index) => (
            <div
                key={index}
                className="flex items-center justify-between p-4 bg-white shadow-md rounded-md"
            >
                <div>
                    <h3 className="text-lg font-semibold">{item}</h3>
                    <p className="text-gray-600 text-sm">Description of {item}.</p>
                </div>
                <span className="text-blue-500 font-bold">$10.99</span>
            </div>
        ))}
    </div>
);

export default App;

