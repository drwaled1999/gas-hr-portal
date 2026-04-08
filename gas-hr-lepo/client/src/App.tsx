
import { useEffect, useMemo, useState } from "react";
import "./styles.css";

type Role = "HR Manager" | "HR" | "HR Admin" | "Admin" | "Admin Assistant";
type Page = "dashboard" | "employees" | "leaves" | "projects" | "permissions" | "files" | "reports" | "settings";
type PermissionKey = "view_dashboard" | "view_employees" | "manage_leaves" | "manage_projects" | "manage_permissions" | "view_reports" | "manage_files" | "manage_settings";

type Project = { id:number; name:string; packageName:string; location:string; managerName:string; managerPhone:string; colorTag:string; };
type LeaveEntry = { id:number; type:"Annual"|"Sick"|"Emergency"|"Takleef"; days:number; startDate:string; endDate:string; note:string; };
type Employee = {
  id:number; employeeCode:string; fullName:string; department:string; jobTitle:string; nationality:string;
  projectName:string; packageName:string; role:Role; mobile:string; status:"Active"|"Inactive";
  leave:{ total:number; used:number; remaining:number; sick:number; emergency:number; };
  leaveEntries:LeaveEntry[]; notes:string[];
};
type UserAccess = { id:number; fullName:string; username:string; role:Role; permissions:PermissionKey[]; };
type ProjectFile = { id:number; projectName:string; category:"Leave"|"Takleef"; title:string; note:string; uploadedBy:string; uploadedAt:string; };

const logoPath = "/LOGO-GAS.jpg";

const projectsSeed: Project[] = [
  { id:1, name:"Qatif", packageName:"Package 08", location:"Qatif", managerName:"Mohammed Al Qahtani", managerPhone:"+966 55 222 3344", colorTag:"Sky" },
  { id:2, name:"Qassim", packageName:"Package 12", location:"Al Qassim", managerName:"Fahad Zaidan Alshammari", managerPhone:"+966 50 123 4567", colorTag:"Indigo" },
  { id:3, name:"Shadqam", packageName:"Package 16", location:"Shadqam", managerName:"Nasser Al Harbi", managerPhone:"+966 54 777 8899", colorTag:"Emerald" },
];

const employeeSeed: Employee[] = [
  { id:1, employeeCode:"GAS-1182", fullName:"Walid Khalaf", department:"HR", jobTitle:"HR Admin", nationality:"Saudi", projectName:"Qatif", packageName:"Package 08", role:"HR Admin", mobile:"+966 55 111 1111", status:"Active", leave:{ total:30, used:7, remaining:23, sick:2, emergency:1 }, leaveEntries:[{ id:11, type:"Annual", days:5, startDate:"2026-03-01", endDate:"2026-03-05", note:"Annual leave" },{ id:12, type:"Emergency", days:1, startDate:"2026-03-12", endDate:"2026-03-12", note:"Urgent matter" },{ id:13, type:"Sick", days:1, startDate:"2026-03-27", endDate:"2026-03-27", note:"Medical rest" }], notes:["Supports time sheet updates.","Coordinates project leave follow-up."] },
  { id:2, employeeCode:"GAS-1450", fullName:"Sara Khan", department:"Admin", jobTitle:"Admin Assistant", nationality:"Non-Saudi", projectName:"Qatif", packageName:"Package 08", role:"Admin Assistant", mobile:"+966 55 888 4444", status:"Active", leave:{ total:30, used:16, remaining:14, sick:1, emergency:0 }, leaveEntries:[{ id:21, type:"Annual", days:15, startDate:"2026-02-01", endDate:"2026-02-15", note:"Annual leave" },{ id:22, type:"Sick", days:1, startDate:"2026-03-10", endDate:"2026-03-10", note:"Medical leave" }], notes:["Assigned to leave coordination support."] },
  { id:3, employeeCode:"GAS-2036", fullName:"Ahmed Al Qahtani", department:"Operations", jobTitle:"Store Worker", nationality:"Saudi", projectName:"Qassim", packageName:"Package 12", role:"Admin", mobile:"+966 55 222 1111", status:"Active", leave:{ total:30, used:12, remaining:18, sick:0, emergency:1 }, leaveEntries:[{ id:31, type:"Annual", days:11, startDate:"2026-01-05", endDate:"2026-01-15", note:"Annual leave" },{ id:32, type:"Emergency", days:1, startDate:"2026-03-22", endDate:"2026-03-22", note:"Urgent matter" }], notes:["Attendance is consistent."] },
  { id:4, employeeCode:"GAS-2201", fullName:"Eid Al Khaldi", department:"Operations", jobTitle:"Store Worker", nationality:"Saudi", projectName:"Shadqam", packageName:"Package 16", role:"Admin Assistant", mobile:"+966 55 333 2222", status:"Active", leave:{ total:30, used:4, remaining:26, sick:0, emergency:0 }, leaveEntries:[{ id:41, type:"Annual", days:4, startDate:"2026-03-04", endDate:"2026-03-07", note:"Annual leave" }], notes:["Needs monthly leave check."] },
];

const usersSeed: UserAccess[] = [
  { id:1, fullName:"Walid Khalaf Alshammari", username:"hrmanager", role:"HR Manager", permissions:["view_dashboard","view_employees","manage_leaves","manage_projects","manage_permissions","view_reports","manage_files","manage_settings"] },
  { id:2, fullName:"Walid Khalaf", username:"walid", role:"HR Admin", permissions:["view_dashboard","view_employees","manage_leaves","manage_projects","view_reports","manage_files"] },
  { id:3, fullName:"Sara Khan", username:"sara", role:"Admin Assistant", permissions:["view_dashboard","view_employees"] },
];

const passwords: Record<string,string> = { hrmanager:"123456", walid:"123456", sara:"123456" };

const filesSeed: ProjectFile[] = [
  { id:1, projectName:"Qatif", category:"Leave", title:"qatif_leave_march.pdf", note:"March leave record", uploadedBy:"Walid Khalaf", uploadedAt:"2026-04-07 09:30" },
  { id:2, projectName:"Qatif", category:"Takleef", title:"qatif_takleef_week2.pdf", note:"Site takleef record", uploadedBy:"Walid Khalaf", uploadedAt:"2026-04-07 11:15" },
  { id:3, projectName:"Qassim", category:"Leave", title:"qassim_approved_leave.pdf", note:"Approved leave files", uploadedBy:"HR Manager", uploadedAt:"2026-04-06 08:45" },
];

export default function App() {
  const [booting, setBooting] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState(projectsSeed[0].name);
  const [currentUser, setCurrentUser] = useState<UserAccess | null>(null);
  const [users, setUsers] = useState<UserAccess[]>(usersSeed);
  const [employees, setEmployees] = useState<Employee[]>(employeeSeed);
  const [projects, setProjects] = useState<Project[]>(projectsSeed);
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>(filesSeed);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employeeSeed[0].id);
  const [selectedUserId, setSelectedUserId] = useState(usersSeed[1].id);
  const [loginError, setLoginError] = useState("");
  const [noteText, setNoteText] = useState("");
  const [loginForm, setLoginForm] = useState({ username:"", password:"" });
  const [leaveBalanceForm, setLeaveBalanceForm] = useState({ total:30, used:0, sick:0, emergency:0 });
  const [manualLeaveForm, setManualLeaveForm] = useState({ type:"Annual" as LeaveEntry["type"], days:1, startDate:"", endDate:"", note:"" });
  const [employeeForm, setEmployeeForm] = useState({ employeeCode:"", fullName:"", department:"", jobTitle:"", nationality:"Saudi", projectName:projectsSeed[0].name, packageName:projectsSeed[0].packageName, role:"Admin Assistant" as Role, mobile:"", totalLeave:30, note:"" });
  const [projectForm, setProjectForm] = useState({ name:"", packageName:"", location:"", managerName:"", managerPhone:"", colorTag:"" });
  const [projectFileForm, setProjectFileForm] = useState({ category:"Leave" as ProjectFile["category"], title:"", note:"" });

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const selectedEmployee = employees.find((emp) => emp.id === selectedEmployeeId) ?? employees[0];
  const selectedUser = users.find((u) => u.id === selectedUserId) ?? users[0];

  useEffect(() => {
    if (selectedEmployee) {
      setLeaveBalanceForm({
        total: selectedEmployee.leave.total,
        used: selectedEmployee.leave.used,
        sick: selectedEmployee.leave.sick,
        emergency: selectedEmployee.leave.emergency,
      });
      setProjectFilter(selectedEmployee.projectName);
    }
  }, [selectedEmployeeId]);

  const filteredEmployees = useMemo(() => {
    const q = search.trim().toLowerCase();
    return employees.filter((emp) => {
      const matchesSearch = !q || emp.fullName.toLowerCase().includes(q) || emp.employeeCode.toLowerCase().includes(q) || emp.projectName.toLowerCase().includes(q) || emp.packageName.toLowerCase().includes(q) || emp.department.toLowerCase().includes(q);
      const matchesProject = !projectFilter || emp.projectName === projectFilter;
      return matchesSearch && matchesProject;
    });
  }, [employees, search, projectFilter]);

  const projectSummaries = useMemo(() => {
    return projects.map((project) => {
      const list = employees.filter((e) => e.projectName === project.name);
      return { ...project, employeesCount:list.length, saudiCount:list.filter((e) => e.nationality === "Saudi").length, remainingLeave:list.reduce((acc, emp) => acc + emp.leave.remaining, 0) };
    });
  }, [projects, employees]);

  const dashboard = useMemo(() => {
    const saudi = employees.filter((e) => e.nationality === "Saudi").length;
    const low = employees.filter((e) => e.leave.remaining <= 5).length;
    const remaining = employees.reduce((acc, emp) => acc + emp.leave.remaining, 0);
    return { totalEmployees:employees.length, saudiEmployees:saudi, totalProjects:projects.length, lowLeaveEmployees:low, totalRemainingLeave:remaining };
  }, [employees, projects]);

  const currentProjectSummary = projectSummaries.find((project) => project.name === projectFilter) ?? projectSummaries[0];
  const visibleFiles = useMemo(() => projectFiles.filter((item) => item.projectName === projectFilter), [projectFiles, projectFilter]);

  function hasPermission(permission: PermissionKey) {
    if (!currentUser) return false;
    return currentUser.permissions.includes(permission);
  }

  function login() {
    const user = users.find((u) => u.username === loginForm.username.trim());
    if (!user || passwords[user.username] !== loginForm.password.trim()) {
      setLoginError("Invalid username or password.");
      return;
    }
    setCurrentUser(user);
    setAuthenticated(true);
    setLoginError("");
    if (user.role !== "HR Manager") {
      const ownProject = employees.find((e) => e.fullName === user.fullName)?.projectName;
      if (ownProject) setProjectFilter(ownProject);
    }
  }

  function logout() {
    setAuthenticated(false);
    setCurrentUser(null);
    setPage("dashboard");
    setLoginForm({ username:"", password:"" });
  }

  function syncEmployeeProject(projectName: string) {
    const project = projects.find((p) => p.name === projectName);
    setEmployeeForm((prev) => ({ ...prev, projectName, packageName: project?.packageName ?? prev.packageName }));
  }

  function addEmployee() {
    if (!employeeForm.employeeCode || !employeeForm.fullName || !employeeForm.projectName) {
      alert("Please complete employee code, full name and project.");
      return;
    }
    const total = Math.max(Number(employeeForm.totalLeave) || 0, 0);
    const employee: Employee = {
      id: Date.now(),
      employeeCode: employeeForm.employeeCode,
      fullName: employeeForm.fullName,
      department: employeeForm.department,
      jobTitle: employeeForm.jobTitle,
      nationality: employeeForm.nationality,
      projectName: employeeForm.projectName,
      packageName: employeeForm.packageName,
      role: employeeForm.role,
      mobile: employeeForm.mobile,
      status: "Active",
      leave: { total, used:0, remaining:total, sick:0, emergency:0 },
      leaveEntries: [],
      notes: employeeForm.note ? [employeeForm.note] : [],
    };
    setEmployees((prev) => [employee, ...prev]);
    setSelectedEmployeeId(employee.id);
    setPage("employees");
    setEmployeeForm({ employeeCode:"", fullName:"", department:"", jobTitle:"", nationality:"Saudi", projectName:projects[0].name, packageName:projects[0].packageName, role:"Admin Assistant", mobile:"", totalLeave:30, note:"" });
  }

  function addProject() {
    if (!projectForm.name || !projectForm.packageName || !projectForm.managerName) {
      alert("Please complete project name, package and manager.");
      return;
    }
    const project: Project = { id: Date.now(), name: projectForm.name, packageName: projectForm.packageName, location: projectForm.location, managerName: projectForm.managerName, managerPhone: projectForm.managerPhone, colorTag: projectForm.colorTag || "Custom" };
    setProjects((prev) => [...prev, project]);
    setProjectFilter(project.name);
    setProjectForm({ name:"", packageName:"", location:"", managerName:"", managerPhone:"", colorTag:"" });
  }

  function addLeaveNote() {
    if (!selectedEmployee || !noteText.trim()) return;
    setEmployees((prev) => prev.map((emp) => emp.id === selectedEmployee.id ? { ...emp, notes:[noteText, ...emp.notes] } : emp));
    setNoteText("");
  }

  function saveLeaveBalance() {
    if (!selectedEmployee) return;
    const total = Math.max(Number(leaveBalanceForm.total) || 0, 0);
    const used = Math.max(Number(leaveBalanceForm.used) || 0, 0);
    const sick = Math.max(Number(leaveBalanceForm.sick) || 0, 0);
    const emergency = Math.max(Number(leaveBalanceForm.emergency) || 0, 0);
    const remaining = Math.max(total - used, 0);
    setEmployees((prev) => prev.map((emp) => emp.id === selectedEmployee.id ? { ...emp, leave:{ total, used, remaining, sick, emergency } } : emp));
  }

  function addLeaveEntry() {
    if (!selectedEmployee) return;
    const days = Math.max(Number(manualLeaveForm.days) || 0, 0);
    if (!days) return;
    setEmployees((prev) => prev.map((emp) => {
      if (emp.id !== selectedEmployee.id) return emp;
      const newUsed = emp.leave.used + days;
      const newSick = manualLeaveForm.type === "Sick" ? emp.leave.sick + days : emp.leave.sick;
      const newEmergency = manualLeaveForm.type === "Emergency" ? emp.leave.emergency + days : emp.leave.emergency;
      const entry: LeaveEntry = { id: Date.now(), type: manualLeaveForm.type, days, startDate: manualLeaveForm.startDate, endDate: manualLeaveForm.endDate, note: manualLeaveForm.note };
      return { ...emp, leave:{ total:emp.leave.total, used:newUsed, remaining:Math.max(emp.leave.total - newUsed, 0), sick:newSick, emergency:newEmergency }, leaveEntries:[entry, ...emp.leaveEntries] };
    }));
    setManualLeaveForm({ type:"Annual", days:1, startDate:"", endDate:"", note:"" });
  }

  function addProjectFile() {
    if (!projectFileForm.title.trim()) return;
    const item: ProjectFile = { id: Date.now(), projectName: projectFilter, category: projectFileForm.category, title: projectFileForm.title, note: projectFileForm.note, uploadedBy: currentUser?.fullName || "User", uploadedAt: new Date().toLocaleString() };
    setProjectFiles((prev) => [item, ...prev]);
    setProjectFileForm({ category:"Leave", title:"", note:"" });
  }

  function togglePermission(userId: number, permission: PermissionKey) {
    if (!currentUser || currentUser.role !== "HR Manager") return;
    let updatedSelf: UserAccess | null = null;
    setUsers((prev) => prev.map((user) => {
      if (user.id !== userId) return user;
      const exists = user.permissions.includes(permission);
      const updated = { ...user, permissions: exists ? user.permissions.filter((p) => p !== permission) : [...user.permissions, permission] };
      if (currentUser.id === userId) updatedSelf = updated;
      return updated;
    }));
    if (updatedSelf) setCurrentUser(updatedSelf);
  }

  const sideNav = [
    { key:"dashboard" as Page, label:"Dashboard", visible:hasPermission("view_dashboard") },
    { key:"employees" as Page, label:"Employees", visible:hasPermission("view_employees") },
    { key:"leaves" as Page, label:"Leaves & Takleef", visible:hasPermission("manage_leaves") },
    { key:"projects" as Page, label:"Projects", visible:hasPermission("manage_projects") || currentUser?.role === "HR Manager" },
    { key:"add" as Page, label:"Add Employee", visible:hasPermission("add_employee") },
    { key:"permissions" as Page, label:"Permissions", visible:hasPermission("manage_permissions") },
    { key:"files" as Page, label:"Project Files", visible:hasPermission("manage_files") },
    { key:"reports" as Page, label:"Reports", visible:hasPermission("view_reports") },
    { key:"settings" as Page, label:"Settings", visible:hasPermission("manage_settings") },
  ];

  if (booting) {
    return <div className="splash-screen"><div className="splash-orbit" /><div className="splash-card"><div className="logo-fade-wrap"><img src={logoPath} alt="GAS Logo" className="splash-logo" /></div><h1>GAS HR Leave Portal</h1><p>Loading secure enterprise workspace...</p><div className="loader"><span /></div></div></div>;
  }

  if (!authenticated) {
    return (
      <div className="login-page">
        <div className="login-layout">
          <section className="login-hero">
            <div className="hero-top"><img src={logoPath} alt="GAS Logo" className="login-logo" /><div className="hero-badge">Enterprise HR Workspace</div></div>
            <div className="hero-copy"><h1>GAS HR Leave Portal</h1><p>Redesigned HR platform for employee records, leave balances, manual leave entries, takleef requests, project sections, permission control and project file review.</p></div>
            <div className="hero-stats">
              <div className="hero-stat"><span>Total Employees</span><strong>{dashboard.totalEmployees}</strong></div>
              <div className="hero-stat"><span>Saudi Employees</span><strong>{dashboard.saudiEmployees}</strong></div>
              <div className="hero-stat"><span>Projects</span><strong>{dashboard.totalProjects}</strong></div>
              <div className="hero-stat"><span>Remaining Leave</span><strong>{dashboard.totalRemainingLeave}</strong></div>
            </div>
            <div className="hero-credit"><div>Team Fahad Zaidan Alshammari</div><div>Prepared by Walid Khalaf Alshammari</div></div>
          </section>

          <section className="login-panel-wrap">
            <div className="login-panel">
              <div className="login-panel-head"><img src={logoPath} alt="GAS Logo" className="login-panel-logo" /><div><h2>Sign In</h2><p className="muted">Professional internal HR access</p></div></div>
              <div className="form-group"><label>Username</label><input value={loginForm.username} onChange={(e) => setLoginForm((prev) => ({ ...prev, username:e.target.value }))} placeholder="Enter your username" /></div>
              <div className="form-group"><label>Password</label><input type="password" value={loginForm.password} onChange={(e) => setLoginForm((prev) => ({ ...prev, password:e.target.value }))} placeholder="Enter your password" /></div>
              {loginError && <div className="error-box">{loginError}</div>}
              <button className="primary-btn" onClick={login}>Sign In</button>
              <div className="demo-box"><strong>Demo Accounts</strong><p>HR Manager: hrmanager / 123456</p><p>HR Admin: walid / 123456</p><p>Admin Assistant: sara / 123456</p></div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="portal-shell">
      <aside className="sidebar">
        <div className="sidebar-brand"><img src={logoPath} alt="GAS Logo" className="sidebar-logo" /><div><h2>GAS Portal</h2><p>{currentUser?.role}</p></div></div>
        <div className="sidebar-nav">
          {sideNav.filter((item) => item.visible).map((item) => <button key={item.key} className={page === item.key ? "nav-btn active" : "nav-btn"} onClick={() => setPage(item.key)}>{item.label}</button>)}
          <div className="project-menu"><div className="project-menu-title">Project Sections</div>{projects.map((project) => <button key={project.id} className={projectFilter === project.name ? "project-link active" : "project-link"} onClick={() => { setProjectFilter(project.name); setPage("projects"); }}>{project.name}</button>)}</div>
        </div>
      </aside>

      <main className="content">
        <div className="topbar"><div><h1>{sideNav.find((item) => item.key === page)?.label ?? "Portal"}</h1><p className="muted">Signed in as {currentUser?.fullName} ({currentUser?.role})</p></div><button className="secondary-btn" onClick={logout}>Logout</button></div>

        {page === "dashboard" && <>
          <div className="stats-grid">
            <div className="stat-card featured"><h3>{dashboard.totalEmployees}</h3><p>Total Employees</p></div>
            <div className="stat-card"><h3>{dashboard.saudiEmployees}</h3><p>Saudi Employees</p></div>
            <div className="stat-card"><h3>{dashboard.totalProjects}</h3><p>Projects</p></div>
            <div className="stat-card"><h3>{dashboard.lowLeaveEmployees}</h3><p>Low Leave Balance</p></div>
          </div>
          <div className="main-grid">
            <section className="panel">
              <h3>Project Summary</h3>
              <table><thead><tr><th>Project</th><th>Manager</th><th>Phone</th><th>Employees</th><th>Remain.</th></tr></thead><tbody>{projectSummaries.map((project) => <tr key={project.id}><td>{project.name}</td><td>{project.managerName}</td><td>{project.managerPhone}</td><td>{project.employeesCount}</td><td>{project.remainingLeave}</td></tr>)}</tbody></table>
            </section>
            <section className="panel">
              <h3>Quick Highlights</h3>
              <div className="info-box"><strong>Manual Leave Setup</strong><p>Every leave balance is editable manually, including total leave days.</p></div>
              <div className="info-box"><strong>Project Files</strong><p>Each project has its own leave and takleef file section for review.</p></div>
              <div className="info-box"><strong>HR Manager Control</strong><p>Permissions for every user can be assigned directly from the portal.</p></div>
            </section>
          </div>
        </>}

        {page === "employees" && <div className="split-grid">
          <section className="panel">
            <div className="panel-header"><h3>Employee Directory</h3><div className="filters-row"><input className="search-input" placeholder="Search by name, code, project or package" value={search} onChange={(e) => setSearch(e.target.value)} /><select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} className="compact-select">{projects.map((project) => <option key={project.id}>{project.name}</option>)}</select></div></div>
            <table><thead><tr><th>Code</th><th>Name</th><th>Project</th><th>Used</th><th>Remaining</th></tr></thead><tbody>{filteredEmployees.map((emp) => <tr key={emp.id} onClick={() => setSelectedEmployeeId(emp.id)}><td>{emp.employeeCode}</td><td>{emp.fullName}</td><td>{emp.projectName}</td><td>{emp.leave.used}</td><td><span className={emp.leave.remaining <= 5 ? "leave-badge low" : "leave-badge good"}>{emp.leave.remaining}</span></td></tr>)}</tbody></table>
          </section>

          <section className="panel">
            <div className="employee-header"><div><h3>{selectedEmployee.fullName}</h3><p className="muted">{selectedEmployee.jobTitle} • {selectedEmployee.department}</p></div><span className="status-pill">{selectedEmployee.status}</span></div>
            <div className="info-grid">
              <div className="mini-card"><label>Employee Code</label><strong>{selectedEmployee.employeeCode}</strong></div>
              <div className="mini-card"><label>Mobile</label><strong>{selectedEmployee.mobile}</strong></div>
              <div className="mini-card"><label>Project</label><strong>{selectedEmployee.projectName}</strong></div>
              <div className="mini-card"><label>Package</label><strong>{selectedEmployee.packageName}</strong></div>
              <div className="mini-card"><label>Nationality</label><strong>{selectedEmployee.nationality}</strong></div>
              <div className="mini-card"><label>System Role</label><strong>{selectedEmployee.role}</strong></div>
            </div>
            <div className="leave-summary">
              <div className="leave-card"><span>Total Leave</span><strong>{selectedEmployee.leave.total}</strong></div>
              <div className="leave-card"><span>Used Leave</span><strong>{selectedEmployee.leave.used}</strong></div>
              <div className="leave-card"><span>Remaining</span><strong>{selectedEmployee.leave.remaining}</strong></div>
              <div className="leave-card"><span>Sick / Emergency</span><strong>{selectedEmployee.leave.sick} / {selectedEmployee.leave.emergency}</strong></div>
            </div>
            <div className="section-gap">
              <h4>Notes</h4>
              <div className="notes-list">{selectedEmployee.notes.map((note, i) => <div key={i} className="note-box">{note}</div>)}</div>
              <div className="form-group"><label>Add Note</label><textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Write a new note here" /></div>
              <button className="primary-btn" onClick={addLeaveNote}>Add Note</button>
            </div>
          </section>
        </div>}

        {page === "leaves" && <div className="split-grid">
          <section className="panel">
            <div className="panel-header"><h3>Manual Leave Control</h3><div className="leave-chip">Remaining: {selectedEmployee.leave.remaining}</div></div>
            <div className="info-grid"><div className="mini-card"><label>Employee</label><strong>{selectedEmployee.fullName}</strong></div><div className="mini-card"><label>Project</label><strong>{selectedEmployee.projectName}</strong></div></div>
            <div className="form-grid">
              <div className="form-group"><label>Total Leave</label><input type="number" value={leaveBalanceForm.total} onChange={(e) => setLeaveBalanceForm((prev) => ({ ...prev, total:Number(e.target.value) }))} /></div>
              <div className="form-group"><label>Used Leave</label><input type="number" value={leaveBalanceForm.used} onChange={(e) => setLeaveBalanceForm((prev) => ({ ...prev, used:Number(e.target.value) }))} /></div>
              <div className="form-group"><label>Sick Leave</label><input type="number" value={leaveBalanceForm.sick} onChange={(e) => setLeaveBalanceForm((prev) => ({ ...prev, sick:Number(e.target.value) }))} /></div>
              <div className="form-group"><label>Emergency Leave</label><input type="number" value={leaveBalanceForm.emergency} onChange={(e) => setLeaveBalanceForm((prev) => ({ ...prev, emergency:Number(e.target.value) }))} /></div>
            </div>
            <button className="primary-btn" onClick={saveLeaveBalance}>Save Leave Balance</button>
            <div className="subsection">
              <h4>Add Leave / Takleef Entry</h4>
              <div className="form-grid">
                <div className="form-group"><label>Type</label><select value={manualLeaveForm.type} onChange={(e) => setManualLeaveForm((prev) => ({ ...prev, type:e.target.value as LeaveEntry["type"] }))}><option>Annual</option><option>Sick</option><option>Emergency</option><option>Takleef</option></select></div>
                <div className="form-group"><label>Days</label><input type="number" value={manualLeaveForm.days} onChange={(e) => setManualLeaveForm((prev) => ({ ...prev, days:Number(e.target.value) }))} /></div>
                <div className="form-group"><label>Start Date</label><input type="date" value={manualLeaveForm.startDate} onChange={(e) => setManualLeaveForm((prev) => ({ ...prev, startDate:e.target.value }))} /></div>
                <div className="form-group"><label>End Date</label><input type="date" value={manualLeaveForm.endDate} onChange={(e) => setManualLeaveForm((prev) => ({ ...prev, endDate:e.target.value }))} /></div>
              </div>
              <div className="form-group"><label>Note</label><textarea value={manualLeaveForm.note} onChange={(e) => setManualLeaveForm((prev) => ({ ...prev, note:e.target.value }))} /></div>
              <button className="primary-btn" onClick={addLeaveEntry}>Add Entry</button>
            </div>
          </section>
          <section className="panel">
            <h3>Leave History</h3>
            <table><thead><tr><th>Type</th><th>Days</th><th>Start</th><th>End</th><th>Note</th></tr></thead><tbody>{selectedEmployee.leaveEntries.map((entry) => <tr key={entry.id}><td>{entry.type}</td><td>{entry.days}</td><td>{entry.startDate}</td><td>{entry.endDate}</td><td>{entry.note}</td></tr>)}</tbody></table>
          </section>
        </div>}

        {page === "projects" && <div className="stack-layout">
          <div className="project-grid">{projectSummaries.map((project) => <div key={project.id} className={projectFilter === project.name ? "panel project-card active" : "panel project-card"} onClick={() => setProjectFilter(project.name)}><div className="project-card-head"><h3>{project.name}</h3><span className="project-badge">{project.packageName}</span></div><p className="muted">{project.location}</p><div className="project-manager"><strong>{project.managerName}</strong><span>{project.managerPhone}</span></div><div className="project-stats"><div><label>Employees</label><strong>{project.employeesCount}</strong></div><div><label>Remain.</label><strong>{project.remainingLeave}</strong></div></div></div>)}</div>
          <section className="panel">
            <h3>Add New Project</h3>
            <div className="form-grid">
              <div className="form-group"><label>Project Name</label><input value={projectForm.name} onChange={(e) => setProjectForm((prev) => ({ ...prev, name:e.target.value }))} /></div>
              <div className="form-group"><label>Package</label><input value={projectForm.packageName} onChange={(e) => setProjectForm((prev) => ({ ...prev, packageName:e.target.value }))} /></div>
              <div className="form-group"><label>Location</label><input value={projectForm.location} onChange={(e) => setProjectForm((prev) => ({ ...prev, location:e.target.value }))} /></div>
              <div className="form-group"><label>Manager Name</label><input value={projectForm.managerName} onChange={(e) => setProjectForm((prev) => ({ ...prev, managerName:e.target.value }))} /></div>
              <div className="form-group"><label>Manager Mobile</label><input value={projectForm.managerPhone} onChange={(e) => setProjectForm((prev) => ({ ...prev, managerPhone:e.target.value }))} /></div>
              <div className="form-group"><label>Color Tag</label><input value={projectForm.colorTag} onChange={(e) => setProjectForm((prev) => ({ ...prev, colorTag:e.target.value }))} /></div>
            </div>
            <button className="primary-btn" onClick={addProject}>Add Project</button>
          </section>
        </div>}

        {page === "files" && <section className="panel">
          <div className="panel-header"><div><h3>{currentProjectSummary.name} Files</h3><p className="muted">Leave and takleef records for this project.</p></div><div className="project-contact-chip"><strong>{currentProjectSummary.managerName}</strong><span>{currentProjectSummary.managerPhone}</span></div></div>
          <div className="upload-box">
            <div className="form-grid">
              <div className="form-group"><label>Category</label><select value={projectFileForm.category} onChange={(e) => setProjectFileForm((prev) => ({ ...prev, category:e.target.value as ProjectFile["category"] }))}><option>Leave</option><option>Takleef</option></select></div>
              <div className="form-group"><label>File Title</label><input value={projectFileForm.title} onChange={(e) => setProjectFileForm((prev) => ({ ...prev, title:e.target.value }))} placeholder="example.pdf" /></div>
            </div>
            <div className="form-group"><label>Note</label><textarea value={projectFileForm.note} onChange={(e) => setProjectFileForm((prev) => ({ ...prev, note:e.target.value }))} /></div>
            <button className="primary-btn" onClick={addProjectFile}>Add File Record</button>
          </div>
          <table><thead><tr><th>Category</th><th>Title</th><th>Uploaded By</th><th>Note</th><th>Time</th></tr></thead><tbody>{visibleFiles.map((item) => <tr key={item.id}><td>{item.category}</td><td>{item.title}</td><td>{item.uploadedBy}</td><td>{item.note}</td><td>{item.uploadedAt}</td></tr>)}</tbody></table>
        </section>}

        {page === "add" && <section className="panel">
          <h3>Add Employee</h3>
          <div className="form-grid">
            <div className="form-group"><label>Employee Code</label><input value={employeeForm.employeeCode} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, employeeCode:e.target.value }))} /></div>
            <div className="form-group"><label>Full Name</label><input value={employeeForm.fullName} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, fullName:e.target.value }))} /></div>
            <div className="form-group"><label>Department</label><input value={employeeForm.department} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, department:e.target.value }))} /></div>
            <div className="form-group"><label>Job Title</label><input value={employeeForm.jobTitle} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, jobTitle:e.target.value }))} /></div>
            <div className="form-group"><label>Nationality</label><select value={employeeForm.nationality} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, nationality:e.target.value }))}><option>Saudi</option><option>Non-Saudi</option></select></div>
            <div className="form-group"><label>System Role</label><select value={employeeForm.role} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, role:e.target.value as Role }))}><option>HR</option><option>HR Admin</option><option>Admin</option><option>Admin Assistant</option></select></div>
            <div className="form-group"><label>Project</label><select value={employeeForm.projectName} onChange={(e) => syncEmployeeProject(e.target.value)}>{projects.map((project) => <option key={project.id}>{project.name}</option>)}</select></div>
            <div className="form-group"><label>Package</label><input value={employeeForm.packageName} readOnly /></div>
            <div className="form-group"><label>Mobile</label><input value={employeeForm.mobile} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, mobile:e.target.value }))} /></div>
            <div className="form-group"><label>Base Leave Balance</label><input type="number" value={employeeForm.totalLeave} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, totalLeave:Number(e.target.value) }))} /></div>
          </div>
          <div className="form-group"><label>Initial Note</label><textarea value={employeeForm.note} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, note:e.target.value }))} /></div>
          <button className="primary-btn" onClick={addEmployee}>Create Employee</button>
        </section>}

        {page === "permissions" && <div className="split-grid">
          <section className="panel">
            <h3>System Users</h3>
            <table><thead><tr><th>Name</th><th>Username</th><th>Role</th></tr></thead><tbody>{users.map((user) => <tr key={user.id} onClick={() => setSelectedUserId(user.id)}><td>{user.fullName}</td><td>{user.username}</td><td>{user.role}</td></tr>)}</tbody></table>
          </section>
          <section className="panel">
            <h3>Manage Permissions</h3>
            <div className="user-chip"><strong>{selectedUser.fullName}</strong><span>{selectedUser.role}</span></div>
            <div className="permission-list">{(["view_dashboard","view_employees","manage_leaves","manage_projects","manage_permissions","view_reports","manage_files","manage_settings"] as PermissionKey[]).map((permission) => <label key={permission} className="permission-item"><input type="checkbox" checked={selectedUser.permissions.includes(permission)} onChange={() => togglePermission(selectedUser.id, permission)} /><span>{permission}</span></label>)}</div>
          </section>
        </div>}

        {page === "reports" && <section className="panel">
          <h3>Reports</h3>
          <table><thead><tr><th>Name</th><th>Project</th><th>Total</th><th>Used</th><th>Remaining</th></tr></thead><tbody>{employees.map((emp) => <tr key={emp.id}><td>{emp.fullName}</td><td>{emp.projectName}</td><td>{emp.leave.total}</td><td>{emp.leave.used}</td><td>{emp.leave.remaining}</td></tr>)}</tbody></table>
        </section>}

        {page === "settings" && <section className="panel">
          <h3>Settings</h3>
          <div className="info-box"><strong>Manual Control Ready</strong><p>All major data fields in this redesigned UI are editable manually.</p></div>
          <div className="info-box"><strong>Next Step</strong><p>Connect this UI to the backend to save projects, employees, leaves and permissions permanently.</p></div>
        </section>}
      </main>
    </div>
  );
}
