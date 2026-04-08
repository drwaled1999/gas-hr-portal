// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronRight,
  AlertTriangle,
  Wallet,
  FolderOpen,
  KeyRound,
  Plus,
  Menu,
  UserPlus,
  CalendarDays,
  Briefcase,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  UserCog,
  Bell,
  BadgeCheck,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Activity,
  Clock3,
  TrendingUp,
  Layers3,
} from "lucide-react";

const users = {
  hrmanager: { password: "123456", name: "Walid Khalaf Alshammari", role: "HR Manager", email: "hr@gas.com" },
  walid: { password: "123456", name: "Walid Khalaf", role: "HR Admin", email: "admin@gas.com" },
  sara: { password: "123456", name: "Sara Ali", role: "Admin Assistant", email: "assistant@gas.com" },
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
  { id: 7, name: "Saad Al Harbi", employeeId: "GAS-2380", role: "Admin Clerk", projectId: "zuluf", nationality: "Saudi", annualBalance: 30, usedLeave: 5, permissionsUsed: 2, status: "Active", manager: "Nasser Al Otaibi" },
  { id: 8, name: "Khaled Omar", employeeId: "GAS-2401", role: "Storekeeper", projectId: "jubail", nationality: "Egyptian", annualBalance: 30, usedLeave: 11, permissionsUsed: 4, status: "On Leave", manager: "Adel Ibrahim" },
];

const initialRequests = [
  { id: 1, employeeId: 3, employee: "Faisal Al Harbi", type: "Annual Leave", projectId: "zuluf", days: 5, status: "Pending", date: "2026-04-09", note: "Family travel" },
  { id: 2, employeeId: 4, employee: "Rashid Al Qahtani", type: "Permission", projectId: "qassim", days: 1, status: "Approved", date: "2026-04-08", note: "Medical appointment" },
  { id: 3, employeeId: 1, employee: "Ahmed Salem", type: "Takleef", projectId: "qatif", days: 2, status: "In Review", date: "2026-04-11", note: "Night shift assignment" },
  { id: 4, employeeId: 2, employee: "Muteb Al Bishi", type: "Annual Leave", projectId: "qatif", days: 3, status: "Pending", date: "2026-04-12", note: "Personal leave" },
  { id: 5, employeeId: 8, employee: "Khaled Omar", type: "Annual Leave", projectId: "jubail", days: 4, status: "Pending", date: "2026-04-16", note: "Leave extension" },
];

const initialFiles = {
  qatif: [
    { id: 1, category: "Leave", title: "Annual Leave - Ahmed Salem.pdf", note: "Submitted for April review", status: "Pending" },
    { id: 2, category: "Takleef", title: "Night Shift Assignment - Week 2.pdf", note: "Approved by project manager", status: "Approved" },
  ],
  qassim: [{ id: 3, category: "Leave", title: "Emergency Leave - Rashid.pdf", note: "Family emergency", status: "Approved" }],
  zuluf: [],
  jubail: [],
};

const sidebarItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "employees", label: "Employees", icon: Users },
  { key: "leaveBalances", label: "Leave Balances", icon: Wallet },
  { key: "approvals", label: "Approvals", icon: BadgeCheck },
  { key: "requests", label: "Leaves & Takleef", icon: Plane },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "files", label: "Project Files", icon: FolderOpen },
  { key: "reports", label: "Reports", icon: FileText },
  { key: "settings", label: "Settings", icon: KeyRound },
];

function projectName(projects, id) {
  return projects.find((p) => p.id === id)?.name || "Unknown Project";
}

function BrandMark({ small = false }) {
  return (
    <div className={`brand-v3 ${small ? "small" : ""}`}>
      <div className="brand-v3-inner">
        <span className="brand-v3-main">GAS</span>
        <span className="brand-v3-sub">HCM SUITE</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Active: "success",
    Approved: "success",
    Pending: "warning",
    "On Leave": "warning",
    "Pending Review": "danger",
    Rejected: "danger",
    "In Review": "info",
    Review: "info",
  };
  return <span className={`status-v3 ${map[status] || "neutral"}`}>{status}</span>;
}

function GlassCard({ children, className = "" }) {
  return <div className={`glass-card-v3 ${className}`}>{children}</div>;
}

function SectionTitle({ title, description, action }) {
  return (
    <div className="section-title-v3">
      <div>
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, trend }) {
  return (
    <GlassCard className="kpi-card-v3">
      <div className="kpi-card-top">
        <div className="kpi-icon"><Icon size={18} /></div>
        <div className="kpi-trend"><TrendingUp size={14} /> {trend}</div>
      </div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
    </GlassCard>
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
    <div className="login-v3-page">
      <div className="login-v3-shell">
        <div className="login-v3-left">
          <div className="aurora a1" />
          <div className="aurora a2" />
          <div className="aurora a3" />
          <div className="login-v3-brand-row">
            <BrandMark />
            <div>
              <div className="eyebrow-v3">Enterprise Human Capital Intelligence</div>
              <div className="login-v3-brand-title">GAS Workforce OS</div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="login-v3-copy">
            <h1>Premium HR system inspired by world-class enterprise software.</h1>
            <p>
              Built for employee records, annual leave governance, approvals, project ownership,
              manager contacts, HR files and executive workforce visibility.
            </p>
          </motion.div>
          <div className="login-v3-grid">
            <div className="login-v3-tile"><span>Employees</span><strong>64</strong></div>
            <div className="login-v3-tile"><span>Projects</span><strong>4</strong></div>
            <div className="login-v3-tile"><span>Approvals</span><strong>6</strong></div>
            <div className="login-v3-tile"><span>HR Ops</span><strong>Live</strong></div>
          </div>
        </div>

        <div className="login-v3-right">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="login-v3-panel">
            <div className="login-v3-head">
              <BrandMark small />
              <div>
                <h2>Welcome back</h2>
                <p>Secure sign in to the HR command center</p>
              </div>
            </div>
            <div className="field-v3">
              <label>Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
            </div>
            <div className="field-v3">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </div>
            {error ? <div className="error-v3">{error}</div> : null}
            <button className="btn-v3 primary full" onClick={submit}>Sign In to Workspace</button>
            <div className="demo-v3">
              <div className="demo-v3-title">Demo accounts</div>
              <div><strong>HR Manager:</strong> hrmanager / 123456</div>
              <div><strong>HR Admin:</strong> walid / 123456</div>
              <div><strong>Admin Assistant:</strong> sara / 123456</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DashboardPage({ employees, projects, requests, setActivePage }) {
  const remainingLeave = employees.reduce((sum, e) => sum + Math.max(e.annualBalance - e.usedLeave, 0), 0);
  const activeEmployees = employees.filter((e) => e.status === "Active").length;
  const onLeaveEmployees = employees.filter((e) => e.status === "On Leave").length;
  const pendingApprovals = requests.filter((r) => r.status === "Pending" || r.status === "In Review").length;

  return (
    <div className="dashboard-v3">
      <div className="hero-v3-grid">
        <GlassCard className="hero-v3-main">
          <div className="hero-v3-glow g1" />
          <div className="hero-v3-glow g2" />
          <div className="hero-v3-kicker">Executive command center</div>
          <h2>Next-generation workforce intelligence dashboard.</h2>
          <p>
            Enterprise-grade overview for approvals, leave governance, employee distribution,
            project ownership and high-priority HR actions.
          </p>
          <div className="hero-v3-actions">
            <button className="btn-v3 primary" onClick={() => setActivePage("approvals")}><BadgeCheck size={18} /> Open approvals</button>
            <button className="btn-v3 ghost" onClick={() => setActivePage("leaveBalances")}><Wallet size={18} /> Control balances</button>
          </div>
          <div className="hero-v3-mini-grid">
            <div><span>Employees</span><strong>{employees.length}</strong></div>
            <div><span>Projects</span><strong>{projects.length}</strong></div>
            <div><span>Pending</span><strong>{pendingApprovals}</strong></div>
          </div>
        </GlassCard>

        <GlassCard className="hero-v3-side">
          <div className="hero-side-top">
            <span>Today's HR Pulse</span>
            <StatusBadge status="Active" />
          </div>
          <div className="hero-side-value">{pendingApprovals}</div>
          <div className="hero-side-title">Requests need decision</div>
          <p>Approve or reject requests to keep field operations and workforce planning aligned.</p>
          <div className="hero-side-bars">
            <div className="bar-item"><span>Active employees</span><div className="bar-track"><div className="bar-fill" style={{ width: `${Math.min((activeEmployees / employees.length) * 100, 100)}%` }} /></div><strong>{activeEmployees}</strong></div>
            <div className="bar-item"><span>On leave</span><div className="bar-track"><div className="bar-fill alt" style={{ width: `${Math.min((onLeaveEmployees / employees.length) * 100, 100)}%` }} /></div><strong>{onLeaveEmployees}</strong></div>
          </div>
        </GlassCard>
      </div>

      <div className="kpi-grid-v3">
        <KpiCard icon={Users} label="Total Employees" value={employees.length} trend="+12%" />
        <KpiCard icon={Building2} label="Project Sites" value={projects.length} trend="Stable" />
        <KpiCard icon={ClipboardCheck} label="Pending Approvals" value={pendingApprovals} trend="High focus" />
        <KpiCard icon={Wallet} label="Remaining Leave" value={remainingLeave} trend="Live" />
      </div>

      <div className="dashboard-v3-grid-a">
        <GlassCard className="panel-dark-v3">
          <SectionTitle title="Approval Radar" description="High-priority requests arranged for executive review." action={<button className="btn-v3 ghost light" onClick={() => setActivePage("approvals")}>Review all</button>} />
          <div className="radar-list-v3">
            {requests.slice(0, 4).map((req, index) => (
              <button key={req.id} className="radar-item-v3" onClick={() => setActivePage("approvals")}>
                <div className="radar-index">0{index + 1}</div>
                <div className="radar-main">
                  <div className="radar-name">{req.employee}</div>
                  <div className="radar-sub">{req.type} • {projectName(projects, req.projectId)}</div>
                </div>
                <div className="radar-side">
                  <StatusBadge status={req.status} />
                  <span>{req.days} day(s)</span>
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <SectionTitle title="Project Command Center" description="Project ownership, contact points and workforce load." />
          <div className="project-cards-v3">
            {projects.map((project) => {
              const count = employees.filter((e) => e.projectId === project.id).length;
              return (
                <div key={project.id} className="project-card-v3">
                  <div className="project-card-top">
                    <div>
                      <div className="project-code-v3">{project.code}</div>
                      <h4>{project.name}</h4>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>
                  <div className="project-owner-v3">{project.manager}</div>
                  <div className="project-contact-v3">{project.phone}</div>
                  <div className="project-foot-v3">
                    <span>Assigned employees</span>
                    <strong>{count}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      <div className="dashboard-v3-grid-b">
        <GlassCard>
          <SectionTitle title="Workforce Matrix" description="Live employee table with project ownership and leave visibility." action={<button className="btn-v3 secondary" onClick={() => setActivePage("employees")}>Open employees</button>} />
          <div className="table-wrap-v3">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Project</th>
                  <th>Manager</th>
                  <th>Balance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.slice(0, 6).map((emp) => (
                  <tr key={emp.id}>
                    <td><div className="strong-v3">{emp.name}</div><div className="sub-v3">{emp.role}</div></td>
                    <td>{projectName(projects, emp.projectId)}</td>
                    <td>{emp.manager}</td>
                    <td>{emp.annualBalance - emp.usedLeave} days</td>
                    <td><StatusBadge status={emp.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="stack-v3">
          <GlassCard>
            <SectionTitle title="Live Metrics" description="Fast operational snapshot." />
            <div className="metric-list-v3">
              <div className="metric-row-v3"><span><Activity size={16} /> Active employees</span><strong>{activeEmployees}</strong></div>
              <div className="metric-row-v3"><span><Clock3 size={16} /> Employees on leave</span><strong>{onLeaveEmployees}</strong></div>
              <div className="metric-row-v3"><span><ShieldCheck size={16} /> Pending review</span><strong>{employees.filter((e) => e.status === "Pending Review").length}</strong></div>
              <div className="metric-row-v3"><span><Layers3 size={16} /> Requests this cycle</span><strong>{requests.length}</strong></div>
            </div>
          </GlassCard>

          <GlassCard>
            <SectionTitle title="Quick Launch" description="Shortcut tiles for core workflows." />
            <div className="launch-grid-v3">
              <button className="launch-tile-v3" onClick={() => setActivePage("employees")}><UserPlus size={18} /><span>Add employee</span></button>
              <button className="launch-tile-v3" onClick={() => setActivePage("requests")}><Plane size={18} /><span>Create request</span></button>
              <button className="launch-tile-v3" onClick={() => setActivePage("projects")}><FolderKanban size={18} /><span>Project setup</span></button>
              <button className="launch-tile-v3" onClick={() => setActivePage("reports")}><BarChart3 size={18} /><span>Reports</span></button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function EmployeesPage({ employees, setEmployees, projects }) {
  const [form, setForm] = useState({ name: "", employeeId: "", role: "", projectId: projects[0]?.id || "", nationality: "Saudi", annualBalance: 30, usedLeave: 0, permissionsUsed: 0, status: "Active" });
  const addEmployee = () => {
    if (!form.name || !form.employeeId || !form.role) return;
    const proj = projects.find((p) => p.id === form.projectId);
    setEmployees((prev) => [...prev, { id: Date.now(), ...form, manager: proj?.manager || "" }]);
    setForm({ name: "", employeeId: "", role: "", projectId: projects[0]?.id || "", nationality: "Saudi", annualBalance: 30, usedLeave: 0, permissionsUsed: 0, status: "Active" });
  };
  return (
    <div className="two-col-v3">
      <GlassCard>
        <SectionTitle title="Employees Directory" description="Project-linked employee master records with manager ownership." />
        <div className="table-wrap-v3">
          <table>
            <thead><tr><th>Name</th><th>ID</th><th>Project</th><th>Manager</th><th>Balance</th><th>Status</th></tr></thead>
            <tbody>{employees.map((emp) => <tr key={emp.id}><td><div className="strong-v3">{emp.name}</div><div className="sub-v3">{emp.role}</div></td><td>{emp.employeeId}</td><td>{projectName(projects, emp.projectId)}</td><td>{emp.manager}</td><td>{emp.annualBalance - emp.usedLeave} days</td><td><StatusBadge status={emp.status} /></td></tr>)}</tbody>
          </table>
        </div>
      </GlassCard>
      <GlassCard>
        <SectionTitle title="Add Employee" description="Create a new employee and assign them to a specific project." />
        <div className="form-grid-v3">
          <div className="field-v3"><label>Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="field-v3"><label>Employee ID</label><input value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} /></div>
          <div className="field-v3"><label>Role</label><input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
          <div className="field-v3"><label>Project</label><select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })}>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
          <div className="field-v3"><label>Nationality</label><input value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} /></div>
          <div className="field-v3"><label>Status</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Active</option><option>On Leave</option><option>Pending Review</option></select></div>
          <div className="field-v3"><label>Annual Leave</label><input type="number" value={form.annualBalance} onChange={(e) => setForm({ ...form, annualBalance: Number(e.target.value) })} /></div>
          <div className="field-v3"><label>Used Leave</label><input type="number" value={form.usedLeave} onChange={(e) => setForm({ ...form, usedLeave: Number(e.target.value) })} /></div>
        </div>
        <button className="btn-v3 primary full" onClick={addEmployee}><UserPlus size={18} /> Save Employee</button>
      </GlassCard>
    </div>
  );
}

function LeaveBalancesPage({ employees, setEmployees, projects }) {
  const [selectedId, setSelectedId] = useState(String(employees[0]?.id || ""));
  const [annualBalance, setAnnualBalance] = useState(employees[0]?.annualBalance || 30);
  const [usedLeave, setUsedLeave] = useState(employees[0]?.usedLeave || 0);
  const selectedEmployee = employees.find((e) => String(e.id) === selectedId);
  React.useEffect(() => { if (selectedEmployee) { setAnnualBalance(selectedEmployee.annualBalance); setUsedLeave(selectedEmployee.usedLeave); } }, [selectedId]);
  const saveBalance = () => setEmployees((prev) => prev.map((emp) => String(emp.id) === selectedId ? { ...emp, annualBalance: Number(annualBalance), usedLeave: Number(usedLeave) } : emp));
  return (
    <div className="two-col-v3">
      <GlassCard>
        <SectionTitle title="Annual Leave Balances" description="Manually control annual leave allocation and usage for every employee." />
        <div className="table-wrap-v3"><table><thead><tr><th>Employee</th><th>Project</th><th>Annual Balance</th><th>Used Leave</th><th>Remaining</th></tr></thead><tbody>{employees.map((emp) => <tr key={emp.id}><td>{emp.name}</td><td>{projectName(projects, emp.projectId)}</td><td>{emp.annualBalance}</td><td>{emp.usedLeave}</td><td>{Math.max(emp.annualBalance - emp.usedLeave, 0)}</td></tr>)}</tbody></table></div>
      </GlassCard>
      <GlassCard>
        <SectionTitle title="Update Balance" description="Select any employee and update leave values directly." />
        <div className="field-v3"><label>Employee</label><select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>{employees.map((emp) => <option key={emp.id} value={String(emp.id)}>{emp.name} - {projectName(projects, emp.projectId)}</option>)}</select></div>
        <div className="form-grid-v3">
          <div className="field-v3"><label>Annual Leave Allocation</label><input type="number" value={annualBalance} onChange={(e) => setAnnualBalance(Number(e.target.value))} /></div>
          <div className="field-v3"><label>Used Leave</label><input type="number" value={usedLeave} onChange={(e) => setUsedLeave(Number(e.target.value))} /></div>
        </div>
        {selectedEmployee ? <div className="summary-v3"><div className="summary-title-v3">{selectedEmployee.name}</div><div>Project: {projectName(projects, selectedEmployee.projectId)}</div><div>Remaining after save: {Math.max(annualBalance - usedLeave, 0)} days</div></div> : null}
        <button className="btn-v3 primary full" onClick={saveBalance}><Wallet size={18} /> Save Leave Balance</button>
      </GlassCard>
    </div>
  );
}

function ApprovalsPage({ requests, setRequests, employees, setEmployees, projects }) {
  const handleDecision = (requestId, status) => {
    const target = requests.find((r) => r.id === requestId);
    if (!target) return;
    setRequests((prev) => prev.map((req) => req.id === requestId ? { ...req, status } : req));
    if (status === "Approved" && target.type === "Annual Leave") {
      setEmployees((prev) => prev.map((emp) => emp.id === target.employeeId ? { ...emp, usedLeave: emp.usedLeave + Number(target.days), status: "On Leave" } : emp));
    }
  };
  const pending = requests.filter((r) => r.status === "Pending" || r.status === "In Review");
  return (
    <GlassCard>
      <SectionTitle title="Approval Workspace" description="Review and approve annual leave, permissions and takleef requests." />
      <div className="approval-grid-v3">
        {pending.length === 0 ? <div className="empty-v3">No pending approvals right now.</div> : pending.map((req) => {
          const emp = employees.find((e) => e.id === req.employeeId);
          return (
            <div key={req.id} className="approval-card-v3">
              <div className="approval-top-v3"><div><h4>{req.employee}</h4><p>{req.type} • {projectName(projects, req.projectId)}</p></div><StatusBadge status={req.status} /></div>
              <div className="approval-body-v3"><div><strong>Days:</strong> {req.days}</div><div><strong>Date:</strong> {req.date}</div><div><strong>Note:</strong> {req.note}</div>{emp ? <div><strong>Current balance:</strong> {Math.max(emp.annualBalance - emp.usedLeave, 0)} days</div> : null}</div>
              <div className="approval-actions-v3"><button className="btn-v3 success" onClick={() => handleDecision(req.id, "Approved")}><CheckCircle2 size={18} /> Approve</button><button className="btn-v3 danger" onClick={() => handleDecision(req.id, "Rejected")}><XCircle size={18} /> Reject</button></div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

function RequestsPage({ employees, requests, setRequests, projects }) {
  const [form, setForm] = useState({ employeeId: String(employees[0]?.id || ""), type: "Annual Leave", days: 1, note: "" });
  const createRequest = () => {
    const emp = employees.find((e) => String(e.id) === form.employeeId);
    if (!emp) return;
    setRequests((prev) => [{ id: Date.now(), employeeId: emp.id, employee: emp.name, type: form.type, projectId: emp.projectId, days: Number(form.days), status: "Pending", date: new Date().toISOString().slice(0, 10), note: form.note }, ...prev]);
    setForm({ employeeId: String(employees[0]?.id || ""), type: "Annual Leave", days: 1, note: "" });
  };
  return (
    <div className="two-col-v3">
      <GlassCard>
        <SectionTitle title="Submit Leave / Takleef Request" description="Create annual leave, permission or takleef requests for employees." />
        <div className="form-grid-v3">
          <div className="field-v3"><label>Employee</label><select value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })}>{employees.map((emp) => <option key={emp.id} value={String(emp.id)}>{emp.name} - {projectName(projects, emp.projectId)}</option>)}</select></div>
          <div className="field-v3"><label>Type</label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>Annual Leave</option><option>Permission</option><option>Takleef</option></select></div>
          <div className="field-v3"><label>Days</label><input type="number" value={form.days} onChange={(e) => setForm({ ...form, days: Number(e.target.value) })} /></div>
          <div className="field-v3 full-span"><label>Note</label><textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Request details" /></div>
        </div>
        <button className="btn-v3 primary full" onClick={createRequest}><Plane size={18} /> Create Request</button>
      </GlassCard>
      <GlassCard>
        <SectionTitle title="Request Tracker" description="All HR requests by project and current decision state." />
        <div className="table-wrap-v3"><table><thead><tr><th>Employee</th><th>Type</th><th>Project</th><th>Days</th><th>Date</th><th>Status</th></tr></thead><tbody>{requests.map((req) => <tr key={req.id}><td>{req.employee}</td><td>{req.type}</td><td>{projectName(projects, req.projectId)}</td><td>{req.days}</td><td>{req.date}</td><td><StatusBadge status={req.status} /></td></tr>)}</tbody></table></div>
      </GlassCard>
    </div>
  );
}

function ProjectsPage({ projects, setProjects, employees }) {
  const [activeProject, setActiveProject] = useState(projects[0]?.id || "");
  const [manager, setManager] = useState(projects[0]?.manager || "");
  const [phone, setPhone] = useState(projects[0]?.phone || "");
  const [email, setEmail] = useState(projects[0]?.email || "");
  const project = projects.find((p) => p.id === activeProject);
  const projectEmployees = employees.filter((e) => e.projectId === activeProject);
  React.useEffect(() => { const p = projects.find((x) => x.id === activeProject); if (p) { setManager(p.manager); setPhone(p.phone); setEmail(p.email); } }, [activeProject, projects]);
  const saveManagerInfo = () => setProjects((prev) => prev.map((p) => p.id === activeProject ? { ...p, manager, phone, email } : p));
  return (
    <div className="project-v3-layout">
      <GlassCard>
        <SectionTitle title="Project Structure" description="Each project has its own employees, manager and contact information." />
        <div className="project-tabs-v3">{projects.map((item) => <button key={item.id} className={`project-tab-v3 ${activeProject === item.id ? "active" : ""}`} onClick={() => setActiveProject(item.id)}><div className="strong-v3">{item.name}</div><div className="sub-v3">{item.code}</div></button>)}</div>
      </GlassCard>
      <div className="two-col-v3">
        <GlassCard>
          <SectionTitle title={`${project?.name || ""} Manager`} description="Primary manager and contact details for this project." />
          <div className="form-grid-v3">
            <div className="field-v3"><label>Manager Name</label><input value={manager} onChange={(e) => setManager(e.target.value)} /></div>
            <div className="field-v3"><label>Phone Number</label><input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
            <div className="field-v3 full-span"><label>Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          </div>
          <div className="contact-row-v3"><div className="contact-pill-v3"><UserCog size={16} /> {manager}</div><div className="contact-pill-v3"><Phone size={16} /> {phone}</div><div className="contact-pill-v3"><Mail size={16} /> {email}</div></div>
          <button className="btn-v3 primary full" onClick={saveManagerInfo}>Save Project Contact</button>
        </GlassCard>
        <GlassCard>
          <SectionTitle title="Employees in Project" description="Only employees assigned to this project are shown below." />
          <div className="table-wrap-v3"><table><thead><tr><th>Employee</th><th>Role</th><th>ID</th><th>Status</th></tr></thead><tbody>{projectEmployees.map((emp) => <tr key={emp.id}><td>{emp.name}</td><td>{emp.role}</td><td>{emp.employeeId}</td><td><StatusBadge status={emp.status} /></td></tr>)}</tbody></table></div>
        </GlassCard>
      </div>
    </div>
  );
}

function ProjectFilesPage({ projects, filesByProject, setFilesByProject }) {
  const [activeProject, setActiveProject] = useState(projects[0]?.id || "");
  const [form, setForm] = useState({ category: "Leave", title: "", note: "" });
  const project = projects.find((p) => p.id === activeProject);
  const items = filesByProject[activeProject] || [];
  const addFile = () => {
    if (!form.title) return;
    setFilesByProject((prev) => ({ ...prev, [activeProject]: [...(prev[activeProject] || []), { id: Date.now(), category: form.category, title: form.title, note: form.note, status: "Pending" }] }));
    setForm({ category: "Leave", title: "", note: "" });
  };
  return (
    <div className="two-col-v3">
      <GlassCard>
        <SectionTitle title="Project Files" description="Separate leave and task records for each project." />
        <div className="field-v3"><label>Project</label><select value={activeProject} onChange={(e) => setActiveProject(e.target.value)}>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
        <div className="manager-lite-v3"><strong>{project?.manager}</strong><span>{project?.phone}</span></div>
        <div className="form-grid-v3">
          <div className="field-v3"><label>Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>Leave</option><option>Takleef</option><option>Permission</option><option>Other</option></select></div>
          <div className="field-v3"><label>File Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="example.pdf" /></div>
          <div className="field-v3 full-span"><label>Note</label><textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Document note" /></div>
        </div>
        <button className="btn-v3 primary full" onClick={addFile}><FolderOpen size={18} /> Add File Record</button>
      </GlassCard>
      <GlassCard>
        <SectionTitle title={`${project?.name || ""} Records`} description="Files attached to the selected project section." />
        <div className="table-wrap-v3"><table><thead><tr><th>Category</th><th>Title</th><th>Note</th><th>Status</th></tr></thead><tbody>{items.map((file) => <tr key={file.id}><td>{file.category}</td><td>{file.title}</td><td>{file.note}</td><td><StatusBadge status={file.status} /></td></tr>)}</tbody></table></div>
      </GlassCard>
    </div>
  );
}

function PlaceholderPage({ title, description }) {
  return (
    <GlassCard>
      <SectionTitle title={title} description={description} />
      <div className="placeholder-grid-v3">
        <div className="placeholder-box-v3"><Briefcase size={18} /><span>Enterprise-ready widgets</span></div>
        <div className="placeholder-box-v3"><ClipboardCheck size={18} /><span>Approval workflows</span></div>
        <div className="placeholder-box-v3"><Sparkles size={18} /><span>Premium printable modules</span></div>
      </div>
    </GlassCard>
  );
}

export default function HRPortalRedesign() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [employees, setEmployees] = useState(initialEmployees);
  const [projects, setProjects] = useState(initialProjects);
  const [requests, setRequests] = useState(initialRequests);
  const [filesByProject, setFilesByProject] = useState(initialFiles);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  if (!currentUser) return <><style>{styles}</style><LoginScreen onLogin={setCurrentUser} /></>;

  return (
    <>
      <style>{styles}</style>
      <div className="app-v3-shell">
        <AnimatePresence>
          {(mobileSidebar || window.innerWidth > 960) && (
            <motion.aside initial={{ x: -18, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -18, opacity: 0 }} className={`sidebar-v3 ${mobileSidebar ? "show" : ""}`}>
              <div className="sidebar-v3-head">
                <div className="sidebar-brand-v3"><BrandMark /><div><div className="sidebar-brand-title-v3">GAS Portal</div><div className="sidebar-brand-sub-v3">Human Capital Workspace</div></div></div>
                <div className="profile-v3-box"><div className="avatar-v3">WK</div><div><div className="strong-v3 light">{currentUser.name}</div><div className="sub-v3 light">{currentUser.role}</div></div></div>
              </div>
              <nav className="nav-v3">{sidebarItems.map((item) => { const Icon = item.icon; return <button key={item.key} className={`nav-v3-btn ${activePage === item.key ? "active" : ""}`} onClick={() => { setActivePage(item.key); setMobileSidebar(false); }}><Icon size={18} /><span>{item.label}</span></button>; })}</nav>
              <div className="sidebar-projects-v3"><div className="eyebrow-v3 light">Project Sections</div>{projects.map((p) => <div key={p.id} className="sidebar-chip-v3">{p.name}</div>)}</div>
              <button className="btn-v3 ghost light full" onClick={() => setCurrentUser(null)}><LogOut size={18} /> Logout</button>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="main-v3">
          <GlassCard className="topbar-v3">
            <div>
              <button className="menu-v3-btn" onClick={() => setMobileSidebar(!mobileSidebar)}><Menu size={18} /></button>
              <div className="eyebrow-v3 dark">Human Resources Operating System</div>
              <h1 className="page-title-v3">
                {activePage === "dashboard" && "Executive HR Dashboard"}
                {activePage === "employees" && "Employee Management"}
                {activePage === "leaveBalances" && "Annual Leave Balance Control"}
                {activePage === "approvals" && "Approvals Workspace"}
                {activePage === "requests" && "Leaves, Permissions & Takleef"}
                {activePage === "projects" && "Project Structure & Ownership"}
                {activePage === "files" && "Project Files Registry"}
                {activePage === "reports" && "Reports Center"}
                {activePage === "settings" && "System Settings"}
              </h1>
              <p className="page-sub-v3">Signed in as {currentUser.name} ({currentUser.role})</p>
            </div>
            <div className="topbar-actions-v3">
              <div className="search-v3"><Search size={16} /><input placeholder="Search employees, projects, approvals..." /></div>
              <button className="btn-v3 secondary"><Bell size={16} /> Alerts</button>
              <button className="btn-v3 primary" onClick={() => setActivePage("requests")}><Plus size={16} /> New Request</button>
            </div>
          </GlassCard>

          <div className="content-v3-stack">
            {activePage === "dashboard" && <DashboardPage employees={employees} projects={projects} requests={requests} setActivePage={setActivePage} />}
            {activePage === "employees" && <EmployeesPage employees={employees} setEmployees={setEmployees} projects={projects} />}
            {activePage === "leaveBalances" && <LeaveBalancesPage employees={employees} setEmployees={setEmployees} projects={projects} />}
            {activePage === "approvals" && <ApprovalsPage requests={requests} setRequests={setRequests} employees={employees} setEmployees={setEmployees} projects={projects} />}
            {activePage === "requests" && <RequestsPage employees={employees} requests={requests} setRequests={setRequests} projects={projects} />}
            {activePage === "projects" && <ProjectsPage projects={projects} setProjects={setProjects} employees={employees} />}
            {activePage === "files" && <ProjectFilesPage projects={projects} filesByProject={filesByProject} setFilesByProject={setFilesByProject} />}
            {activePage === "reports" && <PlaceholderPage title="Reports Center" description="Printable monthly HR reports, leave reports and project summaries." />}
            {activePage === "settings" && <PlaceholderPage title="System Settings" description="Adjust HR options, interface controls and configurable data blocks." />}
          </div>
        </main>
      </div>
    </>
  );
}

const styles = `
:root{--bg:#edf2f7;--bg2:#f7f9fc;--panel:#ffffff;--panel2:rgba(255,255,255,.78);--line:#e5ecf4;--text:#091224;--muted:#64748b;--nav1:#030b1c;--nav2:#0a1e43;--blue:#1d4ed8;--blue2:#2563eb;--dark:#0f172a;--success:#059669;--warning:#d97706;--danger:#dc2626;--info:#2563eb;font-family:Inter,Arial,sans-serif}
*{box-sizing:border-box}html,body,#root{margin:0;min-height:100%;background:linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%)}body{margin:0;color:var(--text)}button,input,select,textarea{font:inherit}
.btn-v3{height:50px;border:none;border-radius:16px;padding:0 18px;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-weight:800;cursor:pointer;transition:.18s ease}.btn-v3:hover{transform:translateY(-1px)}.btn-v3.primary{background:linear-gradient(135deg,#0b1731,#184c90);color:#fff;box-shadow:0 18px 40px rgba(24,76,144,.24)}.btn-v3.secondary{background:rgba(255,255,255,.9);color:#0f172a;border:1px solid #dce4ef}.btn-v3.ghost{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.14)}.btn-v3.ghost.light{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.16)}.btn-v3.success{background:#ecfdf5;color:#047857;border:1px solid #a7f3d0}.btn-v3.danger{background:#fef2f2;color:#b91c1c;border:1px solid #fecaca}.full{width:100%}
.brand-v3{height:66px;width:66px;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,.16);background:#020617;box-shadow:0 20px 44px rgba(2,6,23,.28)}.brand-v3.small{height:48px;width:48px;border-radius:18px}.brand-v3-inner{width:100%;height:100%;display:grid;place-items:center;background:radial-gradient(circle at top left,rgba(59,130,246,.7),transparent 45%),linear-gradient(135deg,#020617,#0f172a,#101d37)}.brand-v3-main{font-size:27px;font-weight:900;line-height:1;color:#fff}.brand-v3.small .brand-v3-main{font-size:18px}.brand-v3-sub{font-size:8px;letter-spacing:.25em;color:#dbeafe;text-align:center}
.eyebrow-v3{font-size:12px;letter-spacing:.28em;text-transform:uppercase}.eyebrow-v3.light{color:#b9c8e8}.eyebrow-v3.dark{color:#718096}.strong-v3{font-weight:800}.strong-v3.light{color:#fff}.sub-v3{color:#64748b;font-size:13px;margin-top:4px}.sub-v3.light{color:#c9d4ea}
.login-v3-page{min-height:100vh;padding:24px;background:radial-gradient(circle at top left,rgba(59,130,246,.18),transparent 20%),radial-gradient(circle at bottom right,rgba(15,23,42,.12),transparent 32%),linear-gradient(135deg,#e8eef6,#f8fbff,#dde8fb)}.login-v3-shell{max-width:1500px;min-height:calc(100vh - 48px);margin:0 auto;display:grid;grid-template-columns:1.08fr .92fr;background:rgba(255,255,255,.72);border:1px solid rgba(255,255,255,.56);border-radius:38px;overflow:hidden;backdrop-filter:blur(18px);box-shadow:0 36px 100px rgba(15,23,42,.18)}
.login-v3-left{position:relative;padding:44px;background:linear-gradient(145deg,#020617 0%,#0d1731 35%,#0c2f67 100%);color:#fff;display:flex;flex-direction:column;overflow:hidden}.aurora{position:absolute;border-radius:999px;filter:blur(24px);opacity:.52}.aurora.a1{width:260px;height:260px;background:#2563eb;top:-80px;left:-40px}.aurora.a2{width:280px;height:280px;background:#1d4ed8;right:-80px;top:40px}.aurora.a3{width:240px;height:240px;background:#0ea5e9;bottom:-120px;left:24%}.login-v3-brand-row{display:flex;align-items:center;gap:16px;position:relative;z-index:2}.login-v3-brand-title{font-size:30px;font-weight:800;margin-top:8px}.login-v3-copy{max-width:760px;margin-top:86px;position:relative;z-index:2}.login-v3-copy h1{margin:0 0 20px;font-size:60px;line-height:1.02;letter-spacing:-.05em;font-weight:900}.login-v3-copy p{margin:0;max-width:700px;font-size:20px;line-height:1.8;color:#cfdbef}.login-v3-grid{margin-top:auto;display:grid;grid-template-columns:repeat(4,1fr);gap:16px;position:relative;z-index:2}.login-v3-tile{padding:22px;border-radius:24px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.08);backdrop-filter:blur(14px)}.login-v3-tile span{display:block;color:#d4deef;font-size:14px}.login-v3-tile strong{display:block;margin-top:12px;font-size:34px}
.login-v3-right{display:flex;align-items:center;justify-content:center;padding:34px}.login-v3-panel{width:100%;max-width:560px;background:#fff;border:1px solid #e2e8f0;border-radius:32px;padding:38px;box-shadow:0 30px 90px -35px rgba(15,23,42,.35)}.login-v3-head{display:flex;align-items:center;gap:16px;margin-bottom:30px}.login-v3-head h2{margin:0;font-size:42px;letter-spacing:-.03em;font-weight:900}.login-v3-head p{margin:8px 0 0;color:#64748b}.field-v3{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}.field-v3 label{font-size:14px;font-weight:700;color:#334155}.field-v3 input,.field-v3 select,.field-v3 textarea,.search-v3 input{width:100%;border:1px solid #d7e0ea;border-radius:16px;background:#fff;color:#0f172a;outline:none;transition:.18s ease}.field-v3 input,.field-v3 select,.search-v3 input{height:50px;padding:0 16px}.field-v3 textarea{min-height:120px;padding:14px 16px;resize:vertical}.field-v3 input:focus,.field-v3 select:focus,.field-v3 textarea:focus,.search-v3 input:focus{border-color:#93c5fd;box-shadow:0 0 0 4px rgba(147,197,253,.2)}.demo-v3{margin-top:22px;border-radius:24px;border:1px solid #e5ebf3;background:#f8fbff;padding:20px;color:#475569}.demo-v3-title{font-weight:800;margin-bottom:12px}.error-v3{background:#fef2f2;border:1px solid #fecaca;color:#b91c1c;padding:12px 14px;border-radius:16px;margin-bottom:16px}
.glass-card-v3{background:linear-gradient(180deg,rgba(255,255,255,.96),rgba(255,255,255,.84));border:1px solid rgba(229,236,244,.92);border-radius:30px;box-shadow:0 22px 54px rgba(15,23,42,.06);padding:28px;backdrop-filter:blur(16px)}
.app-v3-shell{min-height:100vh;display:grid;grid-template-columns:320px 1fr;background:linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%)}.sidebar-v3{padding:24px;background:radial-gradient(circle at top left,rgba(96,165,250,.16),transparent 25%),radial-gradient(circle at bottom right,rgba(37,99,235,.18),transparent 22%),linear-gradient(180deg,#030b1c 0%,#07142d 38%,#0b2958 100%);color:#fff;display:flex;flex-direction:column;gap:22px}.sidebar-brand-v3{display:flex;align-items:center;gap:14px}.sidebar-brand-title-v3{font-size:34px;font-weight:900;line-height:1;letter-spacing:-.04em}.sidebar-brand-sub-v3{font-size:13px;color:#cdd8ea;margin-top:6px}.profile-v3-box{display:flex;gap:14px;align-items:center;padding:16px;border-radius:24px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,.04))}.avatar-v3{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.15);font-weight:800}.nav-v3{display:flex;flex-direction:column;gap:10px}.nav-v3-btn{height:52px;border:none;border-radius:18px;background:transparent;color:#e7eefc;display:flex;align-items:center;gap:12px;padding:0 16px;font-weight:700;cursor:pointer;text-align:left}.nav-v3-btn:hover{background:rgba(255,255,255,.08)}.nav-v3-btn.active{background:#fff;color:#0f172a;box-shadow:0 16px 35px rgba(2,6,23,.18)}.sidebar-projects-v3{margin-top:8px}.sidebar-chip-v3{padding:12px 14px;border-radius:18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#e5eefc;margin-top:10px;font-size:14px}
.main-v3{padding:22px}.topbar-v3{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:22px}.page-title-v3{margin:6px 0 0;font-size:48px;line-height:1.02;letter-spacing:-.05em;max-width:760px}.page-sub-v3{margin:10px 0 0;color:#64748b;font-size:18px}.topbar-actions-v3{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.search-v3{min-width:340px;height:50px;border-radius:16px;border:1px solid #d7e0ea;background:#fff;padding:0 14px;display:flex;align-items:center;gap:10px}.search-v3 input{border:none;box-shadow:none;background:transparent;padding:0}.content-v3-stack{display:flex;flex-direction:column;gap:22px}.menu-v3-btn{display:none;width:42px;height:42px;border-radius:14px;border:1px solid #dce4ee;background:#fff;margin-bottom:10px;align-items:center;justify-content:center;cursor:pointer}
.dashboard-v3{display:flex;flex-direction:column;gap:22px}.hero-v3-grid{display:grid;grid-template-columns:1.18fr .82fr;gap:22px}.hero-v3-main{position:relative;overflow:hidden;background:linear-gradient(135deg,#091326 0%,#0d1f40 35%,#154c91 100%);color:#fff;min-height:330px}.hero-v3-glow{position:absolute;border-radius:999px;filter:blur(26px);opacity:.48}.hero-v3-glow.g1{width:220px;height:220px;background:#2563eb;top:-70px;right:-30px}.hero-v3-glow.g2{width:180px;height:180px;background:#0ea5e9;bottom:-60px;left:10%}.hero-v3-kicker{position:relative;z-index:2;font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#cfe0fb}.hero-v3-main h2{position:relative;z-index:2;margin:18px 0 16px;font-size:58px;line-height:1.02;letter-spacing:-.055em;max-width:640px}.hero-v3-main p{position:relative;z-index:2;margin:0;max-width:690px;font-size:18px;line-height:1.8;color:#d6e3fa}.hero-v3-actions{position:relative;z-index:2;display:flex;gap:12px;margin-top:28px}.hero-v3-mini-grid{position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:28px}.hero-v3-mini-grid div{padding:16px;border-radius:20px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12)}.hero-v3-mini-grid span{display:block;font-size:13px;color:#d6e3fa}.hero-v3-mini-grid strong{display:block;margin-top:8px;font-size:30px}
.hero-v3-side{min-height:330px}.hero-side-top{display:flex;justify-content:space-between;align-items:center}.hero-side-top span{font-size:13px;color:#64748b;letter-spacing:.08em;text-transform:uppercase}.hero-side-value{font-size:76px;font-weight:900;line-height:1;letter-spacing:-.055em;margin-top:20px}.hero-side-title{font-size:24px;font-weight:900;margin-top:12px}.hero-v3-side p{color:#64748b;line-height:1.8}.hero-side-bars{display:grid;gap:14px;margin-top:22px}.bar-item{display:grid;grid-template-columns:110px 1fr auto;align-items:center;gap:12px}.bar-item span{font-size:13px;color:#64748b}.bar-track{height:10px;border-radius:999px;background:#edf2f7;overflow:hidden}.bar-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#2563eb,#0ea5e9)}.bar-fill.alt{background:linear-gradient(90deg,#0f172a,#2563eb)}
.kpi-grid-v3{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.kpi-card-v3{padding:22px}.kpi-card-top{display:flex;justify-content:space-between;align-items:center}.kpi-icon{width:44px;height:44px;border-radius:16px;display:grid;place-items:center;background:#0f172a;color:#fff;box-shadow:0 14px 28px rgba(15,23,42,.16)}.kpi-trend{display:inline-flex;align-items:center;gap:6px;padding:8px 10px;border-radius:999px;background:#f8fbff;border:1px solid #e7eef7;color:#1d4ed8;font-size:12px;font-weight:800}.kpi-label{margin-top:18px;color:#64748b;font-size:14px}.kpi-value{margin-top:8px;font-size:40px;font-weight:900;letter-spacing:-.04em}
.section-title-v3{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:22px}.section-title-v3 h3{margin:0;font-size:30px;line-height:1.05;letter-spacing:-.03em}.section-title-v3 p{margin:8px 0 0;color:#64748b;line-height:1.7}.dashboard-v3-grid-a{display:grid;grid-template-columns:1fr 1fr;gap:22px}.dashboard-v3-grid-b{display:grid;grid-template-columns:1.18fr .82fr;gap:22px}.panel-dark-v3{background:linear-gradient(180deg,#0c1730,#12264b);color:#fff;border-color:rgba(255,255,255,.08)}.panel-dark-v3 .section-title-v3 h3{color:#fff}.panel-dark-v3 .section-title-v3 p{color:#bfd0ef}
.radar-list-v3{display:flex;flex-direction:column;gap:12px}.radar-item-v3{width:100%;padding:16px;border-radius:20px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.06);display:grid;grid-template-columns:56px 1fr auto;gap:16px;align-items:center;color:#fff;cursor:pointer;text-align:left}.radar-index{width:44px;height:44px;border-radius:14px;background:rgba(255,255,255,.08);display:grid;place-items:center;font-weight:900;color:#d6e3fa}.radar-name{font-weight:800}.radar-sub{color:#bfd0ef;font-size:13px;margin-top:5px}.radar-side{display:flex;align-items:center;gap:10px;color:#d7e7ff;font-size:13px}
.project-cards-v3{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.project-card-v3{padding:18px;border-radius:22px;background:#f8fbff;border:1px solid #e6edf7}.project-card-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.project-code-v3{font-size:12px;color:#64748b;letter-spacing:.16em;text-transform:uppercase}.project-card-v3 h4{margin:8px 0 0;font-size:21px}.project-owner-v3{margin-top:12px;font-weight:800}.project-contact-v3{margin-top:6px;color:#64748b}.project-foot-v3{display:flex;justify-content:space-between;align-items:center;margin-top:18px;padding-top:14px;border-top:1px solid #e3eaf3}.project-foot-v3 span{color:#64748b}.project-foot-v3 strong{font-size:28px}
.stack-v3{display:flex;flex-direction:column;gap:22px}.metric-list-v3{display:flex;flex-direction:column;gap:14px}.metric-row-v3{display:flex;justify-content:space-between;align-items:center;padding:16px;border-radius:18px;background:#f8fbff;border:1px solid #e6edf7}.metric-row-v3 span{display:inline-flex;align-items:center;gap:8px;color:#64748b}.metric-row-v3 strong{font-size:26px}.launch-grid-v3{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.launch-tile-v3{padding:18px;border-radius:20px;border:1px solid #dce4ee;background:#fff;display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:800;color:#0f172a}
.table-wrap-v3{overflow:auto}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:16px 14px;border-bottom:1px solid #edf2f7;font-size:14px;vertical-align:middle}th{color:#64748b;font-weight:800;white-space:nowrap}td{color:#0f172a}.strong-v3{font-weight:800}.sub-v3{color:#64748b;font-size:13px;margin-top:4px}.table-wrap-v3 tbody tr:hover{background:#f8fbff}
.two-col-v3{display:grid;grid-template-columns:1.15fr .85fr;gap:22px}.form-grid-v3{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.full-span{grid-column:1/-1}.summary-v3{padding:18px;border-radius:22px;background:#f8fbff;border:1px solid #e6edf7;color:#475569;line-height:1.8;margin-bottom:18px}.summary-title-v3{font-weight:900;color:#0f172a;margin-bottom:6px}
.project-v3-layout{display:flex;flex-direction:column;gap:22px}.project-tabs-v3{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.project-tab-v3{padding:16px;border-radius:20px;border:1px solid #e6edf7;background:#fff;cursor:pointer;text-align:left}.project-tab-v3.active{background:linear-gradient(135deg,#0f172a,#173d72);color:#fff;border-color:#173d72}.project-tab-v3.active .sub-v3,.project-tab-v3.active .strong-v3{color:#fff}.contact-row-v3{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0 18px}.contact-pill-v3{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:999px;background:#f8fbff;border:1px solid #e6edf7;color:#334155}.manager-lite-v3{padding:16px;border-radius:22px;background:#f8fbff;border:1px solid #e6edf7;display:flex;flex-direction:column;gap:6px;color:#475569;margin-bottom:18px}
.approval-grid-v3{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.approval-card-v3{padding:18px;border-radius:24px;border:1px solid #e6edf7;background:#fff}.approval-top-v3{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.approval-top-v3 h4{margin:0;font-size:20px}.approval-top-v3 p{margin:8px 0 0;color:#64748b}.approval-body-v3{margin-top:14px;display:grid;gap:10px;color:#334155}.approval-actions-v3{display:flex;gap:10px;margin-top:18px}.empty-v3{padding:30px;border-radius:22px;background:#f8fbff;border:1px dashed #cbd5e1;color:#64748b;text-align:center}
.placeholder-grid-v3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.placeholder-box-v3{display:flex;align-items:center;gap:10px;padding:18px;border-radius:22px;border:1px solid #e6edf7;background:#f8fbff;font-weight:700;color:#334155}
.status-v3{display:inline-flex;align-items:center;padding:7px 12px;border-radius:999px;font-size:12px;font-weight:800;border:1px solid transparent}.status-v3.success{background:#ecfdf5;color:#047857;border-color:#a7f3d0}.status-v3.warning{background:#fffbeb;color:#b45309;border-color:#fde68a}.status-v3.danger{background:#fef2f2;color:#b91c1c;border-color:#fecaca}.status-v3.info{background:#eff6ff;color:#1d4ed8;border-color:#bfdbfe}.status-v3.neutral{background:#f8fafc;color:#475569;border-color:#e2e8f0}
@media (max-width:1280px){.login-v3-grid,.project-tabs-v3,.approval-grid-v3,.placeholder-grid-v3,.project-cards-v3,.launch-grid-v3,.kpi-grid-v3{grid-template-columns:repeat(2,1fr)}.dashboard-v3-grid-a,.dashboard-v3-grid-b,.two-col-v3,.login-v3-shell,.hero-v3-grid{grid-template-columns:1fr}}
@media (max-width:960px){.app-v3-shell{grid-template-columns:1fr}.sidebar-v3{position:fixed;left:0;top:0;bottom:0;width:300px;z-index:100;transform:translateX(-100%);transition:.22s ease}.sidebar-v3.show{transform:translateX(0)}.menu-v3-btn{display:inline-flex}.topbar-v3{flex-direction:column}.topbar-actions-v3{width:100%}.search-v3{min-width:100%}.form-grid-v3,.hero-v3-mini-grid,.project-cards-v3{grid-template-columns:1fr}.page-title-v3{font-size:36px}.login-v3-copy h1,.hero-v3-main h2{font-size:40px}}
@media (max-width:640px){.login-v3-page,.main-v3{padding:14px}.glass-card-v3,.login-v3-panel,.login-v3-left{padding:18px}.kpi-grid-v3,.login-v3-grid,.approval-grid-v3,.placeholder-grid-v3,.launch-grid-v3,.project-cards-v3{grid-template-columns:1fr}.page-title-v3{font-size:30px}.login-v3-copy{margin-top:42px}.login-v3-copy h1,.hero-v3-main h2{font-size:30px}.login-v3-head h2{font-size:34px}}
`;
