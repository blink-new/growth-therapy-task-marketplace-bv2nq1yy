import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  Search, 
  Filter,
  MapPin,
  Star,
  Clock,
  Calendar,
  DollarSign
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function BrowseTasksPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [sortBy, setSortBy] = useState('newest')
  const [locationQuery, setLocationQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('anytime')
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch tasks and categories from database
  useEffect(() => {
    const loadData = async () => {
      await fetchTasks()
      await fetchCategories()
    }
    loadData()
  }, [])

  // Update search query when URL params change
  useEffect(() => {
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || 'all'
    setSearchQuery(search)
    setSelectedCategory(category)
  }, [searchParams])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const { data: tasksData, error } = await supabase
        .from('tasks')
        .select(`
          *,
          categories (name),
          users!tasks_customer_id_fkey (full_name, avatar_url, rating, total_reviews)
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedTasks = tasksData?.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        location: task.location,
        price: task.budget_max ? `${task.budget_max}` : `${task.budget_min || 50}`,
        priceType: 'fixed',
        category: task.categories?.name || 'General',
        urgent: task.urgent,
        postedTime: getTimeAgo(task.created_at),
        tasker: {
          name: task.users?.full_name || 'Anonymous',
          rating: task.users?.rating || 4.5,
          reviews: task.users?.total_reviews || 0,
          avatar: getInitials(task.users?.full_name || 'Anonymous')
        }
      })) || []

      setTasks(formattedTasks)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('name')
        .order('name')

      if (error) throw error

      const categoryNames = data?.map(cat => cat.name) || []
      setCategories(['All Categories', ...categoryNames])
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories(['All Categories'])
    }
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} days ago`
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim())
    }
    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory)
    }
    setSearchParams(params)
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchQuery === '' || 
                         task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           task.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesLocation = locationQuery === '' ||
                           task.location.toLowerCase().includes(locationQuery.toLowerCase())
    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
          <p className="mt-2 text-lg text-gray-600">
            {searchQuery ? `Results for "${searchQuery}"` : 'Find the perfect task that matches your skills'}
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-end lg:space-x-4">
          {/* What */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">What</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="What do you need help with?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* When */}
          <div className="w-full lg:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">When</label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="When" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anytime">Anytime</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="this-week">This week</SelectItem>
                <SelectItem value="next-week">Next week</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Where */}
          <div className="w-full lg:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">Where</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter location"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button type="submit" variant="search" className="w-full lg:w-auto px-8">
            Search
          </Button>
        </form>

        {/* Additional Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest rated</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredTasks.length} tasks
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-full">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="h-4 w-16 bg-gray-200 rounded"></div>
                          <div className="h-4 w-12 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="h-8 w-16 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                        <div>
                          <div className="h-4 w-20 bg-gray-200 rounded mb-1"></div>
                          <div className="h-3 w-16 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <div className="h-8 w-16 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Task Grid */}
        {!loading && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredTasks.map((task) => (
            <Link key={task.id} to={`/task/${task.id}`} className="group">
              <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {task.category}
                        </Badge>
                        {task.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary mb-2">
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {task.description}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-primary">
                        {task.price}
                      </div>
                      <div className="text-xs text-gray-500">
                        {task.priceType === 'hourly' ? '/hour' : 'fixed'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{task.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{task.postedTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                          {task.tasker.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {task.tasker.name}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">
                              {task.tasker.rating} ({task.tasker.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Apply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            ))}
          </div>
        )}

        {!loading && filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p>Try adjusting your search criteria or browse all categories.</p>
            </div>
            <Button variant="outline" onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setLocationQuery('')
              setSearchParams({})
            }}>
              Clear filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredTasks.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load more tasks
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}