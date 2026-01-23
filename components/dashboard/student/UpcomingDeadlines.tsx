"use client"

import { Calendar, FileText, BookOpenCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { upcomingDeadlines } from "@/data/student-dashboard"

export function UpcomingDeadlines() {
    return (
        <Card className="bg-white border-gray-200 h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Upcoming Deadlines</CardTitle>
                <CardDescription className="text-sm text-gray-500">Assignments and quizzes</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
                {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${deadline.type === 'quiz' ? 'bg-orange-100 text-orange-600' :
                            deadline.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                                'bg-indigo-100 text-indigo-600'
                            }`}>
                            {deadline.type === 'quiz' ? <BookOpenCheck className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                        </div>
                        <div className="space-y-1 overflow-hidden">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">{deadline.title}</h4>
                            <p className="text-xs text-gray-500 truncate">{deadline.course}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                <Calendar className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">{deadline.dueDate}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
            <div className="p-6 pt-0">
                <Button variant="outline" className="w-full justify-center gap-2 text-gray-700 border-gray-200 bg-gray-50 hover:bg-gray-100">
                    <Calendar className="h-4 w-4" />
                    View Calendar
                </Button>
            </div>
        </Card>
    )
}
