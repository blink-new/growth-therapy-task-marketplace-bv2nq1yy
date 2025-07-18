import { useParams, Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { 
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Star,
  Shield,
  MessageCircle,
  User,
  CheckCircle
} from 'lucide-react'

export default function TaskDetailsPage() {
  const { id } = useParams()

  // Mock data - in real app, fetch based on id
  const task = {
    id: 1,
    title: 'Assemble IKEA furniture',
    description: 'Need help assembling a bed frame, dresser, and nightstand. All tools provided. The furniture is already delivered and waiting in the bedroom. Should take about 3-4 hours for someone experienced.',
    location: 'Manhattan, NY',
    price: '$45',
    priceType: 'fixed',
    category: 'Furniture Assembly',
    urgent: true,
    postedTime: '2 hours ago',
    date: '2024-01-20',
    time: '10:00 AM',
    status: 'open',
    client: {
      name: 'Jennifer Smith',
      rating: 4.8,
      reviews: 23,
      avatar: 'JS',
      verified: true,
      memberSince: 'January 2023'
    },
    requirements: [
      'Experience with IKEA furniture assembly',
      'Own basic tools (screwdrivers, allen keys)',
      'Available for 3-4 hours',
      'Reliable and punctual'
    ],
    applications: 12
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/browse" className="text-primary hover:text-primary/80 font-medium">
            ← Back to Browse Tasks
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="secondary">{task.category}</Badge>
                      {task.urgent && (
                        <Badge variant="destructive">Urgent</Badge>
                      )}
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {task.applications} applications
                      </Badge>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {task.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{task.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Posted {task.postedTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      {task.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      {task.priceType === 'hourly' ? '/hour' : 'fixed price'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Task Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Task Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {task.description}
                </p>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Schedule
                </h2>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="font-medium">{task.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-medium">{task.time}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {task.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card>
              <CardContent className="p-6">
                <Button className="w-full bg-primary hover:bg-primary/90 mb-4" size="lg">
                  Apply for this Task
                </Button>
                <Button variant="outline" className="w-full mb-4">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message Client
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  By applying, you agree to our Terms of Service
                </p>
              </CardContent>
            </Card>

            {/* Client Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  About the Client
                </h3>
                <div className="flex items-start space-x-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-white">
                      {task.client.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">
                        {task.client.name}
                      </h4>
                      {task.client.verified && (
                        <Shield className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{task.client.rating}</span>
                      <span className="text-sm text-gray-500">
                        ({task.client.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Member since {task.client.memberSince}
                    </p>
                  </div>
                </div>
                <Link to={`/client/${task.client.name}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Safety Tips
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Meet in a public place first</li>
                      <li>• Verify the client's identity</li>
                      <li>• Use the in-app messaging system</li>
                      <li>• Report any suspicious activity</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}