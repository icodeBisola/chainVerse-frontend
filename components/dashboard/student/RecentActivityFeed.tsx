"use client"

import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { recentActivities } from "@/data/student-dashboard"

export function RecentActivityFeed() {
    return (
        <Card className="bg-white border-gray-200">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
                <CardDescription className="text-sm text-gray-500">Your latest learning activities</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                    {recentActivities.map((activity) => {
                        const Icon = activity.icon
                        return (
                            <div key={activity.id} className="p-6 flex items-start gap-4">
                                <div className={`p-2 rounded-full ${activity.type === 'lesson' ? 'bg-blue-50 text-blue-500' :
                                    activity.type === 'question' ? 'bg-purple-50 text-purple-500' :
                                        activity.type === 'purchase' ? 'bg-orange-50 text-orange-500' :
                                            activity.type === 'certificate' ? 'bg-emerald-50 text-emerald-500' :
                                                'bg-indigo-50 text-indigo-500'
                                    }`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-bold text-gray-900">{activity.title}</h4>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{activity.description}</p>

                                    {activity.type === 'review' && activity.rating && (
                                        <div className="flex items-center gap-0.5 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < activity.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    <p className="text-xs text-gray-400 mt-2">{activity.timestamp}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="p-6">
                    <Button variant="outline" className="w-full justify-center text-gray-700 border-gray-200 bg-gray-50 hover:bg-gray-100">
                        View All Activity
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
