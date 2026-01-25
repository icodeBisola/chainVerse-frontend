"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useParams } from "next/navigation";
import { getMockCourses } from "../../mockCourses";
import { Loader2, Plus, Save, Trash2, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const mockCourseData = {
  categories: ["Cloud Computing", "Artificial Intelligence", "Blockchain"],
  curriculum: [
    {
      id: 1,
      name: "Introduction",
      lessons: [
        { id: 1, title: "Welcome to introduction to Solana", videoUrl: "https://youtu.be/example1", videos: 1 },
        { id: 2, title: "Setup your environment", videoUrl: "", videos: 1 },
        { id: 3, title: "Hello World Program", videoUrl: "", videos: 1 },
      ],
    },
    {
      id: 2,
      name: "Foundations of Solana",
      lessons: [
        { id: 1, title: "Accounts and Programs", videoUrl: "", videos: 1 },
        { id: 2, title: "Transactions and PDAs", videoUrl: "", videos: 1 },
      ],
    },
  ],
};

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const courseId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [course, setCourse] = useState<any>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Editing States
  const [renamingSectionId, setRenamingSectionId] = useState<number | null>(null);
  const [tempSectionName, setTempSectionName] = useState("");
  const [editingContentSectionId, setEditingContentSectionId] = useState<number | null>(null);

  useEffect(() => {
    getMockCourses().then((courses) => {
      const courseList = courses as any[];
      const found = courseList.find((c: any) => c.id === courseId);
      if (found) {
        setCourse({
          ...found,
          categories: mockCourseData.categories,
          curriculum: found.curriculum || mockCourseData.curriculum,
        });
      }
      setLoading(false);
    });
  }, [courseId]);

  const handleSave = async () => {
    // Basic Validation
    if (!course.title || !course.description || !course.price) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Title, Description, Price).",
      });
      return;
    }

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Success",
        description: "Course saved successfully",
      });
    }, 1500);
  };

  const updateCourseField = (field: string, value: any) => {
    setCourse((prev: any) => ({ ...prev, [field]: value }));
  };

  // Section Management
  const handleRenameClick = (section: any) => {
    setRenamingSectionId(section.id);
    setTempSectionName(section.name);
  };

  const saveSectionName = (id: number) => {
    if (!tempSectionName.trim()) return;
    setCourse((prev: any) => ({
      ...prev,
      curriculum: prev.curriculum.map((sec: any) =>
        sec.id === id ? { ...sec, name: tempSectionName } : sec
      )
    }));
    setRenamingSectionId(null);
  };

  const addSection = () => {
    const newId = Math.max(0, ...course.curriculum.map((c: any) => c.id), 0) + 1;
    setCourse((prev: any) => ({
      ...prev,
      curriculum: [...prev.curriculum, { id: newId, name: "New Section", lessons: [] }]
    }));
    setSelectedSection(newId);
  };

  const deleteSection = (id: number) => {
    setCourse((prev: any) => ({
      ...prev,
      curriculum: prev.curriculum.filter((sec: any) => sec.id !== id)
    }));
    if (selectedSection === id) setSelectedSection(null);
  };

  // Lesson Management
  const toggleEditContent = (id: number) => {
    setEditingContentSectionId(editingContentSectionId === id ? null : id);
  };

  const addLesson = (sectionId: number) => {
    setCourse((prev: any) => ({
      ...prev,
      curriculum: prev.curriculum.map((sec: any) => {
        if (sec.id !== sectionId) return sec;
        const newId = Math.max(0, ...sec.lessons.map((l: any) => l.id), 0) + 1;
        return {
          ...sec,
          lessons: [...sec.lessons, { id: newId, title: "New Lesson", videoUrl: "", videos: 0 }]
        };
      })
    }));
  };

  const updateLessonField = (sectionId: number, lessonId: number, field: string, value: string) => {
    setCourse((prev: any) => ({
      ...prev,
      curriculum: prev.curriculum.map((sec: any) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          lessons: sec.lessons.map((l: any) => l.id === lessonId ? { ...l, [field]: value } : l)
        };
      })
    }));
  };

  const deleteLesson = (sectionId: number, lessonId: number) => {
    setCourse((prev: any) => ({
      ...prev,
      curriculum: prev.curriculum.map((sec: any) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          lessons: sec.lessons.filter((l: any) => l.id !== lessonId)
        };
      })
    }));
  };

  if (loading) return <div className="p-8 flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-gray-400" /></div>;
  if (!course) return <div className="p-8 text-red-500">Course not found</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-2 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="mr-2 p-2 rounded hover:bg-gray-100 transition"
            aria-label="Go back"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">{course.title}</h1>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white">
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ overflow: 'visible' }}>

        {/* Left Column */}
        <div className="flex flex-col gap-6" style={{ overflow: 'visible' }}>
          <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center" style={{ overflow: 'visible' }}>
            <img
              src={course.thumbnail}
              alt="Course thumbnail"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
            <span className="text-sm text-gray-500 cursor-pointer hover:text-blue-600">Click image to change thumbnail image</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 flex flex-col gap-4" style={{ overflow: 'visible' }}>
            <div>
              <label className="block text-sm font-medium mb-1">Course Title</label>
              <Input
                value={course.title}
                onChange={(e) => updateCourseField("title", e.target.value)}
                className="bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Course Description</label>
              <Textarea
                value={course.description}
                onChange={(e) => updateCourseField("description", e.target.value)}
                className="bg-white min-h-[60px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Course Category</label>
              <Select value={course.category} onValueChange={(val) => updateCourseField("category", val)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="z-[9999]" side="bottom" position="popper">
                  {course.categories.map((cat: any) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 flex flex-col gap-2" style={{ overflow: 'visible' }}>
            <label className="block text-sm font-medium mb-1">Pricing</label>
            <span className="text-xs text-gray-500 mb-1">Set your pricing plan, you can either make it free or paid</span>
            <Input
              value={course.price}
              onChange={(e) => updateCourseField("price", e.target.value)}
              className="bg-white"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6" style={{ overflow: 'visible' }}>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-2">
              <div className="text-lg font-medium">Curriculum</div>
              <Button size="sm" variant="outline" onClick={addSection} className="h-8">
                <Plus className="h-4 w-4 mr-1" /> Section
              </Button>
            </div>
            <div className="text-xs text-gray-500 mb-4">Set your pricing plan, you can either make it free or paid</div>

            <div className="flex flex-col gap-6">
              {course.curriculum.map((section: any) => (
                <div key={section.id} className="bg-white rounded-lg border border-gray-200">
                  {/* Section Header */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedSection === section.id}
                        onChange={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
                        className="accent-blue-600 w-4 h-4 cursor-pointer"
                      />
                      {renamingSectionId === section.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            value={tempSectionName}
                            onChange={(e) => setTempSectionName(e.target.value)}
                            className="h-8 text-sm"
                            autoFocus
                          />
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600" onClick={() => saveSectionName(section.id)}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400" onClick={() => setRenamingSectionId(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <span className="font-semibold text-base">{section.name}</span>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-400">
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </Button>
                  </div>

                  {/* Lessons */}
                  <div className="divide-y divide-gray-100">
                    {section.lessons.map((lesson: any) => (
                      <div key={lesson.id} className="flex items-center justify-between px-4 py-2">
                        <div className="flex-1 mr-4">
                          {editingContentSectionId === section.id ? (
                            <div className="flex flex-col gap-2 my-1">
                              <Input
                                value={lesson.title}
                                onChange={(e) => updateLessonField(section.id, lesson.id, "title", e.target.value)}
                                className="h-8 text-sm"
                                placeholder="Lesson Title"
                              />
                              <Input
                                value={lesson.videoUrl || ""}
                                onChange={(e) => updateLessonField(section.id, lesson.id, "videoUrl", e.target.value)}
                                className="h-8 text-sm"
                                placeholder="Video URL"
                              />
                            </div>
                          ) : (
                            <div className="font-medium text-sm text-blue-900 hover:underline cursor-pointer">{lesson.title}</div>
                          )}
                          <div className="text-xs text-gray-500">{lesson.videos} video</div>
                        </div>

                        {editingContentSectionId === section.id ? (
                          <Button variant="ghost" size="icon" className="text-red-400" onClick={() => deleteLesson(section.id, lesson.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" className="text-gray-400">
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </Button>
                        )}
                      </div>
                    ))}

                    {/* Add Lesson Button (Only in Edit Content Mode) */}
                    {editingContentSectionId === section.id && (
                      <div className="px-4 py-2">
                        <Button variant="outline" size="sm" onClick={() => addLesson(section.id)} className="w-full border-dashed">
                          <Plus className="h-3 w-3 mr-1" /> Add Lesson
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Action Footer (Only when selected) */}
                  {selectedSection === section.id && (
                    <div className="flex gap-2 px-4 py-2 border-t border-gray-100 bg-gray-50">
                      <Button variant="outline" className="flex-1" onClick={() => deleteSection(section.id)}>Delete</Button>
                      <Button variant="outline" className="flex-1" onClick={() => handleRenameClick(section)}>Rename</Button>
                      <Button
                        variant={editingContentSectionId === section.id ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => toggleEditContent(section.id)}
                      >
                        {editingContentSectionId === section.id ? "Done" : "Edit Content"}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}