import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Users,
  BriefcaseBusiness,
  FolderKanban,
  ShieldCheck,
  ClipboardList,
  LogOut,
  Search,
  Plus
} from 'lucide-react';

const logoSrc = '/LOGO-GAS.jpg';

type Employee = {
  id: string;
  name: string;
  department: string;
  jobTitle: string;
  nationality: 'Saudi' | 'Non-Saudi';
  project: string;
  packageName: string;
  role: 'HR' | 'HR Admin' | 'Admin' | 'Admin Assistant';
  annualRemaining: string;
  notes: string[];
};

type User = {
  username: string;
  fullName: string;
  role: string;
};

const demoUsers: Record<string, User> = {
  hrmanager: { username: 'hrmanager', fullName: 'Mohammed Faisal', role: 'HR Manager' },
  walid: { username: 'walid', fullName: 'Walid Khalaf', role: 'HR Admin' },
  admin: { username: 'admin', fullName: 'Admin User', role: 'Admin' }
};

const initialEmployees: Employee[] = [
  {
    id: 'GAS-1182',
    name: 'Walid Khalaf',
    department: 'HR',
    jobTitle: 'HR Admin',
    nationality: 'Saudi',
    project: 'Zuluf',
    packageName: 'Package 12',
    role: 'HR Admin',
    annualRemaining: '14 Days',
    notes: ['Supports time sheet updates.']
  },
  {
    id: 'GAS-1450',
    name: 'Sara Khan',
    department: 'Admin',
    jobTitle: 'Admin Assistant',
    nationality: 'Non-Saudi',
    project: 'Operations Support',
    packageName: 'Package 08',
    role: 'Admin Assistant',
    annualRemaining: '5 Days',
    notes: ['Assigned to leave coordination support.']
  }
];

function SplashScreen() {
  return (
    <motion.div className="splash" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="splash-card">
        <img src={logoSrc} alt="GAS" className="logo large" />
        <h1>HR & Admin Leave Access Portal</h1>
        <p>GAS Arabian Services</p>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [query, setQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [packageFilter, setPackageFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: '',
    name: '',
    department: '',
    jobTitle: '',
    nationality: 'Saudi',
    project: '',
    packageName: '',
    role: 'Admin Assistant',
    annualRemaining: '0 Days',
    notes: []
  });

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const saudiCount = employees.filter((e) => e.nationality === 'Saudi').length;
  const projects = Array.from(new Set(employees.map((e) => e.project))).filter(Boolean);
  const packages = Array.from(new Set(employees.map((e) => e.packageName))).filter(Boolean);

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchProject = projectFilter === 'all' || e.project === projectFilter;
      const matchPackage = packageFilter === 'all' || e.packageName === packageFilter;
      const q = query.toLowerCase();
      const matchQuery = !q || [e.id, e.name, e.department, e.jobTitle, e.project, e.packageName]
        .join(' ')
        .toLowerCase()
        .includes(q);
      return matchProject && matchPackage && matchQuery;
    });
  }, [employees, query, projectFilter, packageFilter]);

  const handleLogin = () => {
    if (!form.username || !form.password) {
      setLoginError('Please enter username and password.');
      return;
    }
    const found = demoUsers[form.username.toLowerCase()];
    if (!found) {
      setLoginError('Invalid demo username.');
      return;
    }
    setUser(found);
    setLoginError('');
  };

  const addEmployee = () => {
    if (!newEmployee.id || !newEmployee.name || !newEmployee.project || !newEmployee.packageName) return;
    setEmployees([{ ...newEmployee, notes: newEmployee.notes.length ? newEmployee.notes : ['New employee added.'] }, ...employees]);
    setShowAdd(false);
    setNewEmployee({
      id: '', name: '', department: '', jobTitle: '', nationality: 'Saudi', project: '', packageName: '', role: 'Admin Assistant', annualRemaining: '0 Days', notes: []
    });
  };

  if (loading) return <SplashScreen />;

  if (!user) {
    return (
      <div className="login-page">
        <div className="login-hero">
          <img src={logoSrc} alt="GAS" className="logo" />
          <h1>GAS HR Leave Portal</h1>
          <p>Initial demo for management approval</p>
          <div className="hero-stats">
            <div><Users size={18}/> Saudi Employees: {saudiCount}</div>
            <div><FolderKanban size={18}/> Projects: {projects.length}</div>
            <div><BriefcaseBusiness size={18}/> Packages: {packages.length}</div>
            <div><ShieldCheck size={18}/> Access Control: Enabled</div>
          </div>
        </div>
        <div className="login-card">
          <img src={logoSrc} alt="GAS" className="logo small" />
          <h2>Sign in</h2>
          <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {loginError && <div className="error">{loginError}</div>}
          <button className="primary" onClick={handleLogin}>Sign In</button>
          <div className="demo-box">
            <strong>Demo accounts</strong>
            <div>hrmanager / any password</div>
            <div>walid / any password</div>
            <div>admin / any password</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <img src={logoSrc} alt="GAS" className="logo small" />
          <div>
            <div className="brand-title">GAS Portal</div>
            <div className="brand-sub">HR Leave Management</div>
          </div>
        </div>
        <div className="menu-item active">Dashboard</div>
        <div className="menu-item">Employees</div>
        <div className="menu-item">Audit Log</div>
        <div className="menu-item">Notifications</div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <h2>Dashboard</h2>
            <p>Welcome back, {user.fullName}</p>
          </div>
          <div className="topbar-actions">
            <div className="search-box"><Search size={16} /><input placeholder="Search employee, project, package" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
            <button className="outline" onClick={() => setUser(null)}><LogOut size={16} /> Logout</button>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card"><Users size={18}/><div><strong>{employees.length}</strong><span>Total Employees</span></div></div>
          <div className="stat-card"><BriefcaseBusiness size={18}/><div><strong>{saudiCount}</strong><span>Saudi Employees</span></div></div>
          <div className="stat-card"><FolderKanban size={18}/><div><strong>{projects.length}</strong><span>Projects</span></div></div>
          <div className="stat-card"><Bell size={18}/><div><strong>2</strong><span>Notifications</span></div></div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>Employee Directory</h3>
              <p>Initial demo version for internal review</p>
            </div>
            <div className="panel-actions">
              <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
                <option value="all">All Projects</option>
                {projects.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <select value={packageFilter} onChange={(e) => setPackageFilter(e.target.value)}>
                <option value="all">All Packages</option>
                {packages.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <button className="primary" onClick={() => setShowAdd(!showAdd)}><Plus size={16}/> Add Employee</button>
            </div>
          </div>

          {showAdd && (
            <div className="add-form">
              <input placeholder="Employee ID" value={newEmployee.id} onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })} />
              <input placeholder="Full Name" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} />
              <input placeholder="Department" value={newEmployee.department} onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })} />
              <input placeholder="Job Title" value={newEmployee.jobTitle} onChange={(e) => setNewEmployee({ ...newEmployee, jobTitle: e.target.value })} />
              <select value={newEmployee.nationality} onChange={(e) => setNewEmployee({ ...newEmployee, nationality: e.target.value as Employee['nationality'] })}>
                <option value="Saudi">Saudi</option>
                <option value="Non-Saudi">Non-Saudi</option>
              </select>
              <input placeholder="Project Name" value={newEmployee.project} onChange={(e) => setNewEmployee({ ...newEmployee, project: e.target.value })} />
              <input placeholder="Package" value={newEmployee.packageName} onChange={(e) => setNewEmployee({ ...newEmployee, packageName: e.target.value })} />
              <select value={newEmployee.role} onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value as Employee['role'] })}>
                <option>HR</option>
                <option>HR Admin</option>
                <option>Admin</option>
                <option>Admin Assistant</option>
              </select>
              <button className="primary" onClick={addEmployee}>Save Employee</button>
            </div>
          )}

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Job Title</th>
                  <th>Nationality</th>
                  <th>Project</th>
                  <th>Package</th>
                  <th>Role</th>
                  <th>Leave</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>{e.department}</td>
                    <td>{e.jobTitle}</td>
                    <td>{e.nationality}</td>
                    <td>{e.project}</td>
                    <td>{e.packageName}</td>
                    <td>{e.role}</td>
                    <td>{e.annualRemaining}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="two-col">
          <div className="panel small">
            <h3><ClipboardList size={18}/> Audit Preview</h3>
            <div className="list-item">Annual leave balance updated — Ahmed Al Qahtani</div>
            <div className="list-item">Job title changed — Walid Khalaf</div>
          </div>
          <div className="panel small">
            <h3><Bell size={18}/> Notifications Preview</h3>
            <div className="list-item">Leave balance updated by HR Admin</div>
            <div className="list-item">New employee added in Operations</div>
          </div>
        </section>
      </main>
    </div>
  );
}
