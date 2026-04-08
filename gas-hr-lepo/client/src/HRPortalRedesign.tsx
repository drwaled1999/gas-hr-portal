// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Plane,
  ShieldCheck,
  FileText,
  Search,
  LogOut,
  Building2,
  ClipboardCheck,
  ChevronRight,
  AlertTriangle,
  Clock3,
  Wallet,
  FolderOpen,
  KeyRound,
  Filter,
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
} from "lucide-react";

const users = {
  hrmanager: {
    password: "123456",
    name: "Walid Khalaf Alshammari",
    role: "HR Manager",
    email: "hr@gas.com",
  },
  walid: {
    password: "123456",
    name: "Walid Khalaf",
    role: "HR Admin",
    email: "admin@gas.com",
  },
  sara: {
    password: "123456",
    name: "Sara Ali",
    role: "Admin Assistant",
    email: "assistant@gas.com",
  },
};

const initialProjects = [
  {
    id: "qatif",
    name: "Qatif Project",
    code: "QAT-01",
    manager: "Mohammed Al Qahtani",
    phone: "+966 55 222 3344",
    email: "qatif.manager@gas.com",
    color: "#0f4c81",
    status: "Active",
  },
  {
    id: "qassim",
    name: "Qassim Project",
    code: "QAS-02",
    manager: "Saeed Al Mutairi",
    phone: "+966 54 777 1200",
    email: "qassim.manager@gas.com",
    color: "#2155a3",
    status: "Active",
  },
  {
    id: "zuluf",
    name: "Zuluf Project",
    code: "ZUL-03",
    manager: "Nasser Al Otaibi",
    phone: "+966 50 841 7701",
    email: "zuluf.manager@gas.com",
    color: "#16396b",
    status: "Active",
  },
  {
    id: "jubail",
    name: "Jubail Project",
    code: "JUB-04",
    manager: "Adel Ibrahim",
    phone: "+966 53 990 8431",
    email: "jubail.manager@gas.com",
    color: "#243b53",
    status: "Review",
  },
];

const initialEmployees = [
  {
    id: 1,
    name: "Ahmed Salem",
    employeeId: "GAS-2038",
    role: "Store Worker",
    projectId: "qatif",
    nationality: "Saudi",
    annualBalance: 30,
    usedLeave: 9,
    permissionsUsed: 3,
    status: "Active",
    manager: "Mohammed Al Qahtani",
  },
  {
    id: 2,
    name: "Muteb Al Bishi",
    employeeId: "GAS-2036",
    role: "Store Worker",
    projectId: "qatif",
    nationality: "Saudi",
    annualBalance: 30,
    usedLeave: 4,
    permissionsUsed: 1,
    status: "Active",
    manager: "Mohammed Al Qahtani",
  },
  {
    id: 3,
    name: "Faisal Al Harbi",
    employeeId: "GAS-2194",
    role: "Site Administrator",
    projectId: "zuluf",
    nationality: "Saudi",
    annualBalance: 35,
    usedLeave: 12,
    permissionsUsed: 6,
    status: "On Leave",
    manager: "Nasser Al Otaibi",
  },
  {
    id: 4,
    name: "Rashid Al Qahtani",
    employeeId: "GAS-2210",
    role: "Coordinator",
    projectId: "qassim",
    nationality: "Saudi",
    annualBalance: 30,
    usedLeave: 7,
    permissionsUsed: 2,
    status: "Active",
    manager: "Saeed Al Mutairi",
  },
  {
    id: 5,
    name: "Mahmoud Adel",
    employeeId: "GAS-2288",
    role: "Timekeeper",
    projectId: "jubail",
    nationality: "Egyptian",
    annualBalance: 30,
    usedLeave: 17,
    permissionsUsed: 5,
    status: "Pending Review",
    manager: "Adel Ibrahim",
  },
  {
    id: 6,
    name: "Waleed Nasser",
    employeeId: "GAS-2350",
    role: "HR Coordinator",
    projectId: "qassim",
    nationality: "Saudi",
    annualBalance: 30,
    usedLeave: 2,
    permissionsUsed: 1,
    status: "Active",
    manager: "Saeed Al Mutairi",
  },
];

const initialRequests = [
  {
    id: 1,
    employeeId: 3,
    employee: "Faisal Al Harbi",
    type: "Annual Leave",
    projectId: "zuluf",
    days: 5,
    status: "Pending",
    date: "2026-04-09",
    note: "Family travel",
  },
  {
    id: 2,
    employeeId: 4,
    employee: "Rashid Al Qahtani",
    type: "Permission",
    projectId: "qassim",
    days: 1,
    status: "Approved",
    date: "2026-04-08",
    note: "Medical appointment",
  },
  {
    id: 3,
    employeeId: 1,
    employee: "Ahmed Salem",
    type: "Takleef",
    projectId: "qatif",
    days: 2,
    status: "In Review",
    date: "2026-04-11",
    note: "Night shift assignment",
  },
  {
    id: 4,
    employeeId: 2,
    employee: "Muteb Al Bishi",
    type: "Annual Leave",
    projectId: "qatif",
    days: 3,
    status: "Pending",
    date: "2026-04-12",
    note: "Personal leave",
  },
];

const initialFiles = {
  qatif: [
    { id: 1, category: "Leave", title: "Annual Leave - Ahmed Salem.pdf", note: "Submitted for April review", status: "Pending" },
    { id: 2, category: "Takleef", title: "Night Shift Assignment - Week 2.pdf", note: "Approved by project manager", status: "Approved" },
  ],
  qassim: [
    { id: 3, category: "Leave", title: "Emergency Leave - Rashid.pdf", note: "Family emergency", status: "Approved" },
  ],
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
    <div className={`brand-mark ${small ? "small" : ""}`}>
      <div className="brand-inner">
        <div className="brand-main">GAS</div>
        <div className="brand-sub">HR SYSTEM</div>
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
  return <span className={`status-badge ${map[status] || "neutral"}`}>{status}</span>;
}

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function SectionHeader({ title, description, action }) {
  return (
    <div className="section-header">
      <div>
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

function StatCard({ icon: Icon, title, value, helper }) {
  return (
    <Card className="stat-card">
      <div>
        <div className="muted-label">{title}</div>
        <div className="stat-value">{value}</div>
        <div className="muted-text">{helper}</div>
      </div>
      <div className="icon-shell"><Icon size={20} /></div>
    </Card>
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
      <div className="login-shell-pro">
        <div className="login-left-pro">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="orb orb-c" />
          <div className="login-brand-row">
            <BrandMark />
            <div>
              <div className="caps">Enterprise Human Capital Platform</div>
              <div className="login-brand-title">GAS Workforce Suite</div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="hero-copy-pro">
            <h1>HR platform designed like modern enterprise systems.</h1>
            <p>
              Full workspace for employee records, annual leave balances, approvals, project ownership,
              manager contacts, internal HR requests and structured project files.
            </p>
          </motion.div>

          <div className="hero-panel-grid">
            <div className="glass-card">
              <span>Total Employees</span>
              <strong>64</strong>
            </div>
            <div className="glass-card">
              <span>Project Sites</span>
              <strong>4</strong>
            </div>
            <div className="glass-card">
              <span>Pending Approvals</span>
              <strong>6</strong>
            </div>
            <div className="glass-card">
              <span>Balance Control</span>
              <strong>Live</strong>
            </div>
          </div>
        </div>

        <div className="login-right-pro">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="login-panel-pro">
            <div className="login-panel-head">
              <BrandMark small />
              <div>
                <h2>Sign in</h2>
                <p>Secure access to the HR operating system</p>
              </div>
            </div>

            <div className="field-group">
              <label>Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
            </div>

            <div className="field-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </div>

            {error ? <div className="error-box">{error}</div> : null}

            <button className="btn primary full" onClick={submit}>Sign In to Workspace</button>

            <div className="demo-panel">
              <div className="demo-title">Demo accounts</div>
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
  const pendingApprovals = requests.filter((r) => r.status === "Pending" || r.status === "In Review").length;
  const activeEmployees = employees.filter((e) => e.status === "Active").length;
  const onLeaveEmployees = employees.filter((e) => e.status === "On Leave").length;

  return (
    <div className="dashboard-v2">
      <div className="hero-dashboard">
        <div className="hero-dashboard-copy">
          <div className="hero-kicker">Executive command center</div>
          <h2>Workforce intelligence at a glance.</h2>
          <p>
            Premium HR overview for approvals, annual leave balances, employee distribution,
            project ownership and daily operational visibility.
          </p>
          <div className="hero-action-row">
            <button className="btn primary" onClick={() => setActivePage("approvals")}>
              <BadgeCheck size={18} /> Review approvals
            </button>
            <button className="btn secondary" onClick={() => setActivePage("leaveBalances")}>
              <Wallet size={18} /> Manage balances
            </button>
          </div>
        </div>

        <div className="hero-spotlight-card">
          <div className="spotlight-top">
            <span className="spotlight-label">Today's HR Pulse</span>
            <StatusBadge status="Active" />
          </div>
          <div className="spotlight-value">{pendingApprovals}</div>
          <div className="spotlight-title">Requests need action</div>
          <div className="spotlight-meta">
            Prioritize approvals and keep project operations moving without delay.
          </div>
          <div className="spotlight-metrics">
            <div><span>Active</span><strong>{activeEmployees}</strong></div>
            <div><span>On leave</span><strong>{onLeaveEmployees}</strong></div>
            <div><span>Projects</span><strong>{projects.length}</strong></div>
          </div>
        </div>
      </div>

      <div className="premium-stat-grid">
        <StatCard icon={Users} title="Total Employees" value={employees.length} helper="Across all managed projects" />
        <StatCard icon={Building2} title="Project Sites" value={projects.length} helper="Dedicated HR ownership per project" />
        <StatCard icon={ClipboardCheck} title="Pending Approvals" value={pendingApprovals} helper="Annual leave, permission and takleef" />
        <StatCard icon={Wallet} title="Remaining Leave" value={remainingLeave} helper="Live balance based on manual control" />
      </div>

      <div className="dashboard-lux-grid">
        <Card className="glass-panel dark-panel">
          <SectionHeader
            title="Approval Priority Board"
            description="High-visibility review queue for HR decision making."
            action={<button className="btn secondary" onClick={() => setActivePage("approvals")}>Open workspace</button>}
          />
          <div className="priority-list">
            {requests.slice(0, 4).map((req) => (
              <button key={req.id} className="priority-item" onClick={() => setActivePage("approvals")}>
                <div className="priority-main">
                  <div className="priority-name">{req.employee}</div>
                  <div className="priority-sub">{req.type} • {projectName(projects, req.projectId)}</div>
                </div>
                <div className="priority-side">
                  <StatusBadge status={req.status} />
                  <span>{req.days} day(s)</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="glass-panel">
          <SectionHeader title="Project Portfolio" description="Manager ownership and employee distribution by project." />
          <div className="project-portfolio-grid">
            {projects.map((project) => {
              const count = employees.filter((e) => e.projectId === project.id).length;
              return (
                <div key={project.id} className="project-portfolio-card">
                  <div className="portfolio-head">
                    <div>
                      <div className="portfolio-code">{project.code}</div>
                      <h4>{project.name}</h4>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>
                  <div className="portfolio-manager">{project.manager}</div>
                  <div className="portfolio-contact">{project.phone}</div>
                  <div className="portfolio-footer">
                    <span>Employees assigned</span>
                    <strong>{count}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="dashboard-bottom-grid">
        <Card className="glass-panel">
          <SectionHeader title="Workforce Overview" description="Professional employee summary with direct operational insight." />
          <div className="table-wrap premium-table">
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
                    <td>
                      <div className="strong">{emp.name}</div>
                      <div className="sub">{emp.role}</div>
                    </td>
                    <td>{projectName(projects, emp.projectId)}</td>
                    <td>{emp.manager}</td>
                    <td>{emp.annualBalance - emp.usedLeave} days</td>
                    <td><StatusBadge status={emp.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="stack-col">
          <Card className="glass-panel metric-panel">
            <SectionHeader title="Live Metrics" description="Fast operational snapshot." />
            <div className="metric-list-v2">
              <div className="metric-row"><span>Active employees</span><strong>{activeEmployees}</strong></div>
              <div className="metric-row"><span>Employees on leave</span><strong>{onLeaveEmployees}</strong></div>
              <div className="metric-row"><span>Pending review</span><strong>{employees.filter((e) => e.status === "Pending Review").length}</strong></div>
              <div className="metric-row"><span>Requests this cycle</span><strong>{requests.length}</strong></div>
            </div>
          </Card>

          <Card className="glass-panel metric-panel">
            <SectionHeader title="Quick Actions" description="Launch the most used HR workflows." />
            <div className="quick-actions-grid v2">
              <button className="action-pro" onClick={() => setActivePage("employees")}><UserPlus size={18} /><span>Add employee</span><ChevronRight size={16} /></button>
              <button className="action-pro" onClick={() => setActivePage("requests")}><Plane size={18} /><span>Create request</span><ChevronRight size={16} /></button>
              <button className="action-pro" onClick={() => setActivePage("projects")}><FolderKanban size={18} /><span>Open projects</span><ChevronRight size={16} /></button>
              <button className="action-pro" onClick={() => setActivePage("files")}><FolderOpen size={18} /><span>Project files</span><ChevronRight size={16} /></button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function EmployeesPage({ employees, setEmployees, projects }) {
  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    role: "",
    projectId: projects[0]?.id || "",
    nationality: "Saudi",
    annualBalance: 30,
    usedLeave: 0,
    permissionsUsed: 0,
    status: "Active",
  });

  const addEmployee = () => {
    if (!form.name || !form.employeeId || !form.role) return;
    const proj = projects.find((p) => p.id === form.projectId);
    setEmployees((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...form,
        manager: proj?.manager || "",
      },
    ]);
    setForm({
      name: "",
      employeeId: "",
      role: "",
      projectId: projects[0]?.id || "",
      nationality: "Saudi",
      annualBalance: 30,
      usedLeave: 0,
      permissionsUsed: 0,
      status: "Active",
    });
  };

  return (
    <div className="two-col-layout">
      <Card>
        <SectionHeader title="Employees Directory" description="Project-linked employee master records with manager ownership." />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Project</th>
                <th>Manager</th>
                <th>Balance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td><div className="strong">{emp.name}</div><div className="sub">{emp.role}</div></td>
                  <td>{emp.employeeId}</td>
                  <td>{projectName(projects, emp.projectId)}</td>
                  <td>{emp.manager}</td>
                  <td>{emp.annualBalance - emp.usedLeave} days</td>
                  <td><StatusBadge status={emp.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Add Employee" description="Create a new employee and assign them to a specific project." />
        <div className="form-grid-2">
          <div className="field-group"><label>Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="field-group"><label>Employee ID</label><input value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} /></div>
          <div className="field-group"><label>Role</label><input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
          <div className="field-group"><label>Project</label><select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })}>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
          <div className="field-group"><label>Nationality</label><input value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} /></div>
          <div className="field-group"><label>Status</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Active</option><option>On Leave</option><option>Pending Review</option></select></div>
          <div className="field-group"><label>Annual Leave</label><input type="number" value={form.annualBalance} onChange={(e) => setForm({ ...form, annualBalance: Number(e.target.value) })} /></div>
          <div className="field-group"><label>Used Leave</label><input type="number" value={form.usedLeave} onChange={(e) => setForm({ ...form, usedLeave: Number(e.target.value) })} /></div>
        </div>
        <button className="btn primary full" onClick={addEmployee}><UserPlus size={18} />Save Employee</button>
      </Card>
    </div>
  );
}

function LeaveBalancesPage({ employees, setEmployees, projects }) {
  const [selectedId, setSelectedId] = useState(String(employees[0]?.id || ""));
  const [annualBalance, setAnnualBalance] = useState(employees[0]?.annualBalance || 30);
  const [usedLeave, setUsedLeave] = useState(employees[0]?.usedLeave || 0);

  const selectedEmployee = employees.find((e) => String(e.id) === selectedId);

  React.useEffect(() => {
    if (selectedEmployee) {
      setAnnualBalance(selectedEmployee.annualBalance);
      setUsedLeave(selectedEmployee.usedLeave);
    }
  }, [selectedId]);

  const saveBalance = () => {
    setEmployees((prev) => prev.map((emp) => String(emp.id) === selectedId ? { ...emp, annualBalance: Number(annualBalance), usedLeave: Number(usedLeave) } : emp));
  };

  return (
    <div className="two-col-layout">
      <Card>
        <SectionHeader title="Annual Leave Balances" description="Manually control the annual leave allocation and consumption for each employee." />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Project</th>
                <th>Annual Balance</th>
                <th>Used Leave</th>
                <th>Remaining</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{projectName(projects, emp.projectId)}</td>
                  <td>{emp.annualBalance}</td>
                  <td>{emp.usedLeave}</td>
                  <td>{Math.max(emp.annualBalance - emp.usedLeave, 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Update Balance" description="Select any employee and update leave values directly." />
        <div className="field-group"><label>Employee</label><select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>{employees.map((emp) => <option key={emp.id} value={String(emp.id)}>{emp.name} - {projectName(projects, emp.projectId)}</option>)}</select></div>
        <div className="form-grid-2">
          <div className="field-group"><label>Annual Leave Allocation</label><input type="number" value={annualBalance} onChange={(e) => setAnnualBalance(Number(e.target.value))} /></div>
          <div className="field-group"><label>Used Leave</label><input type="number" value={usedLeave} onChange={(e) => setUsedLeave(Number(e.target.value))} /></div>
        </div>
        {selectedEmployee ? <div className="summary-box"><div className="summary-title">{selectedEmployee.name}</div><div>Project: {projectName(projects, selectedEmployee.projectId)}</div><div>Remaining after save: {Math.max(annualBalance - usedLeave, 0)} days</div></div> : null}
        <button className="btn primary full" onClick={saveBalance}><Wallet size={18} />Save Leave Balance</button>
      </Card>
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
    <Card>
      <SectionHeader title="Approval Workspace" description="Review and approve annual leave, permissions and takleef requests." />
      <div className="approval-grid">
        {pending.length === 0 ? <div className="empty-state">No pending approvals right now.</div> : pending.map((req) => {
          const emp = employees.find((e) => e.id === req.employeeId);
          return (
            <div key={req.id} className="approval-card">
              <div className="approval-top">
                <div>
                  <h4>{req.employee}</h4>
                  <p>{req.type} • {projectName(projects, req.projectId)}</p>
                </div>
                <StatusBadge status={req.status} />
              </div>
              <div className="approval-body">
                <div><strong>Days:</strong> {req.days}</div>
                <div><strong>Date:</strong> {req.date}</div>
                <div><strong>Note:</strong> {req.note}</div>
                {emp ? <div><strong>Current balance:</strong> {Math.max(emp.annualBalance - emp.usedLeave, 0)} days</div> : null}
              </div>
              <div className="approval-actions">
                <button className="btn success" onClick={() => handleDecision(req.id, "Approved")}><CheckCircle2 size={18} />Approve</button>
                <button className="btn danger" onClick={() => handleDecision(req.id, "Rejected")}><XCircle size={18} />Reject</button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function RequestsPage({ employees, requests, setRequests, projects }) {
  const [form, setForm] = useState({
    employeeId: String(employees[0]?.id || ""),
    type: "Annual Leave",
    days: 1,
    note: "",
  });

  const createRequest = () => {
    const emp = employees.find((e) => String(e.id) === form.employeeId);
    if (!emp) return;
    setRequests((prev) => [{
      id: Date.now(),
      employeeId: emp.id,
      employee: emp.name,
      type: form.type,
      projectId: emp.projectId,
      days: Number(form.days),
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
      note: form.note,
    }, ...prev]);
    setForm({ employeeId: String(employees[0]?.id || ""), type: "Annual Leave", days: 1, note: "" });
  };

  return (
    <div className="two-col-layout">
      <Card>
        <SectionHeader title="Submit Leave / Takleef Request" description="Create annual leave, permission or takleef requests for employees." />
        <div className="form-grid-2">
          <div className="field-group"><label>Employee</label><select value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })}>{employees.map((emp) => <option key={emp.id} value={String(emp.id)}>{emp.name} - {projectName(projects, emp.projectId)}</option>)}</select></div>
          <div className="field-group"><label>Type</label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>Annual Leave</option><option>Permission</option><option>Takleef</option></select></div>
          <div className="field-group"><label>Days</label><input type="number" value={form.days} onChange={(e) => setForm({ ...form, days: Number(e.target.value) })} /></div>
          <div className="field-group full-span"><label>Note</label><textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Request details" /></div>
        </div>
        <button className="btn primary full" onClick={createRequest}><Plane size={18} />Create Request</button>
      </Card>

      <Card>
        <SectionHeader title="Request Tracker" description="All HR requests by project and current decision state." />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Project</th>
                <th>Days</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.employee}</td>
                  <td>{req.type}</td>
                  <td>{projectName(projects, req.projectId)}</td>
                  <td>{req.days}</td>
                  <td>{req.date}</td>
                  <td><StatusBadge status={req.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
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

  React.useEffect(() => {
    const p = projects.find((x) => x.id === activeProject);
    if (p) {
      setManager(p.manager);
      setPhone(p.phone);
      setEmail(p.email);
    }
  }, [activeProject, projects]);

  const saveManagerInfo = () => {
    setProjects((prev) => prev.map((p) => p.id === activeProject ? { ...p, manager, phone, email } : p));
  };

  return (
    <div className="project-page-layout">
      <Card>
        <SectionHeader title="Project Structure" description="Each project has its own employees, manager and contact information." />
        <div className="project-tabs">
          {projects.map((item) => (
            <button key={item.id} className={`project-tab ${activeProject === item.id ? "active" : ""}`} onClick={() => setActiveProject(item.id)}>
              <div className="strong">{item.name}</div>
              <div className="sub">{item.code}</div>
            </button>
          ))}
        </div>
      </Card>

      <div className="two-col-layout">
        <Card>
          <SectionHeader title={`${project?.name || ""} Manager`} description="Primary manager and contact details for this project." />
          <div className="form-grid-2">
            <div className="field-group"><label>Manager Name</label><input value={manager} onChange={(e) => setManager(e.target.value)} /></div>
            <div className="field-group"><label>Phone Number</label><input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
            <div className="field-group full-span"><label>Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          </div>
          <div className="contact-row">
            <div className="contact-pill"><UserCog size={16} />{manager}</div>
            <div className="contact-pill"><Phone size={16} />{phone}</div>
            <div className="contact-pill"><Mail size={16} />{email}</div>
          </div>
          <button className="btn primary full" onClick={saveManagerInfo}>Save Project Contact</button>
        </Card>

        <Card>
          <SectionHeader title="Employees in Project" description="Only employees assigned to this project are shown below." />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Role</th>
                  <th>ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {projectEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.role}</td>
                    <td>{emp.employeeId}</td>
                    <td><StatusBadge status={emp.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
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
    setFilesByProject((prev) => ({
      ...prev,
      [activeProject]: [
        ...(prev[activeProject] || []),
        { id: Date.now(), category: form.category, title: form.title, note: form.note, status: "Pending" },
      ],
    }));
    setForm({ category: "Leave", title: "", note: "" });
  };

  return (
    <div className="two-col-layout">
      <Card>
        <SectionHeader title="Project Files" description="Separate leave and task records for each project." />
        <div className="field-group"><label>Project</label><select value={activeProject} onChange={(e) => setActiveProject(e.target.value)}>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
        <div className="manager-card-lite"><strong>{project?.manager}</strong><span>{project?.phone}</span></div>
        <div className="form-grid-2">
          <div className="field-group"><label>Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>Leave</option><option>Takleef</option><option>Permission</option><option>Other</option></select></div>
          <div className="field-group"><label>File Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="example.pdf" /></div>
          <div className="field-group full-span"><label>Note</label><textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Document note" /></div>
        </div>
        <button className="btn primary full" onClick={addFile}><FolderOpen size={18} />Add File Record</button>
      </Card>

      <Card>
        <SectionHeader title={`${project?.name || ""} Records`} description="Files attached to the selected project section." />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Title</th>
                <th>Note</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((file) => (
                <tr key={file.id}>
                  <td>{file.category}</td>
                  <td>{file.title}</td>
                  <td>{file.note}</td>
                  <td><StatusBadge status={file.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function PlaceholderPage({ title, description }) {
  return (
    <Card>
      <SectionHeader title={title} description={description} />
      <div className="placeholder-grid">
        <div className="placeholder-box"><Briefcase size={18} /><span>Enterprise-ready widgets</span></div>
        <div className="placeholder-box"><ClipboardCheck size={18} /><span>Approval workflows</span></div>
        <div className="placeholder-box"><FileText size={18} /><span>Printable summary cards</span></div>
      </div>
    </Card>
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
      <div className="app-shell-pro">
        <AnimatePresence>
          {(mobileSidebar || window.innerWidth > 960) && (
            <motion.aside initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className={`sidebar-pro ${mobileSidebar ? "show" : ""}`}>
              <div className="sidebar-top-pro">
                <div className="sidebar-brand-row">
                  <BrandMark />
                  <div>
                    <div className="sidebar-title-pro">GAS Portal</div>
                    <div className="sidebar-sub-pro">Human Capital Workspace</div>
                  </div>
                </div>

                <div className="profile-card-pro">
                  <div className="avatar-pro">WK</div>
                  <div>
                    <div className="strong light">{currentUser.name}</div>
                    <div className="sub light">{currentUser.role}</div>
                  </div>
                </div>
              </div>

              <nav className="nav-pro">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.key} className={`nav-btn-pro ${activePage === item.key ? "active" : ""}`} onClick={() => { setActivePage(item.key); setMobileSidebar(false); }}>
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="project-strip">
                <div className="caps light">Project Sections</div>
                {projects.map((p) => <div key={p.id} className="project-chip-dark">{p.name}</div>)}
              </div>

              <button className="btn secondary full" onClick={() => setCurrentUser(null)}><LogOut size={18} />Logout</button>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="main-pro">
          <Card className="topbar-pro">
            <div>
              <button className="menu-btn-pro" onClick={() => setMobileSidebar(!mobileSidebar)}><Menu size={18} /></button>
              <div className="caps dark">Human Resources Platform</div>
              <h1 className="page-title-pro">
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
              <p className="topbar-sub">Signed in as {currentUser.name} ({currentUser.role})</p>
            </div>
            <div className="topbar-actions-pro">
              <div className="search-pro"><Search size={16} /><input placeholder="Search employees, projects, approvals..." /></div>
              <button className="btn secondary"><Bell size={16} />Alerts</button>
              <button className="btn primary" onClick={() => setActivePage("requests")}><Plus size={16} />New Request</button>
            </div>
          </Card>

          <div className="content-stack">
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
:root{--bg:#eef3f8;--card:#ffffff;--border:#e7edf5;--text:#0f172a;--muted:#64748b;--nav:#061331;--nav2:#0a204a;--primary:#0f172a;--primary2:#173d72;--success:#059669;--warning:#d97706;--danger:#dc2626;--info:#2563eb;font-family:Inter,Arial,sans-serif}
*{box-sizing:border-box}html,body,#root{margin:0;min-height:100%;background:linear-gradient(180deg,#edf2f7 0%,#f7f9fc 100%)}body{margin:0;color:var(--text)}button,input,select,textarea{font:inherit}
.card{background:rgba(255,255,255,.84);border:1px solid rgba(226,232,240,.9);border-radius:30px;box-shadow:0 20px 50px rgba(15,23,42,.06);padding:28px;backdrop-filter:blur(14px)}
.btn{height:48px;border:none;border-radius:16px;padding:0 18px;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-weight:800;cursor:pointer;transition:.18s ease}.btn:hover{transform:translateY(-1px)}.btn.primary{background:linear-gradient(135deg,#0c1630,#1d4d8d);color:#fff;box-shadow:0 18px 34px rgba(29,77,141,.24)}.btn.secondary{background:rgba(255,255,255,.9);color:#0f172a;border:1px solid #dbe3ee}.btn.success{background:#ecfdf5;color:#047857;border:1px solid #a7f3d0}.btn.danger{background:#fef2f2;color:#b91c1c;border:1px solid #fecaca}.full{width:100%}
.brand-mark{height:66px;width:66px;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,.14);background:#020617;box-shadow:0 18px 40px rgba(2,6,23,.25)}.brand-mark.small{height:48px;width:48px;border-radius:18px}.brand-inner{width:100%;height:100%;display:grid;place-items:center;background:radial-gradient(circle at top left,rgba(59,130,246,.65),transparent 45%),linear-gradient(135deg,#020617,#0f172a,#111827)}.brand-main{font-size:27px;font-weight:900;line-height:1;color:#fff}.brand-mark.small .brand-main{font-size:18px}.brand-sub{font-size:8px;letter-spacing:.25em;color:#dbeafe;text-align:center}
.caps{font-size:12px;letter-spacing:.28em;text-transform:uppercase}.caps.light{color:#b9c8e8}.caps.dark{color:#718096}.muted-label{font-size:14px;color:#64748b}.muted-text{font-size:14px;color:#64748b;margin-top:8px}.strong{font-weight:800}.strong.light{color:#fff}.sub{color:#64748b;font-size:13px;margin-top:4px}.sub.light{color:#c9d4ea}
.login-page{min-height:100vh;padding:24px;background:radial-gradient(circle at top left,rgba(59,130,246,.16),transparent 20%),radial-gradient(circle at bottom right,rgba(15,23,42,.12),transparent 32%),linear-gradient(135deg,#e8eef6,#f8fbff,#dde8fb)}
.login-shell-pro{max-width:1480px;min-height:calc(100vh - 48px);margin:0 auto;display:grid;grid-template-columns:1.08fr .92fr;background:rgba(255,255,255,.72);border:1px solid rgba(255,255,255,.55);border-radius:36px;overflow:hidden;backdrop-filter:blur(16px);box-shadow:0 32px 90px rgba(15,23,42,.18)}
.login-left-pro{position:relative;padding:42px;background:linear-gradient(145deg,#020617 0%,#0e1b38 40%,#0a2b5f 100%);color:#fff;display:flex;flex-direction:column;overflow:hidden}.orb{position:absolute;border-radius:999px;filter:blur(20px);opacity:.5}.orb-a{width:240px;height:240px;background:#2563eb;top:-80px;left:-50px}.orb-b{width:220px;height:220px;background:#1d4ed8;right:-60px;top:40px}.orb-c{width:260px;height:260px;background:#0ea5e9;bottom:-120px;left:20%}
.login-brand-row{display:flex;align-items:center;gap:16px;position:relative;z-index:2}.login-brand-title{font-size:28px;font-weight:800;margin-top:8px}.hero-copy-pro{max-width:760px;margin-top:82px;position:relative;z-index:2}.hero-copy-pro h1{margin:0 0 20px;font-size:58px;line-height:1.04;letter-spacing:-.04em;font-weight:900}.hero-copy-pro p{margin:0;max-width:700px;font-size:20px;line-height:1.8;color:#cfdbef}.hero-panel-grid{margin-top:auto;display:grid;grid-template-columns:repeat(4,1fr);gap:16px;position:relative;z-index:2}.glass-card{padding:22px;border-radius:24px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.08);backdrop-filter:blur(14px)}.glass-card span{display:block;color:#d4deef;font-size:14px}.glass-card strong{display:block;margin-top:12px;font-size:34px}
.login-right-pro{display:flex;align-items:center;justify-content:center;padding:34px}.login-panel-pro{width:100%;max-width:560px;background:#fff;border:1px solid #e2e8f0;border-radius:32px;padding:38px;box-shadow:0 30px 90px -35px rgba(15,23,42,.35)}.login-panel-head{display:flex;align-items:center;gap:16px;margin-bottom:30px}.login-panel-head h2{margin:0;font-size:42px;letter-spacing:-.03em;font-weight:900}.login-panel-head p{margin:8px 0 0;color:#64748b}
.field-group{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}.field-group label{font-size:14px;font-weight:700;color:#334155}.field-group input,.field-group select,.field-group textarea,.search-pro input{width:100%;border:1px solid #d7e0ea;border-radius:16px;background:#fff;color:#0f172a;outline:none;transition:.18s ease}.field-group input,.field-group select,.search-pro input{height:50px;padding:0 16px}.field-group textarea{min-height:120px;padding:14px 16px;resize:vertical}.field-group input:focus,.field-group select:focus,.field-group textarea:focus,.search-pro input:focus{border-color:#93c5fd;box-shadow:0 0 0 4px rgba(147,197,253,.2)}
.demo-panel{margin-top:22px;border-radius:24px;border:1px solid #e5ebf3;background:#f8fbff;padding:20px;color:#475569}.demo-title{font-weight:800;margin-bottom:12px}.error-box{background:#fef2f2;border:1px solid #fecaca;color:#b91c1c;padding:12px 14px;border-radius:16px;margin-bottom:16px}
.app-shell-pro{min-height:100vh;display:grid;grid-template-columns:320px 1fr;background:linear-gradient(180deg,#edf2f7 0%,#f7f9fc 100%)}.sidebar-pro{padding:24px;background:radial-gradient(circle at top left,rgba(96,165,250,.16),transparent 25%),radial-gradient(circle at bottom right,rgba(37,99,235,.18),transparent 22%),linear-gradient(180deg,#04102b 0%,#081938 45%,#092a59 100%);color:#fff;display:flex;flex-direction:column;gap:22px}.sidebar-brand-row{display:flex;align-items:center;gap:14px}.sidebar-title-pro{font-size:34px;font-weight:900;line-height:1;letter-spacing:-.04em}.sidebar-sub-pro{font-size:13px;color:#cdd8ea;margin-top:6px}.profile-card-pro{display:flex;gap:14px;align-items:center;padding:16px;border-radius:24px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04))}.avatar-pro{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.15);font-weight:800}
.nav-pro{display:flex;flex-direction:column;gap:10px}.nav-btn-pro{height:52px;border:none;border-radius:18px;background:transparent;color:#e7eefc;display:flex;align-items:center;gap:12px;padding:0 16px;font-weight:700;cursor:pointer;text-align:left}.nav-btn-pro:hover{background:rgba(255,255,255,.08)}.nav-btn-pro.active{background:#fff;color:#0f172a;box-shadow:0 16px 35px rgba(2,6,23,.18)}.project-strip{margin-top:8px}.project-chip-dark{padding:12px 14px;border-radius:18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#e5eefc;margin-top:10px;font-size:14px}
.main-pro{padding:22px}.topbar-pro{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:22px;background:linear-gradient(180deg,rgba(255,255,255,.95),rgba(255,255,255,.82))}.page-title-pro{margin:6px 0 0;font-size:46px;line-height:1.02;letter-spacing:-.04em;max-width:720px}.topbar-sub{margin:10px 0 0;color:#64748b;font-size:18px}.topbar-actions-pro{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.search-pro{min-width:320px;height:50px;border-radius:16px;border:1px solid #d7e0ea;background:#fff;padding:0 14px;display:flex;align-items:center;gap:10px}.search-pro input{border:none;box-shadow:none;background:transparent;padding:0}.content-stack,.page-grid-stack,.stack-col{display:flex;flex-direction:column;gap:22px}
.dashboard-v2{display:flex;flex-direction:column;gap:22px}.hero-dashboard{display:grid;grid-template-columns:1.2fr .8fr;gap:22px}.hero-dashboard-copy{padding:34px;border-radius:34px;background:linear-gradient(135deg,#0c1630 0%,#11254b 38%,#1b4f91 100%);color:#fff;position:relative;overflow:hidden;box-shadow:0 24px 60px rgba(12,22,48,.22)}.hero-dashboard-copy:before{content:"";position:absolute;right:-60px;top:-60px;width:220px;height:220px;border-radius:999px;background:radial-gradient(circle,rgba(255,255,255,.18),transparent 60%)}.hero-dashboard-copy:after{content:"";position:absolute;left:-40px;bottom:-60px;width:180px;height:180px;border-radius:999px;background:radial-gradient(circle,rgba(96,165,250,.28),transparent 60%)}.hero-kicker{font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#d7e7ff;position:relative;z-index:2}.hero-dashboard-copy h2{margin:14px 0 14px;font-size:54px;line-height:1.02;letter-spacing:-.05em;max-width:580px;position:relative;z-index:2}.hero-dashboard-copy p{margin:0;max-width:620px;color:#d8e5fb;font-size:18px;line-height:1.8;position:relative;z-index:2}.hero-action-row{display:flex;gap:12px;margin-top:28px;position:relative;z-index:2}.hero-spotlight-card{padding:30px;border-radius:34px;background:linear-gradient(180deg,#ffffff,#f8fbff);border:1px solid #e4ebf4;box-shadow:0 24px 50px rgba(15,23,42,.07)}.spotlight-top{display:flex;justify-content:space-between;align-items:center}.spotlight-label{font-size:13px;color:#64748b;letter-spacing:.08em;text-transform:uppercase}.spotlight-value{font-size:74px;font-weight:900;line-height:1;letter-spacing:-.05em;margin-top:20px}.spotlight-title{font-size:24px;font-weight:800;margin-top:12px}.spotlight-meta{margin-top:10px;color:#64748b;line-height:1.8}.spotlight-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:26px}.spotlight-metrics div{padding:14px;border-radius:18px;background:#f8fbff;border:1px solid #e6edf7}.spotlight-metrics span{display:block;font-size:12px;color:#64748b}.spotlight-metrics strong{display:block;margin-top:6px;font-size:24px}
.premium-stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.stat-card{display:flex;justify-content:space-between;align-items:flex-start;background:linear-gradient(180deg,rgba(255,255,255,.95),rgba(255,255,255,.82))}.stat-value{font-size:38px;font-weight:900;letter-spacing:-.03em;margin-top:10px}.icon-shell{width:46px;height:46px;border-radius:16px;background:#0f172a;color:#fff;display:grid;place-items:center;flex-shrink:0;box-shadow:0 14px 28px rgba(15,23,42,.16)}.icon-shell.small{width:40px;height:40px}
.section-header{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:20px}.section-header h3{margin:0;font-size:30px;line-height:1.05;letter-spacing:-.03em}.section-header p{margin:8px 0 0;color:#64748b;line-height:1.7}.dashboard-lux-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}.dashboard-bottom-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:22px}.glass-panel{background:linear-gradient(180deg,rgba(255,255,255,.95),rgba(255,255,255,.82))}.dark-panel{background:linear-gradient(180deg,#0d1831,#12254a);color:#fff;border-color:rgba(255,255,255,.08)}.dark-panel .section-header h3,.dark-panel .section-header p{color:#fff}.dark-panel .section-header p{color:#bfd0ef}
.priority-list{display:flex;flex-direction:column;gap:12px}.priority-item{width:100%;padding:16px;border-radius:20px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.06);display:flex;justify-content:space-between;gap:16px;align-items:center;color:#fff;cursor:pointer;text-align:left}.priority-name{font-weight:800}.priority-sub{color:#bfd0ef;font-size:13px;margin-top:5px}.priority-side{display:flex;align-items:center;gap:10px;color:#d7e7ff;font-size:13px}
.project-portfolio-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.project-portfolio-card{padding:18px;border-radius:22px;background:#f8fbff;border:1px solid #e6edf7}.portfolio-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.portfolio-code{font-size:12px;color:#64748b;letter-spacing:.16em;text-transform:uppercase}.project-portfolio-card h4{margin:8px 0 0;font-size:21px}.portfolio-manager{margin-top:12px;font-weight:700}.portfolio-contact{margin-top:6px;color:#64748b}.portfolio-footer{display:flex;justify-content:space-between;align-items:center;margin-top:18px;padding-top:14px;border-top:1px solid #e3eaf3}.portfolio-footer span{color:#64748b}.portfolio-footer strong{font-size:28px}
.metric-panel{height:100%}.metric-list-v2{display:flex;flex-direction:column;gap:14px}.metric-row{display:flex;justify-content:space-between;align-items:center;padding:16px;border-radius:18px;background:#f8fbff;border:1px solid #e6edf7}.metric-row span{color:#64748b}.metric-row strong{font-size:26px}
.quick-actions-grid.v2{display:grid;gap:12px}.action-pro{width:100%;display:flex;align-items:center;gap:12px;justify-content:space-between;padding:16px;border-radius:18px;border:1px solid #dce4ee;background:#fff;cursor:pointer;font-weight:800}.action-pro span{flex:1;text-align:left}
.mini-kpi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:18px}.mini-kpi{background:#f8fbff;border:1px solid #e6edf7;border-radius:22px;padding:18px}.mini-kpi span{font-size:14px;color:#64748b}.mini-kpi strong{display:block;margin-top:12px;font-size:32px}
.alert-list-pro{display:flex;flex-direction:column;gap:14px}.alert-card-btn{width:100%;display:flex;gap:12px;align-items:flex-start;padding:14px;border-radius:20px;border:1px solid #e6edf7;background:#fff;cursor:pointer;text-align:left}.alert-card-btn p{margin:6px 0 0;color:#64748b}
.two-col-layout{display:grid;grid-template-columns:1.15fr .85fr;gap:22px}.form-grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.full-span{grid-column:1/-1}.summary-box{padding:18px;border-radius:22px;background:#f8fbff;border:1px solid #e6edf7;color:#475569;line-height:1.8;margin-bottom:18px}.summary-title{font-weight:900;color:#0f172a;margin-bottom:6px}
.project-page-layout{display:flex;flex-direction:column;gap:22px}.project-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.project-tab{padding:16px;border-radius:20px;border:1px solid #e6edf7;background:#fff;cursor:pointer;text-align:left}.project-tab.active{background:linear-gradient(135deg,#0f172a,#173d72);color:#fff;border-color:#173d72}.project-tab.active .sub,.project-tab.active .strong{color:#fff}.contact-row{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0 18px}.contact-pill{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:999px;background:#f8fbff;border:1px solid #e6edf7;color:#334155}.manager-card-lite{padding:16px;border-radius:22px;background:#f8fbff;border:1px solid #e6edf7;display:flex;flex-direction:column;gap:6px;color:#475569;margin-bottom:18px}
.approval-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.approval-card{padding:18px;border-radius:24px;border:1px solid #e6edf7;background:#fff}.approval-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.approval-top h4{margin:0;font-size:20px}.approval-top p{margin:8px 0 0;color:#64748b}.approval-body{margin-top:14px;display:grid;gap:10px;color:#334155}.approval-actions{display:flex;gap:10px;margin-top:18px}.empty-state{padding:30px;border-radius:22px;background:#f8fbff;border:1px dashed #cbd5e1;color:#64748b;text-align:center}
.placeholder-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.placeholder-box{display:flex;align-items:center;gap:10px;padding:18px;border-radius:22px;border:1px solid #e6edf7;background:#f8fbff;font-weight:700;color:#334155}
.status-badge{display:inline-flex;align-items:center;padding:7px 12px;border-radius:999px;font-size:12px;font-weight:800;border:1px solid transparent}.status-badge.success{background:#ecfdf5;color:#047857;border-color:#a7f3d0}.status-badge.warning{background:#fffbeb;color:#b45309;border-color:#fde68a}.status-badge.danger{background:#fef2f2;color:#b91c1c;border-color:#fecaca}.status-badge.info{background:#eff6ff;color:#1d4ed8;border-color:#bfdbfe}.status-badge.neutral{background:#f8fafc;color:#475569;border-color:#e2e8f0}
.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:16px 14px;border-bottom:1px solid #edf2f7;font-size:14px;vertical-align:middle}th{color:#64748b;font-weight:800;white-space:nowrap}td{color:#0f172a}.premium-table table tbody tr:hover{background:#f8fbff}
.menu-btn-pro{display:none;width:42px;height:42px;border-radius:14px;border:1px solid #dce4ee;background:#fff;margin-bottom:10px;align-items:center;justify-content:center;cursor:pointer}
@media (max-width:1280px){.premium-stat-grid,.project-tabs,.hero-panel-grid,.approval-grid,.placeholder-grid,.project-portfolio-grid{grid-template-columns:repeat(2,1fr)}.dashboard-lux-grid,.dashboard-bottom-grid,.two-col-layout,.login-shell-pro,.hero-dashboard{grid-template-columns:1fr}}
@media (max-width:960px){.app-shell-pro{grid-template-columns:1fr}.sidebar-pro{position:fixed;left:0;top:0;bottom:0;width:300px;z-index:100;transform:translateX(-100%);transition:.22s ease}.sidebar-pro.show{transform:translateX(0)}.menu-btn-pro{display:inline-flex}.topbar-pro{flex-direction:column}.topbar-actions-pro{width:100%}.search-pro{min-width:100%}.project-page-layout,.form-grid-2,.mini-kpi-grid,.spotlight-metrics{grid-template-columns:1fr}.page-title-pro{font-size:36px}.hero-copy-pro h1,.hero-dashboard-copy h2{font-size:40px}}
@media (max-width:640px){.login-page,.main-pro{padding:14px}.card,.login-panel-pro,.login-left-pro,.hero-dashboard-copy,.hero-spotlight-card{padding:18px}.premium-stat-grid,.hero-panel-grid,.approval-grid,.placeholder-grid,.project-portfolio-grid{grid-template-columns:1fr}.page-title-pro{font-size:30px}.hero-copy-pro{margin-top:42px}.hero-copy-pro h1,.hero-dashboard-copy h2{font-size:30px}.login-panel-head h2{font-size:34px}}
`;
