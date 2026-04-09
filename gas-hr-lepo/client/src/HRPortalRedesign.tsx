// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Plane,
  FileText,
  Search,
  LogOut,
  Building2,
  ClipboardCheck,
  AlertTriangle,
  Wallet,
  FolderOpen,
  Plus,
  Menu,
  UserPlus,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  UserCog,
  Bell,
  BadgeCheck,
  Activity,
  Clock3,
  Fingerprint,
  CircleDollarSign,
  Settings2,
  CalendarCheck2,
  FileSpreadsheet,
  Upload,
  KeyRound,
  FileBadge,
  Landmark,
  UserCircle2,
} from "lucide-react";

const ADMIN_TITLES = ["HR Manager", "HR Admin", "HR Assistant", "Admin Assistant", "Site Administrator"];
const SAUDI_BANKS = ["Al Rajhi Bank", "SNB", "Riyad Bank", "Bank Albilad", "Banque Saudi Fransi", "Saudi Investment Bank", "Arab National Bank", "SABB", "Bank AlJazira", "Emirates NBD", "Alinma Bank"];

const PERMISSIONS = {
  dashboard: "dashboard",
  employees: "employees",
  leaveBalances: "leaveBalances",
  approvals: "approvals",
  requests: "requests",
  attendance: "attendance",
  payroll: "payroll",
  projects: "projects",
  files: "files",
  reports: "reports",
  settings: "settings",
  accounts: "accounts",
  profile: "profile",
  myLeave: "myLeave",
  salaryCertificate: "salaryCertificate",
  salaryTransfer: "salaryTransfer",
  takleef: "takleef",
};

const roleTemplates = {
  "HR Manager": Object.values(PERMISSIONS),
  "HR Admin": [
    PERMISSIONS.dashboard,
    PERMISSIONS.employees,
    PERMISSIONS.leaveBalances,
    PERMISSIONS.approvals,
    PERMISSIONS.requests,
    PERMISSIONS.attendance,
    PERMISSIONS.payroll,
    PERMISSIONS.projects,
    PERMISSIONS.files,
    PERMISSIONS.reports,
    PERMISSIONS.profile,
    PERMISSIONS.salaryTransfer,
    PERMISSIONS.takleef,
  ],
  "HR Assistant": [
    PERMISSIONS.dashboard,
    PERMISSIONS.employees,
    PERMISSIONS.requests,
    PERMISSIONS.attendance,
    PERMISSIONS.files,
    PERMISSIONS.profile,
    PERMISSIONS.salaryCertificate,
    PERMISSIONS.salaryTransfer,
    PERMISSIONS.takleef,
  ],
  Employee: [
    PERMISSIONS.dashboard,
    PERMISSIONS.profile,
    PERMISSIONS.myLeave,
    PERMISSIONS.requests,
    PERMISSIONS.salaryCertificate,
    PERMISSIONS.salaryTransfer,
    PERMISSIONS.takleef,
  ],
};

const initialProjects = [
  { id: "qatif", name: "Qatif Project", code: "QAT-01", manager: "Mohammed Al Qahtani", phone: "+966 55 222 3344", email: "qatif.manager@gas.com", status: "Active" },
  { id: "qassim", name: "Qassim Project", code: "QAS-02", manager: "Saeed Al Mutairi", phone: "+966 54 777 1200", email: "qassim.manager@gas.com", status: "Active" },
  { id: "zuluf", name: "Zuluf Project", code: "ZUL-03", manager: "Nasser Al Otaibi", phone: "+966 50 841 7701", email: "zuluf.manager@gas.com", status: "Active" },
  { id: "jubail", name: "Jubail Project", code: "JUB-04", manager: "Adel Ibrahim", phone: "+966 53 990 8431", email: "jubail.manager@gas.com", status: "Review" },
];

const initialEmployees = [
  { id: 1, name: "Ahmed Salem", employeeId: "GAS-2038", role: "Store Worker", projectId: "qatif", nationality: "Saudi", annualBalance: 30, usedLeave: 9, status: "Active", manager: "Mohammed Al Qahtani", salary: 5400, housing: 1200, transport: 500 },
  { id: 2, name: "Muteb Al Bishi", employeeId: "GAS-2036", role: "Store Worker", projectId: "qatif", nationality: "Saudi", annualBalance: 30, usedLeave: 4, status: "Active", manager: "Mohammed Al Qahtani", salary: 5200, housing: 1200, transport: 500 },
  { id: 3, name: "Faisal Al Harbi", employeeId: "GAS-2194", role: "Site Administrator", projectId: "zuluf", nationality: "Saudi", annualBalance: 35, usedLeave: 12, status: "On Leave", manager: "Nasser Al Otaibi", salary: 8300, housing: 1800, transport: 700 },
  { id: 4, name: "Rashid Al Qahtani", employeeId: "GAS-2210", role: "Coordinator", projectId: "qassim", nationality: "Saudi", annualBalance: 30, usedLeave: 7, status: "Active", manager: "Saeed Al Mutairi", salary: 6800, housing: 1500, transport: 600 },
  { id: 5, name: "Mahmoud Adel", employeeId: "GAS-2288", role: "Timekeeper", projectId: "jubail", nationality: "Egyptian", annualBalance: 30, usedLeave: 17, status: "Pending Review", manager: "Adel Ibrahim", salary: 6100, housing: 1300, transport: 500 },
  { id: 6, name: "Waleed Nasser", employeeId: "GAS-2350", role: "HR Coordinator", projectId: "qassim", nationality: "Saudi", annualBalance: 30, usedLeave: 2, status: "Active", manager: "Saeed Al Mutairi", salary: 7600, housing: 1600, transport: 600 },
];

const initialRequests = [
  { id: 1, employeeId: 3, employee: "Faisal Al Harbi", type: "Annual Leave", projectId: "zuluf", days: 5, status: "Pending", date: "2026-04-09", note: "Family travel", attachmentName: "", attachmentUrl: "" },
  { id: 2, employeeId: 4, employee: "Rashid Al Qahtani", type: "Permission", projectId: "qassim", days: 1, status: "Approved", date: "2026-04-08", note: "Medical appointment", attachmentName: "", attachmentUrl: "" },
  { id: 3, employeeId: 1, employee: "Ahmed Salem", type: "Takleef", projectId: "qatif", days: 2, status: "In Review", date: "2026-04-11", note: "Night shift assignment", attachmentName: "night-shift.pdf", attachmentUrl: "" },
  { id: 4, employeeId: 2, employee: "Muteb Al Bishi", type: "Annual Leave", projectId: "qatif", days: 3, status: "Pending", date: "2026-04-12", note: "Personal leave", attachmentName: "", attachmentUrl: "" },
  { id: 5, employeeId: 6, employee: "Waleed Nasser", type: "Salary Transfer", projectId: "qassim", days: 0, status: "Pending", date: "2026-04-13", note: "Bank account update", attachmentName: "iban-letter.pdf", attachmentUrl: "" },
  { id: 6, employeeId: 1, employee: "Ahmed Salem", type: "Salary Certificate", projectId: "qatif", days: 0, status: "Approved", date: "2026-04-10", note: "To whom it may concern certificate", attachmentName: "", attachmentUrl: "" },
];

const initialFiles = {
  qatif: [
    { id: 1, category: "Leave", title: "Annual Leave - Ahmed Salem.pdf", note: "Submitted for April review", status: "Pending" },
    { id: 2, category: "Takleef", title: "Night Shift Assignment - Week 2.pdf", note: "Approved by project manager", status: "Approved" },
  ],
  qassim: [{ id: 3, category: "Salary Transfer", title: "Bank Letter - Waleed.pdf", note: "Under review", status: "Pending" }],
  zuluf: [],
  jubail: [],
};

const initialAccounts = [
  { id: 1, username: "hrmanager", password: "123456", name: "Walid Khalaf Alshammari", title: "HR Manager", role: "HR Manager", employeeId: 6, projectId: "qassim", permissions: roleTemplates["HR Manager"], isAdminView: true },
  { id: 2, username: "walid", password: "123456", name: "Walid Khalaf", title: "HR Admin", role: "HR Admin", employeeId: 6, projectId: "qassim", permissions: roleTemplates["HR Admin"], isAdminView: true },
  { id: 3, username: "sara", password: "123456", name: "Sara Ali", title: "HR Assistant", role: "HR Assistant", employeeId: null, projectId: "qatif", permissions: roleTemplates["HR Assistant"], isAdminView: true },
  { id: 4, username: "ahmed.salem", password: "123456", name: "Ahmed Salem", title: "Store Worker", role: "Employee", employeeId: 1, projectId: "qatif", permissions: roleTemplates.Employee, isAdminView: false },
];

const sidebarCatalog = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, permission: PERMISSIONS.dashboard },
  { key: "employees", label: "Employees", icon: Users, permission: PERMISSIONS.employees },
  { key: "leaveBalances", label: "Leave Balances", icon: Wallet, permission: PERMISSIONS.leaveBalances },
  { key: "approvals", label: "Approvals", icon: BadgeCheck, permission: PERMISSIONS.approvals },
  { key: "requests", label: "Requests", icon: Plane, permission: PERMISSIONS.requests },
  { key: "attendance", label: "Attendance", icon: Fingerprint, permission: PERMISSIONS.attendance },
  { key: "payroll", label: "Payroll", icon: CircleDollarSign, permission: PERMISSIONS.payroll },
  { key: "projects", label: "Projects", icon: FolderKanban, permission: PERMISSIONS.projects },
  { key: "files", label: "Project Files", icon: FolderOpen, permission: PERMISSIONS.files },
  { key: "salaryTransfers", label: "Salary Transfers", icon: Landmark, permission: PERMISSIONS.salaryTransfer },
  { key: "takleef", label: "Takleef", icon: FileBadge, permission: PERMISSIONS.takleef },
  { key: "accounts", label: "Accounts", icon: KeyRound, permission: PERMISSIONS.accounts },
  { key: "reports", label: "Reports", icon: FileText, permission: PERMISSIONS.reports },
  { key: "settings", label: "Settings", icon: Settings2, permission: PERMISSIONS.settings },
  { key: "profile", label: "Profile", icon: UserCircle2, permission: PERMISSIONS.profile },
  { key: "myLeave", label: "My Leave", icon: CalendarCheck2, permission: PERMISSIONS.myLeave },
];

const storage = {
  get(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  },
};

function hasPermission(account, permission) {
  return account?.permissions?.includes(permission);
}

function projectName(projects, id) {
  return projects.find((p) => p.id === id)?.name || "Unknown Project";
}

function employeeByAccount(account, employees) {
  return employees.find((emp) => emp.id === account?.employeeId) || null;
}

function statusClass(status) {
  return {
    Active: "success",
    Approved: "success",
    Pending: "warning",
    "On Leave": "warning",
    Rejected: "danger",
    "Pending Review": "danger",
    "In Review": "info",
    Review: "info",
    Completed: "success",
  }[status] || "neutral";
}

function StatusBadge({ status }) {
  return <span className={`status-badge ${statusClass(status)}`}>{status}</span>;
}

function BrandMark() {
  return (
    <div className="brandmark">
      <div className="brandmark-circle">
        <span className="brandmark-gas">GAS</span>
        <span className="brandmark-sub">HR</span>
      </div>
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return <div className={`glass-card ${className}`}>{children}</div>;
}

function SectionTitle({ title, description, action }) {
  return (
    <div className="section-title">
      <div>
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

function exportSheet(rows, fileName, sheetName) {
  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, fileName);
}

function ExportButtons({ rows, fileName, sheetName }) {
  return (
    <div className="inline-actions">
      <button className="btn secondary" onClick={() => exportSheet(rows, fileName, sheetName)}><FileSpreadsheet size={14} /> Excel</button>
      <button className="btn secondary" onClick={() => window.print()}><FileText size={14} /> PDF</button>
    </div>
  );
}

function parseHours(value) {
  if (!value || value === "-" || value === "0" || value === "0:00" || value === "0:00:00") return 0;
  const parts = String(value).split(":").map(Number);
  if (parts.length < 2 || Number.isNaN(parts[0])) return 0;
  const h = parts[0] || 0;
  const m = parts[1] || 0;
  const s = parts[2] || 0;
  return Math.round((h + m / 60 + s / 3600) * 100) / 100;
}

function normalizeDate(value) {
  if (!value) return null;
  const str = String(value).trim();
  const direct = new Date(str);
  if (!Number.isNaN(direct.getTime())) return direct;
  const slashParts = str.split("/");
  if (slashParts.length === 3) {
    const a = Number(slashParts[0]);
    const b = Number(slashParts[1]);
    const c = Number(slashParts[2]);
    if (a > 0 && a <= 12 && b > 0 && b <= 31 && c > 1900) {
      const parsed = new Date(c, a - 1, b, 12, 0, 0);
      if (!Number.isNaN(parsed.getTime())) return parsed;
    }
    if (a > 0 && a <= 31 && b > 0 && b <= 12 && c > 1900) {
      const parsed = new Date(c, b - 1, a, 12, 0, 0);
      if (!Number.isNaN(parsed.getTime())) return parsed;
    }
  }
  const dashParts = str.split("-");
  if (dashParts.length === 3) {
    const yyyy = Number(dashParts[0]);
    const mm = Number(dashParts[1]);
    const dd = Number(dashParts[2]);
    const parsed = new Date(yyyy, mm - 1, dd, 12, 0, 0);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return null;
}

function toLocalDateKey(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function buildAttendanceState(records) {
  if (!records || !records.length) return { days: [], rows: [], monthTitle: "Attendance" };
  const employeesMap = {};
  const datesMap = {};

  records.forEach((row) => {
    const name = String(row["Name"] || row["Employee"] || "").trim();
    const userId = String(row["User ID"] || row["UserID"] || row["ID"] || "").trim();
    const dateObj = normalizeDate(row["Date"]);
    if (!name || !dateObj) return;

    const dateKey = toLocalDateKey(dateObj);
    datesMap[dateKey] = dateObj;

    if (!employeesMap[name]) {
      employeesMap[name] = { name, userId, byDay: {}, totalHours: 0, absentCount: 0, singlePunchCount: 0 };
    }

    const exception = String(row["Exception"] || "").trim();
    const leave = String(row["Leave"] || "").trim();
    const totalHours = parseHours(row["Regular hours"] || row["Regular Hours"] || row["Total Work Hours"] || row["Total work hours"]);
    const inTime = String(row["In"] || "").trim();
    const outTime = String(row["Out"] || "").trim();

    let cell = { value: "", type: "normal" };
    if (leave && leave !== "-" && leave !== "--") {
      cell = { value: leave, type: "leave" };
    } else if (/absence/i.test(exception)) {
      cell = { value: "A", type: "absent" };
      employeesMap[name].absentCount += 1;
    } else if (/missing punch/i.test(exception) || (inTime && inTime !== "-" && (!outTime || outTime === "-")) || (outTime && outTime !== "-" && (!inTime || inTime === "-"))) {
      cell = { value: totalHours > 0 ? String(Math.round(totalHours)) : "", type: "single" };
      employeesMap[name].singlePunchCount += 1;
      employeesMap[name].totalHours += totalHours;
    } else if (totalHours > 0) {
      cell = { value: String(Math.round(totalHours)), type: "hours" };
      employeesMap[name].totalHours += totalHours;
    }

    employeesMap[name].byDay[dateKey] = cell;
  });

  const days = Object.keys(datesMap).sort().map((dateKey) => {
    const d = datesMap[dateKey];
    return { key: dateKey, label: `${d.getDate()}-${d.toLocaleString("en-US", { month: "short" })}`, weekend: d.getDay() === 5 || d.getDay() === 6 };
  });

  const rows = Object.values(employeesMap).map((emp) => {
    const cells = days.map((day) => {
      const existing = emp.byDay[day.key];
      if (existing) return existing;
      if (day.weekend) return { value: "", type: "weekend" };
      emp.absentCount += 1;
      return { value: "A", type: "absent" };
    });
    return { ...emp, cells, totalHours: Math.round(emp.totalHours * 100) / 100 };
  });

  const firstDay = days[0]?.key ? normalizeDate(days[0].key) : null;
  const monthTitle = firstDay ? `${firstDay.toLocaleString("en-US", { month: "long" })} Attendance` : "Attendance";
  return { days, rows, monthTitle };
}

function PortalLoader({ title = "GAS HR Platform", subtitle = "Preparing Human Resources workspace...", mode = "loading", onBack }) {
  return (
    <div className="portal-loader-shell">
      <div className="portal-loader-orb orb-a" />
      <div className="portal-loader-orb orb-b" />
      <div className="portal-loader-grid" />
      <div className={`portal-loader-card ${mode}`}>
        <div className="portal-loader-brand">
          <BrandMark />
          <div>
            <div className="portal-loader-kicker">GAS Arabian Services</div>
            <div className="portal-loader-label">Human Resources Platform</div>
          </div>
        </div>
        <div className="portal-loader-divider" />
        <div className="portal-loader-content">
          <div className="portal-loader-status-row">
            <span className={`portal-loader-dot ${mode}`} />
            <span className="portal-loader-status-text">{mode === "restricted" ? "Restricted Access" : "System Loading"}</span>
          </div>
          <div className="portal-loader-title">{title}</div>
          <div className="portal-loader-sub">{subtitle}</div>
        </div>
        {mode === "loading" ? <div className="portal-loader-progress"><span /></div> : null}
        {mode === "restricted" ? <div className="portal-loader-actions"><button className="btn primary" onClick={onBack}>Back to Login</button></div> : null}
      </div>
    </div>
  );
}

function LoginScreen({ accounts, onLogin }) {
  const [username, setUsername] = useState("hrmanager");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const submit = () => {
    const found = accounts.find((acc) => acc.username === username);
    if (!found || found.password !== password) {
      setError("Invalid username or password");
      return;
    }
    setError("");
    onLogin(found);
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-left">
          <div className="aurora one" />
          <div className="aurora two" />
          <div className="aurora three" />
          <div className="login-brand-row">
            <BrandMark />
            <div>
              <div className="eyebrow light">Human Resources Department (HR Project)</div>
              <div className="login-brand-title">GAS ARABIAN</div>
            </div>
          </div>
          <div className="login-copy">
            <h1>Professional HR platform for projects, employees, approvals and employee self-service.</h1>
            <p>Leave balances, attendance, payroll, salary transfer requests, salary certificates, takleef uploads and account permissions in one workspace.</p>
          </div>
        </div>
        <div className="login-right">
          <div className="login-panel">
            <div className="login-head">$1</div>
            <div className="login-options">
              <div className="option">
                <label>{language === "ar" ? "اللغة" : "Language"}</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="option">
                <label>{language === "ar" ? "النمط" : "Theme"}</label>
                <div className="theme-switcher">
                  <button type="button" className={`theme-chip ${themeMode === "light" ? "active" : ""}`} onClick={() => setThemeMode("light")}>☀ {language === "ar" ? "فاتح" : "Light"}</button>
                  <button type="button" className={`theme-chip ${themeMode === "dark" ? "active" : ""}`} onClick={() => setThemeMode("dark")}>🌙 {language === "ar" ? "ليلي" : "Dark"}</button>
                </div>
              </div>
            </div>
            <div className="field"><label>Username</label><input value={username} onChange={(e) => setUsername(e.target.value)} /></div>
            <div className="field"><label>Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            {error ? <div className="error-box">{error}</div> : null}
            <button className="btn primary full" onClick={submit}>Sign In</button>
            <div className="demo-box">
              <div className="demo-title">Demo accounts</div>
              <div><strong>HR Manager:</strong> hrmanager / 123456</div>
              <div><strong>HR Admin:</strong> walid / 123456</div>
              <div><strong>Employee:</strong> ahmed.salem / 123456</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPage({ currentAccount, employees, projects, requests, accounts, setActivePage }) {
  const totalRemaining = useMemo(() => employees.reduce((sum, emp) => sum + Math.max(emp.annualBalance - emp.usedLeave, 0), 0), [employees]);
  const pendingApprovals = requests.filter((r) => r.status === "Pending" || r.status === "In Review").length;
  const employeeSelf = employeeByAccount(currentAccount, employees);

  if (!currentAccount.isAdminView) {
    const rows = [["Name", currentAccount.name], ["Job Title", currentAccount.title], ["Project", employeeSelf ? projectName(projects, employeeSelf.projectId) : "-"], ["Remaining Leave", employeeSelf ? Math.max(employeeSelf.annualBalance - employeeSelf.usedLeave, 0) : "-"], ["Salary", employeeSelf ? employeeSelf.salary : "-"]];
    return (
      <div className="page-stack">
        <GlassCard className="hero-card">
          <div>
            <div className="eyebrow dark">Employee self service</div>
            <h2>My Workspace</h2>
            <p>Access your leave balance, submit requests and track approvals.</p>
            <div className="hero-actions">
              <button className="btn primary" onClick={() => setActivePage("requests")}><Plus size={14} /> New Request</button>
              <button className="btn secondary" onClick={() => setActivePage("myLeave")}><CalendarCheck2 size={14} /> My Leave</button>
            </div>
          </div>
        </GlassCard>
        <GlassCard>
          <SectionTitle title="My Summary" description="Employee self-service information." action={<ExportButtons rows={rows} fileName="my-profile.xlsx" sheetName="Profile" />} />
          <div className="summary-box">
            <div className="summary-title">{currentAccount.name}</div>
            <div>Job Title: {currentAccount.title}</div>
            <div>Remaining Leave: {employeeSelf ? Math.max(employeeSelf.annualBalance - employeeSelf.usedLeave, 0) : "-"} days</div>
            <div>Project: {employeeSelf ? projectName(projects, employeeSelf.projectId) : "-"}</div>
          </div>
        </GlassCard>
      </div>
    );
  }

  const kpis = [
    { label: "Employees", value: employees.length, icon: Users },
    { label: "Projects", value: projects.length, icon: Building2 },
    { label: "Pending", value: pendingApprovals, icon: ClipboardCheck },
    { label: "Remaining Leave", value: totalRemaining, icon: Wallet },
    { label: "Accounts", value: accounts.length, icon: KeyRound },
  ];

  return (
    <div className="page-stack">
      <GlassCard className="hero-card">
        <div>
          <div className="eyebrow dark">Human resources dashboard</div>
          <h2>Executive HR Dashboard</h2>
          <p>Premium overview for approvals, balances, projects, employee activity and employee accounts.</p>
          <div className="hero-actions">
            <button className="btn primary" onClick={() => setActivePage("approvals")}><BadgeCheck size={14} /> Approvals</button>
            <button className="btn secondary" onClick={() => setActivePage("accounts")}><KeyRound size={14} /> Accounts</button>
          </div>
        </div>
        <div className="hero-mini-grid">
          <div className="mini-stat"><div className="mini-stat-icon"><Activity size={14} /></div><div><div className="mini-stat-label">Active</div><div className="mini-stat-value">{employees.filter((e) => e.status === "Active").length}</div></div></div>
          <div className="mini-stat"><div className="mini-stat-icon"><Clock3 size={14} /></div><div><div className="mini-stat-label">On Leave</div><div className="mini-stat-value">{employees.filter((e) => e.status === "On Leave").length}</div></div></div>
          <div className="mini-stat"><div className="mini-stat-icon"><AlertTriangle size={14} /></div><div><div className="mini-stat-label">Pending</div><div className="mini-stat-value">{pendingApprovals}</div></div></div>
          <div className="mini-stat"><div className="mini-stat-icon"><Users size={14} /></div><div><div className="mini-stat-label">Accounts</div><div className="mini-stat-value">{accounts.length}</div></div></div>
        </div>
      </GlassCard>
      <div className="kpi-grid">
        {kpis.map((item) => {
          const Icon = item.icon;
          return <GlassCard key={item.label} className="kpi-card"><div className="kpi-top"><div className="kpi-icon"><Icon size={14} /></div></div><div className="kpi-label">{item.label}</div><div className="kpi-value">{item.value}</div></GlassCard>;
        })}
      </div>
    </div>
  );
}

function AttendancePage({ currentAccount }) {
  const [attendanceState, setAttendanceState] = useState({ days: [], rows: [], monthTitle: "Attendance" });
  const [fileName, setFileName] = useState("");
  const [monthName, setMonthName] = useState("Attendance");
  const [employeeFilter, setEmployeeFilter] = useState("");

  const filteredRows = attendanceState.rows.filter((row) => row.name.toLowerCase().includes(employeeFilter.toLowerCase()));
  const totalEmployees = filteredRows.length;
  const totalHours = filteredRows.reduce((sum, row) => sum + row.totalHours, 0);
  const absentCount = filteredRows.reduce((sum, row) => sum + row.absentCount, 0);
  const singlePunchCount = filteredRows.reduce((sum, row) => sum + row.singlePunchCount, 0);

  const onFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsed = buildAttendanceState(result.data || []);
        setAttendanceState(parsed);
        setMonthName(parsed.monthTitle || "Attendance");
      },
    });
  };

  const exportRows = [["Employee", "User ID", ...attendanceState.days.map((day) => day.label), "Total Hours", "Absent", "Single Punch"], ...filteredRows.map((row) => [row.name, row.userId || "-", ...row.cells.map((cell) => cell.value), Number(row.totalHours.toFixed(2)), row.absentCount, row.singlePunchCount])];

  return (
    <div className="page-stack">
      <GlassCard className="section-hero">
        <div>
          <div className="eyebrow dark">Attendance control</div>
          <h2>Attendance</h2>
          <p>Upload biometric CSV and generate a monthly Oracle-style attendance sheet with totals, absence and single punch highlighting.</p>
        </div>
        <div className="hero-mini-grid">
          <div className="mini-stat"><div className="mini-stat-icon"><Users size={14} /></div><div><div className="mini-stat-label">Employees</div><div className="mini-stat-value">{totalEmployees}</div></div></div>
          <div className="mini-stat"><div className="mini-stat-icon"><Clock3 size={14} /></div><div><div className="mini-stat-label">Total Hours</div><div className="mini-stat-value">{Math.round(totalHours)}</div></div></div>
          <div className="mini-stat"><div className="mini-stat-icon"><AlertTriangle size={14} /></div><div><div className="mini-stat-label">Absent</div><div className="mini-stat-value">{absentCount}</div></div></div>
          <div className="mini-stat"><div className="mini-stat-icon"><Fingerprint size={14} /></div><div><div className="mini-stat-label">Single Punch</div><div className="mini-stat-value">{singlePunchCount}</div></div></div>
        </div>
      </GlassCard>
      <GlassCard>
        <SectionTitle title="Biometric Import" description="Upload the raw CSV exported from your attendance device." action={<ExportButtons rows={exportRows} fileName="attendance-sheet.xlsx" sheetName="Attendance" />} />
        <div className="form-grid" style={{ marginBottom: 14 }}>
          <div className="field"><label>Filter Employee</label><input value={employeeFilter} onChange={(e) => setEmployeeFilter(e.target.value)} placeholder="Search employee name" /></div>
          <div className="field"><label>Detected Month</label><input value={monthName} readOnly /></div>
        </div>
        {!currentAccount.isAdminView ? <div className="empty-box">Attendance import is available to administrative HR roles only.</div> : <div className="upload-box"><label className="upload-btn"><Upload size={14} /> Upload CSV<input type="file" accept=".csv" hidden onChange={onFileUpload} /></label><div className="upload-note">{fileName || "No file uploaded yet"}</div></div>}
      </GlassCard>
      <GlassCard>
        <SectionTitle title={monthName} description="Generated monthly attendance sheet ready for HR review and Excel download." />
        {filteredRows.length === 0 ? <div className="empty-box">Upload the attendance CSV file to generate the monthly grid.</div> : <div className="attendance-table-wrap"><table className="attendance-table"><thead><tr><th className="sticky-col">Employee</th><th>User ID</th>{attendanceState.days.map((day) => <th key={day.key} className={day.weekend ? "weekend-head" : ""}>{day.label}</th>)}<th>Total Hours</th><th>Absent</th><th>Single Punch</th></tr></thead><tbody>{filteredRows.map((row) => <tr key={`${row.name}-${row.userId}`}><td className="sticky-col employee-col">{row.name}</td><td>{row.userId || "-"}</td>{row.cells.map((cell, i) => <td key={i} className={`attendance-cell ${cell.type}`}>{cell.value}</td>)}<td>{Number(row.totalHours.toFixed(2))}</td><td>{row.absentCount}</td><td>{row.singlePunchCount}</td></tr>)}</tbody></table></div>}
      </GlassCard>
    </div>
  );
}

function RequestsPage({ currentAccount, employees, requests, setRequests, projects }) {
  const employeeSelf = employeeByAccount(currentAccount, employees);
  const visibleRequests = currentAccount.isAdminView ? requests : requests.filter((r) => r.employeeId === currentAccount.employeeId);
  const rows = visibleRequests.map((req) => [req.employee, req.type, projectName(projects, req.projectId), req.days, req.date, req.status, req.attachmentName || "-", req.attachmentUrl ? "Available" : "-"]);
  const [form, setForm] = useState({ type: "Annual Leave", days: 1, note: "", attachmentName: "", attachmentUrl: "" });

  const onAttachmentChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      window.alert("Please upload a PDF file only.");
      return;
    }
    const attachmentUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, attachmentName: file.name, attachmentUrl }));
  };

  const submitRequest = () => {
    const targetEmployee = currentAccount.isAdminView ? employees[0] : employeeSelf;
    if (!targetEmployee) return;
    setRequests((prev) => [{ id: Date.now(), employeeId: targetEmployee.id, employee: targetEmployee.name, type: form.type, projectId: targetEmployee.projectId, days: Number(form.type === "Annual Leave" || form.type === "Takleef" ? form.days : 0), status: "Pending", date: new Date().toISOString().slice(0, 10), note: form.note, attachmentName: form.attachmentName, attachmentUrl: form.attachmentUrl }, ...prev]);
    setForm({ type: "Annual Leave", days: 1, note: "", attachmentName: "", attachmentUrl: "" });
  };

  return (
    <div className="page-stack">
      <GlassCard className="section-hero"><div><div className="eyebrow dark">Request management</div><h2>Requests</h2><p>Create annual leave, salary certificate, salary transfer and takleef requests.</p></div></GlassCard>
      <div className="two-col">
        <GlassCard>
          <SectionTitle title="Submit Request" description="Employees can raise requests and upload PDF attachments for HR review." />
          <div className="form-grid">
            <div className="field"><label>Request Type</label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>Annual Leave</option><option>Salary Certificate</option><option>Salary Transfer</option><option>Takleef</option></select></div>
            <div className="field"><label>Days</label><input type="number" value={form.days} onChange={(e) => setForm({ ...form, days: Number(e.target.value) })} disabled={!(form.type === "Annual Leave" || form.type === "Takleef")} /></div>
            <div className="field full-span"><label>Note</label><textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></div>
            <div className="field full-span"><label>PDF Attachment</label><input type="file" accept="application/pdf,.pdf" onChange={onAttachmentChange} /></div>
            <div className="field full-span"><label>Attached File Name</label><input value={form.attachmentName} readOnly placeholder="No PDF selected" /></div>
          </div>
          <button className="btn primary full" onClick={submitRequest}><Plus size={14} /> Submit Request</button>
        </GlassCard>
        <GlassCard>
          <SectionTitle title="Request Tracker" description="Track request status and HR approval decisions." action={<ExportButtons rows={[["Employee", "Type", "Project", "Days", "Date", "Status", "Attachment", "Open"], ...rows]} fileName="requests.xlsx" sheetName="Requests" />} />
          <div className="table-wrap premium-table"><table><thead><tr><th>Employee</th><th>Type</th><th>Project</th><th>Days</th><th>Date</th><th>Status</th><th>Attachment</th><th>Open</th></tr></thead><tbody>{visibleRequests.map((req) => <tr key={req.id}><td>{req.employee}</td><td>{req.type}</td><td>{projectName(projects, req.projectId)}</td><td>{req.days}</td><td>{req.date}</td><td><StatusBadge status={req.status} /></td><td>{req.attachmentName || "-"}</td><td>{req.attachmentUrl ? <a href={req.attachmentUrl} target="_blank" rel="noreferrer" download={req.attachmentName}>Open PDF</a> : "-"}</td></tr>)}</tbody></table></div>
        </GlassCard>
      </div>
    </div>
  );
}

function ApprovalsPage({ currentAccount, requests, setRequests, employees, setEmployees, projects }) {
  const pending = requests.filter((r) => r.status === "Pending" || r.status === "In Review");
  const rows = requests.map((req) => [req.employee, req.type, projectName(projects, req.projectId), req.days, req.date, req.status]);

  const handleDecision = (requestId, nextStatus) => {
    const target = requests.find((r) => r.id === requestId);
    if (!target) return;
    setRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: nextStatus } : req)));
    if (nextStatus === "Approved" && target.type === "Annual Leave") {
      setEmployees((prev) => prev.map((emp) => (emp.id === target.employeeId ? { ...emp, usedLeave: emp.usedLeave + Number(target.days), status: "On Leave" } : emp)));
    }
  };

  if (!currentAccount.isAdminView) return <div className="page-stack"><GlassCard><div className="empty-box">Approvals are available to HR administrative roles only.</div></GlassCard></div>;

  return (
    <div className="page-stack">
      <GlassCard className="section-hero"><div><div className="eyebrow dark">Approval workflow</div><h2>Approvals</h2><p>Approve or reject leave, salary certificate, salary transfer and takleef requests.</p></div></GlassCard>
      <GlassCard>
        <SectionTitle title="Approval Workspace" description="HR Manager and administrative HR accounts control final decisions." action={<ExportButtons rows={[["Employee", "Type", "Project", "Days", "Date", "Status"], ...rows]} fileName="approvals.xlsx" sheetName="Approvals" />} />
        <div className="approval-grid">
          {pending.length === 0 ? <div className="empty-box">No pending approvals right now.</div> : pending.map((req) => {
            const emp = employees.find((e) => e.id === req.employeeId);
            return <div className="approval-card" key={req.id}><div className="approval-top"><div><h4>{req.employee}</h4><p>{req.type} • {projectName(projects, req.projectId)}</p></div><StatusBadge status={req.status} /></div><div className="approval-body"><div><strong>Days:</strong> {req.days || 0}</div><div><strong>Date:</strong> {req.date}</div><div><strong>Note:</strong> {req.note}</div><div><strong>Attachment:</strong> {req.attachmentName || "-"}</div><div><strong>Open:</strong> {req.attachmentUrl ? <a href={req.attachmentUrl} target="_blank" rel="noreferrer" download={req.attachmentName}>Download PDF</a> : "-"}</div>{emp ? <div><strong>Current leave balance:</strong> {Math.max(emp.annualBalance - emp.usedLeave, 0)} days</div> : null}</div><div className="approval-actions"><button className="btn success" onClick={() => handleDecision(req.id, "Approved")}><CheckCircle2 size={14} /> Approve</button><button className="btn danger" onClick={() => handleDecision(req.id, "Rejected")}><XCircle size={14} /> Reject</button></div></div>;
          })}
        </div>
      </GlassCard>
    </div>
  );
}

function EmployeesPage({ currentAccount, employees, setEmployees, projects }) {
  if (!currentAccount.isAdminView) return <div className="page-stack"><GlassCard><div className="empty-box">Employee directory is available to administrative HR roles only.</div></GlassCard></div>;
  const rows = employees.map((emp) => [emp.name, emp.employeeId, projectName(projects, emp.projectId), emp.manager, `${Math.max(emp.annualBalance - emp.usedLeave, 0)} days`, emp.status]);
  const [form, setForm] = useState({ name: "", employeeId: "", role: "", projectId: projects[0]?.id || "", nationality: "Saudi", annualBalance: 30, usedLeave: 0, status: "Active", salary: 5000 });
  const addEmployee = () => {
    if (!form.name || !form.employeeId || !form.role) return;
    const project = projects.find((p) => p.id === form.projectId);
    setEmployees((prev) => [...prev, { id: Date.now(), ...form, manager: project?.manager || "", housing: 1200, transport: 500 }]);
    setForm({ name: "", employeeId: "", role: "", projectId: projects[0]?.id || "", nationality: "Saudi", annualBalance: 30, usedLeave: 0, status: "Active", salary: 5000 });
  };
  return <div className="page-stack"><GlassCard className="section-hero"><div><div className="eyebrow dark">Employee administration</div><h2>Employees</h2><p>Create and manage employee records linked to projects and managers.</p></div></GlassCard><div className="two-col"><GlassCard><SectionTitle title="Employees Directory" description="Project-linked employee records with manager ownership and leave visibility." action={<ExportButtons rows={[["Name", "ID", "Project", "Manager", "Balance", "Status"], ...rows]} fileName="employees.xlsx" sheetName="Employees" />} /><div className="table-wrap premium-table"><table><thead><tr><th>Name</th><th>ID</th><th>Project</th><th>Manager</th><th>Balance</th><th>Status</th></tr></thead><tbody>{employees.map((emp) => <tr key={emp.id}><td><div className="strong">{emp.name}</div><div className="sub">{emp.role}</div></td><td>{emp.employeeId}</td><td>{projectName(projects, emp.projectId)}</td><td>{emp.manager}</td><td>{Math.max(emp.annualBalance - emp.usedLeave, 0)} days</td><td><StatusBadge status={emp.status} /></td></tr>)}</tbody></table></div></GlassCard><GlassCard><SectionTitle title="Add Employee" description="Create a new employee and assign them to a specific project." /><div className="form-grid"><div className="field"><label>Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div><div className="field"><label>Employee ID</label><input value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} /></div><div className="field"><label>Role</label><input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div><div className="field"><label>Project</label><select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })}>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div><div className="field"><label>Nationality</label><input value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} /></div><div className="field"><label>Status</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Active</option><option>On Leave</option><option>Pending Review</option></select></div><div className="field"><label>Annual Leave</label><input type="number" value={form.annualBalance} onChange={(e) => setForm({ ...form, annualBalance: Number(e.target.value) })} /></div><div className="field"><label>Salary</label><input type="number" value={form.salary} onChange={(e) => setForm({ ...form, salary: Number(e.target.value) })} /></div></div><button className="btn primary full" onClick={addEmployee}><UserPlus size={14} /> Save Employee</button></GlassCard></div></div>;
}

function MyLeavePage({ currentAccount, employees, projects }) {
  const emp = employeeByAccount(currentAccount, employees);
  const rows = [["Name", currentAccount.name], ["Project", emp ? projectName(projects, emp.projectId) : "-"], ["Annual Balance", emp?.annualBalance || 0], ["Used Leave", emp?.usedLeave || 0], ["Remaining", emp ? Math.max(emp.annualBalance - emp.usedLeave, 0) : 0]];
  return <div className="page-stack"><GlassCard className="section-hero"><div><div className="eyebrow dark">Employee leave balance</div><h2>My Leave</h2><p>View your leave balance and submit new leave requests.</p></div></GlassCard><GlassCard><SectionTitle title="My Leave Balance" description="Visible to employee accounts." action={<ExportButtons rows={rows} fileName="my-leave.xlsx" sheetName="My Leave" />} /><div className="summary-box"><div className="summary-title">{currentAccount.name}</div><div>Remaining Leave: {emp ? Math.max(emp.annualBalance - emp.usedLeave, 0) : 0} days</div><div>Project: {emp ? projectName(projects, emp.projectId) : "-"}</div></div></GlassCard></div>;
}

function LeaveBalancesPage({ currentAccount, employees, setEmployees, projects }) {
  if (!currentAccount.isAdminView) return <MyLeavePage currentAccount={currentAccount} employees={employees} projects={projects} />;
  const rows = employees.map((emp) => [emp.name, projectName(projects, emp.projectId), emp.annualBalance, emp.usedLeave, Math.max(emp.annualBalance - emp.usedLeave, 0)]);
  const [selectedId, setSelectedId] = useState(String(employees[0]?.id || ""));
  const [annualBalance, setAnnualBalance] = useState(employees[0]?.annualBalance || 30);
  const [usedLeave, setUsedLeave] = useState(employees[0]?.usedLeave || 0);
  const selectedEmployee = employees.find((e) => String(e.id) === selectedId);
  useEffect(() => {
    if (selectedEmployee) {
      setAnnualBalance(selectedEmployee.annualBalance);
      setUsedLeave(selectedEmployee.usedLeave);
    }
  }, [selectedId]);
  const saveBalance = () => setEmployees((prev) => prev.map((emp) => (String(emp.id) === selectedId ? { ...emp, annualBalance: Number(annualBalance), usedLeave: Number(usedLeave) } : emp)));
  return <div className="page-stack"><GlassCard className="section-hero"><div><div className="eyebrow dark">Leave governance</div><h2>Leave Balances</h2><p>Control annual leave allocation and used balances for every employee.</p></div></GlassCard><div className="two-col"><GlassCard><SectionTitle title="Annual Leave Balances" description="Manually control annual leave allocation and usage for every employee." action={<ExportButtons rows={[["Employee", "Project", "Annual Balance", "Used Leave", "Remaining"], ...rows]} fileName="leave-balances.xlsx" sheetName="Leave Balances" />} /><div className="table-wrap premium-table"><table><thead><tr><th>Employee</th><th>Project</th><th>Annual Balance</th><th>Used Leave</th><th>Remaining</th></tr></thead><tbody>{employees.map((emp) => <tr key={emp.id}><td>{emp.name}</td><td>{projectName(projects, emp.projectId)}</td><td>{emp.annualBalance}</td><td>{emp.usedLeave}</td><td>{Math.max(emp.annualBalance - emp.usedLeave, 0)}</td></tr>)}</tbody></table></div></GlassCard><GlassCard><SectionTitle title="Update Balance" description="Select any employee and update leave values directly." /><div className="field"><label>Employee</label><select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>{employees.map((emp) => <option key={emp.id} value={String(emp.id)}>{emp.name} - {projectName(projects, emp.projectId)}</option>)}</select></div><div className="form-grid"><div className="field"><label>Annual Leave</label><input type="number" value={annualBalance} onChange={(e) => setAnnualBalance(Number(e.target.value))} /></div><div className="field"><label>Used Leave</label><input type="number" value={usedLeave} onChange={(e) => setUsedLeave(Number(e.target.value))} /></div></div>{selectedEmployee ? <div className="summary-box"><div className="summary-title">{selectedEmployee.name}</div><div>Remaining after save: {Math.max(annualBalance - usedLeave, 0)} days</div></div> : null}<button className="btn primary full" onClick={saveBalance}><Wallet size={14} /> Save Balance</button></GlassCard></div></div>;
}

function PayrollPage({ currentAccount, employees, projects }) {
  if (!currentAccount.isAdminView) {
    const emp = employeeByAccount(currentAccount, employees);
    const rows = [["Name", currentAccount.name], ["Basic Salary", emp?.salary || 0], ["Housing", emp?.housing || 0], ["Transport", emp?.transport || 0]];
    return <div className="page-stack"><GlassCard><SectionTitle title="My Salary Data" description="Employee salary viewing is limited to personal information." action={<ExportButtons rows={rows} fileName="my-salary.xlsx" sheetName="My Salary" />} /><div className="summary-box"><div className="summary-title">{currentAccount.name}</div><div>Basic Salary: {emp?.salary || 0}</div><div>Housing: {emp?.housing || 0}</div><div>Transport: {emp?.transport || 0}</div></div></GlassCard></div>;
  }
  const salaryRows = employees.map((emp) => ({ ...emp, deductions: emp.usedLeave * 20, netSalary: emp.salary + emp.housing + emp.transport - emp.usedLeave * 20 }));
  const rows = salaryRows.map((row) => [row.name, projectName(projects, row.projectId), row.salary, row.housing, row.transport, row.deductions, row.netSalary]);
  return <div className="page-stack"><GlassCard className="section-hero"><div><div className="eyebrow dark">Payroll preparation</div><h2>Payroll</h2><p>Track payroll preparation items, salary details and deduction impact.</p></div></GlassCard><GlassCard><SectionTitle title="Payroll Table" description="Salary details commonly needed by HR for payroll preparation." action={<ExportButtons rows={[["Employee", "Project", "Basic Salary", "Housing", "Transport", "Deductions", "Net Salary"], ...rows]} fileName="payroll.xlsx" sheetName="Payroll" />} /><div className="table-wrap premium-table"><table><thead><tr><th>Employee</th><th>Project</th><th>Basic Salary</th><th>Housing</th><th>Transport</th><th>Deductions</th><th>Net Salary</th></tr></thead><tbody>{salaryRows.map((row) => <tr key={row.id}><td>{row.name}</td><td>{projectName(projects, row.projectId)}</td><td>{row.salary}</td><td>{row.housing}</td><td>{row.transport}</td><td>{row.deductions}</td><td>{row.netSalary}</td></tr>)}</tbody></table></div></GlassCard></div>;
}

function ProjectsPage({ currentAccount, projects, setProjects, employees }) {
  if (!currentAccount.isAdminView) return <div className="page-stack"><GlassCard><div className="empty-box">Projects section is available to administrative HR roles only.</div></GlassCard></div>;
  const [activeProject, setActiveProject] = useState(projects[0]?.id || "");
  const [manager, setManager] = useState(projects[0]?.manager || "");
  const [phone, setPhone] = useState(projects[0]?.phone || "");
  const [email, setEmail] = useState(projects[0]?.email || "");
  const project = projects.find((p) => p.id === activeProject);
  const projectEmployees = employees.filter((e) => e.projectId === activeProject);
  useEffect(() => {
    const found = projects.find((p) => p.id === activeProject);
    if (found) {
      setManager(found.manager);
      setPhone(found.phone);
      setEmail(found.email);
    }
  }, [activeProject, projects]);
  const saveProjectInfo = () => setProjects((prev) => prev.map((p) => (p.id === activeProject ? { ...p, manager, phone, email } : p)));
  const rows = projectEmployees.map((emp) => [emp.name, emp.role, emp.employeeId, emp.status]);
  return <div className="page-stack"><GlassCard className="section-hero"><div><div className="eyebrow dark">Project ownership</div><h2>Projects</h2><p>Manage project structure, manager contacts and workforce distribution.</p></div></GlassCard><GlassCard><SectionTitle title="Project Structure" description="Each project has its own employees, manager and contact information." /><div className="project-tabs">{projects.map((item) => <button key={item.id} className={`project-tab ${activeProject === item.id ? "active" : ""}`} onClick={() => setActiveProject(item.id)}><div className="strong">{item.name}</div><div className="sub">{item.code}</div></button>)}</div></GlassCard><div className="two-col"><GlassCard><SectionTitle title={`${project?.name || ""} Manager`} description="Primary manager and contact details for this project." /><div className="form-grid"><div className="field"><label>Manager Name</label><input value={manager} onChange={(e) => setManager(e.target.value)} /></div><div className="field"><label>Phone Number</label><input value={phone} onChange={(e) => setPhone(e.target.value)} /></div><div className="field full-span"><label>Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} /></div></div><div className="contact-row"><div className="contact-pill"><UserCog size={14} /> {manager}</div><div className="contact-pill"><Phone size={14} /> {phone}</div><div className="contact-pill"><Mail size={14} /> {email}</div></div><button className="btn primary full" onClick={saveProjectInfo}>Save Project Contact</button></GlassCard><GlassCard><SectionTitle title="Employees in Project" description="Only employees assigned to this project are shown below." action={<ExportButtons rows={[["Employee", "Role", "ID", "Status"], ...rows]} fileName={`${project?.code || "project"}-employees.xlsx`} sheetName="Project Employees" />} /><div className="table-wrap premium-table"><table><thead><tr><th>Employee</th><th>Role</th><th>ID</th><th>Status</th></tr></thead><tbody>{projectEmployees.map((emp) => <tr key={emp.id}><td>{emp.name}</td><td>{emp.role}</td><td>{emp.employeeId}</td><td><StatusBadge status={emp.status} /></td></tr>)}</tbody></table></div></GlassCard></div></div>;
}

function ProjectFilesPage({ currentAccount, projects, filesByProject, setFilesByProject }) {
  if (!currentAccount.isAdminView) return <div className="page-stack"><GlassCard><div className="empty-box">Project files are available to administrative HR roles only.</div></GlassCard></div>;
  const [activeProject, setActiveProject] = useState(projects[0]?.id || "");
  const [form, setForm] = useState({ category: "Leave", title: "", note: "" });
  const project = projects.find((p) => p.id === activeProject);
  const items = filesByProject[activeProject] || [];
  const addFile = () => {
    if (!form.title) return;
    setFilesByProject((prev) => ({ ...prev, [activeProject]: [...(prev[activeProject] || []), { id: Date.now(), category: form.category, title: form.title, note: form.note, status: "Pending" }] }));
    setForm({ category: "Leave", title: "", note: "" });
  };
  const rows = items.map((file) => [file.category, file.title, file.note, file.status]);
  return <div className="page-stack"><GlassCard className="section-hero"><div><div className="eyebrow dark">Project documentation</div><h2>Project Files</h2></div></GlassCard><div className="two-col"><GlassCard><SectionTitle title="Project Files" description="Separate leave and task records for each project." /><div className="field"><label>Project</label><select value={activeProject} onChange={(e) => setActiveProject(e.target.value)}>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div><div className="form-grid"><div className="field"><label>Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>Leave</option><option>Takleef</option><option>Salary Transfer</option><option>Other</option></select></div><div className="field"><label>File Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div><div className="field full-span"><label>Note</label><textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></div></div><button className="btn primary full" onClick={addFile}><FolderOpen size={14} /> Add File Record</button></GlassCard><GlassCard><SectionTitle title={`${project?.name || ""} Records`} description="Files attached to the selected project section." action={<ExportButtons rows={[["Category", "Title", "Note", "Status"], ...rows]} fileName={`${project?.code || "project"}-files.xlsx`} sheetName="Project Files" />} /><div className="table-wrap premium-table"><table><thead><tr><th>Category</th><th>Title</th><th>Note</th><th>Status</th></tr></thead><tbody>{items.map((file) => <tr key={file.id}><td>{file.category}</td><td>{file.title}</td><td>{file.note}</td><td><StatusBadge status={file.status} /></td></tr>)}</tbody></table></div></GlassCard></div></div>;
}

function SalaryTransfersPage({ currentAccount, requests, projects }) {
  const list = (currentAccount.isAdminView ? requests : requests.filter((r) => r.employeeId === currentAccount.employeeId)).filter((r) => r.type === "Salary Transfer");
  const rows = list.map((req) => [req.employee, projectName(projects, req.projectId), req.date, req.status, req.attachmentName || "-", req.attachmentUrl ? "Available" : "-"]);
  return <div className="page-stack"><GlassCard className="section-hero"><div><div className="eyebrow dark">Salary transfer requests</div><h2>Salary Transfers</h2><p>Track transfer requests, bank document references and approval decisions.</p></div></GlassCard><GlassCard><SectionTitle title="Salary Transfer Requests" description="PDF attachments and HR approval workflow." action={<ExportButtons rows={[["Employee", "Project", "Date", "Status", "Attachment", "Open"], ...rows]} fileName="salary-transfers.xlsx" sheetName="Salary Transfers" />} /><div className="table-wrap premium-table"><table><thead><tr><th>Employee</th><th>Project</th><th>Date</th><th>Status</th><th>Attachment</th><th>Open</th></tr></thead><tbody>{list.map((req) => <tr key={req.id}><td>{req.employee}</td><td>{projectName(projects, req.projectId)}</td><td>{req.date}</td><td><StatusBadge status={req.status} /></td><td>{req.attachmentName || "-"}</td><td>{req.attachmentUrl ? <a href={req.attachmentUrl} target="_blank" rel="noreferrer" download={req.attachmentName}>Open PDF</a> : "-"}</td></tr>)}</tbody></table></div></GlassCard></div>;
}

function TakleefPage({ currentAccount, requests, projects }) {
  const list = (currentAccount.isAdminView ? requests : requests.filter((r) => r.employeeId === currentAccount.employeeId)).filter((r) => r.type === "Takleef");
  const rows = list.map((req) => [req.employee, projectName(projects, req.projectId), req.days, req.date, req.status, req.attachmentName || "-", req.attachmentUrl ? "Available" : "-"]);
  return <div className="page-stack"><GlassCard className="section-hero"><div><div className="eyebrow dark">Takleef documents</div><h2>Takleef</h2><p>Track takleef requests and PDF attachments.</p></div></GlassCard><GlassCard><SectionTitle title="Takleef Requests" description="Operational assignment requests with supporting PDF records." action={<ExportButtons rows={[["Employee", "Project", "Days", "Date", "Status", "Attachment", "Open"], ...rows]} fileName="takleef.xlsx" sheetName="Takleef" />} /><div className="table-wrap premium-table"><table><thead><tr><th>Employee</th><th>Project</th><th>Days</th><th>Date</th><th>Status</th><th>Attachment</th><th>Open</th></tr></thead><tbody>{list.map((req) => <tr key={req.id}><td>{req.employee}</td><td>{projectName(projects, req.projectId)}</td><td>{req.days}</td><td>{req.date}</td><td><StatusBadge status={req.status} /></td><td>{req.attachmentName || "-"}</td><td>{req.attachmentUrl ? <a href={req.attachmentUrl} target="_blank" rel="noreferrer" download={req.attachmentName}>Open PDF</a> : "-"}</td></tr>)}</tbody></table></div></GlassCard></div>;
}

function AccountsPage({ currentAccount, accounts, setAccounts, employees, projects }) {
  if (!hasPermission(currentAccount, PERMISSIONS.accounts)) return <div className="page-stack"><GlassCard><div className="empty-box">Account management is available to the HR Manager only.</div></GlassCard></div>;
  const rows = accounts.map((acc) => [acc.name, acc.username, acc.password, acc.title, acc.role, acc.permissions.length]);
  const [form, setForm] = useState({ name: "", username: "", password: "123456", title: "Employee", role: "Employee", employeeId: "", projectId: projects[0]?.id || "", permissions: roleTemplates.Employee });
  useEffect(() => {
    setForm((prev) => ({ ...prev, permissions: roleTemplates[prev.role] || roleTemplates.Employee }));
  }, [form.role]);
  const togglePermission = (permission) => setForm((prev) => ({ ...prev, permissions: prev.permissions.includes(permission) ? prev.permissions.filter((p) => p !== permission) : [...prev.permissions, permission] }));
  const createAccount = () => {
    const isNonAdminTitle = !ADMIN_TITLES.includes(form.title);
    const elevatedPermissions = [PERMISSIONS.employees, PERMISSIONS.leaveBalances, PERMISSIONS.approvals, PERMISSIONS.payroll, PERMISSIONS.accounts, PERMISSIONS.attendance].some((p) => form.permissions.includes(p));
    if (isNonAdminTitle && elevatedPermissions) {
      const ok = window.confirm("This job title is non-administrative. Are you sure you want to grant these permissions?");
      if (!ok) return;
    }
    setAccounts((prev) => [...prev, { id: Date.now(), ...form, employeeId: form.employeeId ? Number(form.employeeId) : null, isAdminView: ADMIN_TITLES.includes(form.title) }]);
    setForm({ name: "", username: "", password: "123456", title: "Employee", role: "Employee", employeeId: "", projectId: projects[0]?.id || "", permissions: roleTemplates.Employee });
  };
  return <div className="page-stack"><GlassCard className="section-hero"><div><div className="eyebrow dark">Account provisioning</div><h2>Accounts & Permissions</h2><p>HR Manager can create user accounts, assign permissions and control access roles.</p></div></GlassCard><div className="two-col"><GlassCard><SectionTitle title="Existing Accounts" description="Platform accounts and current permission counts." action={<ExportButtons rows={[["Name", "Username", "Password", "Title", "Role", "Permissions"], ...rows]} fileName="accounts.xlsx" sheetName="Accounts" />} /><div className="table-wrap premium-table"><table><thead><tr><th>Name</th><th>Username</th><th>Password</th><th>Title</th><th>Role</th><th>Permissions</th></tr></thead><tbody>{accounts.map((acc) => <tr key={acc.id}><td>{acc.name}</td><td>{acc.username}</td><td>{acc.password}</td><td>{acc.title}</td><td>{acc.role}</td><td>{acc.permissions.length}</td></tr>)}</tbody></table></div></GlassCard><GlassCard><SectionTitle title="Create Account" description="Grant permissions and warn on non-administrative job titles." /><div className="form-grid"><div className="field"><label>Full Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div><div className="field"><label>Username</label><input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></div><div className="field"><label>Password</label><input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div><div className="field"><label>Job Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div><div className="field"><label>Role Template</label><select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value, permissions: roleTemplates[e.target.value] || roleTemplates.Employee })}><option>HR Manager</option><option>HR Admin</option><option>HR Assistant</option><option>Employee</option></select></div><div className="field"><label>Link Employee</label><select value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })}><option value="">No linked employee</option>{employees.map((emp) => <option key={emp.id} value={emp.id}>{emp.name}</option>)}</select></div><div className="field full-span"><label>Project</label><select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })}>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div></div>{!ADMIN_TITLES.includes(form.title) ? <div className="warning-box">This title is non-administrative. If you give high permissions, the HR Manager should confirm before saving.</div> : null}<div className="permissions-grid">{Object.values(PERMISSIONS).map((permission) => <label key={permission} className="permission-pill"><input type="checkbox" checked={form.permissions.includes(permission)} onChange={() => togglePermission(permission)} /> <span>{permission}</span></label>)}</div><button className="btn primary full" onClick={createAccount}><KeyRound size={14} /> Create Account</button></GlassCard></div></div>;
}

function ProfilePage({ currentAccount, employees, projects }) {
  const emp = employeeByAccount(currentAccount, employees);
  const rows = [["Name", currentAccount.name], ["Username", currentAccount.username], ["Title", currentAccount.title], ["Role", currentAccount.role], ["Project", emp ? projectName(projects, emp.projectId) : projectName(projects, currentAccount.projectId)], ["Permissions", currentAccount.permissions.join(", ")]];
  return <div className="page-stack"><GlassCard className="section-hero"><div><div className="eyebrow dark">User profile</div><h2>Profile</h2><p>Each account has its own profile and permission visibility.</p></div></GlassCard><GlassCard><SectionTitle title="My Profile" description="Current user account information." action={<ExportButtons rows={rows} fileName="profile.xlsx" sheetName="Profile" />} /><div className="summary-box"><div className="summary-title">{currentAccount.name}</div><div>Title: {currentAccount.title}</div><div>Role: {currentAccount.role}</div><div>Project: {emp ? projectName(projects, emp.projectId) : projectName(projects, currentAccount.projectId)}</div><div>Permissions: {currentAccount.permissions.length}</div></div></GlassCard></div>;
}

function ReportsPage({ currentAccount }) {
  if (!currentAccount.isAdminView) return <div className="page-stack"><GlassCard><div className="empty-box">Reports are available to administrative HR roles only.</div></GlassCard></div>;
  const rows = [["Attendance report"], ["Leave report"], ["Payroll summary"], ["Project HR report"], ["Employee documents log"], ["Contract expiry report"]];
  return <div className="page-stack"><GlassCard className="section-hero"><div><div className="eyebrow dark">Reporting modules</div><h2>Reports</h2><p>Prepare attendance reports, leave summaries, payroll exports and project-based HR reports.</p></div></GlassCard><GlassCard><SectionTitle title="Reporting Modules" description="Useful report categories for HR teams." action={<ExportButtons rows={[["Module"], ...rows]} fileName="reports.xlsx" sheetName="Reports" />} /><div className="table-wrap premium-table"><table><thead><tr><th>Module</th></tr></thead><tbody>{rows.map((row, i) => <tr key={i}><td>{row[0]}</td></tr>)}</tbody></table></div></GlassCard></div>;
}

function SettingsPage({ currentAccount, portalLocked, setPortalLocked }) {
  if (!currentAccount.isAdminView) return <div className="page-stack"><GlassCard><div className="empty-box">Settings are available to administrative HR roles only.</div></GlassCard></div>;
  const rows = [["Company Profile", "Company name, HR title, contact details"], ["User Roles", "HR Manager, HR Admin, Assistant permissions"], ["Project Structure", "Project list, project manager and contact info"], ["Leave Rules", "Annual leave defaults and entitlement"], ["Attendance Rules", "Late arrival and punch controls"], ["Payroll Settings", "Payroll cycle and export fields"], ["Portal Access", portalLocked ? "Restricted to administrative accounts" : "Open to all valid accounts"]];
  return <div className="page-stack"><GlassCard className="section-hero"><div><div className="eyebrow dark">System control</div><h2>Settings</h2><p>Essential settings for the HR platform, project structure and operational controls.</p></div></GlassCard><GlassCard><SectionTitle title="Core Settings" description="Necessary settings HR teams commonly need in the portal." action={<ExportButtons rows={[["Setting", "Description"], ...rows]} fileName="settings.xlsx" sheetName="Settings" />} /><div className="summary-box"><div className="summary-title">Portal Access Control</div><div>Current State: {portalLocked ? "Restricted to administrative accounts only" : "Normal access for all valid accounts"}</div><button className="btn primary" style={{ marginTop: 12 }} onClick={() => setPortalLocked((prev) => !prev)}>{portalLocked ? "Unlock Portal" : "Lock Portal for Admin Only"}</button></div><div className="table-wrap premium-table"><table><thead><tr><th>Setting</th><th>Description</th></tr></thead><tbody>{rows.map((row, i) => <tr key={i}><td>{row[0]}</td><td>{row[1]}</td></tr>)}</tbody></table></div></GlassCard></div>;
}

export default function HRPortalRedesign() {
  const [accounts, setAccounts] = useState(() => (typeof window !== "undefined" ? storage.get("hr_accounts", initialAccounts) : initialAccounts));
  const [employees, setEmployees] = useState(() => (typeof window !== "undefined" ? storage.get("hr_employees", initialEmployees) : initialEmployees));
  const [projects, setProjects] = useState(() => (typeof window !== "undefined" ? storage.get("hr_projects", initialProjects) : initialProjects));
  const [requests, setRequests] = useState(() => (typeof window !== "undefined" ? storage.get("hr_requests", initialRequests) : initialRequests));
  const [filesByProject, setFilesByProject] = useState(() => (typeof window !== "undefined" ? storage.get("hr_files", initialFiles) : initialFiles));
  const [portalLocked, setPortalLocked] = useState(() => (typeof window !== "undefined" ? storage.get("hr_portal_locked", false) : false));
  const [language, setLanguage] = useState(() => (typeof window !== "undefined" ? storage.get("hr_language", "ar") : "ar"));
  const [themeMode, setThemeMode] = useState(() => (typeof window !== "undefined" ? storage.get("hr_theme", "light") : "light"));
  const [currentAccount, setCurrentAccount] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth <= 960 : false);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 960);
    handleResize();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(() => setIsBooting(false), 900);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    storage.set("hr_accounts", accounts);
    storage.set("hr_employees", employees);
    storage.set("hr_projects", projects);
    storage.set("hr_requests", requests);
    storage.set("hr_files", filesByProject);
    storage.set("hr_portal_locked", portalLocked);
    storage.set("hr_language", language);
    storage.set("hr_theme", themeMode);
  }, [accounts, employees, projects, requests, filesByProject, portalLocked, language, themeMode]);

  const visibleSidebar = currentAccount ? sidebarCatalog.filter((item) => hasPermission(currentAccount, item.permission)) : [];

  useEffect(() => {
    if (!currentAccount) return;
    if (!visibleSidebar.find((item) => item.key === activePage)) {
      setActivePage(visibleSidebar[0]?.key || "dashboard");
    }
  }, [currentAccount, activePage, visibleSidebar]);

  if (isBooting) {
    return <><style>{styles}</style><PortalLoader /></>;
  }

  if (!currentAccount) {
    return <><style>{styles}</style><LoginScreen accounts={accounts} onLogin={setCurrentAccount} language={language} setLanguage={setLanguage} themeMode={themeMode} setThemeMode={setThemeMode} /></>;
  }

  if (portalLocked && currentAccount && !currentAccount.isAdminView) {
    return <><style>{styles}</style><div className={themeMode === "dark" ? "theme-dark" : "theme-light"}><PortalLoader mode="restricted" title={language === "ar" ? "الدخول مقيد" : "Portal Restricted"} subtitle={language === "ar" ? "فقط مدير الموارد البشرية والحسابات الإدارية يمكنهم الدخول الآن" : "Only HR Manager and administrative accounts can access the portal right now."} onBack={() => { setCurrentAccount(null); setActivePage("dashboard"); }} /></div></>;
  }

  return (
    <>
      <style>{styles}</style>
      <div className={`${themeMode === "dark" ? "theme-dark" : "theme-light"} app-shell`} dir={language === "ar" ? "rtl" : "ltr"}>
        {(!isMobile || mobileSidebar) && (
          <aside className={`sidebar ${isMobile ? "mobile-open" : ""}`}>
            <div className="sidebar-userhead">
              <div className="sidebar-user-name">{currentAccount.name}</div>
              <div className="sidebar-user-role">{currentAccount.title}</div>
            </div>
            <nav className="nav-list">
              {visibleSidebar.map((item) => {
                const Icon = item.icon;
                return <button key={item.key} className={`nav-btn ${activePage === item.key ? "active" : ""}`} onClick={() => { setActivePage(item.key); setMobileSidebar(false); }}><Icon size={16} /><span>{item.label}</span></button>;
              })}
            </nav>
            <div className="sidebar-projects"><div className="eyebrow light">Project Sections</div>{projects.map((p) => <div className="sidebar-chip" key={p.id}>{p.name}</div>)}</div>
            <button className="btn ghost full" onClick={() => { setCurrentAccount(null); setActivePage("dashboard"); }}><LogOut size={14} /> Logout</button>
          </aside>
        )}
        <main className="main-shell">
          <GlassCard className="topbar">
            <div>
              <button className="menu-btn" onClick={() => setMobileSidebar((v) => !v)}><Menu size={16} /></button>
              <div className="eyebrow dark">Human Resources Platform</div>
              <h1 className="page-title">{visibleSidebar.find((s) => s.key === activePage)?.label || "Dashboard"}</h1>
              <p className="page-sub">{language === "ar" ? (new Date().getHours() < 12 ? `صباح الخير ${currentAccount.name}` : `مساء الخير ${currentAccount.name}`) : (new Date().getHours() < 12 ? `Good morning, ${currentAccount.name}` : `Good evening, ${currentAccount.name}`)}</p><p className="page-sub">{language === "ar" ? `تم تسجيل الدخول بواسطة ${currentAccount.name} (${currentAccount.title})` : `Signed in as ${currentAccount.name} (${currentAccount.title})`}</p>
            </div>
            <div className="topbar-actions">
              <div className="quick-controls">
                <button className={`quick-chip ${language === "ar" ? "active" : ""}`} onClick={() => setLanguage("ar")}>AR</button>
                <button className={`quick-chip ${language === "en" ? "active" : ""}`} onClick={() => setLanguage("en")}>EN</button>
                <button className={`quick-chip ${themeMode === "light" ? "active" : ""}`} onClick={() => setThemeMode("light")}>☀</button>
                <button className={`quick-chip ${themeMode === "dark" ? "active" : ""}`} onClick={() => setThemeMode("dark")}>🌙</button>
              </div>
              <div className="search-box"><Search size={14} /><input placeholder={language === "ar" ? "ابحث عن الموظفين والمشاريع والاعتمادات..." : "Search employees, projects, approvals..."} /></div>
              <button className="btn secondary"><Bell size={14} /> Alerts</button>
              {hasPermission(currentAccount, PERMISSIONS.requests) ? <button className="btn primary" onClick={() => setActivePage("requests")}><Plus size={14} /> New Request</button> : null}
            </div>
          </GlassCard>
          <div className="content-stack">
            {activePage === "dashboard" && <DashboardPage currentAccount={currentAccount} employees={employees} projects={projects} requests={requests} accounts={accounts} setActivePage={setActivePage} />}
            {activePage === "employees" && <EmployeesPage currentAccount={currentAccount} employees={employees} setEmployees={setEmployees} projects={projects} />}
            {activePage === "leaveBalances" && <LeaveBalancesPage currentAccount={currentAccount} employees={employees} setEmployees={setEmployees} projects={projects} />}
            {activePage === "approvals" && <ApprovalsPage currentAccount={currentAccount} requests={requests} setRequests={setRequests} employees={employees} setEmployees={setEmployees} projects={projects} />}
            {activePage === "requests" && <RequestsPage currentAccount={currentAccount} employees={employees} requests={requests} setRequests={setRequests} projects={projects} />}
            {activePage === "attendance" && <AttendancePage currentAccount={currentAccount} />}
            {activePage === "payroll" && <PayrollPage currentAccount={currentAccount} employees={employees} projects={projects} />}
            {activePage === "projects" && <ProjectsPage currentAccount={currentAccount} projects={projects} setProjects={setProjects} employees={employees} />}
            {activePage === "files" && <ProjectFilesPage currentAccount={currentAccount} projects={projects} filesByProject={filesByProject} setFilesByProject={setFilesByProject} />}
            {activePage === "salaryTransfers" && <SalaryTransfersPage currentAccount={currentAccount} requests={requests} projects={projects} />}
            {activePage === "takleef" && <TakleefPage currentAccount={currentAccount} requests={requests} projects={projects} />}
            {activePage === "accounts" && <AccountsPage currentAccount={currentAccount} accounts={accounts} setAccounts={setAccounts} employees={employees} projects={projects} />}
            {activePage === "reports" && <ReportsPage currentAccount={currentAccount} />}
            {activePage === "settings" && <SettingsPage currentAccount={currentAccount} portalLocked={portalLocked} setPortalLocked={setPortalLocked} />}
            {activePage === "profile" && <ProfilePage currentAccount={currentAccount} employees={employees} projects={projects} />}
            {activePage === "myLeave" && <MyLeavePage currentAccount={currentAccount} employees={employees} projects={projects} />}
          </div>
        </main>
      </div>
    </>
  );
}

const styles = `
.login-options{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}.option{display:flex;flex-direction:column;gap:6px}.theme-switcher{display:flex;gap:8px}.theme-chip,.quick-chip{height:40px;border-radius:12px;border:1px solid #d7e0ea;background:#fff;color:#0f172a;padding:0 12px;font-size:13px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px}.theme-chip.active,.quick-chip.active{background:linear-gradient(135deg,#0c1630,#184c90);color:#fff;border-color:#184c90}.quick-controls{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.theme-dark .theme-chip,.theme-dark .quick-chip{background:rgba(10,20,40,.88);color:#eaf0ff;border-color:#223656}.theme-dark .theme-chip.active,.theme-dark .quick-chip.active{background:linear-gradient(135deg,#dbe7ff,#8fb8ff);color:#0f172a;border-color:#8fb8ff}
.theme-dark{--bg:#071120;--bg2:#0b1730;--line:#1c2b47;--text:#eaf0ff;--muted:#9fb1cf}.theme-dark .glass-card,.theme-dark .login-panel,.theme-dark .mini-stat,.theme-dark .approval-card,.theme-dark .attendance-table-wrap,.theme-dark .project-tab,.theme-dark .summary-box,.theme-dark .contact-pill,.theme-dark .search-box,.theme-dark .field input,.theme-dark .field select,.theme-dark .field textarea,.theme-dark .upload-btn,.theme-dark .demo-box{background:rgba(10,20,40,.88);color:#eaf0ff;border-color:#223656}.theme-dark .section-title p,.theme-dark .page-sub,.theme-dark .sub,.theme-dark .mini-stat-label,.theme-dark .login-head p,.theme-dark .summary-box,.theme-dark .upload-note{color:#9fb1cf}.theme-dark .topbar,.theme-dark .hero-card,.theme-dark .section-hero{background:linear-gradient(135deg,rgba(8,18,35,.94),rgba(12,31,62,.88));border-color:#223656}.theme-dark .nav-btn.active{background:#dbe7ff;color:#0f172a}.theme-dark .btn.secondary{background:rgba(10,20,40,.88);color:#eaf0ff;border-color:#223656}
:root{--bg:#edf2f7;--bg2:#f7f9fc;--line:#e5ecf4;--text:#0c1628;--muted:#66758b;font-family:Inter,Arial,sans-serif}
*{box-sizing:border-box}html,body,#root{margin:0;min-height:100%;background:linear-gradient(180deg,var(--bg),var(--bg2))}body{margin:0;color:var(--text)}button,input,select,textarea,a{font:inherit}a{color:#184c90;text-decoration:none}
.btn{height:40px;border:none;border-radius:12px;padding:0 14px;display:inline-flex;align-items:center;justify-content:center;gap:7px;font-size:13px;font-weight:700;cursor:pointer}.btn.primary{background:linear-gradient(135deg,#0c1630,#184c90);color:#fff}.btn.secondary{background:#fff;color:#0f172a;border:1px solid #dce4ef}.btn.ghost{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.16)}.btn.success{background:#ecfdf5;color:#047857;border:1px solid #a7f3d0}.btn.danger{background:#fef2f2;color:#b91c1c;border:1px solid #fecaca}.full{width:100%}
.brandmark{display:flex;align-items:center;justify-content:center}.brandmark-circle{width:56px;height:56px;border-radius:18px;background:linear-gradient(135deg,#08111f,#10274a,#184c90);display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 10px 26px rgba(15,23,42,.18),inset 0 1px 0 rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.12)}.brandmark-gas{font-size:18px;font-weight:900;letter-spacing:.04em;color:#fff;line-height:1}.brandmark-sub{font-size:9px;font-weight:800;letter-spacing:.18em;color:#dbeafe;margin-top:3px}
.eyebrow{font-size:12px;letter-spacing:.24em;text-transform:uppercase}.eyebrow.light{color:#cfe0fb}.eyebrow.dark{color:#718096}.strong{font-weight:800}.sub{color:#64748b;font-size:12px;margin-top:4px}
.glass-card{background:linear-gradient(180deg,rgba(255,255,255,.96),rgba(255,255,255,.84));border:1px solid rgba(229,236,244,.92);border-radius:24px;box-shadow:0 18px 40px rgba(15,23,42,.05);padding:22px}
.portal-loader-shell{position:relative;min-height:100vh;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at top left,#e9f1ff 0%,#f4f8ff 42%,#edf2f7 100%)}.portal-loader-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(15,23,42,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,.03) 1px,transparent 1px);background-size:36px 36px;mask-image:linear-gradient(180deg,rgba(0,0,0,.55),transparent)}.portal-loader-orb{position:absolute;border-radius:999px;filter:blur(50px);opacity:.55}.portal-loader-orb.orb-a{width:260px;height:260px;background:#93c5fd;top:8%;left:10%}.portal-loader-orb.orb-b{width:300px;height:300px;background:#bfdbfe;right:8%;bottom:10%}.portal-loader-card{position:relative;z-index:1;width:min(560px,calc(100vw - 32px));padding:28px 28px 24px;border-radius:32px;border:1px solid rgba(226,232,240,.95);background:linear-gradient(180deg,rgba(255,255,255,.96),rgba(255,255,255,.9));box-shadow:0 32px 80px rgba(15,23,42,.10),0 8px 24px rgba(15,23,42,.06);backdrop-filter:blur(14px)}.portal-loader-brand{display:flex;align-items:center;gap:14px}.portal-loader-kicker{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#64748b;font-weight:800}.portal-loader-label{font-size:18px;font-weight:900;color:#0f172a;margin-top:4px}.portal-loader-divider{height:1px;background:linear-gradient(90deg,rgba(148,163,184,.05),rgba(148,163,184,.35),rgba(148,163,184,.05));margin:18px 0}.portal-loader-content{display:grid;gap:10px}.portal-loader-status-row{display:flex;align-items:center;gap:8px}.portal-loader-dot{width:10px;height:10px;border-radius:999px;display:inline-block}.portal-loader-dot.loading{background:#2563eb;box-shadow:0 0 0 6px rgba(37,99,235,.12)}.portal-loader-dot.restricted{background:#f59e0b;box-shadow:0 0 0 6px rgba(245,158,11,.14)}.portal-loader-status-text{font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#64748b}.portal-loader-title{font-size:34px;line-height:1.02;font-weight:900;color:#0f172a}.portal-loader-sub{font-size:15px;line-height:1.7;color:#5b6b81;max-width:460px}.portal-loader-progress{margin-top:18px;height:10px;border-radius:999px;background:#e8eef6;overflow:hidden;position:relative}.portal-loader-progress span{display:block;height:100%;width:38%;border-radius:999px;background:linear-gradient(90deg,#0f172a,#184c90,#60a5fa);animation:portalSlide 1.35s ease-in-out infinite}.portal-loader-actions{display:flex;justify-content:flex-start;margin-top:18px}@keyframes portalSlide{0%{transform:translateX(-120%)}100%{transform:translateX(320%)}}
.login-page{min-height:100vh;padding:24px;background:linear-gradient(135deg,#eaf0f7,#f7faff,#dce8fb)}.login-shell{max-width:1460px;min-height:calc(100vh - 48px);margin:0 auto;display:grid;grid-template-columns:1.02fr .98fr;background:rgba(255,255,255,.74);border:1px solid rgba(255,255,255,.56);border-radius:34px;overflow:hidden}.login-left{position:relative;padding:40px;background:linear-gradient(145deg,#071120 0%,#0a1c37 38%,#123d74 100%);color:#fff;display:flex;flex-direction:column}.aurora{position:absolute;border-radius:999px;filter:blur(24px);opacity:.48}.aurora.one{width:240px;height:240px;background:#2563eb;top:-80px;left:-40px}.aurora.two{width:260px;height:260px;background:#1d4ed8;right:-70px;top:30px}.aurora.three{width:220px;height:220px;background:#38bdf8;bottom:-100px;left:24%}.login-brand-row{display:flex;align-items:center;gap:14px;position:relative;z-index:2}.login-brand-title{font-size:26px;font-weight:800;margin-top:8px}.login-copy{max-width:700px;margin-top:68px;position:relative;z-index:2}.login-copy h1{margin:0 0 16px;font-size:40px;line-height:1.08;font-weight:900}.login-copy p{margin:0;max-width:640px;font-size:15px;line-height:1.85;color:#d5e3f8}.login-right{display:flex;align-items:center;justify-content:center;padding:30px}.login-panel{width:100%;max-width:500px;background:rgba(255,255,255,.96);border:1px solid #e2e8f0;border-radius:28px;padding:30px}.login-head{display:flex;align-items:center;gap:14px;margin-bottom:22px}.login-head h2{margin:0;font-size:30px;font-weight:900}.login-head p{margin:6px 0 0;color:#64748b;font-size:13px}.field{display:flex;flex-direction:column;gap:7px;margin-bottom:14px}.field label{font-size:12px;font-weight:700;color:#334155}.field input,.field select,.field textarea,.search-box input{width:100%;border:1px solid #d7e0ea;border-radius:14px;background:#fff;color:#0f172a;outline:none}.field input,.field select,.search-box input{height:42px;padding:0 13px}.field textarea{min-height:106px;padding:13px;resize:vertical}.demo-box{margin-top:18px;border-radius:18px;border:1px solid #e5ebf3;background:#f8fbff;padding:16px;color:#475569;font-size:13px}.demo-title{font-weight:800;margin-bottom:10px}.error-box{background:#fef2f2;border:1px solid #fecaca;color:#b91c1c;padding:11px 13px;border-radius:14px;margin-bottom:14px;font-size:13px}
.app-shell{min-height:100vh;display:grid;grid-template-columns:278px 1fr;background:linear-gradient(180deg,var(--bg),var(--bg2))}.sidebar{padding:18px;background:linear-gradient(180deg,#041024 0%,#081938 40%,#0b2a58 100%);color:#fff;display:flex;flex-direction:column;gap:16px}.sidebar-userhead{padding:8px 6px 2px}.sidebar-user-name{font-size:18px;font-weight:900;color:#fff}.sidebar-user-role{font-size:12px;color:#cdd8ea;margin-top:6px}.nav-list{display:flex;flex-direction:column;gap:7px}.nav-btn{height:42px;border:none;border-radius:14px;background:transparent;color:#e7eefc;display:flex;align-items:center;gap:10px;padding:0 13px;font-weight:700;cursor:pointer;text-align:left;font-size:13px}.nav-btn.active{background:#fff;color:#0f172a}.sidebar-projects{margin-top:8px}.sidebar-chip{padding:9px 11px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#e5eefc;margin-top:7px;font-size:12px}.main-shell{padding:16px}.topbar{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:16px}.page-title{margin:5px 0 0;font-size:26px;line-height:1.1;max-width:520px}.page-sub{margin:7px 0 0;color:#64748b;font-size:14px}.topbar-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.search-box{min-width:280px;height:40px;border-radius:12px;border:1px solid #d7e0ea;background:#fff;padding:0 12px;display:flex;align-items:center;gap:8px}.search-box input{border:none;background:transparent;padding:0}.content-stack,.page-stack{display:flex;flex-direction:column;gap:16px}.menu-btn{display:none;width:40px;height:40px;border-radius:12px;border:1px solid #dce4ee;background:#fff;margin-bottom:8px;align-items:center;justify-content:center;cursor:pointer}
.hero-card,.section-hero{display:grid;grid-template-columns:1.1fr .9fr;gap:16px;align-items:end;background:linear-gradient(135deg,#f9fbff,#f6f9fe);border:1px solid #e6edf5}.hero-card h2,.section-hero h2{margin:8px 0 6px;font-size:28px;line-height:1.08}.hero-card p,.section-hero p{margin:0;max-width:760px;font-size:14px;line-height:1.8;color:#6a7a90}.hero-actions{display:flex;gap:8px;margin-top:14px}.hero-mini-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.mini-stat{display:flex;gap:10px;align-items:center;padding:12px;border-radius:16px;background:#fff;border:1px solid #e6edf5}.mini-stat-icon{width:30px;height:30px;border-radius:10px;display:grid;place-items:center;background:#0f172a;color:#fff}.mini-stat-label{font-size:11px;color:#66758b}.mini-stat-value{font-size:18px;font-weight:900}
.kpi-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.kpi-card{padding:16px}.kpi-top{display:flex}.kpi-icon{width:34px;height:34px;border-radius:12px;display:grid;place-items:center;background:#0f172a;color:#fff}.kpi-label{margin-top:12px;color:#64748b;font-size:12px}.kpi-value{margin-top:5px;font-size:24px;font-weight:900}
.section-title{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap;margin-bottom:16px}.section-title h3{margin:0;font-size:20px}.section-title p{margin:5px 0 0;color:#64748b;line-height:1.7;font-size:13px}.two-col{display:grid;grid-template-columns:1.12fr .88fr;gap:16px}.form-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.full-span{grid-column:1/-1}.summary-box{padding:14px;border-radius:16px;background:#f8fbff;border:1px solid #e6edf5;color:#475569;line-height:1.7;margin-bottom:14px;font-size:13px}.summary-title{font-weight:900;color:#0f172a;margin-bottom:6px}.project-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.project-tab{padding:12px;border-radius:16px;border:1px solid #e6edf5;background:#fff;cursor:pointer;text-align:left}.project-tab.active{background:linear-gradient(135deg,#0f172a,#173d72);color:#fff;border-color:#173d72}.project-tab.active .sub,.project-tab.active .strong{color:#fff}.contact-row{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 14px}.contact-pill{display:inline-flex;align-items:center;gap:8px;padding:8px 11px;border-radius:999px;background:#f8fbff;border:1px solid #e6edf5;color:#334155;font-size:12px}.approval-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.approval-card{padding:14px;border-radius:18px;border:1px solid #e6edf5;background:#fff}.approval-top{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}.approval-top h4{margin:0;font-size:16px}.approval-top p{margin:5px 0 0;color:#64748b;font-size:12px}.approval-body{margin-top:12px;display:grid;gap:8px;color:#334155;font-size:13px}.approval-actions{display:flex;gap:8px;margin-top:12px}.empty-box{padding:22px;border-radius:16px;background:#f8fbff;border:1px dashed #cbd5e1;color:#64748b;text-align:center;font-size:13px}.inline-actions{display:flex;gap:8px;flex-wrap:wrap}.upload-box{display:flex;align-items:center;gap:14px;flex-wrap:wrap}.upload-btn{display:inline-flex;align-items:center;gap:8px;padding:11px 14px;border-radius:12px;border:1px solid #dce4ef;background:#fff;cursor:pointer;font-size:13px;font-weight:700}.upload-note{font-size:13px;color:#64748b}.table-wrap{overflow:auto}.attendance-table-wrap{overflow:auto;border:1px solid var(--line);border-radius:18px;background:#fff}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:14px 12px;border-bottom:1px solid #edf2f7;font-size:13px;vertical-align:middle}th{color:#64748b;font-weight:800;white-space:nowrap}.attendance-table th,.attendance-table td{min-width:70px;text-align:center;padding:10px 8px}.attendance-table .sticky-col{position:sticky;left:0;background:#fff;z-index:2;text-align:left;min-width:180px}.attendance-table .employee-col{font-weight:800}.attendance-table .weekend-head{background:#9fc5e8;color:#0f172a}.attendance-cell.weekend{background:#9fc5e8}.attendance-cell.single{background:#f6b26b}.attendance-cell.absent{color:#b91c1c;font-weight:800}.attendance-cell.leave{color:#1d4ed8;font-weight:800}.attendance-cell.hours{font-weight:700}.warning-box{padding:12px 14px;border-radius:14px;background:#fffbeb;border:1px solid #fde68a;color:#92400e;font-size:13px;margin-bottom:14px}.permissions-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:14px}.permission-pill{display:flex;align-items:center;gap:8px;padding:10px 12px;border:1px solid #e6edf5;border-radius:12px;background:#fff;font-size:12px}
.status-badge{display:inline-flex;align-items:center;padding:5px 9px;border-radius:999px;font-size:10px;font-weight:800;border:1px solid transparent}.status-badge.success{background:#ecfdf5;color:#047857;border-color:#a7f3d0}.status-badge.warning{background:#fffbeb;color:#b45309;border-color:#fde68a}.status-badge.danger{background:#fef2f2;color:#b91c1c;border-color:#fecaca}.status-badge.info{background:#eff6ff;color:#1d4ed8;border-color:#bfdbfe}.status-badge.neutral{background:#f8fafc;color:#475569;border-color:#e2e8f0}
@media (max-width:1200px){.kpi-grid,.two-col,.section-hero,.hero-card{grid-template-columns:1fr}.page-title{max-width:100%}.hero-mini-grid,.permissions-grid,.project-tabs{grid-template-columns:repeat(2,1fr)}}
@media (max-width:960px){.app-shell{grid-template-columns:1fr}.sidebar{position:fixed;left:0;top:0;bottom:0;width:290px;z-index:100;transform:translateX(-100%)}.sidebar.mobile-open{transform:translateX(0)}.menu-btn{display:inline-flex}.topbar{flex-direction:column}.topbar-actions{width:100%}.search-box{min-width:100%}.form-grid,.hero-mini-grid,.permissions-grid,.project-tabs,.kpi-grid{grid-template-columns:1fr}.page-title{font-size:24px}.login-copy h1{font-size:34px}}
@media (max-width:640px){.login-page,.main-shell{padding:12px}.glass-card,.login-panel,.login-left{padding:16px}.kpi-grid,.permissions-grid,.project-tabs{grid-template-columns:1fr}.page-title{font-size:22px}.hero-card h2,.section-hero h2{font-size:24px}.login-copy h1{font-size:26px}}
`;
