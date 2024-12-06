import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const App = () => {
  const [userRole, setUserRole] = useState(null); // Track selected role

  const renderView = () => {
    switch (userRole) {
      case "customer":
        return <CustomerDashboard />;
      case "vendor":
        return <VendorDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <WelcomePage onSelectRole={setUserRole} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>QuickServe</Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>{renderView()}</View>
    </View>
  );
};

/* Welcome Page */
const WelcomePage = ({ onSelectRole }) => (
  <View style={styles.centeredContainer}>
    <Text style={styles.title}>Welcome to QuickServe</Text>
    <View style={styles.buttonContainer}>
      <Button title="Customer" onPress={() => onSelectRole("customer")} color="#007BFF" />
      <Button title="Vendor" onPress={() => onSelectRole("vendor")} color="#28A745" />
      <Button title="Admin" onPress={() => onSelectRole("admin")} color="#DC3545" />
    </View>
  </View>
);

/* Customer Dashboard */
const CustomerDashboard = () => (
  <View style={styles.dashboard}>
    <Text style={styles.dashboardTitle}>Customer Dashboard</Text>
    <Text style={styles.dashboardText}>Explore and shop here!</Text>
    {/* Add customer-specific features here */}
  </View>
);

/* Vendor Dashboard */
const VendorDashboard = () => (
  <View style={styles.dashboard}>
    <Text style={styles.dashboardTitle}>Vendor Dashboard</Text>
    <Text style={styles.dashboardText}>Manage your stall and menu here!</Text>
    {/* Add vendor-specific features here */}
  </View>
);

/* Admin Dashboard */
const AdminDashboard = () => (
  <View style={styles.dashboard}>
    <Text style={styles.dashboardTitle}>Admin Dashboard</Text>
    <Text style={styles.dashboardText}>Monitor and manage the system here!</Text>
    <View style={styles.buttonContainer}>


    </View>
    {/* Add admin-specific features here */}
  </View>
);

/* Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    height: 60,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dashboard: {
    marginTop: 20,
    padding: 16,
  },
  dashboardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dashboardText: {
    fontSize: 16,
    color: "#666666",
  },
});

export default App;
