import { useMemo, useState } from "react";
import "./styles.css";

type Employee = {
  id: number;
  employeeCode: string;
  fullName: string;
  department: string;
  jobTitle: string;
  nationality: string;
  projectName: string;
  packageName: string;
  systemRole: string;
  status: string;
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
    notes: ["Supports time sheet updates."],
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
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [department, setDepartment] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [nationality, setNationality] = useState("Saudi");
  const [projectName, setProjectName] = useState("");
  const [packageName, setPackageName] = useState("");
  const [systemRole, setSystemRole] = useState("Admin Assistant");
  const [note, setNote] = useState("");

  const selectedEmployee =
    employees.find((e) => e.id === selectedId) ?? employees[0];

  const stats = useMemo(() => {
    const saudi = employees.filter((e) => e.nationality === "Saudi").length;
    const projects = new Set(employees.map((e) => e.projectName)).size;
    const lowLeave = employees.filter((e) => e.leave.remaining <= 5).length;
    return {
      total: employees.length,
      saudi,
      projects,
      lowLeave,
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
    if (!username || !password) {
      alert("Enter username and password");
      return;
    }
    setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  }

  function addEmployee() {
    if (!name || !code || !projectName || !packageName) {
      alert("Please fill Employee Code, Name, Project and Package");
      return;
    }

    const used = 0;
    const total = 21;
    const newEmployee: Employee = {
      id: Date.now(),
      employeeCode: code,
      fullName: name,
      department,
      jobTitle,
      nationality,
      projectName,
      packageName,
      systemRole,
      status: "Active",
      leave: {
        total,
        used,
        remaining: total - used,
        sick: 0,
        emergency: 0,
      },
      notes: note ? [note] : [],
    };

    setEmployees((prev) => [newEmployee, ...prev]);
    setSelectedId(newEmployee.id);
    setPage("employees");

    setName("");
    setCode("");
    setDepartment("");
    setJobTitle("");
    setNationality("Saudi");
    setProjectName("");
    setPackageName("");
    setSystemRole("Admin Assistant");
    setNote("");
  }

  function addNote() {
    if (!selectedEmployee || !note.trim()) return;

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id
          ? { ...emp, notes: [note, ...emp.notes] }
          : emp
      )
    );
    setNote("");
  }

  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h1>GAS HR Leave Portal</h1>
          <p className="muted">Team Fahad Zaidan Alshammari</p>
          <p className="muted">Prepared by Walid Khalaf Alshammari</p>

          <div className="form-group">
            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={handleLogin}>Sign In</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>GAS Portal</h2>
        {navItems.map((item) => (
          <button
            key={item.key}
            className={page === item.key ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage(item.key)}
          >
            {item.label}
          </button>
        ))}
      </aside>

      <main className="content">
        <div className="topbar">
          <div>
            <strong>{page.toUpperCase()}</strong>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>

        {page === "dashboard" && (
          <div className="grid four">
            <div className="card stat">
              <h3>{stats.total}</h3>
              <p>Total Employees</p>
            </div>
            <div className="card stat">
              <h3>{stats.saudi}</h3>
              <p>Saudi Employees</p>
            </div>
            <div className="card stat">
              <h3>{stats.projects}</h3>
              <p>Projects</p>
            </div>
            <div className="card stat">
              <h3>{stats.lowLeave}</h3>
              <p>Low Leave Balance</p>
            </div>
          </div>
        )}

        {page === "employees" && (
          <div className="grid two">
            <div className="card">
              <h3>Employees List</h3>
              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Project</th>
                    <th>Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} onClick={() => setSelectedId(emp.id)}>
                      <td>{emp.employeeCode}</td>
                      <td>{emp.fullName}</td>
                      <td>{emp.projectName}</td>
                      <td>{emp.leave.remaining}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card">
              <h3>Employee Details</h3>
              {selectedEmployee && (
                <>
                  <p><strong>Name:</strong> {selectedEmployee.fullName}</p>
                  <p><strong>Job Title:</strong> {selectedEmployee.jobTitle}</p>
                  <p><strong>Department:</strong> {selectedEmployee.department}</p>
                  <p><strong>Project:</strong> {selectedEmployee.projectName}</p>
                  <p><strong>Package:</strong> {selectedEmployee.packageName}</p>
                  <p><strong>Total Leave:</strong> {selectedEmployee.leave.total}</p>
                  <p><strong>Used Leave:</strong> {selectedEmployee.leave.used}</p>
                  <p><strong>Remaining Leave:</strong> {selectedEmployee.leave.remaining}</p>

                  <div className="form-group">
                    <label>Add Note</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} />
                  </div>
                  <button onClick={addNote}>Add Note</button>

                  <div className="notes">
                    {selectedEmployee.notes.map((n, i) => (
                      <div key={i} className="note-box">{n}</div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {page === "add" && (
          <div className="card form-card">
            <h3>Add Employee</h3>
            <div className="grid two">
              <div className="form-group">
                <label>Employee Code</label>
                <input value={code} onChange={(e) => setCode(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input value={department} onChange={(e) => setDepartment(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Job Title</label>
                <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Nationality</label>
                <select value={nationality} onChange={(e) => setNationality(e.target.value)}>
                  <option>Saudi</option>
                  <option>Non-Saudi</option>
                </select>
              </div>
              <div className="form-group">
                <label>System Role</label>
                <select value={systemRole} onChange={(e) => setSystemRole(e.target.value)}>
                  <option>HR</option>
                  <option>HR Admin</option>
                  <option>Admin</option>
                  <option>Admin Assistant</option>
                </select>
              </div>
              <div className="form-group">
                <label>Project</label>
                <input value={projectName} onChange={(e) => setProjectName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Package</label>
                <input value={packageName} onChange={(e) => setPackageName(e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label>Initial Note</label>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} />
            </div>

            <button onClick={addEmployee}>Create Employee</button>
          </div>
        )}

        {page === "permissions" && <div className="card"><h3>Permissions</h3><p>HR Manager can manage roles and permissions here.</p></div>}
        {page === "audit" && <div className="card"><h3>Audit Log</h3><p>Recent actions will appear here.</p></div>}
        {page === "notifications" && <div className="card"><h3>Notifications</h3><p>System notifications will appear here.</p></div>}
        {page === "reports" && <div className="card"><h3>Reports</h3><p>Employee leave reports will appear here.</p></div>}
      </main>
    </div>
  );
}
