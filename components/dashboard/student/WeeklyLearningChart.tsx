"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { weeklyActivityData } from "@/data/student-dashboard"

export function WeeklyLearningChart() {
    return (
        <Card className="bg-white border-gray-200">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Learning Progress</CardTitle>
                <CardDescription className="text-sm text-gray-500">Your weekly learning activity</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={weeklyActivityData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            barSize={40}
                        >
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                tickFormatter={(value) => `${value}hrs`}
                                domain={[0, 10]}
                                ticks={[0, 2, 4, 6, 8, 10]}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar
                                dataKey="hours"
                                radius={[4, 4, 0, 0]}
                            >
                                {weeklyActivityData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index % 2 === 0 && index !== 4 ? "#A855F7" : "#3B82F6"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
