// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
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
  ShieldCheck,
  Activity,
  Clock3,
  Fingerprint,
  CircleDollarSign,
  Settings2,
  CalendarCheck2,
  FileSpreadsheet,
  CalendarRange,
  ContactRound,
  ReceiptText,
  Upload,
} from "lucide-react";

const users = {
  hrmanager: { password: "123456", name: "Walid Khalaf Alshammari", role: "HR Manager" },
  walid: { password: "123456", name: "Walid Khalaf", role: "HR Admin" },
  sara: { password: "123456", name: "Sara Ali", role: "HR Assistant" },
};

const initialProjects = [
  { id: "qatif", name: "Qatif Project", code: "QAT-01", manager: "Mohammed Al Qahtani", phone: "+966 55 222 3344", email: "qatif.manager@gas.com", status: "Active" },
  { id: "qassim", name: "Qassim Project", code: "QAS-02", manager: "Saeed Al Mutairi", phone: "+966 54 777 1200", email: "qassim.manager@gas.com", status: "Active" },
  { id: "zuluf", name: "Zuluf Project", code: "ZUL-03", manager: "Nasser Al Otaibi", phone: "+966 50 841 7701", email: "zuluf.manager@gas.com", status: "Active" },
  { id: "jubail", name: "Jubail Project", code: "JUB-04", manager: "Adel Ibrahim", phone: "+966 53 990 8431", email: "jubail.manager@gas.com", status: "Review" },
];

const initialEmployees = [
  { id: 1, name: "Ahmed Salem", employeeId: "GAS-2038", role: "Store Worker", projectId: "qatif", nationality: "Saudi", annualBalance: 30, usedLeave: 9, permissionsUsed: 3, status: "Active", manager: "Mohammed Al Qahtani" },
  { id: 2, name: "Muteb Al Bishi", employeeId: "GAS-2036", role: "Store Worker", projectId: "qatif", nationality: "Saudi", annualBalance: 30, usedLeave: 4, permissionsUsed: 1, status: "Active", manager: "Mohammed Al Qahtani" },
  { id: 3, name: "Faisal Al Harbi", employeeId: "GAS-2194", role: "Site Administrator", projectId: "zuluf", nationality: "Saudi", annualBalance: 35, usedLeave: 12, permissionsUsed: 6, status: "On Leave", manager: "Nasser Al Otaibi" },
  { id: 4, name: "Rashid Al Qahtani", employeeId: "GAS-2210", role: "Coordinator", projectId: "qassim", nationality: "Saudi", annualBalance: 30, usedLeave: 7, permissionsUsed: 2, status: "Active", manager: "Saeed Al Mutairi" },
  { id: 5, name: "Mahmoud Adel", employeeId: "GAS-2288", role: "Timekeeper", projectId: "jubail", nationality: "Egyptian", annualBalance: 30, usedLeave: 17, permissionsUsed: 5, status: "Pending Review", manager: "Adel Ibrahim" },
  { id: 6, name: "Waleed Nasser", employeeId: "GAS-2350", role: "HR Coordinator", projectId: "qassim", nationality: "Saudi", annualBalance: 30, usedLeave: 2, permissionsUsed: 1, status: "Active", manager: "Saeed Al Mutairi" },
];

const initialRequests = [
  { id: 1, employeeId: 3, employee: "Faisal Al Harbi", type: "Annual Leave", projectId: "zuluf", days: 5, status: "Pending", date: "2026-04-09", note: "Family travel" },
  { id: 2, employeeId: 4, employee: "Rashid Al Qahtani", type: "Permission", projectId: "qassim", days: 1, status: "Approved", date: "2026-04-08", note: "Medical appointment" },
  { id: 3, employeeId: 1, employee: "Ahmed Salem", type: "Takleef", projectId: "qatif", days: 2, status: "In Review", date: "2026-04-11", note: "Night shift assignment" },
  { id: 4, employeeId: 2, employee: "Muteb Al Bishi", type: "Annual Leave", projectId: "qatif", days: 3, status: "Pending", date: "2026-04-12", note: "Personal leave" },
];

const initialFiles = { qatif: [], qassim: [], zuluf: [], jubail: [] };

const sidebarItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "employees", label: "Employees", icon: Users },
  { key: "leaveBalances", label: "Leave Balances", icon: Wallet },
  { key: "approvals", label: "Approvals", icon: BadgeCheck },
  { key: "requests", label: "Leaves & Takleef", icon: Plane },
  { key: "attendance", label: "Attendance", icon: Fingerprint },
  { key: "payroll", label: "Payroll", icon: CircleDollarSign },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "files", label: "Project Files", icon: FolderOpen },
  { key: "reports", label: "Reports", icon: FileText },
  { key: "settings", label: "Settings", icon: Settings2 },
];

function projectName(projects, id) {
  return projects.find((p) => p.id === id)?.name || "Unknown Project";
}

function StatusBadge({ status }) {
  const cls = {
    Active: "success",
    Approved: "success",
    Pending: "warning",
    "On Leave": "warning",
    Rejected: "danger",
    "Pending Review": "danger",
    "In Review": "info",
    Review: "info",
  }[status] || "neutral";
  return <span className={`status-badge ${cls}`}>{status}</span>;
}

function BrandMark({ small = false }) {
  return (
    <div className={`brand-mark ${small ? "small" : ""}`}>
      <div className="brand-inner">
        <div className="brand-main">GAS</div>
        <div className="brand-sub">HR PROJECT</div>
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
      {action ? <div className="section-action">{action}</div> : null}
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

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("hrmanager");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const submit = () => {
    const found = users[username];
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
            <h1>Professional HR platform for projects, employees and approvals.</h1>
            <p>Premium workspace for leave balances, approvals, payroll preparation, attendance review, project files and structured HR operations.</p>
          </div>
        </div>
        <div className="login-right">
          <div className="login-panel">
            <div className="login-head">
              <BrandMark small />
              <div>
                <h2>Sign In</h2>
                <p>Secure access to the HR operating system</p>
              </div>
            </div>
            <div className="field"><label>Username</label><input value={username} onChange={(e) => setUsername(e.target.value)} /></div>
            <div className="field"><label>Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            {error ? <div className="error-box">{error}</div> : null}
            <button className="btn primary full" onClick={submit}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPage({ employees, projects, requests, setActivePage }) {
  const totalRemaining = useMemo(() => employees.reduce((sum, emp) => sum + Math.max(emp.annualBalance - emp.usedLeave, 0), 0), [employees]);
  const pendingApprovals = requests.filter((r) => r.status === "Pending" || r.status === "In Review").length;
  const kpis = [
    { label: "Employees", value: employees.length, icon: Users },
    { label: "Projects", value: projects.length, icon: Building2 },
    { label: "Pending", value: pendingApprovals, icon: ClipboardCheck },
    { label: "Remaining Leave", value: totalRemaining, icon: Wallet },
  ];
  return (
    <div className="page-stack">
      <GlassCard className="hero-card">
        <div>
          <div className="eyebrow dark">Human resources dashboard</div>
          <h2>Executive HR Dashboard</h2>
          <p>Premium overview for approvals, balances, projects and employee activity.</p>
          <div className="hero-actions">
            <button className="btn primary" onClick={() => setActivePage("approvals")}><BadgeCheck size={14} /> Approvals</button>
            <button className="btn secondary" onClick={() => setActivePage("employees")}><Users size={14} /> Employees</button>
          </div>
        </div>
        <div className="hero-mini-grid">
          <div className="mini-stat"><div className="mini-stat-icon"><Activity size={14} /></div><div><div className="mini-stat-label">Active</div><div className="mini-stat-value">{employees.filter((e) => e.status === "Active").length}</div></div></div>
          <div className="mini-stat"><div className="mini-stat-icon"><Clock3 size={14} /></div><div><div className="mini-stat-label">On Leave</div><div className="mini-stat-value">{employees.filter((e) => e.status === "On Leave").length}</div></div></div>
          <div className="mini-stat"><div className="mini-stat-icon"><AlertTriangle size={14} /></div><div><div className="mini-stat-label">Pending</div><div className="mini-stat-value">{pendingApprovals}</div></div></div>
          <div className="mini-stat"><div className="mini-stat-icon"><FolderKanban size={14} /></div><div><div className="mini-stat-label">Projects</div><div className="mini-stat-value">{projects.length}</div></div></div>
        </div>
      </GlassCard>
      <div className="kpi-grid">
        {kpis.map((item) => {
          const Icon = item.icon;
          return <GlassCard key={item.label} className="kpi-card"><div className="kpi-top"><div className="kpi-icon"><Icon size={14} /></div></div><div className="kpi-label">{item.label}</div><div className="kpi-value">{item.value}</div></GlassCard>;
        })}
      </div>
      <div className="dashboard-grid-a">
        <GlassCard>
          <SectionTitle title="HR Modules" description="Core sections used by HR teams." />
          <div className="module-grid">
            <button className="module-card" onClick={() => setActivePage("employees")}><Users size={16} /><span>Employees</span></button>
            <button className="module-card" onClick={() => setActivePage("leaveBalances")}><CalendarCheck2 size={16} /><span>Leave Balances</span></button>
            <button className="module-card" onClick={() => setActivePage("attendance")}><Fingerprint size={16} /><span>Attendance</span></button>
            <button className="module-card" onClick={() => setActivePage("payroll")}><CircleDollarSign size={16} /><span>Payroll</span></button>
            <button className="module-card" onClick={() => setActivePage("projects")}><FolderKanban size={16} /><span>Projects</span></button>
            <button className="module-card" onClick={() => setActivePage("files")}><FolderOpen size={16} /><span>Project Files</span></button>
          </div>
        </GlassCard>
        <GlassCard>
          <SectionTitle title="Quick Metrics" description="Operational visibility for today." />
          <div className="metric-list">
            <div className="metric-row"><span>Employees tracked</span><strong>{employees.length}</strong></div>
            <div className="metric-row"><span>Leave impact</span><strong>{employees.filter((e) => e.usedLeave > 0).length}</strong></div>
            <div className="metric-row"><span>Projects covered</span><strong>{projects.length}</strong></div>
            <div className="metric-row"><span>Ready for review</span><strong>{employees.filter((e) => e.status !== "Pending Review").length}</strong></div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function SimpleTablePage({ title, subtitle, headers, rows, children, exportName, sheetName }) {
  const exportRows = [headers, ...rows];
  return (
    <div className="page-stack">
      <GlassCard className="section-hero"><div><div className="eyebrow dark">{subtitle}</div><h2>{title}</h2></div></GlassCard>
      {children}
      <GlassCard>
        <SectionTitle title={title + " Table"} description="Export-ready section." action={<ExportButtons rows={exportRows} fileName={exportName} sheetName={sheetName} />} />
        <div className="table-wrap premium-table">
          <table>
            <thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

function EmployeesPage({ employees, setEmployees, projects }) {
  const [form, setForm] = useState({ name: "", employeeId: "", role: "", projectId: projects[0]?.id || "", nationality: "Saudi", annualBalance: 30, usedLeave: 0, status: "Active" });
  const rows = employees.map((emp) => [emp.name, emp.employeeId, projectName(projects, emp.projectId), emp.manager, `${Math.max(emp.annualBalance - emp.usedLeave, 0)} days`, emp.status]);
  const addEmployee = () => {
    if (!form.name || !form.employeeId || !form.role) return;
    const project = projects.find((p) => p.id === form.projectId);
    setEmployees((prev) => [...prev, { id: Date.now(), ...form, permissionsUsed: 0, manager: project?.manager || "" }]);
    setForm({ name: "", employeeId: "", role: "", projectId: projects[0]?.id || "", nationality: "Saudi", annualBalance: 30, usedLeave: 0, status: "Active" });
  };
  return (
    <SimpleTablePage title="Employees" subtitle="Employee administration" headers={["Name", "ID", "Project", "Manager", "Balance", "Status"]} rows={rows} exportName="employees.xlsx" sheetName="Employees">
      <GlassCard>
        <SectionTitle title="Add Employee" description="Create a new employee and assign them to a specific project." />
        <div className="form-grid">
          <div className="field"><label>Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="field"><label>Employee ID</label><input value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} /></div>
          <div className="field"><label>Role</label><input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
          <div className="field"><label>Project</label><select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })}>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
          <div className="field"><label>Nationality</label><input value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} /></div>
          <div className="field"><label>Status</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Active</option><option>On Leave</option><option>Pending Review</option></select></div>
          <div className="field"><label>Annual Leave</label><input type="number" value={form.annualBalance} onChange={(e) => setForm({ ...form, annualBalance: Number(e.target.value) })} /></div>
          <div className="field"><label>Used Leave</label><input type="number" value={form.usedLeave} onChange={(e) => setForm({ ...form, usedLeave: Number(e.target.value) })} /></div>
        </div>
        <button className="btn primary full" onClick={addEmployee}><UserPlus size={14} /> Save Employee</button>
      </GlassCard>
    </SimpleTablePage>
  );
}

function LeaveBalancesPage({ employees, setEmployees, projects }) {
  const [selectedId, setSelectedId] = useState(String(employees[0]?.id || ""));
  const [annualBalance, setAnnualBalance] = useState(employees[0]?.annualBalance || 30);
  const [usedLeave, setUsedLeave] = useState(employees[0]?.usedLeave || 0);
  const rows = employees.map((emp) => [emp.name, projectName(projects, emp.projectId), emp.annualBalance, emp.usedLeave, Math.max(emp.annualBalance - emp.usedLeave, 0)]);
  const selectedEmployee = employees.find((e) => String(e.id) === selectedId);
  useEffect(() => {
    if (selectedEmployee) {
      setAnnualBalance(selectedEmployee.annualBalance);
      setUsedLeave(selectedEmployee.usedLeave);
    }
  }, [selectedId]);
  const saveBalance = () => {
    setEmployees((prev) => prev.map((emp) => String(emp.id) === selectedId ? { ...emp, annualBalance: Number(annualBalance), usedLeave: Number(usedLeave) } : emp));
  };
  return (
    <SimpleTablePage title="Leave Balances" subtitle="Leave governance" headers={["Employee", "Project", "Annual Balance", "Used Leave", "Remaining"]} rows={rows} exportName="leave-balances.xlsx" sheetName="Leave Balances">
      <GlassCard>
        <SectionTitle title="Update Balance" description="Select any employee and update leave values directly." />
        <div className="field"><label>Employee</label><select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>{employees.map((emp) => <option key={emp.id} value={String(emp.id)}>{emp.name} - {projectName(projects, emp.projectId)}</option>)}</select></div>
        <div className="form-grid"><div className="field"><label>Annual Leave</label><input type="number" value={annualBalance} onChange={(e) => setAnnualBalance(Number(e.target.value))} /></div><div className="field"><label>Used Leave</label><input type="number" value={usedLeave} onChange={(e) => setUsedLeave(Number(e.target.value))} /></div></div>
        {selectedEmployee ? <div className="summary-box"><div className="summary-title">{selectedEmployee.name}</div><div>Remaining after save: {Math.max(annualBalance - usedLeave, 0)} days</div></div> : null}
        <button className="btn primary full" onClick={saveBalance}><Wallet size={14} /> Save Balance</button>
      </GlassCard>
    </SimpleTablePage>
  );
}

function ApprovalsPage({ requests, setRequests, employees, setEmployees, projects }) {
  const pending = requests.filter((r) => r.status === "Pending" || r.status === "In Review");
  const rows = requests.map((req) => [req.employee, req.type, projectName(projects, req.projectId), req.days, req.date, req.status]);
  const handleDecision = (requestId, nextStatus) => {
    const target = requests.find((r) => r.id === requestId);
    if (!target) return;
    setRequests((prev) => prev.map((req) => req.id === requestId ? { ...req, status: nextStatus } : req));
    if (nextStatus === "Approved" && target.type === "Annual Leave") {
      setEmployees((prev) => prev.map((emp) => emp.id === target.employeeId ? { ...emp, usedLeave: emp.usedLeave + Number(target.days), status: "On Leave" } : emp));
    }
  };
  return (
    <SimpleTablePage title="Approvals" subtitle="Approval workflow" headers={["Employee", "Type", "Project", "Days", "Date", "Status"]} rows={rows} exportName="approvals.xlsx" sheetName="Approvals">
      <GlassCard>
        <SectionTitle title="Approval Workspace" description="Review annual leave, permissions and takleef requests." />
        <div className="approval-grid">
          {pending.length === 0 ? <div className="empty-box">No pending approvals right now.</div> : pending.map((req) => {
            const emp = employees.find((e) => e.id === req.employeeId);
            return <div className="approval-card" key={req.id}><div className="approval-top"><div><h4>{req.employee}</h4><p>{req.type} • {projectName(projects, req.projectId)}</p></div><StatusBadge status={req.status} /></div><div className="approval-body"><div><strong>Days:</strong> {req.days}</div><div><strong>Date:</strong> {req.date}</div><div><strong>Note:</strong> {req.note}</div>{emp ? <div><strong>Current balance:</strong> {Math.max(emp.annualBalance - emp.usedLeave, 0)} days</div> : null}</div><div className="approval-actions"><button className="btn success" onClick={() => handleDecision(req.id, "Approved")}><CheckCircle2 size={14} /> Approve</button><button className="btn danger" onClick={() => handleDecision(req.id, "Rejected")}><XCircle size={14} /> Reject</button></div></div>;
          })}
        </div>
      </GlassCard>
    </SimpleTablePage>
  );
}

function RequestsPage({ employees, requests, setRequests, projects }) {
  const [form, setForm] = useState({ employeeId: String(employees[0]?.id || ""), type: "Annual Leave", days: 1, note: "" });
  const rows = requests.map((req) => [req.employee, req.type, projectName(projects, req.projectId), req.days, req.date, req.status]);
  const createRequest = () => {
    const emp = employees.find((e) => String(e.id) === form.employeeId);
    if (!emp) return;
    setRequests((prev) => [{ id: Date.now(), employeeId: emp.id, employee: emp.name, type: form.type, projectId: emp.projectId, days: Number(form.days), status: "Pending", date: new Date().toISOString().slice(0, 10), note: form.note }, ...prev]);
    setForm({ employeeId: String(employees[0]?.id || ""), type: "Annual Leave", days: 1, note: "" });
  };
  return (
    <SimpleTablePage title="Leaves & Takleef" subtitle="Request management" headers={["Employee", "Type", "Project", "Days", "Date", "Status"]} rows={rows} exportName="requests.xlsx" sheetName="Requests">
      <GlassCard>
        <SectionTitle title="Submit Request" description="Create annual leave, permission or takleef requests for employees." />
        <div className="form-grid"><div className="field"><label>Employee</label><select value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })}>{employees.map((emp) => <option key={emp.id} value={String(emp.id)}>{emp.name} - {projectName(projects, emp.projectId)}</option>)}</select></div><div className="field"><label>Type</label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>Annual Leave</option><option>Permission</option><option>Takleef</option></select></div><div className="field"><label>Days</label><input type="number" value={form.days} onChange={(e) => setForm({ ...form, days: Number(e.target.value) })} /></div><div className="field full-span"><label>Note</label><textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></div></div>
        <button className="btn primary full" onClick={createRequest}><Plus size={14} /> Create Request</button>
      </GlassCard>
    </SimpleTablePage>
  );
}

function buildAttendanceState(records) {
  if (!records || !records.length) return { days: [], rows: [] };
  const parseHours = (value) => {
    if (!value) return 0;
    const parts = String(value).split(":").map(Number);
    if (parts.length < 2 || Number.isNaN(parts[0])) return 0;
    return Math.round((parts[0] + (parts[1] || 0) / 60) * 100) / 100;
  };
  const normalizeDate = (value) => {
    if (!value) return null;
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d;
    return null;
  };
  const grouped = {};
  const uniqueDates = {};
  records.forEach((row) => {
    const name = String(row.Name || row["Name"] || row.Employee || "Unknown Employee").trim();
    const date = normalizeDate(row.Date || row["Date"]);
    if (!date) return;
    const key = date.toISOString().slice(0, 10);
    uniqueDates[key] = date;
    if (!grouped[name]) grouped[name] = { name, byDay: {}, totalHours: 0, absentCount: 0, singlePunchCount: 0 };
    const exception = String(row.Exception || "").trim();
    const totalHours = parseHours(row["Total Work Hours"] || row["Regular hours"] || row["Regular Hours"]);
    const inTime = String(row.In || "").trim();
    const outTime = String(row.Out || "").trim();
    const leave = String(row.Leave || "").trim();
    let cell = { value: "", type: "normal", rawHours: totalHours };
    if (leave && leave !== "--") {
      cell = { value: leave, type: "leave", rawHours: 0 };
    } else if (/absence/i.test(exception)) {
      cell = { value: "A", type: "absent", rawHours: 0 };
      grouped[name].absentCount += 1;
    } else if (/missing punch/i.test(exception) || (inTime && !outTime) || (!inTime && outTime)) {
      cell = { value: totalHours > 0 ? String(Math.round(totalHours)) : "", type: "single", rawHours: totalHours };
      grouped[name].singlePunchCount += 1;
      grouped[name].totalHours += totalHours;
    } else if (totalHours > 0) {
      cell = { value: String(Math.round(totalHours)), type: "hours", rawHours: totalHours };
      grouped[name].totalHours += totalHours;
    }
    grouped[name].byDay[key] = cell;
  });
  const days = Object.keys(uniqueDates).sort().map((key) => {
    const d = uniqueDates[key];
    return { key, label: `${d.getDate()}-${d.toLocaleString("en-US", { month: "short" })}`, weekend: d.getDay() === 5 || d.getDay() === 6 };
  });
  const rows = Object.values(grouped).map((emp) => {
    const cells = days.map((day) => {
      if (emp.byDay[day.key]) return emp.byDay[day.key];
      if (day.weekend) return { value: "", type: "weekend", rawHours: 0 };
      emp.absentCount += 1;
      return { value: "A", type: "absent", rawHours: 0 };
    });
    return { ...emp, cells };
  });
  return { days, rows };
}

function AttendancePage() {
  const [attendanceState, setAttendanceState] = useState({ days: [], rows: [] });
  const [fileName, setFileName] = useState("");
  const [monthName, setMonthName] = useState("Attendance Sheet");
  const totalEmployees = attendanceState.rows.length;
  const totalHours = attendanceState.rows.reduce((sum, row) => sum + row.totalHours, 0);
  const absentCount = attendanceState.rows.reduce((sum, row) => sum + row.absentCount, 0);
  const singlePunchCount = attendanceState.rows.reduce((sum, row) => sum + row.singlePunchCount, 0);
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
        if (parsed.days.length > 0) {
          const d = new Date(parsed.days[0].key);
          setMonthName(`${d.toLocaleString("en-US", { month: "long" })} Attendance`);
        }
      },
    });
  };
  const exportRows = [
    ["Employee", ...attendanceState.days.map((day) => day.label), "Total Hours", "Absent", "Single Punch"],
    ...attendanceState.rows.map((row) => [row.name, ...row.cells.map((cell) => cell.value), Number(row.totalHours.toFixed(2)), row.absentCount, row.singlePunchCount]),
  ];
  return (
    <div className="page-stack">
      <GlassCard className="section-hero">
        <div><div className="eyebrow dark">Attendance control</div><h2>Attendance</h2><p>Upload biometric CSV and generate a monthly Oracle-style attendance sheet with totals, absence and single punch highlighting.</p></div>
        <div className="hero-mini-grid">
          <div className="mini-stat"><div className="mini-stat-icon"><Users size={14} /></div><div><div className="mini-stat-label">Employees</div><div className="mini-stat-value">{totalEmployees}</div></div></div>
          <div className="mini-stat"><div className="mini-stat-icon"><Clock3 size={14} /></div><div><div className="mini-stat-label">Total Hours</div><div className="mini-stat-value">{Math.round(totalHours)}</div></div></div>
          <div className="mini-stat"><div className="mini-stat-icon"><AlertTriangle size={14} /></div><div><div className="mini-stat-label">Absent</div><div className="mini-stat-value">{absentCount}</div></div></div>
          <div className="mini-stat"><div className="mini-stat-icon"><Fingerprint size={14} /></div><div><div className="mini-stat-label">Single Punch</div><div className="mini-stat-value">{singlePunchCount}</div></div></div>
        </div>
      </GlassCard>
      <GlassCard>
        <SectionTitle title="Biometric Import" description="Upload the raw CSV exported from your attendance device." action={<ExportButtons rows={exportRows} fileName="attendance-sheet.xlsx" sheetName="Attendance" />} />
        <div className="upload-box"><label className="upload-btn"><Upload size={14} /> Upload CSV<input type="file" accept=".csv" hidden onChange={onFileUpload} /></label><div className="upload-note">{fileName || "No file uploaded yet"}</div></div>
      </GlassCard>
      <GlassCard>
        <SectionTitle title={monthName} description="Generated monthly attendance sheet ready for HR review and Excel download." />
        {attendanceState.rows.length === 0 ? <div className="empty-box">Upload the attendance CSV file to generate the monthly grid.</div> : (
          <div className="attendance-table-wrap">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th className="sticky-col">Employee</th>
                  {attendanceState.days.map((day) => <th key={day.key} className={day.weekend ? "weekend-head" : ""}>{day.label}</th>)}
                  <th>Total Hours</th>
                  <th>Absent</th>
                  <th>Single Punch</th>
                </tr>
              </thead>
              <tbody>
                {attendanceState.rows.map((row) => (
                  <tr key={row.name}>
                    <td className="sticky-col employee-col">{row.name}</td>
                    {row.cells.map((cell, i) => <td key={i} className={`attendance-cell ${cell.type}`}>{cell.value}</td>)}
                    <td>{Number(row.totalHours.toFixed(2))}</td>
                    <td>{row.absentCount}</td>
                    <td>{row.singlePunchCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

function PayrollPage({ employees, projects }) {
  const salaryRows = employees.map((emp, index) => ({ ...emp, basicSalary: 4200 + index * 250, housing: 1200, transport: 500, deductions: emp.usedLeave * 20, netSalary: 4200 + index * 250 + 1200 + 500 - emp.usedLeave * 20 }));
  const rows = salaryRows.map((row) => [row.name, projectName(projects, row.projectId), row.basicSalary, row.housing, row.transport, row.deductions, row.netSalary]);
  return <SimpleTablePage title="Payroll" subtitle="Payroll preparation" headers={["Employee", "Project", "Basic Salary", "Housing", "Transport", "Deductions", "Net Salary"]} rows={rows} exportName="payroll.xlsx" sheetName="Payroll" />;
}

function ProjectsPage({ projects, setProjects, employees }) {
  const [activeProject, setActiveProject] = useState(projects[0]?.id || "");
  const [manager, setManager] = useState(projects[0]?.manager || "");
  const [phone, setPhone] = useState(projects[0]?.phone || "");
  const [email, setEmail] = useState(projects[0]?.email || "");
  const project = projects.find((p) => p.id === activeProject);
  const projectEmployees = employees.filter((e) => e.projectId === activeProject);
  const rows = projectEmployees.map((emp) => [emp.name, emp.role, emp.employeeId, emp.status]);
  useEffect(() => {
    const found = projects.find((p) => p.id === activeProject);
    if (found) {
      setManager(found.manager);
      setPhone(found.phone);
      setEmail(found.email);
    }
  }, [activeProject, projects]);
  const saveProjectInfo = () => setProjects((prev) => prev.map((p) => p.id === activeProject ? { ...p, manager, phone, email } : p));
  return (
    <div className="page-stack">
      <GlassCard className="section-hero"><div><div className="eyebrow dark">Project ownership</div><h2>Projects</h2></div></GlassCard>
      <GlassCard><SectionTitle title="Project Structure" description="Each project has its own employees, manager and contact information." /><div className="project-tabs">{projects.map((item) => <button key={item.id} className={`project-tab ${activeProject === item.id ? "active" : ""}`} onClick={() => setActiveProject(item.id)}><div className="strong">{item.name}</div><div className="sub">{item.code}</div></button>)}</div></GlassCard>
      <div className="two-col">
        <GlassCard>
          <SectionTitle title={`${project?.name || ""} Manager`} description="Primary manager and contact details for this project." />
          <div className="form-grid"><div className="field"><label>Manager Name</label><input value={manager} onChange={(e) => setManager(e.target.value)} /></div><div className="field"><label>Phone Number</label><input value={phone} onChange={(e) => setPhone(e.target.value)} /></div><div className="field full-span"><label>Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} /></div></div>
          <div className="contact-row"><div className="contact-pill"><UserCog size={14} /> {manager}</div><div className="contact-pill"><Phone size={14} /> {phone}</div><div className="contact-pill"><Mail size={14} /> {email}</div></div>
          <button className="btn primary full" onClick={saveProjectInfo}>Save Project Contact</button>
        </GlassCard>
        <SimpleTablePage title="Project Employees" subtitle="Assigned workforce" headers={["Employee", "Role", "ID", "Status"]} rows={rows} exportName={`${project?.code || "project"}-employees.xlsx`} sheetName="Project Employees" />
      </div>
    </div>
  );
}

function ProjectFilesPage({ projects, filesByProject, setFilesByProject }) {
  const [activeProject, setActiveProject] = useState(projects[0]?.id || "");
  const [form, setForm] = useState({ category: "Leave", title: "", note: "" });
  const project = projects.find((p) => p.id === activeProject);
  const items = filesByProject[activeProject] || [];
  const rows = items.map((file) => [file.category, file.title, file.note, file.status]);
  const addFile = () => {
    if (!form.title) return;
    setFilesByProject((prev) => ({ ...prev, [activeProject]: [...(prev[activeProject] || []), { id: Date.now(), category: form.category, title: form.title, note: form.note, status: "Pending" }] }));
    setForm({ category: "Leave", title: "", note: "" });
  };
  return (
    <div className="page-stack">
      <GlassCard className="section-hero"><div><div className="eyebrow dark">Project documentation</div><h2>Project Files</h2></div></GlassCard>
      <div className="two-col">
        <GlassCard>
          <SectionTitle title="Project Files" description="Separate leave and task records for each project." />
          <div className="field"><label>Project</label><select value={activeProject} onChange={(e) => setActiveProject(e.target.value)}>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
          <div className="manager-lite"><strong>{project?.manager}</strong><span>{project?.phone}</span></div>
          <div className="form-grid"><div className="field"><label>Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>Leave</option><option>Takleef</option><option>Permission</option><option>Other</option></select></div><div className="field"><label>File Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div><div className="field full-span"><label>Note</label><textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></div></div>
          <button className="btn primary full" onClick={addFile}><FolderOpen size={14} /> Add File Record</button>
        </GlassCard>
        <SimpleTablePage title={`${project?.name || ""} Records`} subtitle="Project records" headers={["Category", "Title", "Note", "Status"]} rows={rows} exportName={`${project?.code || "project"}-files.xlsx`} sheetName="Project Files" />
      </div>
    </div>
  );
}

function ReportsPage() {
  return <SimpleTablePage title="Reports" subtitle="Reporting modules" headers={["Module"]} rows={[["Attendance report"], ["Leave report"], ["Payroll summary"], ["Project HR report"], ["Employee documents log"], ["Contract expiry report"]]} exportName="reports.xlsx" sheetName="Reports" />;
}

function SettingsPage() {
  return <SimpleTablePage title="Settings" subtitle="System control" headers={["Setting", "Description"]} rows={[["Company Profile", "Company name, HR title, contact details"], ["User Roles", "HR Manager, HR Admin, Assistant permissions"], ["Project Structure", "Project list, project manager and contact info"], ["Leave Rules", "Annual leave defaults and entitlement"], ["Attendance Rules", "Late arrival and punch controls"], ["Payroll Settings", "Payroll cycle and export fields"]]} exportName="settings.xlsx" sheetName="Settings" />;
}

export default function HRPortalRedesign() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [employees, setEmployees] = useState(initialEmployees);
  const [projects, setProjects] = useState(initialProjects);
  const [requests, setRequests] = useState(initialRequests);
  const [filesByProject, setFilesByProject] = useState(initialFiles);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth <= 960 : false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 960);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (!currentUser) return <><style>{styles}</style><LoginScreen onLogin={setCurrentUser} /></>;
  return (
    <>
      <style>{styles}</style>
      <div className="app-shell">
        <AnimatePresence>
          {(!isMobile || mobileSidebar) && (
            <div className={`sidebar ${isMobile ? "mobile-open" : ""}`}>
              <div className="sidebar-userhead">
                <div className="sidebar-user-name">{currentUser.name}</div>
                <div className="sidebar-user-role">{currentUser.role}</div>
              </div>
              <nav className="nav-list">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return <button key={item.key} className={`nav-btn ${activePage === item.key ? "active" : ""}`} onClick={() => { setActivePage(item.key); setMobileSidebar(false); }}><Icon size={16} /><span>{item.label}</span></button>;
                })}
              </nav>
              <div className="sidebar-projects">
                <div className="eyebrow light">Project Sections</div>
                {projects.map((p) => <div className="sidebar-chip" key={p.id}>{p.name}</div>)}
              </div>
              <button className="btn ghost full" onClick={() => setCurrentUser(null)}><LogOut size={14} /> Logout</button>
            </div>
          )}
        </AnimatePresence>
        <main className="main-shell">
          <GlassCard className="topbar">
            <div>
              <button className="menu-btn" onClick={() => setMobileSidebar((v) => !v)}><Menu size={16} /></button>
              <div className="eyebrow dark">Human Resources Platform</div>
              <h1 className="page-title">{sidebarItems.find((s) => s.key === activePage)?.label || "Dashboard"}</h1>
              <p className="page-sub">Signed in as {currentUser.name} ({currentUser.role})</p>
            </div>
            <div className="topbar-actions">
              <div className="search-box"><Search size={14} /><input placeholder="Search employees, projects, approvals..." /></div>
              <button className="btn secondary"><Bell size={14} /> Alerts</button>
              <button className="btn primary" onClick={() => setActivePage("requests")}><Plus size={14} /> New Request</button>
            </div>
          </GlassCard>
          <div className="content-stack">
            {activePage === "dashboard" && <DashboardPage employees={employees} projects={projects} requests={requests} setActivePage={setActivePage} />}
            {activePage === "employees" && <EmployeesPage employees={employees} setEmployees={setEmployees} projects={projects} />}
            {activePage === "leaveBalances" && <LeaveBalancesPage employees={employees} setEmployees={setEmployees} projects={projects} />}
            {activePage === "approvals" && <ApprovalsPage requests={requests} setRequests={setRequests} employees={employees} setEmployees={setEmployees} projects={projects} />}
            {activePage === "requests" && <RequestsPage employees={employees} requests={requests} setRequests={setRequests} projects={projects} />}
            {activePage === "attendance" && <AttendancePage />}
            {activePage === "payroll" && <PayrollPage employees={employees} projects={projects} />}
            {activePage === "projects" && <ProjectsPage projects={projects} setProjects={setProjects} employees={employees} />}
            {activePage === "files" && <ProjectFilesPage projects={projects} filesByProject={filesByProject} setFilesByProject={setFilesByProject} />}
            {activePage === "reports" && <ReportsPage />}
            {activePage === "settings" && <SettingsPage />}
          </div>
        </main>
      </div>
    </>
  );
}

const styles = `
:root{--bg:#edf2f7;--bg2:#f7f9fc;--line:#e5ecf4;--text:#0c1628;--muted:#66758b;--success:#059669;--warning:#d97706;--danger:#dc2626;--info:#2563eb;font-family:Inter,Arial,sans-serif}
*{box-sizing:border-box}html,body,#root{margin:0;min-height:100%;background:linear-gradient(180deg,var(--bg),var(--bg2))}body{margin:0;color:var(--text)}button,input,select,textarea{font:inherit}
.btn{height:40px;border:none;border-radius:12px;padding:0 14px;display:inline-flex;align-items:center;justify-content:center;gap:7px;font-size:13px;font-weight:700;cursor:pointer}.btn.primary{background:linear-gradient(135deg,#0c1630,#184c90);color:#fff}.btn.secondary{background:#fff;color:#0f172a;border:1px solid #dce4ef}.btn.ghost{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.16)}.btn.success{background:#ecfdf5;color:#047857;border:1px solid #a7f3d0}.btn.danger{background:#fef2f2;color:#b91c1c;border:1px solid #fecaca}.full{width:100%}
.brand-mark{height:54px;width:54px;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.16);background:#020617}.brand-mark.small{height:40px;width:40px;border-radius:14px}.brand-inner{width:100%;height:100%;display:grid;place-items:center;background:linear-gradient(135deg,#020617,#0e1c35,#12325f)}.brand-main{font-size:21px;font-weight:900;color:#fff}.brand-mark.small .brand-main{font-size:14px}.brand-sub{font-size:6px;letter-spacing:.22em;color:#dbeafe;text-align:center}
.eyebrow{font-size:12px;letter-spacing:.24em;text-transform:uppercase}.eyebrow.light{color:#cfe0fb}.eyebrow.dark{color:#718096}.strong{font-weight:800}.sub{color:#64748b;font-size:12px;margin-top:4px}
.glass-card{background:linear-gradient(180deg,rgba(255,255,255,.96),rgba(255,255,255,.84));border:1px solid rgba(229,236,244,.92);border-radius:24px;box-shadow:0 18px 40px rgba(15,23,42,.05);padding:22px}
.login-page{min-height:100vh;padding:24px;background:linear-gradient(135deg,#eaf0f7,#f7faff,#dce8fb)}.login-shell{max-width:1460px;min-height:calc(100vh - 48px);margin:0 auto;display:grid;grid-template-columns:1.02fr .98fr;background:rgba(255,255,255,.74);border:1px solid rgba(255,255,255,.56);border-radius:34px;overflow:hidden}.login-left{position:relative;padding:40px;background:linear-gradient(145deg,#071120 0%,#0a1c37 38%,#123d74 100%);color:#fff;display:flex;flex-direction:column}.aurora{position:absolute;border-radius:999px;filter:blur(24px);opacity:.48}.aurora.one{width:240px;height:240px;background:#2563eb;top:-80px;left:-40px}.aurora.two{width:260px;height:260px;background:#1d4ed8;right:-70px;top:30px}.aurora.three{width:220px;height:220px;background:#38bdf8;bottom:-100px;left:24%}.login-brand-row{display:flex;align-items:center;gap:14px;position:relative;z-index:2}.login-brand-title{font-size:26px;font-weight:800;margin-top:8px}.login-copy{max-width:700px;margin-top:68px;position:relative;z-index:2}.login-copy h1{margin:0 0 16px;font-size:40px;line-height:1.08;font-weight:900}.login-copy p{margin:0;max-width:640px;font-size:15px;line-height:1.85;color:#d5e3f8}.login-right{display:flex;align-items:center;justify-content:center;padding:30px}.login-panel{width:100%;max-width:500px;background:rgba(255,255,255,.96);border:1px solid #e2e8f0;border-radius:28px;padding:30px}.login-head{display:flex;align-items:center;gap:14px;margin-bottom:22px}.login-head h2{margin:0;font-size:30px;font-weight:900}.login-head p{margin:6px 0 0;color:#64748b;font-size:13px}.field{display:flex;flex-direction:column;gap:7px;margin-bottom:14px}.field label{font-size:12px;font-weight:700;color:#334155}.field input,.field select,.field textarea,.search-box input{width:100%;border:1px solid #d7e0ea;border-radius:14px;background:#fff;color:#0f172a;outline:none}.field input,.field select,.search-box input{height:42px;padding:0 13px}.field textarea{min-height:106px;padding:13px;resize:vertical}.demo-box{margin-top:18px;border-radius:18px;border:1px solid #e5ebf3;background:#f8fbff;padding:16px;color:#475569;font-size:13px}.error-box{background:#fef2f2;border:1px solid #fecaca;color:#b91c1c;padding:11px 13px;border-radius:14px;margin-bottom:14px;font-size:13px}
.app-shell{min-height:100vh;display:grid;grid-template-columns:278px 1fr;background:linear-gradient(180deg,var(--bg),var(--bg2))}.sidebar{padding:18px;background:linear-gradient(180deg,#041024 0%,#081938 40%,#0b2a58 100%);color:#fff;display:flex;flex-direction:column;gap:16px}.sidebar-userhead{padding:8px 6px 2px}.sidebar-user-name{font-size:18px;font-weight:900;color:#fff}.sidebar-user-role{font-size:12px;color:#cdd8ea;margin-top:6px}.nav-list{display:flex;flex-direction:column;gap:7px}.nav-btn{height:42px;border:none;border-radius:14px;background:transparent;color:#e7eefc;display:flex;align-items:center;gap:10px;padding:0 13px;font-weight:700;cursor:pointer;text-align:left;font-size:13px}.nav-btn.active{background:#fff;color:#0f172a}.sidebar-projects{margin-top:8px}.sidebar-chip{padding:9px 11px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#e5eefc;margin-top:7px;font-size:12px}.main-shell{padding:16px}.topbar{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:16px}.page-title{margin:5px 0 0;font-size:26px;line-height:1.1;max-width:520px}.page-sub{margin:7px 0 0;color:#64748b;font-size:14px}.topbar-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.search-box{min-width:280px;height:40px;border-radius:12px;border:1px solid #d7e0ea;background:#fff;padding:0 12px;display:flex;align-items:center;gap:8px}.search-box input{border:none;background:transparent;padding:0}.content-stack,.page-stack{display:flex;flex-direction:column;gap:16px}.menu-btn{display:none;width:40px;height:40px;border-radius:12px;border:1px solid #dce4ee;background:#fff;margin-bottom:8px;align-items:center;justify-content:center;cursor:pointer}
.hero-card,.section-hero{display:grid;grid-template-columns:1.1fr .9fr;gap:16px;align-items:end;background:linear-gradient(135deg,#f9fbff,#f6f9fe);border:1px solid #e6edf5}.hero-card h2,.section-hero h2{margin:8px 0 6px;font-size:28px;line-height:1.08}.hero-card p,.section-hero p{margin:0;max-width:760px;font-size:14px;line-height:1.8;color:#6a7a90}.hero-actions{display:flex;gap:8px;margin-top:14px}.hero-mini-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.mini-stat{display:flex;gap:10px;align-items:center;padding:12px;border-radius:16px;background:#fff;border:1px solid #e6edf5}.mini-stat-icon{width:30px;height:30px;border-radius:10px;display:grid;place-items:center;background:#0f172a;color:#fff}.mini-stat-label{font-size:11px;color:#66758b}.mini-stat-value{font-size:18px;font-weight:900}
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.kpi-card{padding:16px}.kpi-top{display:flex}.kpi-icon{width:34px;height:34px;border-radius:12px;display:grid;place-items:center;background:#0f172a;color:#fff}.kpi-label{margin-top:12px;color:#64748b;font-size:12px}.kpi-value{margin-top:5px;font-size:24px;font-weight:900}
.section-title{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap;margin-bottom:16px}.section-title h3{margin:0;font-size:20px}.section-title p{margin:5px 0 0;color:#64748b;line-height:1.7;font-size:13px}.dashboard-grid-a{display:grid;grid-template-columns:1fr 1fr;gap:16px}.module-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.module-card{display:flex;align-items:center;gap:9px;padding:13px;border-radius:16px;border:1px solid #e6edf5;background:#fff;cursor:pointer;font-weight:700;text-align:left;font-size:13px}.module-card.static{cursor:default}.metric-list{display:flex;flex-direction:column;gap:9px}.metric-row{display:flex;justify-content:space-between;align-items:center;padding:12px;border-radius:14px;background:#f8fbff;border:1px solid #e6edf5;font-size:13px}.metric-row strong{font-size:19px}
.table-wrap{overflow:auto}.attendance-table-wrap{overflow:auto;border:1px solid var(--line);border-radius:18px;background:#fff}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:14px 12px;border-bottom:1px solid #edf2f7;font-size:13px;vertical-align:middle}th{color:#64748b;font-weight:800;white-space:nowrap}td{color:#0f172a}.two-col{display:grid;grid-template-columns:1.12fr .88fr;gap:16px}.form-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.full-span{grid-column:1/-1}.summary-box{padding:14px;border-radius:16px;background:#f8fbff;border:1px solid #e6edf5;color:#475569;line-height:1.7;margin-bottom:14px;font-size:13px}.summary-title{font-weight:900;color:#0f172a;margin-bottom:6px}.project-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.project-tab{padding:12px;border-radius:16px;border:1px solid #e6edf5;background:#fff;cursor:pointer;text-align:left}.project-tab.active{background:linear-gradient(135deg,#0f172a,#173d72);color:#fff;border-color:#173d72}.project-tab.active .sub,.project-tab.active .strong{color:#fff}.contact-row{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 14px}.contact-pill{display:inline-flex;align-items:center;gap:8px;padding:8px 11px;border-radius:999px;background:#f8fbff;border:1px solid #e6edf5;color:#334155;font-size:12px}.manager-lite{padding:12px;border-radius:16px;background:#f8fbff;border:1px solid #e6edf5;display:flex;flex-direction:column;gap:5px;color:#475569;margin-bottom:14px;font-size:13px}.approval-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.approval-card{padding:14px;border-radius:18px;border:1px solid #e6edf5;background:#fff}.approval-top{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}.approval-top h4{margin:0;font-size:16px}.approval-top p{margin:5px 0 0;color:#64748b;font-size:12px}.approval-body{margin-top:12px;display:grid;gap:8px;color:#334155;font-size:13px}.approval-actions{display:flex;gap:8px;margin-top:12px}.empty-box{padding:22px;border-radius:16px;background:#f8fbff;border:1px dashed #cbd5e1;color:#64748b;text-align:center;font-size:13px}.settings-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.settings-grid.single{grid-template-columns:1fr}.settings-item{display:flex;gap:10px;align-items:flex-start;padding:12px;border-radius:16px;border:1px solid #e6edf5;background:#f8fbff}.settings-item strong{display:block;font-size:13px}.settings-item span{display:block;color:#64748b;font-size:12px;margin-top:4px}.inline-actions{display:flex;gap:8px;flex-wrap:wrap}.upload-box{display:flex;align-items:center;gap:14px;flex-wrap:wrap}.upload-btn{display:inline-flex;align-items:center;gap:8px;padding:11px 14px;border-radius:12px;border:1px solid #dce4ef;background:#fff;cursor:pointer;font-size:13px;font-weight:700}.upload-note{font-size:13px;color:#64748b}.attendance-table th,.attendance-table td{min-width:70px;text-align:center;padding:10px 8px}.attendance-table .sticky-col{position:sticky;left:0;background:#fff;z-index:2;text-align:left;min-width:180px}.attendance-table .employee-col{font-weight:800}.attendance-table .weekend-head{background:#9fc5e8;color:#0f172a}.attendance-cell.weekend{background:#9fc5e8}.attendance-cell.single{background:#f6b26b}.attendance-cell.absent{color:#b91c1c;font-weight:800}.attendance-cell.leave{color:#1d4ed8;font-weight:800}.attendance-cell.hours{font-weight:700}
.status-badge{display:inline-flex;align-items:center;padding:5px 9px;border-radius:999px;font-size:10px;font-weight:800;border:1px solid transparent}.status-badge.success{background:#ecfdf5;color:#047857;border-color:#a7f3d0}.status-badge.warning{background:#fffbeb;color:#b45309;border-color:#fde68a}.status-badge.danger{background:#fef2f2;color:#b91c1c;border-color:#fecaca}.status-badge.info{background:#eff6ff;color:#1d4ed8;border-color:#bfdbfe}.status-badge.neutral{background:#f8fafc;color:#475569;border-color:#e2e8f0}
@media (max-width:1200px){.dashboard-grid-a,.two-col,.section-hero,.hero-card{grid-template-columns:1fr}.page-title{max-width:100%}.hero-mini-grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:960px){.app-shell{grid-template-columns:1fr}.sidebar{position:fixed;left:0;top:0;bottom:0;width:290px;z-index:100;transform:translateX(-100%)}.sidebar.mobile-open{transform:translateX(0)}.menu-btn{display:inline-flex}.topbar{flex-direction:column}.topbar-actions{width:100%}.search-box{min-width:100%}.form-grid,.hero-mini-grid,.module-grid,.project-tabs,.settings-grid{grid-template-columns:1fr}.page-title{font-size:24px}.login-copy h1{font-size:34px}}
@media (max-width:640px){.login-page,.main-shell{padding:12px}.glass-card,.login-panel,.login-left{padding:16px}.kpi-grid,.module-grid,.project-tabs,.settings-grid{grid-template-columns:1fr}.page-title{font-size:22px}.hero-card h2,.section-hero h2{font-size:24px}.login-copy h1{font-size:26px}}
`;
