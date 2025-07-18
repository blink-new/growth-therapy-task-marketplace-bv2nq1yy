import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { Checkbox } from '../components/ui/checkbox'
import { Badge } from '../components/ui/badge'
import { 
  User, 
  MapPin, 
  Phone, 
  DollarSign,
  Wrench,
  Home,
  Waves,
  Camera,
  Clock,
  Plus,
  X
} from 'lucide-react'
import blink from '../blink/client'

const services = [
  {
    id: 'handyman',
    name: 'Handyman',
    description: 'Home repairs, maintenance, and improvements',
    icon: Wrench
  },
  {
    id: 'housekeeper',
    name: 'Housekeeper', 
    description: 'House cleaning and organization services',
    icon: Home
  },
  {
    id: 'surf-instructor',
    name: 'Surf Instructor',
    description: 'Surfing lessons and water sports coaching',
    icon: Waves
  },
  {
    id: 'photographer',
    name: 'Photographer',
    description: 'Photography services for events and portraits',
    icon: Camera
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

const daysOfWeek = [
  { id: 0, name: 'Sunday' },
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tuesday' },
  { id: 3, name: 'Wednesday' },
  { id: 4, name: 'Thursday' },
  { id: 5, name: 'Friday' },
  { id: 6, name: 'Saturday' }
]

interface ServiceOffering {
  serviceId: string
  hourlyRate: string
  description: string
}

interface AvailabilitySlot {
  dayOfWeek: number
  startTime: string
  endTime: string
}

export default function ProviderOnboardingPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  
  const [formData, setFormData] = useState({
    displayName: '',
    phone: '',
    location: '',
    bio: ''
  })

  const [serviceOfferings, setServiceOfferings] = useState<ServiceOffering[]>([])
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addServiceOffering = (serviceId: string) => {
    if (!serviceOfferings.find(s => s.serviceId === serviceId)) {
      setServiceOfferings(prev => [...prev, {
        serviceId,
        hourlyRate: '',
        description: ''
      }])
    }
  }

  const removeServiceOffering = (serviceId: string) => {
    setServiceOfferings(prev => prev.filter(s => s.serviceId !== serviceId))
  }

  const updateServiceOffering = (serviceId: string, field: string, value: string) => {
    setServiceOfferings(prev => prev.map(s => 
      s.serviceId === serviceId ? { ...s, [field]: value } : s
    ))
  }

  const addAvailabilitySlot = () => {
    setAvailability(prev => [...prev, {
      dayOfWeek: 1,
      startTime: '09:00',
      endTime: '17:00'
    }])
  }

  const removeAvailabilitySlot = (index: number) => {
    setAvailability(prev => prev.filter((_, i) => i !== index))
  }

  const updateAvailabilitySlot = (index: number, field: string, value: string | number) => {
    setAvailability(prev => prev.map((slot, i) => 
      i === index ? { ...slot, [field]: value } : slot
    ))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // First ensure user is authenticated
      const user = await blink.auth.me()
      
      // Create user profile in database
      await blink.db.users.create({
        id: user.id,
        email: user.email,
        displayName: formData.displayName,
        userType: 'provider',
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })

      // Create service offerings
      for (const offering of serviceOfferings) {
        await blink.db.providerServices.create({
          id: `${user.id}_${offering.serviceId}`,
          userId: user.id,
          serviceId: offering.serviceId,
          hourlyRate: parseFloat(offering.hourlyRate),
          description: offering.description,
          isActive: true,
          createdAt: new Date().toISOString()
        })
      }

      // Create availability slots
      for (const slot of availability) {
        await blink.db.providerAvailability.create({
          id: `${user.id}_${slot.dayOfWeek}_${slot.startTime}`,
          userId: user.id,
          dayOfWeek: slot.dayOfWeek,
          startTime: slot.startTime,
          endTime: slot.endTime,
          isAvailable: true,
          createdAt: new Date().toISOString()
        })
      }

      // Navigate to provider dashboard
      navigate('/dashboard/provider')
    } catch (error) {
      console.error('Error creating provider profile:', error)
      // Handle error - maybe show toast
    } finally {
      setLoading(false)
    }
  }

  const canProceedToStep2 = formData.displayName && formData.location
  const canProceedToStep3 = serviceOfferings.length > 0 && serviceOfferings.every(s => s.hourlyRate && s.description)
  const canSubmit = availability.length > 0

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Become a Provider</h1>
          <p className="mt-2 text-lg text-gray-600">
            Join our network of trusted service providers
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  currentStep >= step 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`h-1 w-16 ${
                    currentStep > step ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <div className="text-sm text-gray-600">
              Step {currentStep} of 3: {
                currentStep === 1 ? 'Profile Information' :
                currentStep === 2 ? 'Services & Rates' :
                'Availability Schedule'
              }
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Provider Profile Setup</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Profile Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="displayName">Full Name *</Label>
                    <Input
                      id="displayName"
                      type="text"
                      value={formData.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Service Location *</Label>
                    <div className="mt-1">
                      <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your service area" />
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
                  </div>

                  <div>
                    <Label htmlFor="bio">Professional Bio *</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell customers about your experience, skills, and what makes you unique..."
                      className="mt-1"
                      rows={4}
                      required
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    disabled={!canProceedToStep2}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Continue to Services
                  </Button>
                </div>
              )}

              {/* Step 2: Services & Rates */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label>Select Services You Offer *</Label>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {services.map((service) => {
                        const IconComponent = service.icon
                        const isSelected = serviceOfferings.find(s => s.serviceId === service.id)
                        
                        return (
                          <div
                            key={service.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              isSelected 
                                ? 'border-primary bg-primary/5' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => {
                              if (isSelected) {
                                removeServiceOffering(service.id)
                              } else {
                                addServiceOffering(service.id)
                              }
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <IconComponent className="h-5 w-5 text-primary" />
                              <div>
                                <div className="font-medium">{service.name}</div>
                                <div className="text-sm text-gray-600">{service.description}</div>
                              </div>
                              {isSelected && (
                                <div className="ml-auto">
                                  <Badge variant="secondary">Selected</Badge>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Service Details */}
                  {serviceOfferings.map((offering) => {
                    const service = services.find(s => s.id === offering.serviceId)
                    if (!service) return null

                    return (
                      <Card key={offering.serviceId} className="border-primary/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center justify-between text-lg">
                            <div className="flex items-center space-x-2">
                              <service.icon className="h-5 w-5 text-primary" />
                              <span>{service.name}</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeServiceOffering(offering.serviceId)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label>Hourly Rate *</Label>
                            <div className="relative mt-1">
                              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                              <Input
                                type="number"
                                value={offering.hourlyRate}
                                onChange={(e) => updateServiceOffering(offering.serviceId, 'hourlyRate', e.target.value)}
                                placeholder="25.00"
                                className="pl-10"
                                min="1"
                                step="0.01"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Service Description *</Label>
                            <Textarea
                              value={offering.description}
                              onChange={(e) => updateServiceOffering(offering.serviceId, 'description', e.target.value)}
                              placeholder={`Describe your ${service.name.toLowerCase()} services in detail...`}
                              rows={3}
                              required
                            />
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      disabled={!canProceedToStep3}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      Continue to Availability
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Availability */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label>Set Your Availability *</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addAvailabilitySlot}
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Add Time Slot
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {availability.map((slot, index) => (
                        <Card key={index} className="border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-1">
                                <Label className="text-sm">Day</Label>
                                <Select 
                                  value={slot.dayOfWeek.toString()} 
                                  onValueChange={(value) => updateAvailabilitySlot(index, 'dayOfWeek', parseInt(value))}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {daysOfWeek.map((day) => (
                                      <SelectItem key={day.id} value={day.id.toString()}>
                                        {day.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex-1">
                                <Label className="text-sm">Start Time</Label>
                                <Input
                                  type="time"
                                  value={slot.startTime}
                                  onChange={(e) => updateAvailabilitySlot(index, 'startTime', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div className="flex-1">
                                <Label className="text-sm">End Time</Label>
                                <Input
                                  type="time"
                                  value={slot.endTime}
                                  onChange={(e) => updateAvailabilitySlot(index, 'endTime', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAvailabilitySlot(index)}
                                className="mt-6"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {availability.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Clock className="mx-auto h-12 w-12 mb-4" />
                          <p>No availability slots added yet.</p>
                          <p className="text-sm">Click "Add Time Slot" to set your working hours.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || !canSubmit}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      {loading ? 'Creating Profile...' : 'Complete Setup'}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Looking for services instead?{' '}
            <button
              onClick={() => navigate('/onboarding/customer')}
              className="text-primary hover:underline"
            >
              Switch to customer setup
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}