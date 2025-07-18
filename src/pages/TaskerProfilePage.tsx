import { useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Progress } from '../components/ui/progress'
import { 
  Star,
  Shield,
  MessageCircle,
  MapPin,
  Calendar,
  Award,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react'

export default function TaskerProfilePage() {
  const { id } = useParams()

  // Mock data - in real app, fetch based on id
  const tasker = {
    id: 1,
    name: 'Mike Johnson',
    avatar: 'MJ',
    rating: 4.9,
    reviews: 127,
    completedTasks: 156,
    responseTime: '1 hour',
    location: 'Manhattan, NY',
    memberSince: 'March 2022',
    verified: true,
    bio: 'Professional handyman with 8+ years of experience. Specializing in furniture assembly, home repairs, and general maintenance. I take pride in quality work and customer satisfaction.',
    skills: [
      'Furniture Assembly',
      'Home Improvement',
      'Electrical Work',
      'Plumbing',
      'Painting',
      'Moving Help'
    ],
    hourlyRate: '$35-50',
    availability: 'Available now',
    badges: [
      { name: 'Top Rated', icon: Award, color: 'text-yellow-600' },
      { name: 'Background Checked', icon: Shield, color: 'text-green-600' },
      { name: 'Quick Responder', icon: Clock, color: 'text-blue-600' }
    ],
    recentReviews: [
      {
        id: 1,
        client: 'Sarah M.',
        rating: 5,
        date: '2 days ago',
        task: 'IKEA furniture assembly',
        comment: 'Mike was fantastic! Very professional, arrived on time, and assembled everything perfectly. Would definitely hire again.'
      },
      {
        id: 2,
        client: 'David L.',
        rating: 5,
        date: '1 week ago',
        task: 'TV mounting',
        comment: 'Great work mounting my 65" TV. Clean cable management and very careful with my walls. Highly recommend!'
      },
      {
        id: 3,
        client: 'Lisa K.',
        rating: 4,
        date: '2 weeks ago',
        task: 'Bathroom repair',
        comment: 'Fixed my leaky faucet quickly and efficiently. Fair pricing and good communication throughout.'
      }
    ],
    portfolio: [
      {
        id: 1,
        title: 'Living Room Furniture Assembly',
        image: '/api/placeholder/300/200',
        description: 'Complete living room setup including sofa, coffee table, and entertainment center'
      },
      {
        id: 2,
        title: 'Kitchen Cabinet Installation',
        image: '/api/placeholder/300/200',
        description: 'Installed new kitchen cabinets and hardware'
      },
      {
        id: 3,
        title: 'Home Office Setup',
        image: '/api/placeholder/300/200',
        description: 'Assembled desk, shelving, and organized cable management'
      }
    ]
  }

  const ratingBreakdown = [
    { stars: 5, percentage: 85 },
    { stars: 4, percentage: 12 },
    { stars: 3, percentage: 2 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 0 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="bg-primary text-white text-2xl">
                      {tasker.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {tasker.name}
                      </h1>
                      {tasker.verified && (
                        <Shield className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{tasker.rating}</span>
                        <span className="text-gray-600">({tasker.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-gray-600">{tasker.completedTasks} tasks completed</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{tasker.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Member since {tasker.memberSince}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{tasker.bio}</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {tasker.badges.map((badge) => {
                    const IconComponent = badge.icon
                    return (
                      <Badge key={badge.name} variant="secondary" className="flex items-center space-x-1">
                        <IconComponent className={`h-3 w-3 ${badge.color}`} />
                        <span>{badge.name}</span>
                      </Badge>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Skills & Services
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tasker.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Reviews ({tasker.reviews})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{tasker.rating}</span>
                  </div>
                </div>

                {/* Rating Breakdown */}
                <div className="mb-6 space-y-2">
                  {ratingBreakdown.map((item) => (
                    <div key={item.stars} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 w-12">
                        <span className="text-sm">{item.stars}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      </div>
                      <Progress value={item.percentage} className="flex-1 h-2" />
                      <span className="text-sm text-gray-600 w-8">{item.percentage}%</span>
                    </div>
                  ))}
                </div>

                {/* Recent Reviews */}
                <div className="space-y-4">
                  {tasker.recentReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.client}</span>
                            <div className="flex items-center">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{review.task} • {review.date}</p>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Work
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tasker.portfolio.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                      <div className="aspect-video bg-gray-200 rounded-lg mb-2 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                          <span className="text-gray-600 text-sm">Portfolio Image</span>
                        </div>
                      </div>
                      <h3 className="font-medium text-gray-900 group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardContent className="p-6">
                <Button className="w-full bg-primary hover:bg-primary/90 mb-3" size="lg">
                  Hire {tasker.name}
                </Button>
                <Button variant="outline" className="w-full mb-4">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <div className="text-center text-sm text-gray-500">
                  Response time: {tasker.responseTime}
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Availability */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Pricing & Availability
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Hourly Rate:</span>
                    <span className="font-medium">{tasker.hourlyRate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <Badge variant="secondary" className="text-green-600">
                      {tasker.availability}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response Time:</span>
                    <span className="font-medium">{tasker.responseTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tasks Completed:</span>
                    <span className="font-medium">{tasker.completedTasks}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Overall Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{tasker.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Repeat Clients:</span>
                    <span className="font-medium">78%</span>
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