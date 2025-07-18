import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import { Calendar } from '../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  Search, 
  Calendar as CalendarIcon,
  MapPin,
  Wrench,
  Home,
  Waves,
  Camera,
  Star,
  Shield,
  Clock,
  Users
} from 'lucide-react'
import { format } from 'date-fns'

const services = [
  {
    id: 'handyman',
    name: 'Handyman',
    description: 'Home repairs, maintenance, and improvements',
    icon: Wrench,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    id: 'housekeeper',
    name: 'Housekeeper', 
    description: 'House cleaning and organization services',
    icon: Home,
    color: 'bg-green-50 text-green-600'
  },
  {
    id: 'surf-instructor',
    name: 'Surf Instructor',
    description: 'Surfing lessons and water sports coaching',
    icon: Waves,
    color: 'bg-cyan-50 text-cyan-600'
  },
  {
    id: 'photographer',
    name: 'Photographer',
    description: 'Photography services for events and portraits',
    icon: Camera,
    color: 'bg-purple-50 text-purple-600'
  }
]

const locations = [
  'New York, NY',
  'Los Angeles, CA', 
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA'
]

export default function PublicHomePage() {
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedLocation, setSelectedLocation] = useState('')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleSearch = () => {
    // Navigate to search results with filters
    const params = new URLSearchParams()
    if (selectedService) params.set('service', selectedService)
    if (selectedDate) params.set('date', format(selectedDate, 'yyyy-MM-dd'))
    if (selectedLocation) params.set('location', selectedLocation)
    
    window.location.href = `/browse?${params.toString()}`
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gt-gradient py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Services, covered by trust
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Find trusted professionals in your area. Most services start at $25/hour on average with verified providers.
            </p>
            
            {/* Search Interface */}
            <div className="mx-auto mt-10 max-w-4xl">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* What do you need help with? */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What do you need help with?
                    </label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            <div className="flex items-center space-x-2">
                              <service.icon className="h-4 w-4" />
                              <span>{service.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* When? */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      When?
                    </label>
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-12 w-full justify-start text-left font-normal bg-white hover:bg-gray-50"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            setSelectedDate(date)
                            setIsCalendarOpen(false)
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Where? */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Where?
                    </label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{location}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <div className="md:col-span-1 flex items-end">
                    <Button 
                      onClick={handleSearch}
                      className="h-12 w-full bg-primary hover:bg-primary/90 font-semibold"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Verified providers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">Same-day availability</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span className="text-sm font-medium">4.9/5 average rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our trusted services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Professional services you can count on
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Card key={service.id} className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`mx-auto rounded-lg p-4 w-16 h-16 flex items-center justify-center ${service.color} mb-4`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Get help in three simple steps
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Choose your service
              </h3>
              <p className="mt-2 text-gray-600">
                Select from our trusted service categories and specify your needs
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Book your provider
              </h3>
              <p className="mt-2 text-gray-600">
                Browse verified providers, check availability, and book instantly
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Get it done
              </h3>
              <p className="mt-2 text-gray-600">
                Your provider arrives on time and completes the job to your satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Join thousands who trust Palmilla for their service needs
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/onboarding/customer">
                <Button size="lg" variant="secondary" className="px-8">
                  <Users className="mr-2 h-4 w-4" />
                  Find Services
                </Button>
              </Link>
              <Link to="/onboarding/provider">
                <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-primary">
                  <Wrench className="mr-2 h-4 w-4" />
                  Become a Provider
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}