// @ts-nocheck
import React, { useMemo, useState } from "react";
import {
  Download,
  FileDown, motion, AnimatePresence } from "framer-motion";
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
  CalendarRange,
  Fingerprint,
  ReceiptText,
  CalendarCheck2,
  FileSpreadsheet,
  ContactRound,
  Settings2,
  CircleDollarSign,
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

function BrandMark({ small = false }) {
  return (
    <div className={`brand-v4 ${small ? "small" : ""}`}>
      <div className="brand-v4-inner">
        <span className="brand-v4-main">GAS</span>
        <span className="brand-v4-sub">HR PROJECT</span>
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
  return <span className={`status-v4 ${map[status] || "neutral"}`}>{status}</span>;
}

function GlassCard({ children, className = "" }) {
  return <div className={`glass-card-v4 ${className}`}>{children}</div>;
}

function SectionTitle({ title, description, action }) {
  return (
    <div className="section-title-v4">
      <div>
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="mini-stat-v4">
      <div className="mini-stat-icon"><Icon size={16} /></div>
      <div>
        <div className="mini-stat-label">{label}</div>
        <div className="mini-stat-value">{value}</div>
      </div>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, trend }) {
  return (
    <GlassCard className="kpi-card-v4">
      <div className="kpi-v4-top">
        <div className="kpi-v4-icon"><Icon size={17} /></div>
        <div className="kpi-v4-trend"><TrendingUp size={12} /> {trend}</div>
      </div>
      <div className="kpi-v4-label">{label}</div>
      <div className="kpi-v4-value">{value}</div>
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
    <div className="login-page-v4">
      <div className="login-shell-v4">
        <div className="login-left-v4">
          <div className="hr-aurora one" />
          <div className="hr-aurora two" />
          <div className="hr-aurora three" />
          <div className="login-brand-row-v4">
            <BrandMark />
            <div>
              <div className="eyebrow-v4 light">Human Resources Department (HR Project)</div>
              <div className="login-brand-title-v4">GAS ARABIAN</div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="login-copy-v4">
            <h1>Modern HR operating system for projects, records and approvals.</h1>
            <p>
              Structured workspace for employee management, annual leave control, attendance,
              payroll view, approvals, project files and HR reporting in one platform.
            </p>
          </motion.div>

          <div className="login-badges-v4">
            <div className="login-badge-v4"><Users size={16} /><span>Employee Records</span></div>
            <div className="login-badge-v4"><CalendarCheck2 size={16} /><span>Leave Governance</span></div>
            <div className="login-badge-v4"><Fingerprint size={16} /><span>Attendance</span></div>
            <div className="login-badge-v4"><ReceiptText size={16} /><span>Payroll View</span></div>
          </div>
        </div>

        <div className="login-right-v4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="login-panel-v4">
            <div className="login-head-v4">
              <BrandMark small />
              <div>
                <h2>Sign in</h2>
                <p>Secure access to GAS Arabian HR Project</p>
              </div>
            </div>

            <div className="field-v4">
              <label>Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
            </div>
            <div className="field-v4">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </div>
            {error ? <div className="error-v4">{error}</div> : null}
            <button className="btn-v4 primary full" onClick={submit}>Sign In to Workspace</button>
            <div className="demo-v4">
              <div className="demo-v4-title">Demo accounts</div>
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
    <div className="page-stack-v4">
      <GlassCard className="dashboard-hero-v4">
        <div>
          <div className="eyebrow-v4 dark">Human resources control center</div>
          <h2>Executive HR Dashboard</h2>
          <p>
            Balanced overview for approvals, leave balances, attendance follow-up, payroll preparation,
            employee records and project ownership.
          </p>
          <div className="hero-actions-v4">
            <button className="btn-v4 primary" onClick={() => setActivePage("approvals")}><BadgeCheck size={16} /> Approvals</button>
            <button className="btn-v4 secondary" onClick={() => setActivePage("leaveBalances")}><Wallet size={16} /> Leave Balances</button>
          </div>
        </div>
        <div className="hero-mini-grid-v4">
          <MiniStat icon={Users} label="Employees" value={employees.length} />
          <MiniStat icon={Building2} label="Projects" value={projects.length} />
          <MiniStat icon={ClipboardCheck} label="Pending" value={pendingApprovals} />
          <MiniStat icon={Wallet} label="Remaining Leave" value={remainingLeave} />
        </div>
      </GlassCard>

      <div className="kpi-grid-v4">
        <KpiCard icon={Users} label="Total Employees" value={employees.length} trend="Updated" />
        <KpiCard icon={CalendarRange} label="Employees On Leave" value={onLeaveEmployees} trend="Tracked" />
        <KpiCard icon={Fingerprint} label="Attendance Issues" value={3} trend="Needs review" />
        <KpiCard icon={ReceiptText} label="Payroll Items" value={8} trend="Prepared" />
      </div>

      <div className="dashboard-grid-v4-a">
        <GlassCard>
          <SectionTitle title="Priority Approvals" description="Requests that need direct HR action." action={<button className="btn-v4 secondary" onClick={() => setActivePage("approvals")}>Open</button>} />
          <div className="table-wrap-v4 compact-table"><table><thead><tr><th>Employee</th><th>Type</th><th>Project</th><th>Status</th></tr></thead><tbody>{requests.slice(0, 5).map((req) => <tr key={req.id}><td>{req.employee}</td><td>{req.type}</td><td>{projectName(projects, req.projectId)}</td><td><StatusBadge status={req.status} /></td></tr>)}</tbody></table></div>
        </GlassCard>

        <GlassCard>
          <SectionTitle title="HR Operational Sections" description="Core modules required by HR teams." />
          <div className="module-grid-v4">
            <button className="module-card-v4" onClick={() => setActivePage("employees")}><Users size={18} /><span>Employee Management</span></button>
            <button className="module-card-v4" onClick={() => setActivePage("leaveBalances")}><CalendarCheck2 size={18} /><span>Leave Control</span></button>
            <button className="module-card-v4" onClick={() => setActivePage("attendance")}><Fingerprint size={18} /><span>Attendance</span></button>
            <button className="module-card-v4" onClick={() => setActivePage("payroll")}><CircleDollarSign size={18} /><span>Payroll</span></button>
            <button className="module-card-v4" onClick={() => setActivePage("projects")}><FolderKanban size={18} /><span>Projects</span></button>
            <button className="module-card-v4" onClick={() => setActivePage("files")}><FolderOpen size={18} /><span>Project Files</span></button>
            <div className="module-card-v4 static"><ContactRound size={18} /><span>Employee Documents</span></div>
            <div className="module-card-v4 static"><ReceiptText size={18} /><span>Contracts & Renewals</span></div>
          </div>
        </GlassCard>
      </div>

      <div className="dashboard-grid-v4-b">
        <GlassCard>
          <SectionTitle title="Workforce Overview" description="Employee records, project assignment and leave visibility." />
          <div className="table-wrap-v4"><table><thead><tr><th>Employee</th><th>Project</th><th>Manager</th><th>Balance</th><th>Status</th></tr></thead><tbody>{employees.slice(0, 6).map((emp) => <tr key={emp.id}><td><div className="strong-v4">{emp.name}</div><div className="sub-v4">{emp.role}</div></td><td>{projectName(projects, emp.projectId)}</td><td>{emp.manager}</td><td>{emp.annualBalance - emp.usedLeave} days</td><td><StatusBadge status={emp.status} /></td></tr>)}</tbody></table></div>
        </GlassCard>

        <div className="stack-v4">
          <GlassCard>
            <SectionTitle title="Live Metrics" description="Quick operational indicators." />
            <div className="metric-list-v4">
              <div className="metric-row-v4"><span><Activity size={15} /> Active employees</span><strong>{activeEmployees}</strong></div>
              <div className="metric-row-v4"><span><Clock3 size={15} /> Employees on leave</span><strong>{onLeaveEmployees}</strong></div>
              <div className="metric-row-v4"><span><ShieldCheck size={15} /> Pending approvals</span><strong>{pendingApprovals}</strong></div>
              <div className="metric-row-v4"><span><BarChart3 size={15} /> Project records</span><strong>{Object.values(initialFiles).flat().length}</strong></div>
            </div>
          </GlassCard>
          <GlassCard>
            <SectionTitle title="Quick Actions" description="Most-used HR actions." />
            <div className="quick-grid-v4">
              <button className="quick-card-v4" onClick={() => setActivePage("employees")}><UserPlus size={17} /> Add employee</button>
              <button className="quick-card-v4" onClick={() => setActivePage("requests")}><Plane size={17} /> New request</button>
              <button className="quick-card-v4" onClick={() => setActivePage("attendance")}><Fingerprint size={17} /> Attendance</button>
              <button className="quick-card-v4" onClick={() => setActivePage("reports")}><FileSpreadsheet size={17} /> Reports</button>
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
    <div className="page-stack-v4">
      <GlassCard className="section-hero-v4">
        <div>
          <div className="eyebrow-v4 dark">Talent records</div>
          <h2>Employee Management</h2>
          <p>Create, assign and maintain employee records by project and manager ownership.</p>
        </div>
      </GlassCard>
      <div className="two-col-v4">
        <GlassCard>
          <SectionTitle title="Employees Directory" description="Project-linked employee records with manager ownership and leave visibility." action={<div className="inline-actions-v4"><button className="btn-v4 secondary"><Download size={16} /> Excel</button><button className="btn-v4 secondary"><FileDown size={16} /> PDF</button></div>} />
          <div className="table-wrap-v4"><table><thead><tr><th>Name</th><th>ID</th><th>Project</th><th>Manager</th><th>Balance</th><th>Status</th></tr></thead><tbody>{employees.map((emp) => <tr key={emp.id}><td><div className="strong-v4">{emp.name}</div><div className="sub-v4">{emp.role}</div></td><td>{emp.employeeId}</td><td>{projectName(projects, emp.projectId)}</td><td>{emp.manager}</td><td>{emp.annualBalance - emp.usedLeave} days</td><td><StatusBadge status={emp.status} /></td></tr>)}</tbody></table></div>
        </GlassCard>
        <GlassCard>
          <SectionTitle title="Add Employee" description="Create a new employee and assign them to a specific project instantly." />
          <div className="form-grid-v4">
            <div className="field-v4"><label>Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="field-v4"><label>Employee ID</label><input value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} /></div>
            <div className="field-v4"><label>Role</label><input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
            <div className="field-v4"><label>Project</label><select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })}>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
            <div className="field-v4"><label>Nationality</label><input value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} /></div>
            <div className="field-v4"><label>Status</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Active</option><option>On Leave</option><option>Pending Review</option></select></div>
            <div className="field-v4"><label>Annual Leave</label><input type="number" value={form.annualBalance} onChange={(e) => setForm({ ...form, annualBalance: Number(e.target.value) })} /></div>
            <div className="field-v4"><label>Used Leave</label><input type="number" value={form.usedLeave} onChange={(e) => setForm({ ...form, usedLeave: Number(e.target.value) })} /></div>
          </div>
          <button className="btn-v4 primary full" onClick={addEmployee}><UserPlus size={16} /> Save Employee</button>
        </GlassCard>
      </div>
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
  const saveBalance = () => setEmployees((prev) => prev.map((emp) => String(emp.id) === selectedId ? { ...emp, annualBalance: Number(annualBalance), usedLeave: Number(usedLeave) } : emp));

  return (
    <div className="page-stack-v4">
      <GlassCard className="section-hero-v4">
        <div><div className="eyebrow-v4 dark">Leave governance</div><h2>Annual Leave Balance Control</h2><p>Allocate annual leave, adjust used leave and maintain accurate balances for every employee.</p></div>
      </GlassCard>
      <div className="two-col-v4">
        <GlassCard>
          <SectionTitle title="Annual Leave Balances" description="Manually control annual leave allocation and usage for every employee." action={<div className="inline-actions-v4"><button className="btn-v4 secondary"><Download size={16} /> Excel</button><button className="btn-v4 secondary"><FileDown size={16} /> PDF</button></div>} />
          <div className="table-wrap-v4"><table><thead><tr><th>Employee</th><th>Project</th><th>Annual Balance</th><th>Used Leave</th><th>Remaining</th></tr></thead><tbody>{employees.map((emp) => <tr key={emp.id}><td>{emp.name}</td><td>{projectName(projects, emp.projectId)}</td><td>{emp.annualBalance}</td><td>{emp.usedLeave}</td><td>{Math.max(emp.annualBalance - emp.usedLeave, 0)}</td></tr>)}</tbody></table></div>
        </GlassCard>
        <GlassCard>
          <SectionTitle title="Update Balance" description="Select any employee and update leave values directly." />
          <div className="field-v4"><label>Employee</label><select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>{employees.map((emp) => <option key={emp.id} value={String(emp.id)}>{emp.name} - {projectName(projects, emp.projectId)}</option>)}</select></div>
          <div className="form-grid-v4">
            <div className="field-v4"><label>Annual Leave Allocation</label><input type="number" value={annualBalance} onChange={(e) => setAnnualBalance(Number(e.target.value))} /></div>
            <div className="field-v4"><label>Used Leave</label><input type="number" value={usedLeave} onChange={(e) => setUsedLeave(Number(e.target.value))} /></div>
          </div>
          {selectedEmployee ? <div className="summary-v4"><div className="summary-title-v4">{selectedEmployee.name}</div><div>Project: {projectName(projects, selectedEmployee.projectId)}</div><div>Remaining after save: {Math.max(annualBalance - usedLeave, 0)} days</div></div> : null}
          <button className="btn-v4 primary full" onClick={saveBalance}><Wallet size={16} /> Save Leave Balance</button>
        </GlassCard>
      </div>
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
    <div className="page-stack-v4">
      <GlassCard className="section-hero-v4">
        <div><div className="eyebrow-v4 dark">Decision workspace</div><h2>Approvals</h2><p>Review annual leave, permissions and takleef requests in a cleaner approval workflow.</p></div>
      </GlassCard>
      <GlassCard>
        <SectionTitle title="Approval Workspace" description="Review and approve annual leave, permissions and takleef requests." action={<div className="inline-actions-v4"><button className="btn-v4 secondary"><Download size={16} /> Excel</button><button className="btn-v4 secondary"><FileDown size={16} /> PDF</button></div>} />
        <div className="approval-grid-v4">{pending.length === 0 ? <div className="empty-v4">No pending approvals right now.</div> : pending.map((req) => { const emp = employees.find((e) => e.id === req.employeeId); return <div key={req.id} className="approval-card-v4"><div className="approval-top-v4"><div><h4>{req.employee}</h4><p>{req.type} • {projectName(projects, req.projectId)}</p></div><StatusBadge status={req.status} /></div><div className="approval-body-v4"><div><strong>Days:</strong> {req.days}</div><div><strong>Date:</strong> {req.date}</div><div><strong>Note:</strong> {req.note}</div>{emp ? <div><strong>Current balance:</strong> {Math.max(emp.annualBalance - emp.usedLeave, 0)} days</div> : null}</div><div className="approval-actions-v4"><button className="btn-v4 success" onClick={() => handleDecision(req.id, "Approved")}><CheckCircle2 size={16} /> Approve</button><button className="btn-v4 danger" onClick={() => handleDecision(req.id, "Rejected")}><XCircle size={16} /> Reject</button></div></div>; })}</div>
      </GlassCard>
    </div>
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
    <div className="page-stack-v4">
      <GlassCard className="section-hero-v4">
        <div><div className="eyebrow-v4 dark">HR requests</div><h2>Leaves, Permissions & Takleef</h2><p>Create and track requests with a structured workflow for HR and project operations.</p></div>
      </GlassCard>
      <div className="two-col-v4">
        <GlassCard>
          <SectionTitle title="Submit Request" description="Create annual leave, permission or takleef requests for employees." />
          <div className="form-grid-v4">
            <div className="field-v4"><label>Employee</label><select value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })}>{employees.map((emp) => <option key={emp.id} value={String(emp.id)}>{emp.name} - {projectName(projects, emp.projectId)}</option>)}</select></div>
            <div className="field-v4"><label>Type</label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>Annual Leave</option><option>Permission</option><option>Takleef</option></select></div>
            <div className="field-v4"><label>Days</label><input type="number" value={form.days} onChange={(e) => setForm({ ...form, days: Number(e.target.value) })} /></div>
            <div className="field-v4 full-span"><label>Note</label><textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Request details" /></div>
          </div>
          <button className="btn-v4 primary full" onClick={createRequest}><Plane size={16} /> Create Request</button>
        </GlassCard>
        <GlassCard>
          <SectionTitle title="Request Tracker" description="All HR requests by project and current decision state." action={<div className="inline-actions-v4"><button className="btn-v4 secondary"><Download size={16} /> Excel</button><button className="btn-v4 secondary"><FileDown size={16} /> PDF</button></div>} />
          <div className="table-wrap-v4"><table><thead><tr><th>Employee</th><th>Type</th><th>Project</th><th>Days</th><th>Date</th><th>Status</th></tr></thead><tbody>{requests.map((req) => <tr key={req.id}><td>{req.employee}</td><td>{req.type}</td><td>{projectName(projects, req.projectId)}</td><td>{req.days}</td><td>{req.date}</td><td><StatusBadge status={req.status} /></td></tr>)}</tbody></table></div>
        </GlassCard>
      </div>
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
    <div className="page-stack-v4">
      <GlassCard className="section-hero-v4"><div><div className="eyebrow-v4 dark">Project ownership</div><h2>Projects</h2><p>Control manager ownership, contact points and employee assignment for every project section.</p></div></GlassCard>
      <GlassCard>
        <SectionTitle title="Project Structure" description="Each project has its own employees, manager and contact information." />
        <div className="project-tabs-v4">{projects.map((item) => <button key={item.id} className={`project-tab-v4 ${activeProject === item.id ? "active" : ""}`} onClick={() => setActiveProject(item.id)}><div className="strong-v4">{item.name}</div><div className="sub-v4">{item.code}</div></button>)}</div>
      </GlassCard>
      <div className="two-col-v4">
        <GlassCard>
          <SectionTitle title={`${project?.name || ""} Manager`} description="Primary manager and contact details for this project." />
          <div className="form-grid-v4">
            <div className="field-v4"><label>Manager Name</label><input value={manager} onChange={(e) => setManager(e.target.value)} /></div>
            <div className="field-v4"><label>Phone Number</label><input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
            <div className="field-v4 full-span"><label>Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          </div>
          <div className="contact-row-v4"><div className="contact-pill-v4"><UserCog size={15} /> {manager}</div><div className="contact-pill-v4"><Phone size={15} /> {phone}</div><div className="contact-pill-v4"><Mail size={15} /> {email}</div></div>
          <button className="btn-v4 primary full" onClick={saveManagerInfo}>Save Project Contact</button>
        </GlassCard>
        <GlassCard>
          <SectionTitle title="Employees in Project" description="Only employees assigned to this project are shown below." action={<div className="inline-actions-v4"><button className="btn-v4 secondary"><Download size={16} /> Excel</button><button className="btn-v4 secondary"><FileDown size={16} /> PDF</button></div>} />
          <div className="table-wrap-v4"><table><thead><tr><th>Employee</th><th>Role</th><th>ID</th><th>Status</th></tr></thead><tbody>{projectEmployees.map((emp) => <tr key={emp.id}><td>{emp.name}</td><td>{emp.role}</td><td>{emp.employeeId}</td><td><StatusBadge status={emp.status} /></td></tr>)}</tbody></table></div>
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
    <div className="page-stack-v4">
      <GlassCard className="section-hero-v4"><div><div className="eyebrow-v4 dark">Project documentation</div><h2>Project Files Registry</h2><p>Separate leave, takleef and supporting HR records by project section with cleaner file visibility.</p></div></GlassCard>
      <div className="two-col-v4">
        <GlassCard>
          <SectionTitle title="Project Files" description="Separate leave and task records for each project." />
          <div className="field-v4"><label>Project</label><select value={activeProject} onChange={(e) => setActiveProject(e.target.value)}>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
          <div className="manager-lite-v4"><strong>{project?.manager}</strong><span>{project?.phone}</span></div>
          <div className="form-grid-v4">
            <div className="field-v4"><label>Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>Leave</option><option>Takleef</option><option>Permission</option><option>Other</option></select></div>
            <div className="field-v4"><label>File Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="example.pdf" /></div>
            <div className="field-v4 full-span"><label>Note</label><textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Document note" /></div>
          </div>
          <button className="btn-v4 primary full" onClick={addFile}><FolderOpen size={16} /> Add File Record</button>
        </GlassCard>
        <GlassCard>
          <SectionTitle title={`${project?.name || ""} Records`} description="Files attached to the selected project section." action={<div className="inline-actions-v4"><button className="btn-v4 secondary"><Download size={16} /> Excel</button><button className="btn-v4 secondary"><FileDown size={16} /> PDF</button></div>} />
          <div className="table-wrap-v4"><table><thead><tr><th>Category</th><th>Title</th><th>Note</th><th>Status</th></tr></thead><tbody>{items.map((file) => <tr key={file.id}><td>{file.category}</td><td>{file.title}</td><td>{file.note}</td><td><StatusBadge status={file.status} /></td></tr>)}</tbody></table></div>
        </GlassCard>
      </div>
    </div>
  );
}

function AttendancePage({ employees, projects }) {
  const activeEmployees = employees.filter((e) => e.status === "Active").length;
  const reviewItems = employees.filter((e) => e.status === "Pending Review").length;

  return (
    <div className="page-stack-v4">
      <GlassCard className="section-hero-v4"><div><div className="eyebrow-v4 dark">Attendance control</div><h2>Attendance</h2><p>Monitor daily attendance issues, late arrival, missing punches and attendance follow-up.</p></div></GlassCard>
      <div className="dashboard-grid-v4-a">
        <GlassCard><SectionTitle title="Attendance Summary" description="Essential attendance blocks needed by HR." /><div className="module-grid-v4"><div className="module-card-v4 static"><Fingerprint size={18} /><span>Missing punch review</span></div><div className="module-card-v4 static"><Clock3 size={18} /><span>Late arrival tracking</span></div><div className="module-card-v4 static"><CalendarCheck2 size={18} /><span>Shift attendance</span></div><div className="module-card-v4 static"><AlertTriangle size={18} /><span>Absence exceptions</span></div></div></GlassCard>
        <GlassCard><SectionTitle title="Recommended HR Use" description="Useful controls for attendance administration." /><div className="metric-list-v4"><div className="metric-row-v4"><span>Employees tracked</span><strong>{employees.length}</strong></div><div className="metric-row-v4"><span>Active today</span><strong>{activeEmployees}</strong></div><div className="metric-row-v4"><span>Projects covered</span><strong>{projects.length}</strong></div><div className="metric-row-v4"><span>Open attendance cases</span><strong>{reviewItems}</strong></div></div></GlassCard>
      </div>
    </div>
  );
}

function PayrollPage({ employees, projects }) {
  const readyItems = employees.filter((e) => e.status !== "Pending Review").length;
  const leaveImpact = employees.filter((e) => e.usedLeave > 0).length;
  const salaryRows = employees.map((emp, index) => ({
    ...emp,
    basicSalary: 4200 + index * 250,
    housing: 1200,
    transport: 500,
    deductions: emp.usedLeave * 20,
    netSalary: 4200 + index * 250 + 1200 + 500 - emp.usedLeave * 20,
  }));

  return (
    <div className="page-stack-v4">
      <GlassCard className="section-hero-v4"><div><div className="eyebrow-v4 dark">Payroll preparation</div><h2>Payroll</h2><p>Track payroll preparation items, leave impact, attendance deductions and salary cycle notes.</p></div></GlassCard>
      <div className="dashboard-grid-v4-a">
        <GlassCard><SectionTitle title="Payroll Blocks" description="Core payroll-related sections HR usually needs." /><div className="module-grid-v4"><div className="module-card-v4 static"><ReceiptText size={18} /><span>Monthly payroll review</span></div><div className="module-card-v4 static"><CircleDollarSign size={18} /><span>Deduction control</span></div><div className="module-card-v4 static"><CalendarRange size={18} /><span>Leave impact</span></div><div className="module-card-v4 static"><FileSpreadsheet size={18} /><span>Export summary</span></div></div></GlassCard>
        <GlassCard><SectionTitle title="Cycle Summary" description="Fast visibility for payroll cycle management." />
          <div className="metric-list-v4"><div className="metric-row-v4"><span>Employees in payroll</span><strong>{employees.length}</strong></div><div className="metric-row-v4"><span>Leave impact items</span><strong>{leaveImpact}</strong></div><div className="metric-row-v4"><span>Projects included</span><strong>{projects.length}</strong></div><div className="metric-row-v4"><span>Ready for processing</span><strong>{readyItems}</strong></div></div></GlassCard>
      </div>
      <GlassCard>
        <SectionTitle title="Payroll Table" description="Salary details commonly needed by HR for payroll preparation." action={<div className="inline-actions-v4"><button className="btn-v4 secondary"><Download size={16} /> Excel</button><button className="btn-v4 secondary"><FileDown size={16} /> PDF</button></div>} />
        <div className="table-wrap-v4 premium-table-v4">
          <table>
            <thead><tr><th>Employee</th><th>Project</th><th>Basic Salary</th><th>Housing</th><th>Transport</th><th>Deductions</th><th>Net Salary</th></tr></thead>
            <tbody>{salaryRows.map((row) => <tr key={row.id}><td><div className="strong-v4">{row.name}</div><div className="sub-v4">{row.employeeId}</div></td><td>{projectName(projects, row.projectId)}</td><td>{row.basicSalary}</td><td>{row.housing}</td><td>{row.transport}</td><td>{row.deductions}</td><td>{row.netSalary}</td></tr>)}</tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="page-stack-v4">
      <GlassCard className="section-hero-v4"><div><div className="eyebrow-v4 dark">System control</div><h2>Settings</h2><p>Essential settings for the HR platform, project structure and operational controls.</p></div></GlassCard>
      <div className="dashboard-grid-v4-a">
        <GlassCard>
          <SectionTitle title="Core Settings" description="Necessary settings HR teams commonly need in the portal." />
          <div className="settings-grid-v4">
            <div className="settings-item-v4"><ContactRound size={18} /><div><strong>Company Profile</strong><span>Company name, HR title, contact details</span></div></div>
            <div className="settings-item-v4"><Users size={18} /><div><strong>User Roles</strong><span>HR Manager, HR Admin, Assistant permissions</span></div></div>
            <div className="settings-item-v4"><FolderKanban size={18} /><div><strong>Project Structure</strong><span>Project list, project manager and contact info</span></div></div>
            <div className="settings-item-v4"><CalendarCheck2 size={18} /><div><strong>Leave Rules</strong><span>Annual leave defaults, entitlement and approval logic</span></div></div>
            <div className="settings-item-v4"><Fingerprint size={18} /><div><strong>Attendance Rules</strong><span>Late arrival, absence and punch controls</span></div></div>
            <div className="settings-item-v4"><ReceiptText size={18} /><div><strong>Payroll Settings</strong><span>Payroll cycle, deduction notes and export fields</span></div></div>
          </div>
        </GlassCard>
        <GlassCard>
          <SectionTitle title="Display & System" description="Portal configuration essentials." />
          <div className="settings-grid-v4 compact">
            <div className="settings-item-v4"><Sparkles size={18} /><div><strong>Dashboard Preferences</strong><span>Control dashboard cards and priority blocks</span></div></div>
            <div className="settings-item-v4"><Bell size={18} /><div><strong>Alerts</strong><span>Approval, leave and attendance alerts</span></div></div>
            <div className="settings-item-v4"><FileSpreadsheet size={18} /><div><strong>Export Formats</strong><span>Excel and PDF output preparation</span></div></div>
            <div className="settings-item-v4"><ShieldCheck size={18} /><div><strong>Security</strong><span>Session access and permission protection</span></div></div>
            <div className="settings-item-v4"><CalendarRange size={18} /><div><strong>Work Schedule</strong><span>Weekly workdays, shift defaults and calendar</span></div></div>
            <div className="settings-item-v4"><CalendarCheck2 size={18} /><div><strong>Public Holidays</strong><span>Holiday list and company leave calendar</span></div></div>
            <div className="settings-item-v4"><ReceiptText size={18} /><div><strong>Contracts & Renewals</strong><span>Renewal reminder and contract document options</span></div></div>
            <div className="settings-item-v4"><ContactRound size={18} /><div><strong>Employee Documents</strong><span>ID, contracts, certificates and attachments</span></div></div>
          </div>
        </GlassCard>
      </div>
    </div>
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
      <div className="app-v4-shell">
        <AnimatePresence>
          {(mobileSidebar || window.innerWidth > 960) && (
            <motion.aside initial={{ x: -18, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -18, opacity: 0 }} className={`sidebar-v4 ${mobileSidebar ? "show" : ""}`}>
              <div className="sidebar-head-v4">
                <div className="sidebar-userhead-v4">
                  <div className="sidebar-user-name-v4">{currentUser.name}</div>
                  <div className="sidebar-user-role-v4">{currentUser.role}</div>
                </div>
                <div className="profile-v4-box"><div className="avatar-v4">WK</div><div><div className="strong-v4 light">{currentUser.name}</div><div className="sub-v4 light">{currentUser.role}</div></div></div>
              </div>
              <nav className="nav-v4">{sidebarItems.map((item) => { const Icon = item.icon; return <button key={item.key} className={`nav-btn-v4 ${activePage === item.key ? "active" : ""}`} onClick={() => { setActivePage(item.key); setMobileSidebar(false); }}><Icon size={17} /><span>{item.label}</span></button>; })}</nav>
              <div className="sidebar-projects-v4"><div className="eyebrow-v4 light">Project Sections</div>{projects.map((p) => <div key={p.id} className="sidebar-chip-v4">{p.name}</div>)}</div>
              <button className="btn-v4 ghost light full" onClick={() => setCurrentUser(null)}><LogOut size={16} /> Logout</button>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="main-v4">
          <GlassCard className="topbar-v4">
            <div>
              <button className="menu-btn-v4" onClick={() => setMobileSidebar(!mobileSidebar)}><Menu size={17} /></button>
              <div className="eyebrow-v4 dark">Human Resources Platform</div>
              <h1 className="page-title-v4">
                {activePage === "dashboard" && "Executive HR Dashboard"}
                {activePage === "employees" && "Employee Management"}
                {activePage === "leaveBalances" && "Annual Leave Balance Control"}
                {activePage === "approvals" && "Approvals"}
                {activePage === "requests" && "Leaves, Permissions & Takleef"}
                {activePage === "projects" && "Projects"}
                {activePage === "files" && "Project Files Registry"}
                {activePage === "attendance" && "Attendance"}
                {activePage === "payroll" && "Payroll"}
                {activePage === "reports" && "Reports Center"}
                {activePage === "settings" && "Settings"}
              </h1>
              <p className="page-sub-v4">Signed in as {currentUser.name} ({currentUser.role})</p>
            </div>
            <div className="topbar-actions-v4">
              <div className="search-v4"><Search size={15} /><input placeholder="Search employees, projects, approvals..." /></div>
              <button className="btn-v4 secondary"><Bell size={15} /> Alerts</button>
              <button className="btn-v4 primary" onClick={() => setActivePage("requests")}><Plus size={15} /> New Request</button>
            </div>
          </GlassCard>

          <div className="content-v4-stack">
            {activePage === "dashboard" && <DashboardPage employees={employees} projects={projects} requests={requests} setActivePage={setActivePage} />}
            {activePage === "employees" && <EmployeesPage employees={employees} setEmployees={setEmployees} projects={projects} />}
            {activePage === "leaveBalances" && <LeaveBalancesPage employees={employees} setEmployees={setEmployees} projects={projects} />}
            {activePage === "approvals" && <ApprovalsPage requests={requests} setRequests={setRequests} employees={employees} setEmployees={setEmployees} projects={projects} />}
            {activePage === "requests" && <RequestsPage employees={employees} requests={requests} setRequests={setRequests} projects={projects} />}
            {activePage === "projects" && <ProjectsPage projects={projects} setProjects={setProjects} employees={employees} />}
            {activePage === "files" && <ProjectFilesPage projects={projects} filesByProject={filesByProject} setFilesByProject={setFilesByProject} />}
            {activePage === "attendance" && <AttendancePage employees={employees} projects={projects} />}
            {activePage === "payroll" && <PayrollPage employees={employees} projects={projects} />}
            {activePage === "reports" && <ReportsPage />}
            {activePage === "settings" && <SettingsPage />}
          </div>
        </main>
      </div>
    </>
  );
}

const styles = `
:root{--bg:#edf2f7;--bg2:#f7f9fc;--line:#e6ecf3;--text:#0c1526;--muted:#66758b;--nav1:#041024;--nav2:#0a234d;--primary:#123a74;--primary2:#1c5aa7;--success:#059669;--warning:#d97706;--danger:#dc2626;--info:#2563eb;font-family:Inter,Arial,sans-serif}
*{box-sizing:border-box}html,body,#root{margin:0;min-height:100%;background:linear-gradient(180deg,var(--bg),var(--bg2))}body{margin:0;color:var(--text)}button,input,select,textarea{font:inherit}
.btn-v4{height:40px;border:none;border-radius:12px;padding:0 14px;display:inline-flex;align-items:center;justify-content:center;gap:7px;font-weight:700;cursor:pointer;transition:.18s ease;font-size:13px}.btn-v4:hover{transform:translateY(-1px)}.btn-v4.primary{background:linear-gradient(135deg,#102a56,#18498a);color:#fff;box-shadow:0 14px 28px rgba(24,73,138,.18)}.btn-v4.secondary{background:#fff;color:#0f172a;border:1px solid #d9e2ec}.btn-v4.ghost{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.16)}.btn-v4.ghost.light{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.16)}.btn-v4.success{background:#ecfdf5;color:#047857;border:1px solid #a7f3d0}.btn-v4.danger{background:#fef2f2;color:#b91c1c;border:1px solid #fecaca}.full{width:100%}
.brand-v4{height:54px;width:54px;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.16);background:#020617;box-shadow:0 16px 34px rgba(2,6,23,.22)}.brand-v4.small{height:40px;width:40px;border-radius:14px}.brand-v4-inner{width:100%;height:100%;display:grid;place-items:center;background:radial-gradient(circle at top left,rgba(59,130,246,.7),transparent 45%),linear-gradient(135deg,#020617,#0e1c35,#12325f)}.brand-v4-main{font-size:21px;font-weight:900;line-height:1;color:#fff}.brand-v4.small .brand-v4-main{font-size:14px}.brand-v4-sub{font-size:6px;letter-spacing:.22em;color:#dbeafe;text-align:center}
.eyebrow-v4{font-size:11px;letter-spacing:.28em;text-transform:uppercase}.eyebrow-v4.light{color:#b9c8e8}.eyebrow-v4.dark{color:#73839a}.strong-v4{font-weight:800}.strong-v4.light{color:#fff}.sub-v4{color:#6a7a90;font-size:12px;margin-top:4px}.sub-v4.light{color:#cbd7eb}
.glass-card-v4{background:linear-gradient(180deg,rgba(255,255,255,.96),rgba(255,255,255,.88));border:1px solid rgba(229,236,244,.95);border-radius:24px;box-shadow:0 16px 36px rgba(15,23,42,.05);padding:22px;backdrop-filter:blur(14px)}
.login-page-v4{min-height:100vh;padding:24px;background:radial-gradient(circle at top left,rgba(30,64,175,.18),transparent 18%),radial-gradient(circle at bottom right,rgba(15,23,42,.12),transparent 32%),linear-gradient(135deg,#eaf0f7,#f7faff,#dce8fb)}.login-shell-v4{max-width:1460px;min-height:calc(100vh - 48px);margin:0 auto;display:grid;grid-template-columns:1.02fr .98fr;background:rgba(255,255,255,.74);border:1px solid rgba(255,255,255,.56);border-radius:34px;overflow:hidden;backdrop-filter:blur(18px);box-shadow:0 30px 90px rgba(15,23,42,.16)}.login-left-v4{position:relative;padding:40px;background:linear-gradient(145deg,#071120 0%,#0a1c37 38%,#123d74 100%);color:#fff;display:flex;flex-direction:column;overflow:hidden}.hr-aurora{position:absolute;border-radius:999px;filter:blur(24px);opacity:.48}.hr-aurora.one{width:240px;height:240px;background:#2563eb;top:-80px;left:-40px}.hr-aurora.two{width:260px;height:260px;background:#1d4ed8;right:-70px;top:30px}.hr-aurora.three{width:220px;height:220px;background:#38bdf8;bottom:-100px;left:24%}.login-brand-row-v4{display:flex;align-items:center;gap:14px;position:relative;z-index:2}.login-brand-title-v4{font-size:26px;font-weight:800;margin-top:8px}.login-copy-v4{max-width:700px;margin-top:68px;position:relative;z-index:2}.login-copy-v4 h1{margin:0 0 16px;font-size:40px;line-height:1.08;letter-spacing:-.04em;font-weight:900}.login-copy-v4 p{margin:0;max-width:640px;font-size:15px;line-height:1.85;color:#d5e3f8}.login-badges-v4{margin-top:auto;display:grid;grid-template-columns:repeat(2,1fr);gap:12px;position:relative;z-index:2}.login-badge-v4{display:flex;align-items:center;gap:10px;padding:14px;border-radius:16px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);font-size:13px}.login-right-v4{display:flex;align-items:center;justify-content:center;padding:30px;background:linear-gradient(180deg,rgba(255,255,255,.38),rgba(255,255,255,.12))}.login-panel-v4{width:100%;max-width:500px;background:rgba(255,255,255,.96);border:1px solid #e2e8f0;border-radius:28px;padding:30px;box-shadow:0 24px 70px -34px rgba(15,23,42,.32)}.login-head-v4{display:flex;align-items:center;gap:14px;margin-bottom:22px}.login-head-v4 h2{margin:0;font-size:30px;letter-spacing:-.03em;font-weight:900}.login-head-v4 p{margin:6px 0 0;color:#64748b;font-size:13px}.field-v4{display:flex;flex-direction:column;gap:7px;margin-bottom:14px}.field-v4 label{font-size:12px;font-weight:700;color:#334155}.field-v4 input,.field-v4 select,.field-v4 textarea,.search-v4 input{width:100%;border:1px solid #d7e0ea;border-radius:14px;background:#fff;color:#0f172a;outline:none;transition:.18s ease}.field-v4 input,.field-v4 select,.search-v4 input{height:42px;padding:0 13px}.field-v4 textarea{min-height:106px;padding:13px;resize:vertical}.field-v4 input:focus,.field-v4 select:focus,.field-v4 textarea:focus,.search-v4 input:focus{border-color:#93c5fd;box-shadow:0 0 0 4px rgba(147,197,253,.18)}.demo-v4{margin-top:18px;border-radius:18px;border:1px solid #e5ebf3;background:#f8fbff;padding:16px;color:#475569;font-size:13px}.demo-v4-title{font-weight:800;margin-bottom:10px}.error-v4{background:#fef2f2;border:1px solid #fecaca;color:#b91c1c;padding:11px 13px;border-radius:14px;margin-bottom:14px;font-size:13px}
.app-v4-shell{min-height:100vh;display:grid;grid-template-columns:278px 1fr;background:linear-gradient(180deg,var(--bg),var(--bg2))}.sidebar-v4{padding:18px;background:radial-gradient(circle at top left,rgba(96,165,250,.15),transparent 25%),radial-gradient(circle at bottom right,rgba(37,99,235,.16),transparent 22%),linear-gradient(180deg,#041024 0%,#081938 40%,#0b2a58 100%);color:#fff;display:flex;flex-direction:column;gap:16px}.sidebar-userhead-v4{padding:8px 6px 2px}.sidebar-user-name-v4{font-size:18px;font-weight:900;line-height:1.2;color:#fff;word-break:break-word}.sidebar-user-role-v4{font-size:12px;color:#cdd8ea;margin-top:6px}.profile-v4-box{display:none}.avatar-v4{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.15);font-weight:800}.nav-v4{display:flex;flex-direction:column;gap:7px}.nav-btn-v4{height:42px;border:none;border-radius:14px;background:transparent;color:#e7eefc;display:flex;align-items:center;gap:10px;padding:0 13px;font-weight:700;cursor:pointer;text-align:left;font-size:13px}.nav-btn-v4:hover{background:rgba(255,255,255,.08)}.nav-btn-v4.active{background:#fff;color:#0f172a;box-shadow:0 14px 28px rgba(2,6,23,.16)}.sidebar-projects-v4{margin-top:6px}.sidebar-chip-v4{padding:9px 11px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#e5eefc;margin-top:7px;font-size:12px}.main-v4{padding:16px}.topbar-v4{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:16px}.page-title-v4{margin:5px 0 0;font-size:26px;line-height:1.1;letter-spacing:-.03em;max-width:520px}.page-sub-v4{margin:7px 0 0;color:#64748b;font-size:14px}.topbar-actions-v4{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.search-v4{min-width:280px;height:40px;border-radius:12px;border:1px solid #d7e0ea;background:#fff;padding:0 12px;display:flex;align-items:center;gap:8px}.search-v4 input{border:none;box-shadow:none;background:transparent;padding:0}.content-v4-stack,.page-stack-v4,.stack-v4{display:flex;flex-direction:column;gap:16px}.menu-btn-v4{display:none;width:40px;height:40px;border-radius:12px;border:1px solid #dce4ee;background:#fff;margin-bottom:8px;align-items:center;justify-content:center;cursor:pointer}
.dashboard-hero-v4,.section-hero-v4{display:grid;grid-template-columns:1.1fr .9fr;gap:16px;align-items:end;background:linear-gradient(135deg,#f9fbff,#f6f9fe);border:1px solid #e6edf5}.dashboard-hero-v4 h2,.section-hero-v4 h2{margin:8px 0 6px;font-size:28px;line-height:1.08;letter-spacing:-.04em}.dashboard-hero-v4 p,.section-hero-v4 p{margin:0;max-width:760px;font-size:14px;line-height:1.8;color:#6a7a90}.hero-actions-v4{display:flex;gap:8px;margin-top:14px}.hero-mini-grid-v4{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.mini-stat-v4{display:flex;gap:10px;align-items:center;padding:12px;border-radius:16px;background:#fff;border:1px solid #e6edf5}.mini-stat-icon{width:30px;height:30px;border-radius:10px;display:grid;place-items:center;background:#0f172a;color:#fff}.mini-stat-label{font-size:11px;color:#66758b}.mini-stat-value{font-size:18px;font-weight:900}
.kpi-grid-v4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.kpi-card-v4{padding:16px}.kpi-v4-top{display:flex;justify-content:space-between;align-items:center}.kpi-v4-icon{width:34px;height:34px;border-radius:12px;display:grid;place-items:center;background:#0f172a;color:#fff}.kpi-v4-trend{display:inline-flex;align-items:center;gap:5px;padding:5px 8px;border-radius:999px;background:#f8fbff;border:1px solid #e7eef7;color:#1d4ed8;font-size:10px;font-weight:800}.kpi-v4-label{margin-top:12px;color:#64748b;font-size:12px}.kpi-v4-value{margin-top:5px;font-size:24px;font-weight:900;letter-spacing:-.04em}
.section-title-v4{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap;margin-bottom:16px}.section-title-v4 h3{margin:0;font-size:20px;line-height:1.1;letter-spacing:-.03em}.section-title-v4 p{margin:5px 0 0;color:#64748b;line-height:1.7;font-size:13px}.dashboard-grid-v4-a{display:grid;grid-template-columns:1fr 1fr;gap:16px}.dashboard-grid-v4-b{display:grid;grid-template-columns:1.18fr .82fr;gap:16px}.table-wrap-v4{overflow:auto}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:14px 12px;border-bottom:1px solid #edf2f7;font-size:13px;vertical-align:middle}th{color:#64748b;font-weight:800;white-space:nowrap}td{color:#0f172a}.compact-table th,.compact-table td{padding:12px 10px}
.module-grid-v4{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.module-card-v4{display:flex;align-items:center;gap:9px;padding:13px;border-radius:16px;border:1px solid #e6edf5;background:#fff;cursor:pointer;font-weight:700;text-align:left;font-size:13px;transition:.18s ease}.module-card-v4:hover{background:#f8fbff;border-color:#d5e3f5}.module-card-v4.static{cursor:default}.metric-list-v4{display:flex;flex-direction:column;gap:9px}.metric-row-v4{display:flex;justify-content:space-between;align-items:center;padding:12px;border-radius:14px;background:#f8fbff;border:1px solid #e6edf5;font-size:13px}.metric-row-v4 span{display:inline-flex;align-items:center;gap:8px;color:#64748b}.metric-row-v4 strong{font-size:19px}.quick-grid-v4{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.quick-card-v4{padding:12px;border-radius:14px;border:1px solid #dce4ee;background:#fff;display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:700;color:#0f172a;font-size:13px;transition:.18s ease}.quick-card-v4:hover{background:#f8fbff;border-color:#d5e3f5}
.two-col-v4{display:grid;grid-template-columns:1.12fr .88fr;gap:16px}.form-grid-v4{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.full-span{grid-column:1/-1}.summary-v4{padding:14px;border-radius:16px;background:#f8fbff;border:1px solid #e6edf5;color:#475569;line-height:1.7;margin-bottom:14px;font-size:13px}.summary-title-v4{font-weight:900;color:#0f172a;margin-bottom:6px}.project-tabs-v4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.project-tab-v4{padding:12px;border-radius:16px;border:1px solid #e6edf5;background:#fff;cursor:pointer;text-align:left}.project-tab-v4.active{background:linear-gradient(135deg,#0f172a,#173d72);color:#fff;border-color:#173d72}.project-tab-v4.active .sub-v4,.project-tab-v4.active .strong-v4{color:#fff}.contact-row-v4{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 14px}.contact-pill-v4{display:inline-flex;align-items:center;gap:8px;padding:8px 11px;border-radius:999px;background:#f8fbff;border:1px solid #e6edf5;color:#334155;font-size:12px}.inline-actions-v4{display:flex;gap:8px;flex-wrap:wrap}.manager-lite-v4{padding:12px;border-radius:16px;background:#f8fbff;border:1px solid #e6edf5;display:flex;flex-direction:column;gap:5px;color:#475569;margin-bottom:14px;font-size:13px}
.approval-grid-v4{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.approval-card-v4{padding:14px;border-radius:18px;border:1px solid #e6edf5;background:#fff}.approval-top-v4{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}.approval-top-v4 h4{margin:0;font-size:16px}.approval-top-v4 p{margin:5px 0 0;color:#64748b;font-size:12px}.approval-body-v4{margin-top:12px;display:grid;gap:8px;color:#334155;font-size:13px}.approval-actions-v4{display:flex;gap:8px;margin-top:12px}.empty-v4{padding:22px;border-radius:16px;background:#f8fbff;border:1px dashed #cbd5e1;color:#64748b;text-align:center;font-size:13px}
.settings-grid-v4{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.settings-grid-v4.compact{grid-template-columns:1fr}.settings-item-v4{display:flex;gap:10px;align-items:flex-start;padding:12px;border-radius:16px;border:1px solid #e6edf5;background:#f8fbff}.settings-item-v4 strong{display:block;font-size:13px}.settings-item-v4 span{display:block;color:#64748b;font-size:12px;margin-top:4px}
.status-v4{display:inline-flex;align-items:center;padding:5px 9px;border-radius:999px;font-size:10px;font-weight:800;border:1px solid transparent}.status-v4.success{background:#ecfdf5;color:#047857;border-color:#a7f3d0}.status-v4.warning{background:#fffbeb;color:#b45309;border-color:#fde68a}.status-v4.danger{background:#fef2f2;color:#b91c1c;border-color:#fecaca}.status-v4.info{background:#eff6ff;color:#1d4ed8;border-color:#bfdbfe}.status-v4.neutral{background:#f8fafc;color:#475569;border-color:#e2e8f0}
@media (max-width:1280px){.kpi-grid-v4,.project-tabs-v4,.approval-grid-v4,.module-grid-v4,.quick-grid-v4,.settings-grid-v4,.login-badges-v4{grid-template-columns:repeat(2,1fr)}.dashboard-grid-v4-a,.dashboard-grid-v4-b,.two-col-v4,.dashboard-hero-v4,.section-hero-v4,.login-shell-v4{grid-template-columns:1fr}}
@media (max-width:1200px){.dashboard-grid-v4-a,.dashboard-grid-v4-b,.two-col-v4,.section-hero-v4{grid-template-columns:1fr}.page-title-v4{max-width:100%}.hero-mini-grid-v4{grid-template-columns:repeat(2,1fr)}}
@media (max-width:960px){.app-v4-shell{grid-template-columns:1fr}.sidebar-v4{position:fixed;left:0;top:0;bottom:0;width:290px;z-index:100;transform:translateX(-100%);transition:.22s ease}.sidebar-v4.show{transform:translateX(0)}.menu-btn-v4{display:inline-flex}.topbar-v4{flex-direction:column}.topbar-actions-v4{width:100%}.search-v4{min-width:100%}.form-grid-v4,.hero-mini-grid-v4,.module-grid-v4,.quick-grid-v4,.settings-grid-v4,.dashboard-hero-v4,.section-hero-v4{grid-template-columns:1fr}.page-title-v4{font-size:26px}.login-copy-v4 h1{font-size:34px}}
@media (max-width:640px){.login-page-v4,.main-v4{padding:12px}.glass-card-v4,.login-panel-v4,.login-left-v4{padding:16px}.kpi-grid-v4,.login-badges-v4,.approval-grid-v4,.module-grid-v4,.quick-grid-v4,.project-tabs-v4,.settings-grid-v4{grid-template-columns:1fr}.page-title-v4{font-size:23px}.dashboard-hero-v4 h2,.section-hero-v4 h2{font-size:24px}.login-copy-v4{margin-top:38px}.login-copy-v4 h1{font-size:26px}.login-head-v4 h2{font-size:27px}}
`;
