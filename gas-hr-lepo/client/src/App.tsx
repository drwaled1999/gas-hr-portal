import { useEffect, useMemo, useState } from "react";
import "./styles.css";

type Role = "HR Manager" | "HR" | "HR Admin" | "Admin" | "Admin Assistant";
type Page = "dashboard" | "employees" | "projects" | "add" | "permissions" | "audit" | "notifications" | "reports";
type PermissionKey = "view_dashboard" | "view_employees" | "edit_leaves" | "add_employee" | "assign_permissions" | "view_audit" | "view_reports";

type Project = {
  id: number;
  name: string;
  packageName: string;
  managerName: string;
  managerPhone: string;
  location: string;
};

type Employee = {
  id: number;
  employeeCode: string;
  fullName: string;
  department: string;
  jobTitle: string;
  nationality: string;
  projectName: string;
  packageName: string;
  systemRole: Role;
  status: "Active" | "Inactive";
  leave: {
    total: number;
    used: number;
    remaining: number;
    sick: number;
    emergency: number;
  };
  notes: string[];
};

type UserAccess = {
  id: number;
  fullName: string;
  username: string;
  role: Role;
  permissions: PermissionKey[];
};

const logoPath = "/LOGO-GAS.jpg";

const permissionLabels: Record<PermissionKey, string> = {
  view_dashboard: "View Dashboard",
  view_employees: "View Employees",
  edit_leaves: "Edit Leave Balances",
  add_employee: "Add Employee",
  assign_permissions: "Assign Permissions",
  view_audit: "View Audit Log",
  view_reports: "View Reports",
};

const projectsData: Project[] = [
  { id: 1, name: "Qassim", packageName: "Package 12", managerName: "Fahad Zaidan Alshammari", managerPhone: "+966 50 123 4567", location: "Al Qassim" },
  { id: 2, name: "Qatif", packageName: "Package 08", managerName: "Mohammed Al Qahtani", managerPhone: "+966 55 222 3344", location: "Qatif" },
  { id: 3, name: "Shadqam", packageName: "Package 16", managerName: "Nasser Al Harbi", managerPhone: "+966 54 777 8899", location: "Shadqam" },
];

const initialEmployees: Employee[] = [
  { id: 1, employeeCode: "GAS-1182", fullName: "Walid Khalaf", department: "HR", jobTitle: "HR Admin", nationality: "Saudi", projectName: "Qassim", packageName: "Package 12", systemRole: "HR Admin", status: "Active", leave: { total: 21, used: 7, remaining: 14, sick: 2, emergency: 1 }, notes: ["Supports time sheet updates.", "Can coordinate with Admin Assistants."] },
  { id: 2, employeeCode: "GAS-1450", fullName: "Sara Khan", department: "Admin", jobTitle: "Admin Assistant", nationality: "Non-Saudi", projectName: "Qatif", packageName: "Package 08", systemRole: "Admin Assistant", status: "Active", leave: { total: 21, used: 16, remaining: 5, sick: 1, emergency: 0 }, notes: ["Assigned to leave coordination support."] },
  { id: 3, employeeCode: "GAS-2036", fullName: "Ahmed Al Qahtani", department: "Operations", jobTitle: "Store Worker", nationality: "Saudi", projectName: "Shadqam", packageName: "Package 16", systemRole: "Admin", status: "Active", leave: { total: 21, used: 12, remaining: 9, sick: 0, emergency: 1 }, notes: ["Attendance is consistent.", "Low risk profile."] },
];

const initialUsers: UserAccess[] = [
  { id: 1, fullName: "Walid Khalaf Alshammari", username: "hrmanager", role: "HR Manager", permissions: ["view_dashboard","view_employees","edit_leaves","add_employee","assign_permissions","view_audit","view_reports"] },
  { id: 2, fullName: "Walid Khalaf", username: "walid", role: "HR Admin", permissions: ["view_dashboard","view_employees","edit_leaves","add_employee","view_reports"] },
  { id: 3, fullName: "Sara Khan", username: "sara", role: "Admin Assistant", permissions: ["view_dashboard","view_employees"] },
];

const passwords: Record<string, string> = {
  hrmanager: "123456",
  walid: "123456",
  sara: "123456",
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserAccess | null>(null);
  const [loginError, setLoginError] = useState("");
  const [page, setPage] = useState<Page>("dashboard");
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [systemUsers, setSystemUsers] = useState<UserAccess[]>(initialUsers);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [selectedUserId, setSelectedUserId] = useState<number>(2);
  const [noteText, setNoteText] = useState("");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [leaveForm, setLeaveForm] = useState({ total: 0, used: 0, sick: 0, emergency: 0 });
  const [addForm, setAddForm] = useState({
    employeeCode: "",
    fullName: "",
    department: "",
    jobTitle: "",
    nationality: "Saudi",
    projectName: projectsData[0].name,
    packageName: projectsData[0].packageName,
    systemRole: "Admin Assistant" as Role,
    note: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const selectedEmployee = employees.find((emp) => emp.id === selectedId) ?? employees[0];
  const selectedSystemUser = systemUsers.find((u) => u.id === selectedUserId) ?? systemUsers[0];

  useEffect(() => {
    if (selectedEmployee) {
      setLeaveForm({
        total: selectedEmployee.leave.total,
        used: selectedEmployee.leave.used,
        sick: selectedEmployee.leave.sick,
        emergency: selectedEmployee.leave.emergency,
      });
    }
  }, [selectedEmployee]);

  const filteredEmployees = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter(
      (emp) =>
        emp.fullName.toLowerCase().includes(q) ||
        emp.employeeCode.toLowerCase().includes(q) ||
        emp.projectName.toLowerCase().includes(q) ||
        emp.packageName.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q)
    );
  }, [employees, search]);

  const stats = useMemo(() => {
    const saudi = employees.filter((e) => e.nationality === "Saudi").length;
    const lowLeave = employees.filter((e) => e.leave.remaining <= 5).length;
    const projects = new Set(employees.map((e) => e.projectName)).size;
    const totalRemaining = employees.reduce((acc, emp) => acc + emp.leave.remaining, 0);
    return { total: employees.length, saudi, lowLeave, projects, totalRemaining };
  }, [employees]);

  const projectSummary = useMemo(() => {
    return projectsData.map((project) => {
      const list = employees.filter((e) => e.projectName === project.name);
      return { ...project, employeesCount: list.length };
    });
  }, [employees]);

  const navItems: { key: Page; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "employees", label: "Employees" },
    { key: "projects", label: "Projects" },
    { key: "add", label: "Add Employee" },
    { key: "permissions", label: "Permissions" },
    { key: "audit", label: "Audit Log" },
    { key: "notifications", label: "Notifications" },
    { key: "reports", label: "Reports" },
  ];

  function hasPermission(key: PermissionKey) {
    if (!currentUser) return false;
    return currentUser.permissions.includes(key);
  }

  function handleLogin() {
    const user = systemUsers.find((u) => u.username === loginForm.username.trim());
    if (!user || passwords[user.username] !== loginForm.password.trim()) {
      setLoginError("Invalid username or password.");
      return;
    }
    setCurrentUser(user);
    setLoginError("");
    setIsAuthenticated(true);
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginForm({ username: "", password: "" });
    setPage("dashboard");
  }

  function createEmployee() {
    if (!addForm.employeeCode || !addForm.fullName || !addForm.projectName || !addForm.packageName) {
      alert("Please complete Employee Code, Full Name, Project and Package.");
      return;
    }

    const newEmployee: Employee = {
      id: Date.now(),
      employeeCode: addForm.employeeCode,
      fullName: addForm.fullName,
      department: addForm.department,
      jobTitle: addForm.jobTitle,
      nationality: addForm.nationality,
      projectName: addForm.projectName,
      packageName: addForm.packageName,
      systemRole: addForm.systemRole,
      status: "Active",
      leave: { total: 21, used: 0, remaining: 21, sick: 0, emergency: 0 },
      notes: addForm.note ? [addForm.note] : [],
    };

    setEmployees((prev) => [newEmployee, ...prev]);
    setSelectedId(newEmployee.id);
    setPage("employees");
    setAddForm({
      employeeCode: "",
      fullName: "",
      department: "",
      jobTitle: "",
      nationality: "Saudi",
      projectName: projectsData[0].name,
      packageName: projectsData[0].packageName,
      systemRole: "Admin Assistant",
      note: "",
    });
  }

  function syncProjectPackage(projectName: string) {
    const found = projectsData.find((p) => p.name === projectName);
    setAddForm((prev) => ({ ...prev, projectName, packageName: found?.packageName ?? prev.packageName }));
  }

  function addNote() {
    if (!selectedEmployee || !noteText.trim()) return;
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === selectedEmployee.id ? { ...emp, notes: [noteText, ...emp.notes] } : emp))
    );
    setNoteText("");
  }

  function saveLeaveBalances() {
    if (!selectedEmployee) return;
    const total = Math.max(Number(leaveForm.total) || 0, 0);
    const used = Math.max(Number(leaveForm.used) || 0, 0);
    const sick = Math.max(Number(leaveForm.sick) || 0, 0);
    const emergency = Math.max(Number(leaveForm.emergency) || 0, 0);
    const remaining = Math.max(total - used, 0);

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id
          ? { ...emp, leave: { total, used, remaining, sick, emergency } }
          : emp
      )
    );
  }

  function togglePermission(userId: number, permission: PermissionKey) {
    if (!currentUser || currentUser.role !== "HR Manager") return;

    let updatedCurrentUser: UserAccess | null = null;
    setSystemUsers((prev) =>
      prev.map((user) => {
        if (user.id !== userId) return user;
        const exists = user.permissions.includes(permission);
        const updatedUser = {
          ...user,
          permissions: exists
            ? user.permissions.filter((p) => p !== permission)
            : [...user.permissions, permission],
        };
        if (currentUser.id === userId) updatedCurrentUser = updatedUser;
        return updatedUser;
      })
    );
    if (updatedCurrentUser) setCurrentUser(updatedCurrentUser);
  }

  if (loading) {
    return (
      <div className="splash-screen">
        <div className="splash-glow" />
        <div className="splash-card">
          <img src={logoPath} alt="GAS Logo" className="splash-logo" />
          <h1>GAS HR Leave Portal</h1>
          <p>Loading secure HR workspace...</p>
          <div className="loader"><span /></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <div className="login-shell">
          <div className="login-left">
            <img src={logoPath} alt="GAS Logo" className="login-logo" />
            <div className="login-copy">
              <h1>GAS HR Leave Portal</h1>
              <p>Complete HR platform for employee records, leave balances, permissions, projects, responsible managers and operational visibility.</p>
            </div>
            <div className="login-kpis">
              <div className="login-kpi"><span>Total Employees</span><strong>{stats.total}</strong></div>
              <div className="login-kpi"><span>Saudi Employees</span><strong>{stats.saudi}</strong></div>
              <div className="login-kpi"><span>Projects</span><strong>{stats.projects}</strong></div>
              <div className="login-kpi"><span>Total Remaining Leave</span><strong>{stats.totalRemaining}</strong></div>
            </div>
            <div className="credits">
              <div>Team Fahad Zaidan Alshammari</div>
              <div>Prepared by Walid Khalaf Alshammari</div>
            </div>
          </div>

          <div className="login-right">
            <div className="login-card">
              <div className="login-card-head">
                <img src={logoPath} alt="GAS Logo" className="login-card-logo" />
                <div>
                  <h2>Sign In</h2>
                  <p className="muted">Professional internal HR access</p>
                </div>
              </div>

              <div className="form-group">
                <label>Username</label>
                <input
                  value={loginForm.username}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter your username"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                />
              </div>

              {loginError && <div className="error-box">{loginError}</div>}

              <button className="primary-btn" onClick={handleLogin}>Sign In</button>

              <div className="demo-box">
                <strong>Demo Accounts</strong>
                <p>HR Manager: hrmanager / 123456</p>
                <p>HR Admin: walid / 123456</p>
                <p>Admin Assistant: sara / 123456</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <img src={logoPath} alt="GAS Logo" className="sidebar-logo" />
          <div>
            <h2>GAS Portal</h2>
            <p>{currentUser?.role}</p>
          </div>
        </div>

        <div className="nav-list">
          {navItems
            .filter((item) => {
              if (item.key === "dashboard") return hasPermission("view_dashboard");
              if (item.key === "employees") return hasPermission("view_employees");
              if (item.key === "add") return hasPermission("add_employee");
              if (item.key === "permissions") return hasPermission("assign_permissions");
              if (item.key === "audit") return hasPermission("view_audit");
              if (item.key === "reports") return hasPermission("view_reports");
              return true;
            })
            .map((item) => (
              <button
                key={item.key}
                className={page === item.key ? "nav-btn active" : "nav-btn"}
                onClick={() => setPage(item.key)}
              >
                {item.label}
              </button>
            ))}
        </div>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <div>
            <h1 className="page-title">{navItems.find((n) => n.key === page)?.label}</h1>
            <p className="muted">Signed in as {currentUser?.fullName} ({currentUser?.role})</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        {page === "dashboard" && (
          <>
            <div className="stats-grid">
              <div className="stat-card hero"><h3>{stats.total}</h3><p>Total Employees</p></div>
              <div className="stat-card"><h3>{stats.saudi}</h3><p>Saudi Employees</p></div>
              <div className="stat-card"><h3>{stats.projects}</h3><p>Projects</p></div>
              <div className="stat-card"><h3>{stats.lowLeave}</h3><p>Low Leave Balance</p></div>
            </div>

            <div className="dashboard-grid">
              <div className="panel">
                <h3>Project Summary</h3>
                <table>
                  <thead>
                    <tr><th>Project</th><th>Manager</th><th>Phone</th><th>Employees</th></tr>
                  </thead>
                  <tbody>
                    {projectSummary.map((project) => (
                      <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>{project.managerName}</td>
                        <td>{project.managerPhone}</td>
                        <td>{project.employeesCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="panel">
                <h3>Quick Insight</h3>
                <div className="notification-box"><strong>Leave Visibility</strong><p>Remaining balances are visible per employee and highlighted when low.</p></div>
                <div className="notification-box"><strong>Permissions Control</strong><p>HR Manager can assign permissions for every user in the system.</p></div>
                <div className="notification-box"><strong>Projects Coverage</strong><p>Each project displays its responsible manager and mobile number.</p></div>
              </div>
            </div>
          </>
        )}

        {page === "employees" && hasPermission("view_employees") && (
          <div className="employees-layout">
            <div className="panel">
              <div className="panel-head">
                <h3>Employee List</h3>
                <input
                  className="search-input"
                  placeholder="Search by name, code, project or package"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <table>
                <thead><tr><th>Code</th><th>Name</th><th>Project</th><th>Used</th><th>Remaining</th></tr></thead>
                <tbody>
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} onClick={() => setSelectedId(emp.id)}>
                      <td>{emp.employeeCode}</td>
                      <td>{emp.fullName}</td>
                      <td>{emp.projectName}</td>
                      <td>{emp.leave.used}</td>
                      <td><span className={emp.leave.remaining <= 5 ? "leave-badge low" : "leave-badge good"}>{emp.leave.remaining}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="panel details-panel">
              {selectedEmployee && (
                <>
                  <div className="details-header">
                    <h3>{selectedEmployee.fullName}</h3>
                    <span className="status-pill">{selectedEmployee.status}</span>
                  </div>

                  <div className="details-grid">
                    <div className="info-card"><label>Employee Code</label><strong>{selectedEmployee.employeeCode}</strong></div>
                    <div className="info-card"><label>Department</label><strong>{selectedEmployee.department}</strong></div>
                    <div className="info-card"><label>Job Title</label><strong>{selectedEmployee.jobTitle}</strong></div>
                    <div className="info-card"><label>Nationality</label><strong>{selectedEmployee.nationality}</strong></div>
                    <div className="info-card"><label>Project</label><strong>{selectedEmployee.projectName}</strong></div>
                    <div className="info-card"><label>Package</label><strong>{selectedEmployee.packageName}</strong></div>
                  </div>

                  <div className="leave-summary">
                    <div className="leave-card"><span>Total Leave</span><strong>{selectedEmployee.leave.total}</strong></div>
                    <div className="leave-card"><span>Used Leave</span><strong>{selectedEmployee.leave.used}</strong></div>
                    <div className="leave-card"><span>Remaining</span><strong>{selectedEmployee.leave.remaining}</strong></div>
                    <div className="leave-card"><span>Sick / Emergency</span><strong>{selectedEmployee.leave.sick} / {selectedEmployee.leave.emergency}</strong></div>
                  </div>

                  {hasPermission("edit_leaves") && (
                    <div className="panel inner-panel">
                      <h4>Edit Leave Balances</h4>
                      <div className="form-grid small-grid">
                        <div className="form-group"><label>Total Leave</label><input type="number" value={leaveForm.total} onChange={(e) => setLeaveForm((p) => ({ ...p, total: Number(e.target.value) }))} /></div>
                        <div className="form-group"><label>Used Leave</label><input type="number" value={leaveForm.used} onChange={(e) => setLeaveForm((p) => ({ ...p, used: Number(e.target.value) }))} /></div>
                        <div className="form-group"><label>Sick Leave</label><input type="number" value={leaveForm.sick} onChange={(e) => setLeaveForm((p) => ({ ...p, sick: Number(e.target.value) }))} /></div>
                        <div className="form-group"><label>Emergency Leave</label><input type="number" value={leaveForm.emergency} onChange={(e) => setLeaveForm((p) => ({ ...p, emergency: Number(e.target.value) }))} /></div>
                      </div>
                      <button className="primary-btn" onClick={saveLeaveBalances}>Save Leave Update</button>
                    </div>
                  )}

                  <div className="notes-section">
                    <h4>Employee Notes</h4>
                    <div className="notes-list">
                      {selectedEmployee.notes.map((n, i) => <div key={i} className="note-box">{n}</div>)}
                    </div>
                    <div className="form-group">
                      <label>Add Note</label>
                      <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Write a new note here" />
                    </div>
                    <button className="primary-btn" onClick={addNote}>Add Note</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {page === "projects" && (
          <div className="project-grid">
            {projectSummary.map((project) => (
              <div key={project.id} className="panel project-card">
                <div className="project-card-head">
                  <h3>{project.name}</h3>
                  <span className="project-badge">{project.packageName}</span>
                </div>
                <p className="muted">{project.location}</p>
                <div className="project-manager"><strong>{project.managerName}</strong><span>{project.managerPhone}</span></div>
                <div className="project-stats">
                  <div><label>Employees</label><strong>{project.employeesCount}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {page === "add" && hasPermission("add_employee") && (
          <div className="panel form-panel">
            <h3>Add Employee</h3>
            <div className="form-grid">
              <div className="form-group"><label>Employee Code</label><input value={addForm.employeeCode} onChange={(e) => setAddForm((p) => ({ ...p, employeeCode: e.target.value }))} /></div>
              <div className="form-group"><label>Full Name</label><input value={addForm.fullName} onChange={(e) => setAddForm((p) => ({ ...p, fullName: e.target.value }))} /></div>
              <div className="form-group"><label>Department</label><input value={addForm.department} onChange={(e) => setAddForm((p) => ({ ...p, department: e.target.value }))} /></div>
              <div className="form-group"><label>Job Title</label><input value={addForm.jobTitle} onChange={(e) => setAddForm((p) => ({ ...p, jobTitle: e.target.value }))} /></div>
              <div className="form-group"><label>Nationality</label><select value={addForm.nationality} onChange={(e) => setAddForm((p) => ({ ...p, nationality: e.target.value }))}><option>Saudi</option><option>Non-Saudi</option></select></div>
              <div className="form-group"><label>System Role</label><select value={addForm.systemRole} onChange={(e) => setAddForm((p) => ({ ...p, systemRole: e.target.value as Role }))}><option>HR</option><option>HR Admin</option><option>Admin</option><option>Admin Assistant</option></select></div>
              <div className="form-group"><label>Project</label><select value={addForm.projectName} onChange={(e) => syncProjectPackage(e.target.value)}>{projectsData.map((project) => <option key={project.id} value={project.name}>{project.name}</option>)}</select></div>
              <div className="form-group"><label>Package</label><input value={addForm.packageName} readOnly /></div>
            </div>
            <div className="form-group"><label>Initial Note</label><textarea value={addForm.note} onChange={(e) => setAddForm((p) => ({ ...p, note: e.target.value }))} /></div>
            <button className="primary-btn" onClick={createEmployee}>Create Employee</button>
          </div>
        )}

        {page === "permissions" && hasPermission("assign_permissions") && (
          <div className="permissions-layout">
            <div className="panel">
              <h3>System Users</h3>
              <table>
                <thead><tr><th>Name</th><th>Username</th><th>Role</th></tr></thead>
                <tbody>
                  {systemUsers.map((user) => (
                    <tr key={user.id} onClick={() => setSelectedUserId(user.id)}>
                      <td>{user.fullName}</td>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="panel">
              <h3>Manage Permissions</h3>
              {selectedSystemUser && (
                <>
                  <div className="user-chip">
                    <strong>{selectedSystemUser.fullName}</strong>
                    <span>{selectedSystemUser.role}</span>
                  </div>
                  <div className="permission-list">
                    {(Object.keys(permissionLabels) as PermissionKey[]).map((permission) => (
                      <label key={permission} className="permission-item">
                        <input
                          type="checkbox"
                          checked={selectedSystemUser.permissions.includes(permission)}
                          onChange={() => togglePermission(selectedSystemUser.id, permission)}
                        />
                        <span>{permissionLabels[permission]}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {page === "audit" && (
          <div className="panel">
            <h3>Audit Log</h3>
            <table>
              <thead><tr><th>Action</th><th>User</th><th>Time</th></tr></thead>
              <tbody>
                <tr><td>Employee record created</td><td>HR Manager</td><td>Today 10:12 AM</td></tr>
                <tr><td>Leave balance updated</td><td>HR Admin</td><td>Today 09:30 AM</td></tr>
                <tr><td>User permissions updated</td><td>HR Manager</td><td>Today 08:10 AM</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {page === "notifications" && (
          <div className="panel">
            <h3>Notifications</h3>
            <div className="notification-box"><strong>Low Leave Balance</strong><p>Sara Khan has only 5 remaining leave days.</p></div>
            <div className="notification-box"><strong>Permissions Updated</strong><p>HR Manager can assign permissions for all users.</p></div>
            <div className="notification-box"><strong>Project Contacts Ready</strong><p>Responsible managers and phone numbers are visible by project.</p></div>
          </div>
        )}

        {page === "reports" && hasPermission("view_reports") && (
          <div className="panel">
            <h3>Reports</h3>
            <table>
              <thead><tr><th>Name</th><th>Project</th><th>Total</th><th>Used</th><th>Remaining</th></tr></thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.fullName}</td>
                    <td>{emp.projectName}</td>
                    <td>{emp.leave.total}</td>
                    <td>{emp.leave.used}</td>
                    <td>{emp.leave.remaining}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
