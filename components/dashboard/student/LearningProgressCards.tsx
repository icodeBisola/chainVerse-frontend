"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { learningProgress } from "@/data/student-dashboard"

export function LearningProgressCards() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">My Learning</h3>
                <Tabs defaultValue="current" className="w-[300px]">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1">
                        <TabsTrigger value="current" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md text-xs py-1">Current Courses</TabsTrigger>
                        <TabsTrigger value="completed" className="text-xs py-1">Completed</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningProgress.map((course) => (
                    <Card key={course.id} className="bg-white border-gray-200 overflow-hidden">
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-1 min-h-[3.5rem]">
                                <h4 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2">{course.title}</h4>
                                <p className="text-xs text-gray-400">{course.lastActive}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-500">Progress</span>
                                    <span className="text-xs font-bold text-gray-900">{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} className="h-2 bg-gray-100" />
                            </div>

                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Next up:</p>
                                <p className="text-sm text-gray-700 font-medium truncate">{course.nextLesson}</p>
                            </div>

                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 shadow-sm transition-all">
                                Continue Learning
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
