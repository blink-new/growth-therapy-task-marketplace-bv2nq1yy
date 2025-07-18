import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Switch } from '../components/ui/switch'
import { 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Star,
  MapPin,
  DollarSign,
  Settings,
  TrendingUp,
  Users
} from 'lucide-react'
import blink from '../blink/client'

interface Booking {
  id: string
  serviceName: string
  customerName: string
  bookingDate: string
  startTime: string
  endTime: string
  location: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  totalAmount: number
  description?: string
}

interface ServiceOffering {
  id: string
  serviceName: string
  hourlyRate: number
  description: string
  isActive: boolean
}

export default function ProviderDashboardPage() {
  const [activeTab, setActiveTab] = useState('bookings')
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [services, setServices] = useState<ServiceOffering[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const currentUser = await blink.auth.me()
      setUser(currentUser)

      // Load user profile
      const userProfile = await blink.db.users.list({
        where: { id: currentUser.id }
      })

      if (userProfile.length > 0) {
        setUser({ ...currentUser, ...userProfile[0] })
      }

      // Load bookings
      const allBookings = await blink.db.bookings.list({
        where: { providerId: currentUser.id },
        orderBy: { bookingDate: 'desc' }
      })

      setBookings(allBookings)

      // Load service offerings
      const serviceOfferings = await blink.db.providerServices.list({
        where: { userId: currentUser.id }
      })

      setServices(serviceOfferings)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleServiceStatus = async (serviceId: string, isActive: boolean) => {
    try {
      await blink.db.providerServices.update(serviceId, { isActive })
      setServices(prev => prev.map(s => 
        s.id === serviceId ? { ...s, isActive } : s
      ))
    } catch (error) {
      console.error('Error updating service status:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'confirmed': return <CheckCircle className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const upcomingBookings = bookings.filter(b => {
    const bookingDate = new Date(b.bookingDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return bookingDate >= today && b.status !== 'cancelled' && b.status !== 'completed'
  })

  const completedBookings = bookings.filter(b => b.status === 'completed')
  const totalEarnings = completedBookings.reduce((sum, b) => sum + b.totalAmount, 0)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
              <p className="mt-2 text-lg text-gray-600">
                Welcome back, {user?.displayName || user?.email}
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button variant="outline" className="mr-3">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingBookings.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedBookings.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">${totalEarnings.toFixed(0)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rating</p>
                  <div className="flex items-center space-x-1">
                    <p className="text-2xl font-bold text-gray-900">4.9</p>
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="services">My Services</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-gray-600">Your bookings will appear here once customers start booking your services</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.slice(0, 10).map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{booking.serviceName}</h3>
                              <Badge className={getStatusColor(booking.status)}>
                                {getStatusIcon(booking.status)}
                                <span className="ml-1 capitalize">{booking.status}</span>
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(booking.bookingDate)}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>{booking.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary mb-2">
                              ${booking.totalAmount}
                            </div>
                            <div className="space-y-2">
                              {booking.status === 'pending' && (
                                <div className="space-x-2">
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                    Accept
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    Decline
                                  </Button>
                                </div>
                              )}
                              {booking.status === 'confirmed' && (
                                <Button size="sm" variant="outline">
                                  <MessageCircle className="mr-1 h-3 w-3" />
                                  Message Customer
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-white text-sm">
                                {booking.customerName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">{booking.customerName}</div>
                              <div className="text-sm text-gray-600">Customer</div>
                            </div>
                          </div>
                          {booking.description && (
                            <div className="text-sm text-gray-600 max-w-xs">
                              "{booking.description}"
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Services</CardTitle>
              </CardHeader>
              <CardContent>
                {services.length === 0 ? (
                  <div className="text-center py-12">
                    <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No services configured</h3>
                    <p className="text-gray-600">Complete your provider setup to start offering services</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{service.serviceName}</h3>
                              <Badge variant={service.isActive ? "default" : "secondary"}>
                                {service.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{service.description}</p>
                            <div className="text-2xl font-bold text-primary">
                              ${service.hourlyRate}/hour
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">Active</span>
                              <Switch
                                checked={service.isActive}
                                onCheckedChange={(checked) => toggleServiceStatus(service.id, checked)}
                              />
                            </div>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Availability Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Availability Management</h3>
                  <p className="text-gray-600 mb-6">Manage your weekly schedule and availability</p>
                  <Button variant="outline">
                    Update Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}