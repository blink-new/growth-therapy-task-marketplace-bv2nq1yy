import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { 
  Plus,
  Calendar,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Eye,
  Edit
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock user data
  const user = {
    name: 'Jennifer Smith',
    email: 'jennifer@example.com',
    avatar: 'JS',
    memberSince: 'January 2023',
    totalSpent: 1250,
    tasksPosted: 15,
    tasksCompleted: 12,
    rating: 4.8,
    reviews: 23
  }

  const myTasks = [
    {
      id: 1,
      title: 'Assemble IKEA furniture',
      status: 'in_progress',
      price: '$45',
      applications: 12,
      assignedTo: 'Mike Johnson',
      dueDate: '2024-01-20',
      postedDate: '2024-01-18'
    },
    {
      id: 2,
      title: 'Paint bedroom walls',
      status: 'completed',
      price: '$120',
      applications: 8,
      assignedTo: 'Lisa Rodriguez',
      dueDate: '2024-01-15',
      postedDate: '2024-01-12'
    },
    {
      id: 3,
      title: 'Help with apartment move',
      status: 'open',
      price: '$80',
      applications: 5,
      assignedTo: null,
      dueDate: '2024-01-25',
      postedDate: '2024-01-19'
    },
    {
      id: 4,
      title: 'Computer setup',
      status: 'cancelled',
      price: '$60',
      applications: 3,
      assignedTo: null,
      dueDate: '2024-01-10',
      postedDate: '2024-01-08'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'task_completed',
      message: 'Task "Paint bedroom walls" was completed by Lisa Rodriguez',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'application_received',
      message: 'New application received for "Assemble IKEA furniture"',
      time: '5 hours ago'
    },
    {
      id: 3,
      type: 'task_posted',
      message: 'You posted a new task "Help with apartment move"',
      time: '1 day ago'
    },
    {
      id: 4,
      type: 'review_received',
      message: 'You received a 5-star review from Mike Johnson',
      time: '2 days ago'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="h-4 w-4" />
      case 'in_progress': return <AlertCircle className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-2 text-lg text-gray-600">
                Welcome back, {user.name}
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link to="/post-task">
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Post New Task
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">My Tasks</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tasks Posted</p>
                      <p className="text-2xl font-bold text-gray-900">{user.tasksPosted}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">{user.tasksCompleted}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Spent</p>
                      <p className="text-2xl font-bold text-gray-900">${user.totalSpent}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Your Rating</p>
                      <div className="flex items-center space-x-1">
                        <p className="text-2xl font-bold text-gray-900">{user.rating}</p>
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <Star className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-gray-900">{task.title}</h3>
                          <Badge className={getStatusColor(task.status)}>
                            {getStatusIcon(task.status)}
                            <span className="ml-1 capitalize">{task.status.replace('_', ' ')}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {task.assignedTo ? `Assigned to ${task.assignedTo}` : `${task.applications} applications`}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-primary">{task.price}</div>
                        <div className="text-sm text-gray-500">Due {task.dueDate}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    View All Tasks
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myTasks.map((task) => (
                    <div key={task.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                            <Badge className={getStatusColor(task.status)}>
                              {getStatusIcon(task.status)}
                              <span className="ml-1 capitalize">{task.status.replace('_', ' ')}</span>
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Posted {task.postedDate}</span>
                            <span>Due {task.dueDate}</span>
                            <span>{task.applications} applications</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary mb-2">{task.price}</div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="mr-1 h-3 w-3" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="mr-1 h-3 w-3" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                      {task.assignedTo && (
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-white text-sm">
                                {task.assignedTo.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">{task.assignedTo}</div>
                              <div className="text-sm text-gray-600">Assigned Tasker</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="mr-1 h-3 w-3" />
                            Message
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                      <div className="rounded-full bg-primary/10 p-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.message}</p>
                        <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary text-white text-2xl">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <p className="text-gray-900">{user.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                      <p className="text-gray-900">{user.memberSince}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Rating: </span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{user.rating}</span>
                          <span className="text-gray-500">({user.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}