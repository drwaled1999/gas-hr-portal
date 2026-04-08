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
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const users = {
  hrmanager: { password: "123456", name: "Walid Khalaf Alshammari", role: "HR Manager", project: "All Projects" },
  walid: { password: "123456", name: "Walid Khalaf", role: "HR Admin", project: "Qatif" },
  sara: { password: "123456", name: "Sara Ali", role: "Admin Assistant", project: "Qassim" },
};

const initialEmployees = [
  { id: 1, name: "Ahmed Salem", employeeId: "GAS-2038", role: "Store Worker", project: "Qatif", nationality: "Saudi", annualBalance: 30, usedLeave: 9, permissionsUsed: 3, status: "Active" },
  { id: 2, name: "Muteb Al Bishi", employeeId: "GAS-2036", role: "Store Worker", project: "Qatif", nationality: "Saudi", annualBalance: 30, usedLeave: 4, permissionsUsed: 1, status: "Active" },
  { id: 3, name: "Faisal Al Harbi", employeeId: "GAS-2194", role: "Site Administrator", project: "Zuluf", nationality: "Saudi", annualBalance: 35, usedLeave: 12, permissionsUsed: 6, status: "On Leave" },
  { id: 4, name: "Rashid Al Qahtani", employeeId: "GAS-2210", role: "Coordinator", project: "Qassim", nationality: "Saudi", annualBalance: 30, usedLeave: 7, permissionsUsed: 2, status: "Active" },
  { id: 5, name: "Mahmoud Adel", employeeId: "GAS-2288", role: "Timekeeper", project: "Jubail", nationality: "Egyptian", annualBalance: 30, usedLeave: 17, permissionsUsed: 5, status: "Pending Review" },
];

const initialProjects = [
  {
    id: "qatif",
    name: "Qatif",
    manager: "Mohammed Al Qahtani",
    phone: "+966 55 222 3344",
    employees: 18,
    files: [
      { id: 1, category: "Leave", title: "Annual Leave - Ahmed Salem.pdf", note: "Submitted for April review", status: "Pending" },
      { id: 2, category: "Takleef", title: "Night Shift Assignment - Week 2.pdf", note: "Approved by project manager", status: "Approved" },
    ],
  },
  {
    id: "qassim",
    name: "Qassim",
    manager: "Saeed Al Mutairi",
    phone: "+966 54 777 1200",
    employees: 12,
    files: [
      { id: 3, category: "Leave", title: "Emergency Leave - Rashid.pdf", note: "Family emergency", status: "Approved" },
    ],
  },
  { id: "zuluf", name: "Zuluf", manager: "Nasser Al Otaibi", phone: "+966 50 841 7701", employees: 9, files: [] },
  { id: "jubail", name: "Jubail", manager: "Adel Ibrahim", phone: "+966 53 990 8431", employees: 15, files: [] },
];

const initialRequests = [
  { id: 1, employee: "Faisal Al Harbi", type: "Leave", project: "Zuluf", days: 5, status: "Pending", date: "2026-04-09" },
  { id: 2, employee: "Rashid Al Qahtani", type: "Permission", project: "Qassim", days: 1, status: "Approved", date: "2026-04-08" },
  { id: 3, employee: "Ahmed Salem", type: "Takleef", project: "Qatif", days: 2, status: "In Review", date: "2026-04-11" },
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

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "On Leave": "bg-amber-50 text-amber-700 border-amber-200",
    "Pending Review": "bg-rose-50 text-rose-700 border-rose-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "In Review": "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles[status] || "bg-slate-50 text-slate-700 border-slate-200"}`}>
      {status}
    </span>
  );
}

function BrandMark({ small = false }) {
  return (
    <div className={`relative overflow-hidden ${small ? "h-12 w-12 rounded-2xl" : "h-16 w-16 rounded-3xl"} border border-white/10 bg-slate-950 text-white shadow-2xl`}>
      <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.55),_transparent_45%),linear-gradient(135deg,#020617,#0f172a,#111827)]">
        <div className="text-center leading-none">
          <div className={`${small ? "text-lg" : "text-2xl"} font-black tracking-tight`}>GAS</div>
          <div className="text-[8px] uppercase tracking-[0.25em] text-slate-300">HR</div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, helper, icon: Icon }) {
  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">{title}</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">{value}</h3>
            <p className="mt-2 text-sm text-slate-500">{helper}</p>
          </div>
          <div className="rounded-2xl bg-slate-950 p-3 text-white shadow-lg">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.28),_transparent_30%),linear-gradient(135deg,#e2e8f0_0%,#f8fafc_30%,#dbeafe_100%)] p-6 md:p-10">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl overflow-hidden rounded-[36px] border border-white/40 bg-white/70 shadow-2xl backdrop-blur-xl lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative hidden overflow-hidden bg-[linear-gradient(145deg,#020617_0%,#0f172a_42%,#0b1f46_100%)] p-10 text-white lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(96,165,250,.28),transparent_25%),radial-gradient(circle_at_85%_10%,rgba(148,163,184,.15),transparent_18%),radial-gradient(circle_at_40%_80%,rgba(37,99,235,.22),transparent_22%)]" />
          <div className="relative z-10 flex items-center gap-4">
            <BrandMark />
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-blue-200">Enterprise Human Resources</div>
              <div className="mt-2 text-2xl font-semibold">GAS Workforce Portal</div>
            </div>
          </div>

          <div className="relative z-10 mt-20 max-w-2xl">
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black leading-tight tracking-tight">
              Built for modern HR operations, project teams and employee life cycle management.
            </motion.h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Professional portal for employee records, manual leave balances, permissions, takleef requests,
              project file sections, approvals, and HR reporting across all active company projects.
            </p>
          </div>

          <div className="relative z-10 mt-auto grid grid-cols-2 gap-4 xl:grid-cols-4">
            {[
              ["Employees", "54"],
              ["Projects", "4"],
              ["Open Requests", "13"],
              ["Leave Balance", "126"],
            ].map(([title, value]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                <div className="text-sm text-slate-300">{title}</div>
                <div className="mt-3 text-3xl font-bold">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center bg-white/60 p-6 md:p-12">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.35)] md:p-10">
            <div className="mb-8 flex items-center gap-4">
              <BrandMark small />
              <div>
                <h2 className="text-4xl font-black tracking-tight text-slate-950">Welcome back</h2>
                <p className="mt-1 text-base text-slate-500">Secure sign in to the HR control center</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <Label className="mb-2 inline-block text-sm font-medium text-slate-700">Username</Label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" className="h-14 rounded-2xl border-slate-200 text-base" />
              </div>
              <div>
                <Label className="mb-2 inline-block text-sm font-medium text-slate-700">Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="h-14 rounded-2xl border-slate-200 text-base" />
              </div>
              {error ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
              <Button onClick={submit} className="h-14 w-full rounded-2xl bg-slate-950 text-base font-semibold shadow-lg hover:bg-slate-900">
                Sign In to Dashboard
              </Button>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">Demo access</div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <div><span className="font-medium text-slate-900">HR Manager:</span> hrmanager / 123456</div>
                <div><span className="font-medium text-slate-900">HR Admin:</span> walid / 123456</div>
                <div><span className="font-medium text-slate-900">Admin Assistant:</span> sara / 123456</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DashboardHome({ employees, projects, requests }) {
  const remainingLeave = useMemo(
    () => employees.reduce((sum, emp) => sum + Math.max(emp.annualBalance - emp.usedLeave, 0), 0),
    [employees]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Employees" value={employees.length} helper="Across all project sections" icon={Users} />
        <StatCard title="Project Sites" value={projects.length} helper="Live site-based HR workspaces" icon={Building2} />
        <StatCard title="Open Requests" value={requests.length} helper="Leaves, permissions and takleef" icon={ClipboardCheck} />
        <StatCard title="Remaining Leave" value={remainingLeave} helper="Calculated from manual balances" icon={Wallet} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">HR Operations Overview</CardTitle>
              <CardDescription>Daily control view for employees, project requests and balances</CardDescription>
            </div>
            <Button variant="outline" className="rounded-2xl">View full analytics</Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: "Active Employees", value: employees.filter((e) => e.status === "Active").length, progress: 82 },
                { title: "Employees on Leave", value: employees.filter((e) => e.status === "On Leave").length, progress: 26 },
                { title: "Pending HR Review", value: employees.filter((e) => e.status === "Pending Review").length, progress: 18 },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm text-slate-500">{item.title}</div>
                  <div className="mt-2 text-3xl font-bold text-slate-950">{item.value}</div>
                  <Progress value={item.progress} className="mt-4 h-2" />
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Leave Balance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.slice(0, 5).map((emp) => (
                    <TableRow key={emp.id}>
                      <TableCell className="font-medium text-slate-900">{emp.name}</TableCell>
                      <TableCell>{emp.project}</TableCell>
                      <TableCell>{emp.role}</TableCell>
                      <TableCell>{emp.annualBalance - emp.usedLeave} days</TableCell>
                      <TableCell><StatusBadge status={emp.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Today’s Alerts</CardTitle>
              <CardDescription>Items that need direct HR attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: AlertTriangle, title: "2 leave requests pending approval", desc: "Review before end of day" },
                { icon: Clock3, title: "1 manual balance needs update", desc: "Employee record mismatch found" },
                { icon: FolderOpen, title: "Project file awaiting upload", desc: "Qassim leave attachment missing" },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 rounded-2xl border border-slate-200 p-4">
                  <div className="rounded-2xl bg-slate-950 p-2 text-white">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{item.title}</div>
                    <div className="text-sm text-slate-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {["Add employee record", "Register leave manually", "Upload project document", "Generate monthly report"].map((action) => (
                <Button key={action} variant="outline" className="justify-between rounded-2xl px-4 py-6">
                  {action}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function EmployeesPage({ employees, setEmployees }) {
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

    setEmployees((prev) => [
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
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Employee Directory</CardTitle>
          <CardDescription>Track employee records, roles, projects and manual leave balances</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Leave Used</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <div className="font-medium text-slate-900">{emp.name}</div>
                    <div className="text-xs text-slate-500">{emp.role}</div>
                  </TableCell>
                  <TableCell>{emp.employeeId}</TableCell>
                  <TableCell>{emp.project}</TableCell>
                  <TableCell>{emp.usedLeave} days</TableCell>
                  <TableCell>{emp.annualBalance - emp.usedLeave} days</TableCell>
                  <TableCell><StatusBadge status={emp.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Add Employee</CardTitle>
          <CardDescription>Everything is editable manually as requested</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 h-12 rounded-2xl" />
          </div>

          <div>
            <Label>Employee ID</Label>
            <Input value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} className="mt-2 h-12 rounded-2xl" />
          </div>

          <div>
            <Label>Role / Category</Label>
            <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-2 h-12 rounded-2xl" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Project</Label>
              <Select value={form.project} onValueChange={(v) => setForm({ ...form, project: v })}>
                <SelectTrigger className="mt-2 h-12 rounded-2xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Qatif">Qatif</SelectItem>
                  <SelectItem value="Qassim">Qassim</SelectItem>
                  <SelectItem value="Zuluf">Zuluf</SelectItem>
                  <SelectItem value="Jubail">Jubail</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Nationality</Label>
              <Input value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} className="mt-2 h-12 rounded-2xl" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Annual Leave</Label>
              <Input type="number" value={form.annualBalance} onChange={(e) => setForm({ ...form, annualBalance: e.target.value })} className="mt-2 h-12 rounded-2xl" />
            </div>
            <div>
              <Label>Used Days</Label>
              <Input type="number" value={form.usedLeave} onChange={(e) => setForm({ ...form, usedLeave: e.target.value })} className="mt-2 h-12 rounded-2xl" />
            </div>
            <div>
              <Label>Permissions</Label>
              <Input type="number" value={form.permissionsUsed} onChange={(e) => setForm({ ...form, permissionsUsed: e.target.value })} className="mt-2 h-12 rounded-2xl" />
            </div>
          </div>

          <Button onClick={addEmployee} className="h-12 w-full rounded-2xl bg-slate-950">
            Save Employee Record
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function LeavesPage({ employees, setEmployees, requests, setRequests }) {
  const [selectedId, setSelectedId] = useState(String(employees[0]?.id || ""));
  const [manualDays, setManualDays] = useState(1);
  const [requestType, setRequestType] = useState("Leave");
  const [note, setNote] = useState("");

  const selectedEmployee = employees.find((e) => String(e.id) === selectedId);

  const applyManualLeave = () => {
    if (!selectedEmployee) return;

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id
          ? { ...emp, usedLeave: emp.usedLeave + Number(manualDays), status: "On Leave" }
          : emp
      )
    );

    setRequests((prev) => [
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
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Manual Leave & Takleef Entry</CardTitle>
          <CardDescription>Add leave days manually and deduct them automatically from employee balance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Employee</Label>
            <Select value={selectedId} onValueChange={setSelectedId}>
              <SelectTrigger className="mt-2 h-12 rounded-2xl"><SelectValue placeholder="Select employee" /></SelectTrigger>
              <SelectContent>
                {employees.map((emp) => (
                  <SelectItem key={emp.id} value={String(emp.id)}>
                    {emp.name} - {emp.project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Type</Label>
              <Select value={requestType} onValueChange={setRequestType}>
                <SelectTrigger className="mt-2 h-12 rounded-2xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Leave">Leave</SelectItem>
                  <SelectItem value="Takleef">Takleef</SelectItem>
                  <SelectItem value="Permission">Permission</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Days</Label>
              <Input type="number" value={manualDays} onChange={(e) => setManualDays(e.target.value)} className="mt-2 h-12 rounded-2xl" />
            </div>
          </div>

          <div>
            <Label>Note</Label>
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} className="mt-2 min-h-[120px] rounded-2xl" placeholder="Leave details, approval note or takleef information" />
          </div>

          {selectedEmployee ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <div className="font-semibold text-slate-900">Current balance for {selectedEmployee.name}</div>
              <div className="mt-2">Annual balance: {selectedEmployee.annualBalance} days</div>
              <div>Used leave: {selectedEmployee.usedLeave} days</div>
              <div>Remaining after entry: {Math.max(selectedEmployee.annualBalance - (selectedEmployee.usedLeave + Number(manualDays || 0)), 0)} days</div>
            </div>
          ) : null}

          <Button onClick={applyManualLeave} className="h-12 w-full rounded-2xl bg-slate-950">
            Submit Manual Entry
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Request Tracker</CardTitle>
          <CardDescription>Leaves, permissions and takleef submissions by project</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium text-slate-900">{req.employee}</TableCell>
                  <TableCell>{req.type}</TableCell>
                  <TableCell>{req.project}</TableCell>
                  <TableCell>{req.days}</TableCell>
                  <TableCell>{req.date}</TableCell>
                  <TableCell><StatusBadge status={req.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ProjectsPage({ projects, setProjects }) {
  const [activeProject, setActiveProject] = useState(projects[0]?.id || "");
  const [fileForm, setFileForm] = useState({ category: "Leave", title: "", note: "" });
  const project = projects.find((p) => p.id === activeProject);

  const addFileRecord = () => {
    if (!project || !fileForm.title) return;

    setProjects((prev) =>
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

    setFileForm({ category: "Leave", title: "", note: "" });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Project Sections</CardTitle>
          <CardDescription>Each project has its own leave and takleef space</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {projects.map((projectItem) => (
            <button
              key={projectItem.id}
              onClick={() => setActiveProject(projectItem.id)}
              className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                activeProject === projectItem.id
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
              }`}
            >
              <div className="font-semibold">{projectItem.name}</div>
              <div className={`mt-1 text-sm ${activeProject === projectItem.id ? "text-slate-300" : "text-slate-500"}`}>
                {projectItem.employees} employees
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{project?.name} Files</CardTitle>
              <CardDescription>Project-specific records, leave documents and takleef files</CardDescription>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
              <div className="font-semibold text-slate-900">{project?.manager}</div>
              <div>{project?.phone}</div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Category</Label>
                <Select value={fileForm.category} onValueChange={(v) => setFileForm({ ...fileForm, category: v })}>
                  <SelectTrigger className="mt-2 h-12 rounded-2xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Leave">Leave</SelectItem>
                    <SelectItem value="Takleef">Takleef</SelectItem>
                    <SelectItem value="Permission">Permission</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>File title</Label>
                <Input value={fileForm.title} onChange={(e) => setFileForm({ ...fileForm, title: e.target.value })} className="mt-2 h-12 rounded-2xl" placeholder="example.pdf" />
              </div>
            </div>

            <div>
              <Label>Note</Label>
              <Textarea value={fileForm.note} onChange={(e) => setFileForm({ ...fileForm, note: e.target.value })} className="mt-2 min-h-[110px] rounded-2xl" placeholder="Add review note or document summary" />
            </div>

            <Button onClick={addFileRecord} className="h-12 w-full rounded-2xl bg-slate-950">
              Add File Record
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Recorded Files</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(project?.files || []).map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>{file.category}</TableCell>
                    <TableCell className="font-medium text-slate-900">{file.title}</TableCell>
                    <TableCell>{file.note}</TableCell>
                    <TableCell><StatusBadge status={file.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PlaceholderPage({ title, description }) {
  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {["Custom form blocks", "Approval workflows", "Printable report layouts"].map((item) => (
            <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-600">
              {item}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function HRPortalRedesign() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [employees, setEmployees] = useState(initialEmployees);
  const [projects, setProjects] = useState(initialProjects);
  const [requests, setRequests] = useState(initialRequests);

  if (!currentUser) return <LoginScreen onLogin={setCurrentUser} />;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen xl:grid-cols-[300px_1fr]">
        <aside className="relative overflow-hidden bg-[linear-gradient(180deg,#020617_0%,#0f172a_40%,#0b1f46_100%)] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,.18),transparent_22%)]" />
          <div className="relative z-10 flex h-full flex-col p-6">
            <div className="flex items-center gap-4">
              <BrandMark />
              <div>
                <div className="text-4xl font-black tracking-tight">GAS Portal</div>
                <div className="mt-1 text-sm text-slate-300">Enterprise HR Workspace</div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-white/10 bg-white/10">
                  <AvatarFallback className="bg-transparent text-white">WK</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{currentUser.name}</div>
                  <div className="text-sm text-slate-300">{currentUser.role}</div>
                </div>
              </div>
            </div>

            <nav className="mt-8 space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const active = activePage === item.key;

                return (
                  <button
                    key={item.key}
                    onClick={() => setActivePage(item.key)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                      active ? "bg-white text-slate-950 shadow-xl" : "text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-400">Project Sections</div>
              <div className="space-y-2">
                {projects.map((p) => (
                  <div key={p.id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                    {p.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6">
              <Button onClick={() => setCurrentUser(null)} className="h-12 w-full rounded-2xl bg-white text-slate-950 hover:bg-slate-100">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        </aside>

        <main className="p-5 md:p-8 xl:p-10">
          <div className="rounded-[32px] border border-white bg-white p-5 shadow-sm md:p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-sm font-medium uppercase tracking-[0.26em] text-slate-400">Human Resources Dashboard</div>
                <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
                  {activePage === "dashboard" && "Executive HR Dashboard"}
                  {activePage === "employees" && "Employee Management"}
                  {activePage === "leaves" && "Leaves, Permissions & Takleef"}
                  {activePage === "projects" && "Project-Based HR Sections"}
                  {activePage === "permissions" && "Permissions Center"}
                  {activePage === "files" && "Project Files"}
                  {activePage === "reports" && "Reports Center"}
                  {activePage === "settings" && "System Settings"}
                </h1>
                <p className="mt-2 text-lg text-slate-500">
                  Signed in as {currentUser.name} ({currentUser.role})
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-[260px] flex-1 lg:flex-none">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input placeholder="Search employees, requests, files..." className="h-12 rounded-2xl border-slate-200 pl-11" />
                </div>
                <Button variant="outline" className="h-12 rounded-2xl">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
                <Button className="h-12 rounded-2xl bg-slate-950">
                  <Plus className="mr-2 h-4 w-4" /> New Record
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            {activePage === "dashboard" && <DashboardHome employees={employees} projects={projects} requests={requests} />}
            {activePage === "employees" && <EmployeesPage employees={employees} setEmployees={setEmployees} />}
            {activePage === "leaves" && <LeavesPage employees={employees} setEmployees={setEmployees} requests={requests} setRequests={setRequests} />}
            {activePage === "projects" && <ProjectsPage projects={projects} setProjects={setProjects} />}
            {activePage === "permissions" && <PlaceholderPage title="Permissions Center" description="Track short permissions, approvals and employee permission consumption manually." />}
            {activePage === "files" && <ProjectsPage projects={projects} setProjects={setProjects} />}
            {activePage === "reports" && <PlaceholderPage title="Reports Center" description="Prepare monthly attendance, leave summary, project file logs and printable HR reports." />}
            {activePage === "settings" && <PlaceholderPage title="System Settings" description="Control portal settings, labels, project structure and editable HR options." />}
          </div>
        </main>
      </div>
    </div>
  );
}
