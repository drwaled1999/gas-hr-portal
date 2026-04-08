// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import "./styles.css";

const users = {
  hrmanager: {
    password: "123456",
    name: "Walid Khalaf Alshammari",
    role: "HR Manager",
    project: "All Projects",
  },
  walid: {
    password: "123456",
    name: "Walid Khalaf",
    role: "HR Admin",
    project: "Qatif",
  },
  sara: {
    password: "123456",
    name: "Sara Ali",
    role: "Admin Assistant",
    project: "Qassim",
  },
};

const initialEmployees = [
  {
    id: 1,
    name: "Ahmed Salem",
    employeeId: "GAS-2038",
    role: "Store Worker",
    project: "Qatif",
    nationality: "Saudi",
    annualBalance: 30,
    usedLeave: 9,
    permissionsUsed: 3,
    status: "Active",
  },
  {
    id: 2,
    name: "Muteb Al Bishi",
    employeeId: "GAS-2036",
    role: "Store Worker",
    project: "Qatif",
    nationality: "Saudi",
    annualBalance: 30,
    usedLeave: 4,
    permissionsUsed: 1,
    status: "Active",
  },
  {
    id: 3,
    name: "Faisal Al Harbi",
    employeeId: "GAS-2194",
    role: "Site Administrator",
    project: "Zuluf",
    nationality: "Saudi",
    annualBalance: 35,
    usedLeave: 12,
    permissionsUsed: 6,
    status: "On Leave",
  },
  {
    id: 4,
    name: "Rashid Al Qahtani",
    employeeId: "GAS-2210",
    role: "Coordinator",
    project: "Qassim",
    nationality: "Saudi",
    annualBalance: 30,
    usedLeave: 7,
    permissionsUsed: 2,
    status: "Active",
  },
  {
    id: 5,
    name: "Mahmoud Adel",
    employeeId: "GAS-2288",
    role: "Timekeeper",
    project: "Jubail",
    nationality: "Egyptian",
    annualBalance: 30,
    usedLeave: 17,
    permissionsUsed: 5,
    status: "Pending Review",
  },
];

const initialProjects = [
  {
    id: "qatif",
    name: "Qatif",
    manager: "Mohammed Al Qahtani",
    phone: "+966 55 222 3344",
    employees: 18,
    files: [
      {
        id: 1,
        category: "Leave",
        title: "Annual Leave - Ahmed Salem.pdf",
        note: "Submitted for April review",
        status: "Pending",
      },
      {
        id: 2,
        category: "Takleef",
        title: "Night Shift Assignment - Week 2.pdf",
        note: "Approved by project manager",
        status: "Approved",
      },
    ],
  },
  {
    id: "qassim",
    name: "Qassim",
    manager: "Saeed Al Mutairi",
    phone: "+966 54 777 1200",
    employees: 12,
    files: [
      {
        id: 3,
        category: "Leave",
        title: "Emergency Leave - Rashid.pdf",
        note: "Family emergency",
        status: "Approved",
      },
    ],
  },
  {
    id: "zuluf",
    name: "Zuluf",
    manager: "Nasser Al Otaibi",
    phone: "+966 50 841 7701",
    employees: 9,
    files: [],
  },
  {
    id: "jubail",
    name: "Jubail",
    manager: "Adel Ibrahim",
    phone: "+966 53 990 8431",
    employees: 15,
    files: [],
  },
];

const initialRequests = [
  {
    id: 1,
    employee: "Faisal Al Harbi",
    type: "Leave",
    project: "Zuluf",
    days: 5,
    status: "Pending",
    date: "2026-04-09",
  },
  {
    id: 2,
    employee: "Rashid Al Qahtani",
    type: "Permission",
    project: "Qassim",
    days: 1,
    status: "Approved",
    date: "2026-04-08",
  },
  {
    id: 3,
    employee: "Ahmed Salem",
    type: "Takleef",
    project: "Qatif",
    days: 2,
    status: "In Review",
    date: "2026-04-11",
  },
];

const sidebarItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "employees", label: "Employees", icon: Users },
  { key: "leaves", label: "Leaves & Takleef", icon: Plane },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "permissions", label: "Permissions", icon: ShieldCheck },
  { key: "files", label: "Project Files", icon: FolderOpen },
  { key: "reports", label: "Reports", icon: FileText },
  { key: "settings", label: "Settings", icon: KeyRound },
];

function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <div className={`brand-mark ${small ? "small" : ""}`}>
      <div className="brand-mark-inner">
        <div className="brand-main">GAS</div>
        <div className="brand-sub">HR</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let className = "badge-status";
  if (status === "Active" || status === "Approved") className += " success";
  else if (status === "Pending" || status === "On Leave") className += " warning";
  else if (status === "Pending Review") className += " danger";
  else if (status === "In Review") className += " info";

  return <span className={className}>{status}</span>;
}

function StatCard({
  icon: Icon,
  title,
  value,
  helper,
}: {
  icon: any;
  title: string;
  value: string | number;
  helper: string;
}) {
  return (
    <div className="card stat-card">
      <div>
        <div className="muted">{title}</div>
        <div className="stat-value">{value}</div>
        <div className="muted small-text">{helper}</div>
      </div>
      <div className="icon-box">
        <Icon size={20} />
      </div>
    </div>
  );
}

function SectionCard({
  title,
  description,
  right,
  children,
}: {
  title: string;
  description?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="card section-card">
      <div className="section-header">
        <div>
          <h3>{title}</h3>
          {description ? <p>{description}</p> : null}
        </div>
        {right ? <div>{right}</div> : null}
      </div>
      {children}
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: (user: any) => void }) {
  const [username, setUsername] = useState("hrmanager");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const submit = () => {
    const found = users[username as keyof typeof users];
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
          <div className="login-overlay" />
          <div className="login-left-inner">
            <div className="hero-top">
              <BrandMark />
              <div>
                <div className="eyebrow">Enterprise Human Resources</div>
                <div className="hero-brand-title">GAS Workforce Portal</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="hero-copy"
            >
              <h1>Modern HR portal for projects, employees, leave management and approvals.</h1>
              <p>
                Professional internal platform for employee records, manual leave balances,
                permissions, takleef requests, project sections, HR files and management reporting.
              </p>
            </motion.div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span>Employees</span>
                <strong>54</strong>
              </div>
              <div className="hero-stat">
                <span>Projects</span>
                <strong>4</strong>
              </div>
              <div className="hero-stat">
                <span>Open Requests</span>
                <strong>13</strong>
              </div>
              <div className="hero-stat">
                <span>Leave Balance</span>
                <strong>126</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="login-card"
          >
            <div className="login-title-row">
              <BrandMark small />
              <div>
                <h2>Welcome back</h2>
                <p>Secure sign in to the HR control center</p>
              </div>
            </div>

            <div className="form-group">
              <label>Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            {error ? <div className="alert-error">{error}</div> : null}

            <button className="btn btn-dark full" onClick={submit}>
              Sign In to Dashboard
            </button>

            <div className="demo-box">
              <div className="demo-title">Demo access</div>
              <div className="demo-line"><strong>HR Manager:</strong> hrmanager / 123456</div>
              <div className="demo-line"><strong>HR Admin:</strong> walid / 123456</div>
              <div className="demo-line"><strong>Admin Assistant:</strong> sara / 123456</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DashboardHome({
  employees,
  projects,
  requests,
}: {
  employees: any[];
  projects: any[];
  requests: any[];
}) {
  const remainingLeave = useMemo(() => {
    return employees.reduce((sum, emp) => sum + Math.max(emp.annualBalance - emp.usedLeave, 0), 0);
  }, [employees]);

  return (
    <div className="page-stack">
      <div className="stats-grid">
        <StatCard icon={Users} title="Total Employees" value={employees.length} helper="Across all project sections" />
        <StatCard icon={Building2} title="Project Sites" value={projects.length} helper="Live site-based workspaces" />
        <StatCard icon={ClipboardCheck} title="Open Requests" value={requests.length} helper="Leaves, permissions and takleef" />
        <StatCard icon={Wallet} title="Remaining Leave" value={remainingLeave} helper="Calculated from manual balances" />
      </div>

      <div className="dashboard-grid">
        <SectionCard
          title="HR Operations Overview"
          description="Daily control view for employees, requests and project HR status"
          right={<button className="btn btn-light">View Analytics</button>}
        >
          <div className="mini-stat-grid">
            <div className="mini-stat-box">
              <span>Active Employees</span>
              <strong>{employees.filter((e) => e.status === "Active").length}</strong>
            </div>
            <div className="mini-stat-box">
              <span>Employees on Leave</span>
              <strong>{employees.filter((e) => e.status === "On Leave").length}</strong>
            </div>
            <div className="mini-stat-box">
              <span>Pending HR Review</span>
              <strong>{employees.filter((e) => e.status === "Pending Review").length}</strong>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Project</th>
                  <th>Role</th>
                  <th>Leave Balance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.slice(0, 5).map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.project}</td>
                    <td>{emp.role}</td>
                    <td>{emp.annualBalance - emp.usedLeave} days</td>
                    <td><StatusBadge status={emp.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <div className="right-stack">
          <SectionCard title="Today's Alerts" description="Items that need direct HR attention">
            <div className="alert-list">
              <div className="alert-item">
                <div className="icon-box"><AlertTriangle size={18} /></div>
                <div>
                  <strong>2 leave requests pending approval</strong>
                  <p>Review before end of day</p>
                </div>
              </div>

              <div className="alert-item">
                <div className="icon-box"><Clock3 size={18} /></div>
                <div>
                  <strong>1 manual balance needs update</strong>
                  <p>Employee record mismatch found</p>
                </div>
              </div>

              <div className="alert-item">
                <div className="icon-box"><FolderOpen size={18} /></div>
                <div>
                  <strong>Project file awaiting upload</strong>
                  <p>Qassim leave attachment missing</p>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Quick Actions">
            <div className="action-list">
              {[
                "Add employee record",
                "Register leave manually",
                "Upload project document",
                "Generate monthly report",
              ].map((item) => (
                <button key={item} className="action-btn">
                  <span>{item}</span>
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function EmployeesPage({
  employees,
  setEmployees,
}: {
  employees: any[];
  setEmployees: any;
}) {
  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    role: "",
    project: "Qatif",
    nationality: "Saudi",
    annualBalance: 30,
    usedLeave: 0,
    permissionsUsed: 0,
  });

  const addEmployee = () => {
    if (!form.name || !form.employeeId || !form.role) return;

    setEmployees((prev: any[]) => [
      ...prev,
      {
        id: Date.now(),
        ...form,
        annualBalance: Number(form.annualBalance),
        usedLeave: Number(form.usedLeave),
        permissionsUsed: Number(form.permissionsUsed),
        status: "Active",
      },
    ]);

    setForm({
      name: "",
      employeeId: "",
      role: "",
      project: "Qatif",
      nationality: "Saudi",
      annualBalance: 30,
      usedLeave: 0,
      permissionsUsed: 0,
    });
  };

  return (
    <div className="split-grid">
      <SectionCard
        title="Employee Directory"
        description="Track employee records, roles, projects and manual leave balances"
      >
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Project</th>
                <th>Leave Used</th>
                <th>Remaining</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <div className="table-strong">{emp.name}</div>
                    <div className="table-sub">{emp.role}</div>
                  </td>
                  <td>{emp.employeeId}</td>
                  <td>{emp.project}</td>
                  <td>{emp.usedLeave} days</td>
                  <td>{emp.annualBalance - emp.usedLeave} days</td>
                  <td><StatusBadge status={emp.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard
        title="Add Employee"
        description="All employee details and leave balances can be edited manually"
      >
        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Employee ID</label>
            <input value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Role / Category</label>
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Project</label>
            <select value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })}>
              <option>Qatif</option>
              <option>Qassim</option>
              <option>Zuluf</option>
              <option>Jubail</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nationality</label>
            <input value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Annual Leave</label>
            <input
              type="number"
              value={form.annualBalance}
              onChange={(e) => setForm({ ...form, annualBalance: Number(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label>Used Days</label>
            <input
              type="number"
              value={form.usedLeave}
              onChange={(e) => setForm({ ...form, usedLeave: Number(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label>Permissions Used</label>
            <input
              type="number"
              value={form.permissionsUsed}
              onChange={(e) => setForm({ ...form, permissionsUsed: Number(e.target.value) })}
            />
          </div>
        </div>

        <button className="btn btn-dark full" onClick={addEmployee}>
          <UserPlus size={18} />
          Save Employee Record
        </button>
      </SectionCard>
    </div>
  );
}

function LeavesPage({
  employees,
  setEmployees,
  requests,
  setRequests,
}: {
  employees: any[];
  setEmployees: any;
  requests: any[];
  setRequests: any;
}) {
  const [selectedId, setSelectedId] = useState(String(employees[0]?.id || ""));
  const [manualDays, setManualDays] = useState(1);
  const [requestType, setRequestType] = useState("Leave");
  const [note, setNote] = useState("");

  const selectedEmployee = employees.find((e) => String(e.id) === selectedId);

  const applyManualLeave = () => {
    if (!selectedEmployee) return;

    setEmployees((prev: any[]) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id
          ? { ...emp, usedLeave: emp.usedLeave + Number(manualDays), status: "On Leave" }
          : emp
      )
    );

    setRequests((prev: any[]) => [
      {
        id: Date.now(),
        employee: selectedEmployee.name,
        type: requestType,
        project: selectedEmployee.project,
        days: Number(manualDays),
        status: "Pending",
        date: new Date().toISOString().slice(0, 10),
        note,
      },
      ...prev,
    ]);

    setManualDays(1);
    setNote("");
  };

  return (
    <div className="split-grid">
      <SectionCard
        title="Manual Leave & Takleef Entry"
        description="Add leave days manually and deduct them automatically from employee balance"
      >
        <div className="form-grid">
          <div className="form-group">
            <label>Employee</label>
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
              {employees.map((emp) => (
                <option key={emp.id} value={String(emp.id)}>
                  {emp.name} - {emp.project}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Type</label>
            <select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
              <option>Leave</option>
              <option>Takleef</option>
              <option>Permission</option>
            </select>
          </div>

          <div className="form-group">
            <label>Days</label>
            <input
              type="number"
              value={manualDays}
              onChange={(e) => setManualDays(Number(e.target.value))}
            />
          </div>

          <div className="form-group full-span">
            <label>Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Leave details, approval note or takleef information"
            />
          </div>
        </div>

        {selectedEmployee ? (
          <div className="summary-box">
            <div className="summary-title">Current balance for {selectedEmployee.name}</div>
            <div>Annual balance: {selectedEmployee.annualBalance} days</div>
            <div>Used leave: {selectedEmployee.usedLeave} days</div>
            <div>
              Remaining after entry:{" "}
              {Math.max(selectedEmployee.annualBalance - (selectedEmployee.usedLeave + Number(manualDays || 0)), 0)} days
            </div>
          </div>
        ) : null}

        <button className="btn btn-dark full" onClick={applyManualLeave}>
          <CalendarDays size={18} />
          Submit Manual Entry
        </button>
      </SectionCard>

      <SectionCard
        title="Request Tracker"
        description="Leaves, permissions and takleef submissions by project"
      >
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
                  <td>{req.project}</td>
                  <td>{req.days}</td>
                  <td>{req.date}</td>
                  <td><StatusBadge status={req.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

function ProjectsPage({
  projects,
  setProjects,
}: {
  projects: any[];
  setProjects: any;
}) {
  const [activeProject, setActiveProject] = useState(projects[0]?.id || "");
  const [fileForm, setFileForm] = useState({
    category: "Leave",
    title: "",
    note: "",
  });

  const project = projects.find((p) => p.id === activeProject);

  const addFileRecord = () => {
    if (!project || !fileForm.title) return;

    setProjects((prev: any[]) =>
      prev.map((p) =>
        p.id === activeProject
          ? {
              ...p,
              files: [
                ...p.files,
                {
                  id: Date.now(),
                  category: fileForm.category,
                  title: fileForm.title,
                  note: fileForm.note,
                  status: "Pending",
                },
              ],
            }
          : p
      )
    );

    setFileForm({
      category: "Leave",
      title: "",
      note: "",
    });
  };

  return (
    <div className="projects-layout">
      <SectionCard
        title="Project Sections"
        description="Each project has its own leave, takleef and HR file space"
      >
        <div className="project-list">
          {projects.map((projectItem) => (
            <button
              key={projectItem.id}
              className={`project-pill ${activeProject === projectItem.id ? "active" : ""}`}
              onClick={() => setActiveProject(projectItem.id)}
            >
              <div className="table-strong">{projectItem.name}</div>
              <div className="table-sub">{projectItem.employees} employees</div>
            </button>
          ))}
        </div>
      </SectionCard>

      <div className="page-stack">
        <SectionCard
          title={`${project?.name || ""} Files`}
          description="Project-specific records, leave documents and takleef files"
          right={
            <div className="manager-box">
              <strong>{project?.manager}</strong>
              <span>{project?.phone}</span>
            </div>
          }
        >
          <div className="form-grid">
            <div className="form-group">
              <label>Category</label>
              <select
                value={fileForm.category}
                onChange={(e) => setFileForm({ ...fileForm, category: e.target.value })}
              >
                <option>Leave</option>
                <option>Takleef</option>
                <option>Permission</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>File title</label>
              <input
                value={fileForm.title}
                onChange={(e) => setFileForm({ ...fileForm, title: e.target.value })}
                placeholder="example.pdf"
              />
            </div>

            <div className="form-group full-span">
              <label>Note</label>
              <textarea
                value={fileForm.note}
                onChange={(e) => setFileForm({ ...fileForm, note: e.target.value })}
                placeholder="Add review note or document summary"
              />
            </div>
          </div>

          <button className="btn btn-dark full" onClick={addFileRecord}>
            <FolderOpen size={18} />
            Add File Record
          </button>
        </SectionCard>

        <SectionCard title="Recorded Files">
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
                {(project?.files || []).map((file) => (
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
        </SectionCard>
      </div>
    </div>
  );
}

function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <SectionCard title={title} description={description}>
      <div className="placeholder-grid">
        <div className="placeholder-card">
          <Briefcase size={18} />
          <span>Custom form blocks</span>
        </div>
        <div className="placeholder-card">
          <ClipboardCheck size={18} />
          <span>Approval workflows</span>
        </div>
        <div className="placeholder-card">
          <FileText size={18} />
          <span>Printable reports</span>
        </div>
      </div>
    </SectionCard>
  );
}

export default function HRPortalRedesign() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [employees, setEmployees] = useState(initialEmployees);
  const [projects, setProjects] = useState(initialProjects);
  const [requests, setRequests] = useState(initialRequests);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  if (!currentUser) {
    return <LoginScreen onLogin={setCurrentUser} />;
  }

  return (
    <div className="portal-shell">
      <aside className={`sidebar ${mobileSidebar ? "open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <BrandMark />
            <div>
              <div className="sidebar-brand-title">GAS Portal</div>
              <div className="sidebar-brand-sub">Enterprise HR Workspace</div>
            </div>
          </div>

          <div className="profile-box">
            <div className="avatar-circle">WK</div>
            <div>
              <div className="table-strong">{currentUser.name}</div>
              <div className="table-sub">{currentUser.role}</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.key;

            return (
              <button
                key={item.key}
                className={`nav-item ${active ? "active" : ""}`}
                onClick={() => {
                  setActivePage(item.key);
                  setMobileSidebar(false);
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-projects">
          <div className="sidebar-label">Project Sections</div>
          {projects.map((p) => (
            <div key={p.id} className="project-mini">
              {p.name}
            </div>
          ))}
        </div>

        <button className="btn btn-light full" onClick={() => setCurrentUser(null)}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <div>
            <button className="mobile-menu-btn" onClick={() => setMobileSidebar(!mobileSidebar)}>
              <Menu size={18} />
            </button>
            <div className="eyebrow dark">Human Resources Dashboard</div>
            <h1 className="page-title">
              {activePage === "dashboard" && "Executive HR Dashboard"}
              {activePage === "employees" && "Employee Management"}
              {activePage === "leaves" && "Leaves, Permissions & Takleef"}
              {activePage === "projects" && "Project-Based HR Sections"}
              {activePage === "permissions" && "Permissions Center"}
              {activePage === "files" && "Project Files"}
              {activePage === "reports" && "Reports Center"}
              {activePage === "settings" && "System Settings"}
            </h1>
            <p className="page-subtitle">
              Signed in as {currentUser.name} ({currentUser.role})
            </p>
          </div>

          <div className="topbar-actions">
            <div className="search-box">
              <Search size={16} />
              <input placeholder="Search employees, requests, files..." />
            </div>
            <button className="btn btn-light">
              <Filter size={16} />
              Filter
            </button>
            <button className="btn btn-dark">
              <Plus size={16} />
              New Record
            </button>
          </div>
        </div>

        {activePage === "dashboard" && (
          <DashboardHome employees={employees} projects={projects} requests={requests} />
        )}

        {activePage === "employees" && (
          <EmployeesPage employees={employees} setEmployees={setEmployees} />
        )}

        {activePage === "leaves" && (
          <LeavesPage
            employees={employees}
            setEmployees={setEmployees}
            requests={requests}
            setRequests={setRequests}
          />
        )}

        {(activePage === "projects" || activePage === "files") && (
          <ProjectsPage projects={projects} setProjects={setProjects} />
        )}

        {activePage === "permissions" && (
          <PlaceholderPage
            title="Permissions Center"
            description="Track short permissions, approvals and employee permission consumption manually."
          />
        )}

        {activePage === "reports" && (
          <PlaceholderPage
            title="Reports Center"
            description="Prepare monthly attendance, leave summaries, project file logs and printable HR reports."
          />
        )}

        {activePage === "settings" && (
          <PlaceholderPage
            title="System Settings"
            description="Control portal settings, project structure and editable HR options."
          />
        )}
      </main>
    </div>
  );
}
