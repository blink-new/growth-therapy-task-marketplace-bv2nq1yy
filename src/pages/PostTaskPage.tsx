import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { Checkbox } from '../components/ui/checkbox'
import { 
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Clock,
  AlertCircle
} from 'lucide-react'

export default function PostTaskPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    time: '',
    priceType: 'fixed',
    price: '',
    urgent: false
  })

  const categories = [
    'Furniture Assembly',
    'Moving',
    'Tech Support',
    'Home Improvement',
    'Errands',
    'Creative Services',
    'Cleaning',
    'Delivery'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Post a Task</h1>
          <p className="mt-2 text-lg text-gray-600">
            Tell us what you need help with and connect with skilled Taskers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Task Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Task Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Task Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Assemble IKEA furniture"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you need help with, including any specific requirements or details..."
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  className="mt-1 min-h-[120px]"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Be specific about what needs to be done, tools required, and any other important details.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Location & Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Location & Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Manhattan, NY or specific address"
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Preferred Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => updateFormData('date', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Preferred Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => updateFormData('time', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgent"
                  checked={formData.urgent}
                  onCheckedChange={(checked) => updateFormData('urgent', checked)}
                />
                <Label htmlFor="urgent" className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span>This is urgent (needed within 24 hours)</span>
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Budget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span>Budget</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Pricing Type *</Label>
                <RadioGroup
                  value={formData.priceType}
                  onValueChange={(value) => updateFormData('priceType', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="fixed" />
                    <Label htmlFor="fixed">Fixed Price - I know exactly what it should cost</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hourly" id="hourly" />
                    <Label htmlFor="hourly">Hourly Rate - I'll pay by the hour</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="price">
                  {formData.priceType === 'fixed' ? 'Fixed Price' : 'Hourly Rate'} *
                </Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="price"
                    type="number"
                    placeholder={formData.priceType === 'fixed' ? '50' : '25'}
                    value={formData.price}
                    onChange={(e) => updateFormData('price', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {formData.priceType === 'fixed' 
                    ? 'Total amount you\'re willing to pay for the entire task'
                    : 'Amount you\'re willing to pay per hour'
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button type="button" variant="outline" size="lg">
              Save as Draft
            </Button>
            <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90">
              Post Task
            </Button>
          </div>
        </form>

        {/* Help Section */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">What happens next?</h3>
                <ul className="mt-2 space-y-1 text-sm text-blue-800">
                  <li>• Your task will be visible to Taskers in your area</li>
                  <li>• You'll receive applications from qualified Taskers</li>
                  <li>• Review profiles, ratings, and choose your Tasker</li>
                  <li>• Coordinate details and get your task completed</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}