import { useState } from "react";
import {
  LayoutDashboard,
  FileSearch,
  BarChart2,
  Wrench,
  History,
  LogIn,
  UserPlus,
  FileText,
  Award,
  Target,
  Zap,
  TrendingUp,
  Info,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronRight,
  Upload,
  Download,
  RefreshCw,
  Eye,
  Briefcase,
  GraduationCap,
  User,
  Star,
  Clock,
  Plus,
  Trash2,
  Edit3,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analyzer", label: "Analyzer", icon: FileSearch },
  { id: "ats-score", label: "ATS Score", icon: BarChart2 },
  { id: "builder", label: "Resume Builder", icon: Wrench },
  { id: "history", label: "History", icon: History },
];

const versionData = [
  { version: "v1", score: 52 },
  { version: "v2", score: 60 },
  { version: "v3", score: 65 },
  { version: "v4", score: 72 },
];

const radarData = [
  { subject: "Skills", A: 78 },
  { subject: "Experience", A: 65 },
  { subject: "Education", A: 85 },
  { subject: "Keywords", A: 60 },
  { subject: "Formatting", A: 75 },
  { subject: "Impact", A: 55 },
];

const jobMatches = [
  { title: "Frontend Developer", company: "TechCorp Inc.", match: 88, location: "Remote" },
  { title: "React Engineer", company: "StartupXYZ", match: 82, location: "San Francisco, CA" },
  { title: "UI Developer", company: "DesignStudio", match: 75, location: "New York, NY" },
  { title: "Web Developer", company: "AgencyPro", match: 68, location: "Austin, TX" },
];

const historyItems = [
  { name: "Demo_Resume_JohnDoe.pdf", date: "2024-01-15", score: 72, versions: 4 },
  { name: "Resume_v2_Updated.pdf", date: "2024-01-10", score: 65, versions: 3 },
  { name: "JohnDoe_TechResume.pdf", date: "2024-01-02", score: 58, versions: 2 },
  { name: "Resume_Initial.pdf", date: "2023-12-28", score: 52, versions: 1 },
];

const atsCategories = [
  { label: "Formatting & Layout", score: 75, color: "#eab308" },
  { label: "Section Structure", score: 85, color: "#22c55e" },
  { label: "Readability", score: 70, color: "#eab308" },
  { label: "Keyword Density", score: 60, color: "#f97316" },
  { label: "Contact Info", score: 95, color: "#22c55e" },
  { label: "File Compatibility", score: 90, color: "#22c55e" },
];

const keywordData = [
  { keyword: "React", found: true, count: 8 },
  { keyword: "TypeScript", found: true, count: 5 },
  { keyword: "Node.js", found: true, count: 3 },
  { keyword: "AWS", found: false, count: 0 },
  { keyword: "Docker", found: false, count: 0 },
  { keyword: "Agile", found: true, count: 2 },
  { keyword: "REST API", found: true, count: 4 },
  { keyword: "CI/CD", found: false, count: 0 },
];

const suggestions = [
  { type: "error", text: "Missing quantified achievements in Work Experience section" },
  { type: "warning", text: "Add AWS or cloud platform skills to improve job match" },
  { type: "warning", text: "Summary section is too brief — aim for 3–4 sentences" },
  { type: "success", text: "Strong use of action verbs throughout experience bullets" },
  { type: "success", text: "Education section is well-structured and complete" },
  { type: "error", text: "No mention of CI/CD tools which appear in 74% of matching jobs" },
];

function ScoreRing({ score, size = 80, strokeWidth = 8, color = "#6366f1" }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
    </svg>
  );
}

function ProgressBar({ value, color }) {
  return (
    <div style={{ height: 8, background: "#e5e7eb", borderRadius: 9999, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 9999, transition: "width 0.6s ease" }} />
    </div>
  );
}

function StatCard({ icon: Icon, iconBg, label, value, sub }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 0 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={22} color={iconBg === "#ede9fe" ? "#6d28d9" : iconBg === "#dcfce7" ? "#16a34a" : iconBg === "#fef9c3" ? "#ca8a04" : "#2563eb"} />
      </div>
      <div>
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#111827", lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function Dashboard({ setPage }) {
  return (
    <div>
      {/* Guest Banner */}
      <div style={{ background: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, gap: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
            <Info size={18} color="#6366f1" />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: "#1e1b4b", marginBottom: 4 }}>Sign in to save your progress</div>
            <div style={{ fontSize: 13, color: "#4338ca" }}>You are currently browsing as a guest. Create an account to save your resume history and track improvements.</div>
          </div>
        </div>
        <button style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>
          Create Free Account
        </button>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: 0 }}>Dashboard Overview</h1>
          <p style={{ color: "#6b7280", fontSize: 14, margin: "4px 0 0" }}>Analysis for: <span style={{ fontWeight: 600, color: "#374151" }}>Demo_Resume_JohnDoe.pdf</span></p>
        </div>
        <button onClick={() => setPage("analyzer")} style={{ display: "flex", alignItems: "center", gap: 8, background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <FileText size={16} />
          Analyze New Resume
        </button>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <StatCard icon={Award} iconBg="#ede9fe" label="Overall Score" value="72/100" />
        <StatCard icon={Target} iconBg="#dbeafe" label="ATS Score" value="72/100" />
        <StatCard icon={Zap} iconBg="#dcfce7" label="Job Match %" value="68%" />
        <StatCard icon={TrendingUp} iconBg="#fef3c7" label="Versions Tracked" value="4" />
      </div>

      {/* Bottom Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
        {/* Line Chart */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px" }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 4 }}>Resume Versions Tracker</div>
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>See how your ATS score improves with each upload.</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={versionData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="version" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 100]} tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13 }} />
              <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: "#6366f1", r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ATS Format Checker */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 28, height: 28, background: "#ede9fe", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BarChart2 size={15} color="#6366f1" />
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>ATS Format Checker</div>
          </div>
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>Is your resume easily readable by bots?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {atsCategories.map((cat) => (
              <div key={cat.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 5 }}>
                  <span>{cat.label}</span>
                  <span>{cat.score}/100</span>
                </div>
                <ProgressBar value={cat.score} color={cat.color} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Analyzer({ setPage }) {
  const [uploaded, setUploaded] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(true);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: 0 }}>Resume Analyzer</h1>
          <p style={{ color: "#6b7280", fontSize: 14, margin: "4px 0 0" }}>Upload your resume and get instant AI-powered feedback</p>
        </div>
      </div>

      {/* Upload Zone */}
      <div style={{ border: "2px dashed #c7d2fe", borderRadius: 12, padding: "32px 24px", textAlign: "center", background: "#f5f3ff", marginBottom: 24 }}>
        <div style={{ width: 56, height: 56, background: "#ede9fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <Upload size={24} color="#6366f1" />
        </div>
        <div style={{ fontWeight: 600, fontSize: 15, color: "#4338ca", marginBottom: 4 }}>
          {uploaded ? "Demo_Resume_JohnDoe.pdf — uploaded" : "Drop your resume here"}
        </div>
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>Supports PDF, DOCX — max 5MB</div>
        <button style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          {uploaded ? "Replace File" : "Browse Files"}
        </button>
      </div>

      {/* Analysis Results */}
      {done && (
        <>
          {/* Scores Row */}
          <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
            {[
              { label: "Overall Score", score: 72, color: "#6366f1", bg: "#ede9fe" },
              { label: "ATS Compatibility", score: 72, color: "#2563eb", bg: "#dbeafe" },
              { label: "Job Match", score: 68, color: "#16a34a", bg: "#dcfce7" },
            ].map((s) => (
              <div key={s.label} style={{ flex: 1, minWidth: 160, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
                  <ScoreRing score={s.score} color={s.color} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, color: s.color }}>
                    {s.score}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>{s.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>{s.score}/100</div>
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 16 }}>Improvement Suggestions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {suggestions.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", borderRadius: 8, background: s.type === "error" ? "#fef2f2" : s.type === "warning" ? "#fffbeb" : "#f0fdf4", border: `1px solid ${s.type === "error" ? "#fecaca" : s.type === "warning" ? "#fde68a" : "#bbf7d0"}` }}>
                  {s.type === "error" ? <XCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} /> : s.type === "warning" ? <AlertCircle size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: 1 }} /> : <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: 1 }} />}
                  <span style={{ fontSize: 13, color: "#374151" }}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Radar + Keywords */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 4 }}>Resume Strength Breakdown</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Across 6 key dimensions</div>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 4 }}>Keyword Analysis</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>Based on target job description</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {keywordData.map((k) => (
                  <div key={k.keyword} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 8, background: k.found ? "#f0fdf4" : "#fef2f2", border: `1px solid ${k.found ? "#bbf7d0" : "#fecaca"}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {k.found ? <CheckCircle2 size={14} color="#22c55e" /> : <XCircle size={14} color="#ef4444" />}
                      <span style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>{k.keyword}</span>
                    </div>
                    <span style={{ fontSize: 12, color: k.found ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                      {k.found ? `×${k.count}` : "Missing"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ATSScore() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: 0 }}>ATS Score</h1>
        <p style={{ color: "#6b7280", fontSize: 14, margin: "4px 0 0" }}>Detailed breakdown of your ATS compatibility score</p>
      </div>

      {/* Overall */}
      <div style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)", borderRadius: 16, padding: "28px 32px", marginBottom: 24, display: "flex", alignItems: "center", gap: 32, color: "#fff" }}>
        <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
          <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="10" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="#fff" strokeWidth="10"
              strokeDasharray={314} strokeDashoffset={314 - (72 / 100) * 314}
              strokeLinecap="round" />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, color: "#fff" }}>72</div>
        </div>
        <div>
          <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>Overall ATS Score</div>
          <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>72 / 100</div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>Your resume is <strong>Good</strong> — a few tweaks will push it past 85.</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 20 }}>Category Breakdown</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {atsCategories.map((cat) => (
            <div key={cat.label}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 500, color: "#374151", marginBottom: 6 }}>
                <span>{cat.label}</span>
                <span style={{ fontWeight: 700, color: cat.score >= 80 ? "#16a34a" : cat.score >= 65 ? "#ca8a04" : "#dc2626" }}>{cat.score}/100</span>
              </div>
              <div style={{ height: 10, background: "#e5e7eb", borderRadius: 9999, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${cat.score}%`, background: cat.color, borderRadius: 9999, transition: "width 0.6s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px" }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 4 }}>Score by Category</div>
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>Visual comparison across all ATS criteria</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={atsCategories} margin={{ top: 5, right: 10, left: -20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9ca3af" }} angle={-30} textAnchor="end" axisLine={false} tickLine={false} interval={0} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13 }} />
            <Bar dataKey="score" radius={[6, 6, 0, 0]}>
              {atsCategories.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState("experience");
  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Work Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Star },
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: 0 }}>Resume Builder</h1>
          <p style={{ color: "#6b7280", fontSize: 14, margin: "4px 0 0" }}>Build and edit your resume section by section</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "9px 16px", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "#374151" }}>
            <Eye size={15} /> Preview
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#6366f1", border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#fff" }}>
            <Download size={15} /> Download PDF
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
        {/* Section Nav */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 12, height: "fit-content" }}>
          {sections.map((sec) => (
            <button key={sec.id} onClick={() => setActiveSection(sec.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "none", background: activeSection === sec.id ? "#ede9fe" : "transparent", color: activeSection === sec.id ? "#6366f1" : "#374151", fontSize: 14, fontWeight: activeSection === sec.id ? 600 : 400, cursor: "pointer", marginBottom: 2 }}>
              <sec.icon size={16} />
              {sec.label}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px" }}>
          {activeSection === "personal" && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 20 }}>Personal Information</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {["Full Name", "Job Title", "Email", "Phone", "LinkedIn", "Location"].map((f) => (
                  <div key={f}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>{f}</label>
                    <input defaultValue={f === "Full Name" ? "John Doe" : f === "Job Title" ? "Frontend Developer" : f === "Email" ? "john@example.com" : ""} placeholder={`Enter ${f}`}
                      style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, color: "#111827", outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "experience" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>Work Experience</div>
                <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  <Plus size={14} /> Add Entry
                </button>
              </div>
              {[
                { title: "Senior Frontend Developer", company: "TechCorp Inc.", period: "Jan 2022 – Present", desc: "Led development of React-based dashboard serving 50k+ users. Improved performance by 40%." },
                { title: "Frontend Developer", company: "StartupXYZ", period: "Mar 2020 – Dec 2021", desc: "Built responsive UIs with React and TypeScript. Collaborated with design team on component library." },
              ].map((job, i) => (
                <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px", marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>{job.title}</div>
                      <div style={{ fontSize: 13, color: "#6366f1", fontWeight: 500 }}>{job.company}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{job.period}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={{ background: "#f3f4f6", border: "none", borderRadius: 6, width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Edit3 size={13} color="#6b7280" /></button>
                      <button style={{ background: "#fef2f2", border: "none", borderRadius: 6, width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={13} color="#ef4444" /></button>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{job.desc}</p>
                </div>
              ))}
            </div>
          )}

          {activeSection === "education" && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 20 }}>Education</div>
              <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>B.S. Computer Science</div>
                <div style={{ fontSize: 13, color: "#6366f1", fontWeight: 500 }}>State University</div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>2016 – 2020 · GPA: 3.7</div>
              </div>
            </div>
          )}

          {activeSection === "skills" && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 20 }}>Skills</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["React", "TypeScript", "Node.js", "CSS", "REST API", "Git", "Agile", "Figma", "HTML5", "Jest"].map((s) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 6, background: "#ede9fe", borderRadius: 9999, padding: "6px 12px", fontSize: 13, fontWeight: 500, color: "#4c1d95" }}>
                    {s} <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "#7c3aed" }}><XCircle size={14} /></button>
                  </div>
                ))}
                <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#f3f4f6", border: "1px dashed #d1d5db", borderRadius: 9999, padding: "6px 14px", fontSize: 13, cursor: "pointer", color: "#6b7280" }}>
                  <Plus size={13} /> Add Skill
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HistoryPage() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: 0 }}>History</h1>
          <p style={{ color: "#6b7280", fontSize: 14, margin: "4px 0 0" }}>All your previously analyzed resumes</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "9px 16px", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "#374151" }}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { icon: FileText, bg: "#ede9fe", color: "#6d28d9", label: "Total Resumes", value: "4" },
          { icon: TrendingUp, bg: "#dcfce7", color: "#16a34a", label: "Avg. Score", value: "61.75" },
          { icon: Clock, bg: "#dbeafe", color: "#2563eb", label: "Last Upload", value: "Jan 15" },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <s.icon size={20} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #f3f4f6", fontWeight: 600, fontSize: 15, color: "#111827" }}>
          Uploaded Resumes
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {["File Name", "Date", "Score", "Versions", "Actions"].map((h) => (
                <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {historyItems.map((item, i) => (
              <tr key={i} style={{ borderTop: "1px solid #f3f4f6" }}>
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, background: "#ede9fe", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FileText size={15} color="#6366f1" />
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>{item.name}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 20px", fontSize: 13, color: "#6b7280" }}>{item.date}</td>
                <td style={{ padding: "14px 20px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: item.score >= 70 ? "#dcfce7" : item.score >= 60 ? "#fef9c3" : "#fef2f2", color: item.score >= 70 ? "#16a34a" : item.score >= 60 ? "#ca8a04" : "#dc2626", borderRadius: 9999, padding: "3px 10px", fontSize: 13, fontWeight: 600 }}>
                    {item.score}/100
                  </span>
                </td>
                <td style={{ padding: "14px 20px", fontSize: 14, color: "#374151" }}>{item.versions}</td>
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ background: "#ede9fe", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 500, color: "#6366f1", cursor: "pointer" }}>View</button>
                    <button style={{ background: "#f3f4f6", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 500, color: "#374151", cursor: "pointer" }}>Download</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
    if (page === "dashboard") return <Dashboard setPage={setPage} />;
    if (page === "analyzer") return <Analyzer setPage={setPage} />;
    if (page === "ats-score") return <ATSScore />;
    if (page === "builder") return <ResumeBuilder />;
    if (page === "history") return <HistoryPage />;
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f9fafb", fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: 260, background: "#fff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: "22px 20px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, background: "#ede9fe", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FileText size={18} color="#6366f1" />
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#6366f1" }}>ResuMate AI</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px" }}>
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => setPage(item.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, border: "none", background: page === item.id ? "#ede9fe" : "transparent", color: page === item.id ? "#6366f1" : "#4b5563", fontSize: 14, fontWeight: page === item.id ? 600 : 400, cursor: "pointer", marginBottom: 2, textAlign: "left" }}>
              <item.icon size={18} />
              {item.label}
              {page === item.id && <ChevronRight size={14} style={{ marginLeft: "auto" }} />}
            </button>
          ))}
        </nav>

        {/* Bottom Auth Buttons */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid #f3f4f6", display: "flex", flexDirection: "column", gap: 8 }}>
          <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "#374151" }}>
            <LogIn size={16} /> Sign In
          </button>
          <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#6366f1", border: "none", borderRadius: 8, padding: "10px", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#fff" }}>
            <UserPlus size={16} /> Create Account
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: "auto", padding: "28px 32px" }}>
        {renderPage()}
      </div>
    </div>
  );
}
