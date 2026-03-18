import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { TicketProvider } from './context/TicketContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/DashboardLayout'
import AdminLayout from './components/AdminLayout'
import LiveChatWidget from './components/LiveChatWidget'

// Public pages
import HomePage from './pages/HomePage'
import PricingPage from './pages/PricingPage'
import AboutPage from './pages/AboutPage'
import DomainRegisterPage from './pages/DomainRegisterPage'
import DomainTransferPage from './pages/DomainTransferPage'
import SharedHostingPage from './pages/SharedHostingPage'
import VPSHostingPage from './pages/VPSHostingPage'
import KnowledgeBasePage from './pages/KnowledgeBasePage'

// Auth pages
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'

// Dashboard pages
import DashboardPage from './pages/dashboard/DashboardPage'
import BillingPage from './pages/dashboard/BillingPage'
import ServicesPage from './pages/dashboard/ServicesPage'
import SupportPage from './pages/dashboard/SupportPage'
import SettingsPage from './pages/dashboard/SettingsPage'
import WalletPage from './pages/dashboard/WalletPage'
import SubscriptionsPage from './pages/dashboard/SubscriptionsPage'
import ServiceConfiguratorPage from './pages/dashboard/ServiceConfiguratorPage'
import InfrastructurePage from './pages/dashboard/InfrastructurePage'
import ProjectsPage from './pages/dashboard/ProjectsPage'
import MarketplacePage from './pages/dashboard/MarketplacePage'
import ReportsPage from './pages/dashboard/ReportsPage'
import BillingTransparencyPage from './pages/dashboard/BillingTransparencyPage'
import AdminTicketsPage from './pages/dashboard/AdminTicketsPage'

// Admin pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminClientsPage from './pages/admin/AdminClientsPage'
import AdminClientDetailPage from './pages/admin/AdminClientDetailPage'

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <LiveChatWidget />
    </>
  )
}

function DashboardRouteWrapper({ children }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  )
}

function AdminRouteWrapper({ children }) {
  return (
    <ProtectedRoute>
      <AdminLayout>
        {children}
      </AdminLayout>
    </ProtectedRoute>
  )
}

function App() {
  return (
    <AuthProvider>
    <TicketProvider>
      <ScrollToTop />
      <Routes>
        {/* Public Marketing Pages */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/pricing" element={<PublicLayout><PricingPage /></PublicLayout>} />
        <Route path="/domains/register" element={<PublicLayout><DomainRegisterPage /></PublicLayout>} />
        <Route path="/domains/transfer" element={<PublicLayout><DomainTransferPage /></PublicLayout>} />
        <Route path="/hosting" element={<PublicLayout><SharedHostingPage /></PublicLayout>} />
        <Route path="/vps" element={<PublicLayout><VPSHostingPage /></PublicLayout>} />
        <Route path="/knowledge-base" element={<PublicLayout><KnowledgeBasePage /></PublicLayout>} />

        {/* Auth Pages (no Navbar/Footer) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Dashboard Routes (Client Area) */}
        <Route path="/dashboard" element={<DashboardRouteWrapper><DashboardPage /></DashboardRouteWrapper>} />
        <Route path="/dashboard/billing" element={<DashboardRouteWrapper><BillingPage /></DashboardRouteWrapper>} />
        <Route path="/dashboard/services" element={<DashboardRouteWrapper><ServicesPage /></DashboardRouteWrapper>} />
        <Route path="/dashboard/support" element={<DashboardRouteWrapper><SupportPage /></DashboardRouteWrapper>} />
        <Route path="/dashboard/settings" element={<DashboardRouteWrapper><SettingsPage /></DashboardRouteWrapper>} />
        <Route path="/dashboard/wallet" element={<DashboardRouteWrapper><WalletPage /></DashboardRouteWrapper>} />
        <Route path="/dashboard/subscriptions" element={<DashboardRouteWrapper><SubscriptionsPage /></DashboardRouteWrapper>} />
        <Route path="/dashboard/configure" element={<DashboardRouteWrapper><ServiceConfiguratorPage /></DashboardRouteWrapper>} />
        <Route path="/dashboard/infrastructure" element={<DashboardRouteWrapper><InfrastructurePage /></DashboardRouteWrapper>} />
        <Route path="/dashboard/projects" element={<DashboardRouteWrapper><ProjectsPage /></DashboardRouteWrapper>} />
        <Route path="/dashboard/marketplace" element={<DashboardRouteWrapper><MarketplacePage /></DashboardRouteWrapper>} />
        <Route path="/dashboard/reports" element={<DashboardRouteWrapper><ReportsPage /></DashboardRouteWrapper>} />
        <Route path="/dashboard/transparency" element={<DashboardRouteWrapper><BillingTransparencyPage /></DashboardRouteWrapper>} />
        <Route path="/dashboard/admin/tickets" element={<DashboardRouteWrapper><AdminTicketsPage /></DashboardRouteWrapper>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRouteWrapper><AdminDashboardPage /></AdminRouteWrapper>} />
        <Route path="/admin/clients" element={<AdminRouteWrapper><AdminClientsPage /></AdminRouteWrapper>} />
        <Route path="/admin/clients/:clientId" element={<AdminRouteWrapper><AdminClientDetailPage /></AdminRouteWrapper>} />
        <Route path="/admin/tickets" element={<AdminRouteWrapper><AdminTicketsPage /></AdminRouteWrapper>} />
        <Route path="/admin/infrastructure" element={<AdminRouteWrapper><InfrastructurePage /></AdminRouteWrapper>} />
        <Route path="/admin/reports" element={<AdminRouteWrapper><ReportsPage /></AdminRouteWrapper>} />
        <Route path="/admin/transparency" element={<AdminRouteWrapper><BillingTransparencyPage /></AdminRouteWrapper>} />
      </Routes>
    </TicketProvider>
    </AuthProvider>
  )
}

export default App
