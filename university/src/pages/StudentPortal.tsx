import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import {
  User,
  Lock,
  BookOpen,
  GraduationCap,
  FileText,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Use Vite env (VITE_API_BASE) instead of process.env which is not defined in the browser
const API_BASE =
  (import.meta as any).env?.VITE_API_BASE || "http://localhost:8080";

// --- ADDED: demo quizzes, competitions and persistence helpers ---
const sampleQuizzes = [
  {
    id: "q1",
    title: "Algorithms Basics",
    questions: [
      {
        q: "What is Big-O of binary search?",
        options: ["O(n)", "O(log n)", "O(1)"],
        a: 1,
      },
      {
        q: "Which is a divide-and-conquer algorithm?",
        options: ["Bubble sort", "Merge sort", "Insertion sort"],
        a: 1,
      },
    ],
    marks: 10,
  },
  {
    id: "q2",
    title: "Data Structures Quick",
    questions: [
      {
        q: "Queue follows which order?",
        options: ["LIFO", "FIFO", "Random"],
        a: 1,
      },
      {
        q: "Which DS provides constant time lookup?",
        options: ["Array", "Hash Table", "Linked List"],
        a: 1,
      },
    ],
    marks: 10,
  },
];

const sampleCompetitions = [
  {
    id: "c1",
    title: "Monthly Coding Challenge",
    date: "2025-10-01",
    reward: "Certificate",
  },
  {
    id: "c2",
    title: "Hackathon Sprint",
    date: "2025-11-15",
    reward: "Top Prizes",
  },
];

// Persist student-specific state to localStorage
const storageKey = (roll: string) => `tt6_student_state_${roll}`;
const loadStudentState = (roll: string) => {
  try {
    const raw = localStorage.getItem(storageKey(roll));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
const saveStudentState = (roll: string, state: any) => {
  try {
    localStorage.setItem(storageKey(roll), JSON.stringify(state));
  } catch {}
};

// lightweight heuristic summary — replace with server-side AI later
const aiSummarizePerformance = (student: any) => {
  const parts: string[] = [];
  if (student.cgpa != null) {
    parts.push(
      `CGPA is ${student.cgpa.toFixed(2)} (${
        student.cgpa >= 8
          ? "Excellent"
          : student.cgpa >= 6.5
          ? "Good"
          : "Needs Improvement"
      }).`
    );
  }
  if (student.attendance != null) {
    parts.push(
      `Attendance at ${student.attendance}% (${
        student.attendance >= 75 ? "Satisfactory" : "Improve attendance"
      }).`
    );
  }
  if (student.subjects?.length) {
    const lowGrades = student.subjects.filter((s: any) =>
      /^[CDcdf]/.test(s.grade)
    );
    if (lowGrades.length) {
      parts.push(
        `Focus required on: ${lowGrades.map((s: any) => s.name).join(", ")}.`
      );
    } else {
      parts.push("All subjects show good performance.");
    }
  }
  return parts.join(" ");
};

// basic study plan generator using subjects and performance
const aiGenerateStudyPlan = (student: any) => {
  const plan: string[] = [];
  const subjects = student.subjects || [];
  if (!subjects.length) {
    plan.push(
      "No subjects found — maintain regular revision and consult faculty for curriculum guidance."
    );
    return plan;
  }
  subjects.forEach((s: any) => {
    const grade = (s.grade || "").toUpperCase();
    if (["A+", "A", "B"].includes(grade)) {
      plan.push(
        `${s.name}: Continue regular revision and attempt advanced problems/projects.`
      );
    } else {
      plan.push(
        `${s.name}: Allocate 4-6 focused study sessions per week, practice past papers and consult faculty.`
      );
    }
  });
  if (student.cgpa < 6.5) {
    plan.push(
      "Overall: Consider remedial classes, peer study groups, and weekly progress tracking."
    );
  } else {
    plan.push(
      "Overall: Keep up the current pace and attempt mini-projects to strengthen application skills."
    );
  }
  return plan;
};

// --- ADDED: sample demo student used when backend is not running ---
const sampleStudent: any = {
  rollNumber: "DEMO001",
  name: "Demo Student",
  department: "Computer Science (Demo)",
  cgpa: 8.2,
  attendance: 90,
  subjects: [
    { name: "Algorithms", grade: "A" },
    { name: "Data Structures", grade: "A-" },
    { name: "Operating Systems", grade: "B+" },
  ],
  activities: [
    { type: "Announcement", text: "Demo: Welcome week next Monday" },
    { type: "Assignment", text: "Demo: Submit project proposal" },
  ],
  role: "student",
  // demo-specific fields:
  quizHistory: [], // { quizId, score, total, date }
  assessments: [], // { id, title, marks, obtained?, assignedBy, date }
  competitions: [], // { id, title, date, result? }
};
// --- end added ---

// New AI helpers: weak-topic detection, resource recommendations, schedule generator, simulated exam
const aiIdentifyWeakTopics = (student: any) => {
  if (!student?.subjects || student.subjects.length === 0) return [];
  // treat grades starting with C/D/F or B- as weak
  const weak = student.subjects
    .filter((s: any) => {
      const g = (s.grade || "").toUpperCase();
      return /^[CDF]/.test(g) || g.endsWith("-");
    })
    .map((s: any) => s.name);
  return weak;
};

const aiRecommendResources = (student: any) => {
  const weak = aiIdentifyWeakTopics(student);
  if (!weak.length)
    return [
      {
        topic: "General",
        resources: ["Official docs, practice problems, mini-projects"],
      },
    ];

  // simple mapping for demo; extend as needed
  const knowledgeBase: Record<string, string[]> = {
    Algorithms: [
      "https://www.geeksforgeeks.org/fundamentals-of-algorithms/",
      "https://leetcode.com/problemset/all/",
      "Coursera: Algorithms (Stanford)",
    ],
    "Data Structures": [
      "https://visualgo.net/en",
      "https://www.geeksforgeeks.org/data-structures/",
      "FreeCodeCamp Data Structures playlist",
    ],
    "Operating Systems": [
      "https://pages.cs.wisc.edu/~remzi/OSTEP/",
      "Operating Systems - Coursera",
    ],
    "Database Systems": [
      "https://www.postgresql.org/docs/",
      "Stanford Databases course",
    ],
    default: [
      "Khan Academy",
      "Coursera / Udemy courses",
      "Practice on HackerRank / LeetCode",
    ],
  };

  return weak.map((topic: string) => ({
    topic,
    resources: knowledgeBase[topic] || knowledgeBase["default"],
  }));
};

const aiGenerateStudySchedule = (student: any) => {
  const weak = aiIdentifyWeakTopics(student);
  const schedule: string[] = [];
  if (!weak.length) {
    schedule.push(
      "Balanced schedule: 2-3 hours/week per subject, weekly revision and one mini-project."
    );
    return schedule;
  }
  const intensity =
    student.cgpa && student.cgpa < 6.5 ? 6 : student.cgpa < 7.5 ? 4 : 3;
  weak.forEach((t: string) => {
    schedule.push(
      `${t}: ${intensity} focused study sessions/week (1.5 hrs each) — practice problems + revision.`
    );
  });
  schedule.push(
    "Overall: Weekly progress check and at least one mock test every two weeks."
  );
  return schedule;
};

// Simulated exam generator: builds a combined quiz from available quizzes
const aiGenerateSimulatedExam = (student: any) => {
  const pool = student.availableQuizzes || [];
  const questions: any[] = [];
  // pick up to 6 random questions across pools for a small simulated exam
  for (const qset of pool) {
    if (!qset.questions) continue;
    qset.questions.slice(0, 3).forEach((q: any) => questions.push({ ...q }));
  }
  // shuffle and trim
  const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, 6);
  return {
    id: `sim_${Date.now()}`,
    title: `Simulated Exam - ${new Date().toLocaleDateString()}`,
    questions: shuffled,
    marks: shuffled.length * 2, // 2 marks per question for demo
  };
};

// --- ADDED: fixed simulated exam generator to ensure questions/options/answers/marks are present ---
const aiGenerateSimulatedExamFixed = (student: any) => {
  const pool = student.availableQuizzes || [];
  const questions: any[] = [];
  for (const qset of pool) {
    if (!qset.questions) continue;
    // copy questions and ensure option list and answer index exist
    qset.questions.forEach((q: any) => {
      if (q.q && Array.isArray(q.options)) {
        questions.push({
          q: q.q,
          options: [...q.options],
          a: typeof q.a === "number" ? q.a : 0,
        });
      }
    });
  }
  const shuffled = questions
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(6, questions.length));
  return {
    id: `sim_${Date.now()}`,
    title: `Simulated Exam - ${new Date().toLocaleDateString()}`,
    questions: shuffled,
    marks: shuffled.length * 2,
  };
};
// --- end added ---

// Persist AI outputs (demo) so user sees same recommendations after refresh
const saveAiOutputs = (roll: string, payload: any) => {
  try {
    localStorage.setItem(`tt6_ai_${roll}`, JSON.stringify(payload));
  } catch {}
};
const loadAiOutputs = (roll: string) => {
  try {
    const raw = localStorage.getItem(`tt6_ai_${roll}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// --- ADDED: detailed subject metadata (5 units, syllabus pdf, projects, outcomes) ---
const sampleSubjects = [
  {
    name: "Algorithms",
    units: [
      "Unit 1: Introduction & Asymptotic Analysis",
      "Unit 2: Sorting & Divide and Conquer",
      "Unit 3: Greedy Algorithms",
      "Unit 4: Dynamic Programming",
      "Unit 5: Graph Algorithms",
    ],
    // working public sample PDF
    syllabusPdf:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    projects: [
      "Implement and visualise sorting algorithms",
      "Design a shortest-path visualiser",
      "Compare DP solutions on classical problems",
    ],
    outcomes: [
      "Understand asymptotic analysis and algorithm design techniques",
      "Apply divide-and-conquer, greedy and dynamic programming methods",
      "Analyze graphs and apply shortest/ spanning tree algorithms",
    ],
  },
  {
    name: "Data Structures",
    units: [
      "Unit 1: Arrays, Linked Lists",
      "Unit 2: Stacks & Queues",
      "Unit 3: Trees & Binary Trees",
      "Unit 4: Hashing & Hash Tables",
      "Unit 5: Advanced Trees & Graphs",
    ],
    syllabusPdf:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    projects: [
      "Build a hash-table with collision handling",
      "Implement a balanced binary search tree",
      "Create a visualiser for traversal algorithms",
    ],
    outcomes: [
      "Design and implement core data structures",
      "Select appropriate data structures for problem solving",
      "Analyze performance and memory trade-offs",
    ],
  },
  // ... you can add more subjects similarly ...
];
// --- end added ---

const StudentPortal = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  // token may be 'demo' for demo mode
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("tt6_token")
  );
  const [student, setStudent] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | string[] | null>(null);
  const [recommendedResources, setRecommendedResources] = useState<
    any[] | null
  >(null);
  const [studySchedule, setStudySchedule] = useState<string[] | null>(null);
  const [simExam, setSimExam] = useState<any | null>(null);

  // --- ADDED: demo mode toggle state ---
  const [useDemo, setUseDemo] = useState<boolean>(
    () => localStorage.getItem("tt6_token") === "demo"
  );
  // --- end added ---

  // --- ADDED: UI & quiz states ---
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "subjects"
    | "quizzes"
    | "assessments"
    | "competitions"
    | "outcomes"
    | "faculty"
  >("overview");
  const [currentQuiz, setCurrentQuiz] = useState<any | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [facultyTitle, setFacultyTitle] = useState("");
  const [facultyMarks, setFacultyMarks] = useState<number>(100);
  // --- end added ---

  const fetchProfile = async (authToken: string) => {
    try {
      // If demo token, return sample data without network
      if (authToken === "demo") {
        // try to load saved demo state first
        const saved = loadStudentState(sampleStudent.rollNumber);
        const s = saved || sampleStudent;
        // ensure quizzes and competitions available
        s.availableQuizzes = sampleQuizzes;
        s.availableCompetitions = sampleCompetitions;
        // ensure detailed subjects available for demo student
        if (!s.subjectsDetailed) {
          s.subjectsDetailed = sampleSubjects;
        }
        setStudent(s);
        setAiOutput(null);
        return s;
      }

      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) {
        throw new Error("Unauthorized");
      }
      const data = await res.json();

      // enrich data for UI: ensure quizzes/competitions and detailed subject metadata
      const enriched = { ...data };

      // ensure quizzes/competitions exist
      if (!enriched.availableQuizzes || enriched.availableQuizzes.length === 0) {
        enriched.availableQuizzes = sampleQuizzes;
      }
      if (!enriched.availableCompetitions || enriched.availableCompetitions.length === 0) {
        enriched.availableCompetitions = sampleCompetitions;
      }

      // normalize attendance: accept "92%", "92", or number -> store as number (percent)
      if (enriched.attendance != null) {
        if (typeof enriched.attendance === "string") {
          const n = parseFloat(enriched.attendance.replace(/[^0-9.]/g, ""));
          if (!isNaN(n)) enriched.attendance = n;
        } else if (typeof enriched.attendance === "number") {
          // keep as-is
        }
      }

      // build subjectsDetailed if missing or empty
      enriched.subjectsDetailed = enriched.subjectsDetailed || [];
      const userSubjectsRaw = enriched.subjects || [];
      // Normalize subjects into objects [{ name, grade? }]
      const userSubjects: any[] =
        userSubjectsRaw && userSubjectsRaw.length
          ? userSubjectsRaw.map((s: any) =>
              typeof s === "string" ? { name: s, grade: null } : { name: s.name || s.subject || "", grade: s.grade || null }
            )
          : [];

      if (userSubjects.length === 0) {
        // If user has no listed subjects, fall back to full sampleSubjects so UI isn't empty
        enriched.subjectsDetailed = sampleSubjects.map((m) => ({ ...m, grade: null }));
      } else {
        enriched.subjectsDetailed = [];
        for (const s of userSubjects) {
          const name = (s.name || "").trim();
          let meta =
            sampleSubjects.find((ss) => ss.name.toLowerCase() === name.toLowerCase()) ||
            sampleSubjects.find((ss) => name ? ss.name.toLowerCase().includes(name.split(" ")[0].toLowerCase()) : false);

          if (meta) {
            enriched.subjectsDetailed.push({ ...meta, grade: s.grade || null });
          } else {
            enriched.subjectsDetailed.push({
              name: name || "Unknown Subject",
              units: [
                "Unit 1: Overview",
                "Unit 2: Core Concepts",
                "Unit 3: Practical Applications",
                "Unit 4: Advanced Topics",
                "Unit 5: Project / Case Studies",
              ],
              syllabusPdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
              projects: ["Project: Apply core concepts", "Mini assignment"],
              outcomes: [
                "Understand core ideas",
                "Apply concepts in practical tasks",
                "Demonstrate through a mini-project",
              ],
              grade: s.grade || null,
            });
          }
        }
      }

      setStudent(enriched);
      setAiOutput(null);
      return enriched;
    } catch {
      // token invalid or expired
      localStorage.removeItem("tt6_token");
      setToken(null);
      setStudent(null);
      return null;
    }
  };

  useEffect(() => {
    if (token && !student) {
      fetchProfile(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Persist student when changes happen (demo mode)
  useEffect(() => {
    if (useDemo && student?.rollNumber) {
      saveStudentState(student.rollNumber, student);
    }
  }, [student, useDemo]);

  // run on login / profile fetch to restore previous AI outputs (demo)
  useEffect(() => {
    if (useDemo && student?.rollNumber) {
      const saved = loadAiOutputs(student.rollNumber);
      if (saved) {
        setRecommendedResources(saved.recommendedResources || null);
        setStudySchedule(saved.studySchedule || null);
        setSimExam(saved.simExam || null);
      }
    }
  }, [student, useDemo]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // If user selected demo mode, bypass backend calls
      if (useDemo) {
        localStorage.setItem("tt6_token", "demo");
        setToken("demo");
        // load saved demo or default
        const saved =
          loadStudentState(sampleStudent.rollNumber) || sampleStudent;
        saved.availableQuizzes = sampleQuizzes;
        saved.availableCompetitions = sampleCompetitions;
        setStudent(saved);
        setAiOutput(null);
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNumber, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Login failed" }));
        alert(err.message || "Login failed");
        setLoading(false);
        return;
      }
      const { token: t } = await res.json();
      localStorage.setItem("tt6_token", t);
      setToken(t);
      await fetchProfile(t);
    } catch (e) {
      alert("Network error during login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("tt6_token");
    setToken(null);
    setStudent(null);
    setRollNumber("");
    setPassword("");
    setAiOutput(null);
    setUseDemo(false);
  };

  // --- ADDED: quiz flow handlers ---
  const startQuiz = (quiz: any) => {
    setCurrentQuiz(quiz);
    setAnswers({});
    setActiveTab("quizzes");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitQuiz = () => {
    if (!currentQuiz || !student) return;
    const qs = currentQuiz.questions;
    let correct = 0;
    qs.forEach((q: any, i: number) => {
      if (answers[i] === q.a) correct++;
    });
    const score = Math.round((correct / qs.length) * currentQuiz.marks);
    // record in student's quizHistory and assessments
    const record = {
      quizId: currentQuiz.id,
      title: currentQuiz.title,
      score,
      total: currentQuiz.marks,
      date: new Date().toISOString(),
    };
    const updated = { ...student };
    updated.quizHistory = [...(updated.quizHistory || []), record];
    // also add to assessments for quick view
    updated.assessments = [
      ...(updated.assessments || []),
      {
        id: `assess_${Date.now()}`,
        title: `Quiz: ${currentQuiz.title}`,
        marks: currentQuiz.marks,
        obtained: score,
        assignedBy: "System (auto)",
        date: record.date,
      },
    ];
    setStudent(updated);
    setCurrentQuiz(null);
    setAnswers({});
    setAiOutput(
      `You scored ${score}/${currentQuiz.marks} (${correct}/${qs.length})`
    );
  };
  // --- end added ---

  // --- ADDED: faculty quick exam creation (demo) ---
  const createAndAssignExam = () => {
    if (!student) return alert("No student selected");
    const exam = {
      id: `exam_${Date.now()}`,
      title: facultyTitle || `Exam ${Date.now()}`,
      marks: facultyMarks,
      obtained: null,
      assignedBy: "Faculty (Demo)",
      date: new Date().toISOString(),
    };
    const updated = {
      ...student,
      assessments: [...(student.assessments || []), exam],
    };
    setStudent(updated);
    setFacultyTitle("");
    setFacultyMarks(100);
    alert("Exam assigned to student (demo)");
  };
  // --- end added ---

  // AI action handlers
  const handleWeakTopics = () => {
    if (!student) {
      setAiOutput("No student profile available");
      return;
    }
    const weak = aiIdentifyWeakTopics(student);
    const text = weak.length
      ? `Weak topics: ${weak.join(", ")}`
      : "No clear weak topics detected.";
    setAiOutput(text);
  };

  const handleRecommendResources = () => {
    if (!student) {
      setAiOutput("No student profile available");
      return;
    }
    try {
      const rec = aiRecommendResources(student);
      setRecommendedResources(rec);
      setAiOutput(null);
      if (useDemo && student?.rollNumber)
        saveAiOutputs(student.rollNumber, {
          recommendedResources: rec,
          studySchedule,
          simExam,
        });
    } catch (err) {
      console.error("Recommend resources error:", err);
      setAiOutput("Error generating recommendations");
    }
  };

  const handleGenerateSchedule = () => {
    if (!student) {
      setAiOutput("No student profile available");
      return;
    }
    try {
      const sch = aiGenerateStudySchedule(student);
      setStudySchedule(sch);
      setAiOutput(null);
      if (useDemo && student?.rollNumber)
        saveAiOutputs(student.rollNumber, {
          recommendedResources,
          studySchedule: sch,
          simExam,
        });
    } catch (err) {
      console.error("Generate schedule error:", err);
      setAiOutput("Error generating schedule");
    }
  };

  const handleSimulateExam = () => {
    if (!student) return;
    const exam = aiGenerateSimulatedExam(student);
    // reuse quiz flow by setting currentQuiz (existing state)
    setSimExam(exam);
    setCurrentQuiz(exam);
    setActiveTab("quizzes");
    if (useDemo && student?.rollNumber)
      saveAiOutputs(student.rollNumber, {
        recommendedResources,
        studySchedule,
        simExam: exam,
      });
  };

  const handleSimulateExamFixed = () => {
    if (!student) return;
    const exam = aiGenerateSimulatedExamFixed(student);
    setSimExam(exam);
    // initialize answers object with no selections (optional)
    setAnswers({});
    setCurrentQuiz(exam);
    setActiveTab("quizzes");
    if (useDemo && student?.rollNumber)
      saveAiOutputs(student.rollNumber, {
        recommendedResources,
        studySchedule,
        simExam: exam,
      });
  };

  if (!token || !student) {
    // Login form
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center py-20">
          <div className="w-full max-w-md">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  Student Portal
                </CardTitle>
                <p className="text-muted-foreground">
                  Login to access your dashboard
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Student Roll Number"
                      className="pl-10"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Password"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* --- ADDED: Demo mode toggle and quick demo button --- */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={useDemo}
                      onChange={(e) => {
                        const val = e.target.checked;
                        setUseDemo(val);
                        if (val) {
                          // Pre-fill demo credentials visually (optional)
                          setRollNumber(sampleStudent.rollNumber);
                          setPassword("demo");
                          // set demo token in localStorage only on login
                        } else {
                          setRollNumber("");
                          setPassword("");
                        }
                      }}
                    />
                    <span>Use demo data (no backend)</span>
                  </label>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // quick enter demo without toggling checkbox
                      setUseDemo(true);
                      localStorage.setItem("tt6_token", "demo");
                      setToken("demo");
                      setStudent(sampleStudent);
                      setAiOutput(null);
                    }}
                  >
                    Use Demo Account
                  </Button>
                </div>
                {/* --- end added --- */}

                <Button
                  className="w-full btn-university"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  // Authenticated view
  return (
    <Layout>
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">
                Welcome, {student.name}
              </h1>
              <p className="text-muted-foreground">
                Roll No: {student.rollNumber} | {student.department}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  // quick refresh profile
                  if (token) fetchProfile(token);
                }}
              >
                Refresh
              </Button>
              <Button className="btn-university" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex gap-2">
              {[
                "overview",
                "subjects",
                "quizzes",
                "assessments",
                "competitions",
                "outcomes",
                "faculty",
              ].map((t) => (
                <Button
                  key={t}
                  variant={activeTab === (t as any) ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab(t as any)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Main grid (keeps existing left/middle/right summary) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: summary (unchanged) */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-accent/30 p-4 rounded-lg">
                <div className="font-semibold">CGPA</div>
                <div className="text-2xl font-bold text-primary">
                  {student.cgpa ?? "N/A"}
                </div>
              </div>
              <div className="bg-accent/30 p-4 rounded-lg">
                <div className="font-semibold">Attendance</div>
                <div className="text-2xl font-bold text-primary">
                  {student.attendance != null
                    ? `${Number(student.attendance)}%`
                    : "N/A"}
                </div>
              </div>

              <div className="bg-accent/30 p-4 rounded-lg">
                <div className="font-semibold mb-2">Quick Actions</div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setAiOutput(aiSummarizePerformance(student) || "No data")
                    }
                  >
                    Summarize Performance
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setAiOutput(aiGenerateStudyPlan(student))}
                  >
                    Generate Study Plan
                  </Button>

                  {/* NEW Buttons */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleWeakTopics}
                  >
                    Weak Topics
                  </Button>
                  <Button size="sm" onClick={handleRecommendResources}>
                    Recommend Resources
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateSchedule}
                  >
                    Generate Schedule
                  </Button>
                  <Button size="sm" onClick={handleSimulateExamFixed}>
                    Simulate Exam
                  </Button>
                </div>
              </div>
            </div>

            {/* Middle: main content area (varies by tab) */}
            <div className="md:col-span-1 space-y-6">
              {activeTab === "overview" && (
                <div className="card-university">
                  <h3 className="text-lg font-semibold mb-3">
                    Overview & Recent Activities
                  </h3>
                  {/* subjects */}
                  <div className="space-y-3 mb-4">
                    {student.subjects && student.subjects.length ? (
                      student.subjects.map((s: any, i: number) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-3 bg-accent/30 rounded-lg"
                        >
                          <span className="font-medium">{s.name}</span>
                          <span className="text-primary font-semibold">
                            {s.grade ?? "-"}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        No subjects enrolled.
                      </div>
                    )}
                  </div>
                  {/* recent assessments */}
                  <div>
                    <h4 className="font-semibold mb-2">Recent Assessments</h4>
                    {(student.assessments || [])
                      .slice(-5)
                      .reverse()
                      .map((a: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center p-2"
                        >
                          <div>
                            <div className="font-medium">{a.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {a.assignedBy || a.date}
                            </div>
                          </div>
                          <div className="text-sm font-semibold">
                            {a.obtained != null
                              ? `${a.obtained}/${a.marks}`
                              : `${a.marks} (pending)`}
                          </div>
                        </div>
                      ))}
                    {(student.assessments || []).length === 0 && (
                      <div className="text-sm text-muted-foreground">
                        No assessments yet.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "quizzes" && (
                <div className="card-university">
                  <h3 className="text-lg font-semibold mb-3">
                    Available Quizzes
                  </h3>

                  {/* if a quiz is in progress render it */}
                  {currentQuiz ? (
                    <div>
                      <h4 className="font-semibold mb-2">
                        {currentQuiz.title}
                      </h4>
                      {currentQuiz.questions.map((q: any, i: number) => (
                        <div key={i} className="mb-3 p-3 bg-accent/10 rounded">
                          <div className="font-medium">
                            {i + 1}. {q.q}
                          </div>
                          <div className="mt-2 space-y-2">
                            {q.options.map((opt: string, oi: number) => (
                              <label
                                key={oi}
                                className="flex items-center space-x-2 text-sm"
                              >
                                <input
                                  type="radio"
                                  name={`q_${i}`}
                                  checked={answers[i] === oi}
                                  onChange={() =>
                                    setAnswers({ ...answers, [i]: oi })
                                  }
                                />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentQuiz(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={submitQuiz}>Submit Quiz</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {(student.availableQuizzes || sampleQuizzes).map(
                        (q: any) => (
                          <div
                            key={q.id}
                            className="p-3 mb-3 bg-accent/10 rounded flex justify-between items-center"
                          >
                            <div>
                              <div className="font-medium">{q.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {q.questions.length} questions • {q.marks} marks
                              </div>
                            </div>
                            <div>
                              <Button size="sm" onClick={() => startQuiz(q)}>
                                Take Quiz
                              </Button>
                            </div>
                          </div>
                        )
                      )}
                    </>
                  )}
                </div>
              )}

              {activeTab === "assessments" && (
                <div className="card-university">
                  <h3 className="text-lg font-semibold mb-3">Assessments</h3>
                  {(student.assessments || []).map((a: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 mb-2 bg-accent/10 rounded flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium">{a.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {a.date}
                        </div>
                      </div>
                      <div className="text-sm font-semibold">
                        {a.obtained != null
                          ? `${a.obtained}/${a.marks}`
                          : `${a.marks} (pending)`}
                      </div>
                    </div>
                  ))}
                  {(student.assessments || []).length === 0 && (
                    <div className="text-sm text-muted-foreground">
                      No assessments assigned yet.
                    </div>
                  )}
                </div>
              )}

              {activeTab === "subjects" && (
                <div className="card-university">
                  <h3 className="text-lg font-semibold mb-3">
                    Subjects & Syllabus
                  </h3>
                  {(student.subjectsDetailed || []).map(
                    (sub: any, idx: number) => (
                      <div key={idx} className="p-3 mb-3 bg-accent/10 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{sub.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {sub.units?.length ?? 0} units •{" "}
                              {sub.projects?.length ?? 0} projects
                            </div>
                            <div className="mt-2">
                              <div className="font-semibold text-sm">Units</div>
                              <ol className="list-decimal pl-5 text-sm">
                                {sub.units?.map((u: string, ui: number) => (
                                  <li key={ui}>{u}</li>
                                ))}
                              </ol>
                            </div>
                            <div className="mt-2">
                              <div className="font-semibold text-sm">
                                Projects
                              </div>
                              <ul className="list-disc pl-5 text-sm">
                                {sub.projects?.map((p: string, pi: number) => (
                                  <li key={pi}>{p}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="ml-4 flex flex-col gap-2">
                            <a
                              href={sub.syllabusPdf}
                              target="_blank"
                              rel="noreferrer"
                              download
                              className="text-sm text-primary underline"
                            >
                              Download Syllabus (PDF)
                            </a>
                            <Button
                              size="sm"
                              onClick={() => {
                                // quick action: recommend resources for this subject
                                setRecommendedResources([
                                  {
                                    topic: sub.name,
                                    resources: aiRecommendResources({
                                      subjects: [
                                        { name: sub.name, grade: "C" },
                                      ],
                                    })[0].resources,
                                  },
                                ]);
                                setAiOutput(null);
                              }}
                            >
                              Get Resources
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}

              {activeTab === "outcomes" && (
                <div className="card-university">
                  <h3 className="text-lg font-semibold mb-3">
                    Course Outcomes
                  </h3>
                  {(student.subjectsDetailed || []).map(
                    (sub: any, idx: number) => (
                      <div key={idx} className="p-3 mb-2 bg-accent/10 rounded">
                        <div className="font-medium">{sub.name}</div>
                        <ul className="list-disc pl-5 text-sm mt-2">
                          {sub.outcomes?.map((o: string, oi: number) => (
                            <li key={oi}>{o}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Right: competitions / AI output / faculty */}
            <div className="md:col-span-1 space-y-6">
              {activeTab === "competitions" && (
                <div className="card-university">
                  <h3 className="text-lg font-semibold mb-3">Competitions</h3>
                  {(student.availableCompetitions || sampleCompetitions).map(
                    (c: any) => (
                      <div
                        key={c.id}
                        className="p-3 mb-2 bg-accent/10 rounded flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium">{c.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {c.date}
                          </div>
                        </div>
                        <div>
                          <Button
                            size="sm"
                            onClick={() => {
                              // register demo participation
                              const updated = {
                                ...student,
                                competitions: [
                                  ...(student.competitions || []),
                                  { ...c, result: "Registered" },
                                ],
                              };
                              setStudent(updated);
                            }}
                          >
                            Register
                          </Button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}

              {/* AI Assistant box (always available) */}
              <div className="p-4 bg-background rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2">AI Assistant</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Lightweight suggestions based on your profile.
                </p>
                {recommendedResources ? (
                  <div>
                    <h5 className="font-medium">Recommended Resources</h5>
                    {recommendedResources.map((r, i) => (
                      <div key={i} className="text-sm mb-2">
                        <div className="font-semibold">{r.topic}</div>
                        <ul className="list-disc pl-5">
                          {r.resources.map((u: any, ui: number) => (
                            <li key={ui}>
                              <a
                                className="text-primary"
                                href={u}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {u}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : studySchedule ? (
                  <div>
                    <h5 className="font-medium">Study Schedule</h5>
                    <ul className="list-disc pl-5 text-sm">
                      {studySchedule.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ) : aiOutput ? (
                  Array.isArray(aiOutput) ? (
                    <div>
                      {aiOutput.map((line, idx) => (
                        <p key={idx} className="text-sm">{line}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm">{String(aiOutput)}</p>
                  )
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Try the quick actions above to generate suggestions.
                  </p>
                )}
                {simExam && (
                  <div className="mt-3 text-sm">
                    <div className="font-medium">Simulated Exam:</div>
                    <div>
                      {simExam.title} — {simExam.questions.length} questions
                    </div>
                    <div className="mt-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          /* jump to quiz tab */ setActiveTab("quizzes");
                          setCurrentQuiz(simExam);
                        }}
                      >
                        Start Simulated Exam
                      </Button>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setAiOutput(null);
                      setRecommendedResources(null);
                      setStudySchedule(null);
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>

              {/* Faculty panel (only visible when faculty tab or role) */}
              {(activeTab === "faculty" || student.role === "faculty") && (
                <div className="p-4 bg-accent/10 rounded-lg">
                  <h4 className="font-semibold mb-2">Faculty Tools (Demo)</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Create a quick assessment and assign to the current student
                    (demo-only).
                  </p>
                  <Input
                    placeholder="Exam Title"
                    value={facultyTitle}
                    onChange={(e: any) => setFacultyTitle(e.target.value)}
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      placeholder="Marks"
                      type="number"
                      value={String(facultyMarks)}
                      onChange={(e: any) =>
                        setFacultyMarks(Number(e.target.value || 0))
                      }
                    />
                    <Button onClick={createAndAssignExam}>Assign Exam</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentPortal;
