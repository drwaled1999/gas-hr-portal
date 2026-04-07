import { useEffect, useMemo, useState } from "react";
import "./styles.css";

type Role = "HR Manager" | "HR" | "HR Admin" | "Admin" | "Admin Assistant";

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

type Page =
  | "dashboard"
  | "employees"
  | "add"
  | "permissions"
  | "audit"
  | "notifications"
  | "reports";

const demoUsers = [
  {
    username: "hrmanager",
    password: "123456",
    fullName: "Walid Khalaf Alshammari",
    role: "HR Manager" as Role,
  },
  {
    username: "walid",
    password: "123456",
    fullName: "Walid Khalaf",
    role: "HR Admin" as Role,
  },
];

const initialEmployees: Employee[] = [
  {
    id: 1,
    employeeCode: "GAS-1182",
    fullName: "Walid Khalaf",
    department: "HR",
    jobTitle: "HR Admin",
    nationality: "Saudi",
    projectName: "Zuluf",
    packageName: "Package 12",
    systemRole: "HR Admin",
    status: "Active",
    leave: { total: 21, used: 7, remaining: 14, sick: 2, emergency: 1 },
    notes: ["Supports time sheet updates.", "Can coordinate with Admin Assistants."],
  },
  {
    id: 2,
    employeeCode: "GAS-1450",
    fullName: "Sara Khan",
    department: "Admin",
    jobTitle: "Admin Assistant",
    nationality: "Non-Saudi",
    projectName: "Operations Support",
    packageName: "Package 08",
    systemRole: "Admin Assistant",
    status: "Active",
    leave: { total: 21, used: 16, remaining: 5, sick: 1, emergency: 0 },
    notes: ["Assigned to leave coordination support."],
  },
  {
    id: 3,
    employeeCode: "GAS-2036",
    fullName: "Ahmed Al Qahtani",
    department: "Operations",
    jobTitle: "Store Worker",
    nationality: "Saudi",
    projectName: "Zuluf",
    packageName: "Package 12",
    systemRole: "Admin",
    status: "Active",
    leave: { total: 21, used: 12, remaining: 9, sick: 0, emergency: 1 },
    notes: ["Attendance is consistent."],
  },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [page, setPage] = useState<Page>("dashboard");
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [currentUser, setCurrentUser] = useState<{
    fullName: string;
    role: Role;
  } | null>(null);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [addForm, setAddForm] = useState({
    employeeCode: "",
    fullName: "",
    department: "",
    jobTitle: "",
    nationality: "Saudi",
    projectName: "",
    packageName: "",
    systemRole: "Admin Assistant" as Role,
    note: "",
  });

  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

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

  const selectedEmployee =
    employees.find((emp) => emp.id === selectedId) ?? employees[0];

  const dashboardStats = useMemo(() => {
    const saudi = employees.filter((e) => e.nationality === "Saudi").length;
    const lowLeave = employees.filter((e) => e.leave.remaining <= 5).length;
    const projects = new Set(employees.map((e) => e.projectName)).size;
    return {
      total: employees.length,
      saudi,
      lowLeave,
      projects,
    };
  }, [employees]);

  const navItems: { key: Page; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "employees", label: "Employees" },
    { key: "add", label: "Add Employee" },
    { key: "permissions", label: "Permissions" },
    { key: "audit", label: "Audit Log" },
    { key: "notifications", label: "Notifications" },
    { key: "reports", label: "Reports" },
  ];

  function handleLogin() {
    const found = demoUsers.find(
      (u) =>
        u.username === loginForm.username.trim() &&
        u.password === loginForm.password.trim()
    );

    if (!found) {
      setLoginError("Invalid username or password.");
      return;
    }

    setCurrentUser({ fullName: found.fullName, role: found.role });
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
    if (
      !addForm.employeeCode ||
      !addForm.fullName ||
      !addForm.projectName ||
      !addForm.packageName
    ) {
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
      leave: {
        total: 21,
        used: 0,
        remaining: 21,
        sick: 0,
        emergency: 0,
      },
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
      projectName: "",
      packageName: "",
      systemRole: "Admin Assistant",
      note: "",
    });
  }

  function addNote() {
    if (!selectedEmployee || !noteText.trim()) return;

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id
          ? { ...emp, notes: [noteText, ...emp.notes] }
          : emp
      )
    );
    setNoteText("");
  }

  if (loading) {
    return (
      <div className="splash-screen">
        <div className="splash-card">
          <img src="/LOGO-GAS.jpg" alt="GAS Logo" className="splash-logo" />
          <h1>GAS HR Leave Portal</h1>
          <p>Loading internal HR system...</p>
          <div className="loader">
            <span />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <div className="login-shell">
          <div className="login-left">
            <img src="/LOGO-GAS.jpg" alt="GAS Logo" className="login-logo" />
            <div className="login-copy">
              <h1>GAS HR Leave Portal</h1>
              <p>
                Professional internal HR system for employee records, leave
                balances, project assignments and role-based access.
              </p>
            </div>

            <div className="login-kpis">
              <div className="login-kpi">
                <span>Total Employees</span>
                <strong>{dashboardStats.total}</strong>
              </div>
              <div className="login-kpi">
                <span>Saudi Employees</span>
                <strong>{dashboardStats.saudi}</strong>
              </div>
              <div className="login-kpi">
                <span>Projects</span>
                <strong>{dashboardStats.projects}</strong>
              </div>
              <div className="login-kpi">
                <span>Low Leave Balance</span>
                <strong>{dashboardStats.lowLeave}</strong>
              </div>
            </div>

            <div className="credits">
              <div>Team Fahad Zaidan Alshammari</div>
              <div>Prepared by Walid Khalaf Alshammari</div>
            </div>
          </div>

          <div className="login-right">
            <div className="login-card">
              <h2>Sign In</h2>
              <p className="muted">
                Authorized users only. HR Manager has full access.
              </p>

              <div className="form-group">
                <label>Username</label>
                <input
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  placeholder="Enter your username"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Enter your password"
                />
              </div>

              {loginError && <div className="error-box">{loginError}</div>}

              <button className="primary-btn" onClick={handleLogin}>
                Sign In
              </button>

              <div className="demo-box">
                <strong>Demo Accounts</strong>
                <p>HR Manager: hrmanager / 123456</p>
                <p>HR Admin: walid / 123456</p>
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
          <img src="/LOGO-GAS.jpg" alt="GAS Logo" className="sidebar-logo" />
          <div>
            <h2>GAS Portal</h2>
            <p>{currentUser?.role}</p>
          </div>
        </div>

        <div className="nav-list">
          {navItems.map((item) => (
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
            <h1 className="page-title">
              {page === "dashboard" && "Dashboard"}
              {page === "employees" && "Employees"}
              {page === "add" && "Add Employee"}
              {page === "permissions" && "Permissions"}
              {page === "audit" && "Audit Log"}
              {page === "notifications" && "Notifications"}
              {page === "reports" && "Reports"}
            </h1>
            <p className="muted">
              Signed in as {currentUser?.fullName} ({currentUser?.role})
            </p>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {page === "dashboard" && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{dashboardStats.total}</h3>
                <p>Total Employees</p>
              </div>
              <div className="stat-card">
                <h3>{dashboardStats.saudi}</h3>
                <p>Saudi Employees</p>
              </div>
              <div className="stat-card">
                <h3>{dashboardStats.projects}</h3>
                <p>Projects</p>
              </div>
              <div className="stat-card">
                <h3>{dashboardStats.lowLeave}</h3>
                <p>Low Leave Balance</p>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="panel">
                <h3>Project Summary</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Employees</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(new Set(employees.map((e) => e.projectName))).map(
                      (project) => {
                        const count = employees.filter(
                          (e) => e.projectName === project
                        ).length;
                        return (
                          <tr key={project}>
                            <td>{project}</td>
                            <td>{count}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>

              <div className="panel">
                <h3>Recent Notifications</h3>
                <div className="notification-box">
                  <strong>System Ready</strong>
                  <p>The HR portal is active and available.</p>
                </div>
                <div className="notification-box">
                  <strong>Low Leave Balance Alert</strong>
                  <p>One or more employees have low leave balance.</p>
                </div>
              </div>
            </div>
          </>
        )}

        {page === "employees" && (
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
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Project</th>
                    <th>Package</th>
                    <th>Used</th>
                    <th>Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} onClick={() => setSelectedId(emp.id)}>
                      <td>{emp.employeeCode}</td>
                      <td>{emp.fullName}</td>
                      <td>{emp.projectName}</td>
                      <td>{emp.packageName}</td>
                      <td>{emp.leave.used}</td>
                      <td>
                        <span
                          className={
                            emp.leave.remaining <= 5
                              ? "leave-badge low"
                              : "leave-badge good"
                          }
                        >
                          {emp.leave.remaining}
                        </span>
                      </td>
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
                    <div className="info-card">
                      <label>Employee Code</label>
                      <strong>{selectedEmployee.employeeCode}</strong>
                    </div>
                    <div className="info-card">
                      <label>Department</label>
                      <strong>{selectedEmployee.department}</strong>
                    </div>
                    <div className="info-card">
                      <label>Job Title</label>
                      <strong>{selectedEmployee.jobTitle}</strong>
                    </div>
                    <div className="info-card">
                      <label>Nationality</label>
                      <strong>{selectedEmployee.nationality}</strong>
                    </div>
                    <div className="info-card">
                      <label>Project</label>
                      <strong>{selectedEmployee.projectName}</strong>
                    </div>
                    <div className="info-card">
                      <label>Package</label>
                      <strong>{selectedEmployee.packageName}</strong>
                    </div>
                  </div>

                  <div className="leave-summary">
                    <div className="leave-card">
                      <span>Total Leave</span>
                      <strong>{selectedEmployee.leave.total}</strong>
                    </div>
                    <div className="leave-card">
                      <span>Used Leave</span>
                      <strong>{selectedEmployee.leave.used}</strong>
                    </div>
                    <div className="leave-card">
                      <span>Remaining</span>
                      <strong>{selectedEmployee.leave.remaining}</strong>
                    </div>
                    <div className="leave-card">
                      <span>Sick / Emergency</span>
                      <strong>
                        {selectedEmployee.leave.sick} /{" "}
                        {selectedEmployee.leave.emergency}
                      </strong>
                    </div>
                  </div>

                  <div className="notes-section">
                    <h4>Employee Notes</h4>
                    <div className="notes-list">
                      {selectedEmployee.notes.map((n, i) => (
                        <div key={i} className="note-box">
                          {n}
                        </div>
                      ))}
                    </div>

                    <div className="form-group">
                      <label>Add Note</label>
                      <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Write a new note here"
                      />
                    </div>
                    <button className="primary-btn" onClick={addNote}>
                      Add Note
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {page === "add" && (
          <div className="panel form-panel">
            <h3>Add Employee</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Employee Code</label>
                <input
                  value={addForm.employeeCode}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      employeeCode: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  value={addForm.fullName}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  value={addForm.department}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      department: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label>Job Title</label>
                <input
                  value={addForm.jobTitle}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      jobTitle: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label>Nationality</label>
                <select
                  value={addForm.nationality}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      nationality: e.target.value,
                    }))
                  }
                >
                  <option>Saudi</option>
                  <option>Non-Saudi</option>
                </select>
              </div>
              <div className="form-group">
                <label>System Role</label>
                <select
                  value={addForm.systemRole}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      systemRole: e.target.value as Role,
                    }))
                  }
                >
                  <option>HR</option>
                  <option>HR Admin</option>
                  <option>Admin</option>
                  <option>Admin Assistant</option>
                </select>
              </div>
              <div className="form-group">
                <label>Project</label>
                <input
                  value={addForm.projectName}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      projectName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label>Package</label>
                <input
                  value={addForm.packageName}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      packageName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label>Initial Note</label>
              <textarea
                value={addForm.note}
                onChange={(e) =>
                  setAddForm((prev) => ({
                    ...prev,
                    note: e.target.value,
                  }))
                }
              />
            </div>

            <button className="primary-btn" onClick={createEmployee}>
              Create Employee
            </button>
          </div>
        )}

        {page === "permissions" && (
          <div className="panel">
            <h3>Permissions</h3>
            <p className="muted">
              HR Manager can manage team roles and assign custom permissions.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Access Level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HR Manager</td>
                  <td>Full system access</td>
                </tr>
                <tr>
                  <td>HR</td>
                  <td>View employees and reports</td>
                </tr>
                <tr>
                  <td>HR Admin</td>
                  <td>Manage employees and notes</td>
                </tr>
                <tr>
                  <td>Admin</td>
                  <td>Operational access</td>
                </tr>
                <tr>
                  <td>Admin Assistant</td>
                  <td>Basic view access</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {page === "audit" && (
          <div className="panel">
            <h3>Audit Log</h3>
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>User</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Employee record created</td>
                  <td>HR Manager</td>
                  <td>Today 10:12 AM</td>
                </tr>
                <tr>
                  <td>Leave balance updated</td>
                  <td>HR Admin</td>
                  <td>Today 09:30 AM</td>
                </tr>
                <tr>
                  <td>Employee note added</td>
                  <td>HR Manager</td>
                  <td>Yesterday 04:20 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {page === "notifications" && (
          <div className="panel">
            <h3>Notifications</h3>
            <div className="notification-box">
              <strong>Low Leave Balance</strong>
              <p>Sara Khan has only 5 remaining leave days.</p>
            </div>
            <div className="notification-box">
              <strong>New Employee Added</strong>
              <p>A new employee record was recently created in the system.</p>
            </div>
          </div>
        )}

        {page === "reports" && (
          <div className="panel">
            <h3>Reports</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Total Leave</th>
                  <th>Used</th>
                  <th>Remaining</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.fullName}</td>
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
