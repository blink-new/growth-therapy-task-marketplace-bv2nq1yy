import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import blink from './blink/client'
import PublicHomePage from './pages/PublicHomePage'
import HomePage from './pages/HomePage'
import BrowseTasksPage from './pages/BrowseTasksPage'
import PostTaskPage from './pages/PostTaskPage'
import TaskDetailsPage from './pages/TaskDetailsPage'
import TaskerProfilePage from './pages/TaskerProfilePage'
import DashboardPage from './pages/DashboardPage'
import CustomerOnboardingPage from './pages/CustomerOnboardingPage'
import ProviderOnboardingPage from './pages/ProviderOnboardingPage'
import CustomerDashboardPage from './pages/CustomerDashboardPage'
import ProviderDashboardPage from './pages/ProviderDashboardPage'
import Header from './components/layout/Header'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from './components/ui/toaster'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header user={user} />
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={user ? <HomePage /> : <PublicHomePage />} />
            <Route path="/onboarding/customer" element={<CustomerOnboardingPage />} />
            <Route path="/onboarding/provider" element={<ProviderOnboardingPage />} />
            
            {/* Authenticated routes */}
            <Route path="/browse" element={<BrowseTasksPage />} />
            <Route path="/post-task" element={
              <ProtectedRoute user={user}>
                <PostTaskPage />
              </ProtectedRoute>
            } />
            <Route path="/task/:id" element={<TaskDetailsPage />} />
            <Route path="/tasker/:id" element={<TaskerProfilePage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute user={user}>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/customer" element={
              <ProtectedRoute user={user}>
                <CustomerDashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/provider" element={
              <ProtectedRoute user={user}>
                <ProviderDashboardPage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  )
}

export default App