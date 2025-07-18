import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useState } from 'react'
import { 
  Search, 
  Wrench, 
  Home, 
  Car, 
  Laptop, 
  Paintbrush, 
  Package, 
  Users,
  Shield,
  Clock,
  Star,
  Hand,
  Plus,
  X,
  ChevronDown
} from 'lucide-react'

const taskCategories = [
  {
    icon: Home,
    title: 'Home Improvement',
    description: 'Handyman, plumbing, electrical',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: Wrench,
    title: 'Furniture Assembly',
    description: 'IKEA, moving, mounting',
    color: 'bg-green-50 text-green-600'
  },
  {
    icon: Car,
    title: 'Delivery & Moving',
    description: 'Moving help, delivery, pickup',
    color: 'bg-purple-50 text-purple-600'
  },
  {
    icon: Laptop,
    title: 'Tech Support',
    description: 'Computer help, setup, repair',
    color: 'bg-orange-50 text-orange-600'
  },
  {
    icon: Paintbrush,
    title: 'Creative Services',
    description: 'Design, writing, photography',
    color: 'bg-pink-50 text-pink-600'
  },
  {
    icon: Package,
    title: 'Errands',
    description: 'Shopping, pickup, waiting',
    color: 'bg-indigo-50 text-indigo-600'
  }
]

const featuredTasks = [
  {
    id: 1,
    title: 'Assemble IKEA furniture',
    location: 'Manhattan, NY',
    price: '$45',
    rating: 4.9,
    reviews: 127,
    urgent: true
  },
  {
    id: 2,
    title: 'Help with apartment move',
    location: 'Brooklyn, NY',
    price: '$80',
    rating: 4.8,
    reviews: 89,
    urgent: false
  },
  {
    id: 3,
    title: 'Computer setup and data transfer',
    location: 'Queens, NY',
    price: '$60',
    rating: 5.0,
    reviews: 45,
    urgent: true
  }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedStep, setExpandedStep] = useState(1) // Default to step 1 expanded
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/browse')
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gt-gradient py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Get help with anything,
              <br />
              <span className="text-blue-100">anytime, anywhere</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Connect with skilled Taskers in your area for home improvement, 
              furniture assembly, moving help, and more. Trusted by thousands.
            </p>
            
            {/* Search Bar */}
            <div className="mx-auto mt-10 max-w-2xl">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="What do you need help with?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 bg-white/95 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500"
                  />
                </div>
                <Button type="submit" size="lg" variant="search" className="h-12 px-8 font-semibold">
                  Find Taskers
                </Button>
              </form>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Insured & Bonded</span>
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

      {/* Task Categories */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Popular task categories
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Browse by category to find the perfect Tasker for your needs
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {taskCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.title} to={`/browse?category=${encodeURIComponent(category.title)}`} className="group">
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`rounded-lg p-3 ${category.color}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">
                            {category.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section - Growth Therapy Style */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Icon, Heading, and Image */}
            <div className="space-y-8">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Hand className="h-12 w-12 text-gray-700" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl leading-tight">
                      How it works
                    </h2>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Button className="bg-primary hover:bg-primary/90 text-black px-6 py-2 rounded-lg font-medium">
                    Find a tasker
                  </Button>
                </div>
              </div>

              {/* Image with Overlays - Matching Growth Therapy */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 aspect-[4/3] border-4 border-gray-800">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=450&fit=crop&crop=face"
                    alt="Person using mobile app"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Dropdown Overlays - Matching Growth Therapy Style */}
                  <div className="absolute bottom-6 left-6 flex flex-wrap gap-3">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg border border-gray-200">
                      <span className="text-sm text-gray-700 font-medium">your state</span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg border border-gray-200">
                      <span className="text-sm text-gray-700 font-medium">your insurance</span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg border border-gray-200">
                      <span className="text-sm text-gray-700 font-medium">your needs</span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Steps - Exact Growth Therapy Style */}
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Post your task
                      </h3>
                      {expandedStep === 1 && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Describe what you need done, set your budget, and choose when you'd like it completed. Our platform makes it easy to get started.
                        </p>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => setExpandedStep(expandedStep === 1 ? 0 : 1)}
                    className="flex-shrink-0 w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    {expandedStep === 1 ? (
                      <X className="h-3 w-3 text-gray-400" />
                    ) : (
                      <Plus className="h-3 w-3 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Choose your tasker
                      </h3>
                      {expandedStep === 2 && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Browse qualified taskers in your area, read reviews, and compare rates. Select the perfect person for your job.
                        </p>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => setExpandedStep(expandedStep === 2 ? 0 : 2)}
                    className="flex-shrink-0 w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    {expandedStep === 2 ? (
                      <X className="h-3 w-3 text-gray-400" />
                    ) : (
                      <Plus className="h-3 w-3 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Step 3 */}
              <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Get it done
                      </h3>
                      {expandedStep === 3 && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Your tasker arrives on time and completes the job. Pay securely through the platform and leave a review.
                        </p>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => setExpandedStep(expandedStep === 3 ? 0 : 3)}
                    className="flex-shrink-0 w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    {expandedStep === 3 ? (
                      <X className="h-3 w-3 text-gray-400" />
                    ) : (
                      <Plus className="h-3 w-3 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Step 4 */}
              <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">4</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Rate and review
                      </h3>
                      {expandedStep === 4 && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Share your experience to help other customers find great taskers. Your feedback helps maintain our quality community.
                        </p>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => setExpandedStep(expandedStep === 4 ? 0 : 4)}
                    className="flex-shrink-0 w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    {expandedStep === 4 ? (
                      <X className="h-3 w-3 text-gray-400" />
                    ) : (
                      <Plus className="h-3 w-3 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tasks */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Featured tasks
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Popular tasks in your area
              </p>
            </div>
            <Link to="/browse">
              <Button variant="outline">View all tasks</Button>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTasks.map((task) => (
              <Link key={task.id} to={`/task/${task.id}`} className="group">
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {task.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">
                          {task.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {task.location}
                        </p>
                        <div className="mt-3 flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{task.rating}</span>
                            <span className="text-sm text-gray-500">({task.reviews})</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {task.price}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
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
              Join thousands of people who trust Palmilla for their everyday needs
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/post-task">
                <Button size="lg" variant="secondary" className="px-8">
                  Post a Task
                </Button>
              </Link>
              <Link to="/browse">
                <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-primary">
                  Browse Tasks
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}