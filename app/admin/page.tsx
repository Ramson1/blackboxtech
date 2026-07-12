"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// ─── Types ──────────────────────────────────────────────────────────────────────

type Tab = "student" | "professional" | "build" | "contact";

interface DashboardData {
  student: Record<string, unknown>[];
  professional: Record<string, unknown>[];
  build: Record<string, unknown>[];
  contact: Record<string, unknown>[];
}

// ─── Status options per type ────────────────────────────────────────────────────

const STATUS_OPTIONS: Record<Tab, string[]> = {
  student: ["new", "contacted", "enrolled", "cancelled"],
  professional: ["new", "contacted", "enrolled", "cancelled"],
  build: ["new", "reviewing", "in_progress", "completed", "cancelled"],
  contact: ["new", "read", "replied"],
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-yellow-500/20 text-yellow-300",
  contacted: "bg-blue-500/20 text-blue-300",
  enrolled: "bg-green-500/20 text-green-300",
  read: "bg-blue-500/20 text-blue-300",
  replied: "bg-green-500/20 text-green-300",
  reviewing: "bg-purple-500/20 text-purple-300",
  in_progress: "bg-blue-500/20 text-blue-300",
  completed: "bg-green-500/20 text-green-300",
  cancelled: "bg-red-500/20 text-red-300",
};

// ─── Detail helpers ─────────────────────────────────────────────────────────────

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function CopyIcon({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button onClick={handleCopy} className="ml-1.5 text-gray-500 hover:text-white transition-colors shrink-0" title="Copy">
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
      )}
    </button>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
      <span className="text-gray-500 text-xs sm:text-sm sm:w-40 shrink-0">{label}</span>
      <span className="text-white text-sm break-words">{value}</span>
      <CopyIcon text={value} />
    </div>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("student");
  const [data, setData] = useState<DashboardData>({ student: [], professional: [], build: [], contact: [] });
  const [loading, setLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [detailRow, setDetailRow] = useState<Record<string, unknown> | null>(null);
  const [detailType, setDetailType] = useState<Tab>("student");
  const [statusFilter, setStatusFilter] = useState<string>("new");
  const [searchQuery, setSearchQuery] = useState("");

  // Get stored admin password from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem("bb-admin-auth");
    if (stored === "true") setAuthenticated(true);
  }, []);

  const adminPassword = useCallback(() => {
    return sessionStorage.getItem("bb-admin-password") || "";
  }, []);

  // Login handler
  const handleLogin = async () => {
    if (!password.trim()) return;
    // Store password in session and verify by fetching data
    sessionStorage.setItem("bb-admin-password", password);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/registrations?type=student", {
        headers: { "x-admin-password": password },
      });
      if (res.ok) {
        sessionStorage.setItem("bb-admin-auth", "true");
        setAuthenticated(true);
        setPasswordError("");
      } else {
        setPasswordError("Incorrect password");
        sessionStorage.removeItem("bb-admin-password");
      }
    } catch {
      setPasswordError("Connection error");
    }
    setLoading(false);
  };

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/registrations?type=all", {
        headers: { "x-admin-password": adminPassword() },
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else if (res.status === 401) {
        setAuthenticated(false);
        sessionStorage.removeItem("bb-admin-auth");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  }, [adminPassword]);

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated, fetchData]);

  // Update status
  const updateStatus = async (type: Tab, id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword(),
        },
        body: JSON.stringify({ type, id, status }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  // Send email
  const handleSendEmail = async () => {
    if (!emailTo || !emailSubject || !emailBody) return;
    setSendingEmail(true);
    setEmailError("");
    try {
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword(),
        },
        body: JSON.stringify({
          to: emailTo,
          subject: emailSubject,
          html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">${emailBody.replace(/\n/g, "<br/>")}</div>`,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setEmailSuccess(true);
        setTimeout(() => {
          setShowEmailModal(false);
          setEmailSuccess(false);
          setEmailTo("");
          setEmailSubject("");
          setEmailBody("");
        }, 1500);
      } else {
        setEmailError(json.error || "Failed to send email. Check Resend configuration.");
      }
    } catch (err) {
      console.error("Send email error:", err);
      setEmailError("Network error. Please try again.");
    }
    setSendingEmail(false);
  };

  // Logout
  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem("bb-admin-auth");
    sessionStorage.removeItem("bb-admin-password");
  };

  // ─── Login Screen ──────────────────────────────────────────────────────────────

  if (!authenticated) {
    return (
      <>
      <style>{`html, body { background: #111 !important; margin: 0; padding: 0; }`}</style>
      <div className="min-h-screen bg-[#111] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Image
              src="/logos/logoWhitePlain.png"
              alt="BlackBox Tech"
              width={100}
              height={100}
              className="object-contain mx-auto mb-4"
              style={{ width: "auto", height: "auto" }}
            />
            <h1 className="text-2xl font-bold text-white mb-2">BlackBox Tech Admin</h1>
            <p className="text-gray-400 text-sm">Enter your admin password to continue</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10">
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Admin password"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-11 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#fb4545dc]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                )}
              </button>
            </div>
            {passwordError && <p className="text-red-400 text-sm mb-3">{passwordError}</p>}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#fb4545dc] hover:bg-[#fb4545dc]/80 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Login"}
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }

  // ─── Stats ─────────────────────────────────────────────────────────────────────

  const stats = {
    total: data.student.length + data.professional.length + data.build.length + data.contact.length,
    newCount:
      data.student.filter((r) => r.status === "new").length +
      data.professional.filter((r) => r.status === "new").length +
      data.build.filter((r) => r.status === "new").length +
      data.contact.filter((r) => r.status === "new").length,
    students: data.student.length,
    professionals: data.professional.length,
    builds: data.build.length,
    contacts: data.contact.length,
  };

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "student", label: "Students", count: data.student.length },
    { key: "professional", label: "Professionals", count: data.professional.length },
    { key: "build", label: "Build Requests", count: data.build.length },
    { key: "contact", label: "Contacts", count: data.contact.length },
  ];

  const currentData = data[activeTab];

  // Filter by status and search query
  const filteredData = currentData.filter((row) => {
    // Status filter
    if (statusFilter !== "all" && (row.status as string || "new") !== statusFilter) return false;
    // Search filter
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return Object.values(row).some((val) => {
      if (val === null || val === undefined) return false;
      if (Array.isArray(val)) return val.some((v) => String(v).toLowerCase().includes(q));
      return String(val).toLowerCase().includes(q);
    });
  });

  // ─── Dashboard ─────────────────────────────────────────────────────────────────

  return (
    <>
    <style>{`html, body { background: #111 !important; margin: 0; padding: 0; }`}</style>
    <div className="min-h-screen bg-[#111] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">BlackBox Tech Admin</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setEmailTo(""); setEmailSubject(""); setEmailBody(""); setShowEmailModal(true); }}
            className="bg-[#fb4545dc] hover:bg-[#fb4545dc]/80 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Send Email
          </button>
          <button
            onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total Entries", value: stats.total, color: "text-white" },
            { label: "New / Unread", value: stats.newCount, color: "text-yellow-400" },
            { label: "Students", value: stats.students, color: "text-blue-400" },
            { label: "Professionals", value: stats.professionals, color: "text-purple-400" },
            { label: "Build Requests", value: stats.builds, color: "text-green-400" },
          ].map((s) => (
            <div key={s.label} className="bg-[#1a1a1a] rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setStatusFilter("new"); setSearchQuery(""); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "bg-[#fb4545dc] text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
          <button
            onClick={fetchData}
            className="ml-auto px-4 py-2 rounded-lg text-sm bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {/* Filter Buttons + Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex gap-1.5 overflow-x-auto flex-1">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === "all"
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white"
              }`}
            >
              All ({currentData.length})
            </button>
            {STATUS_OPTIONS[activeTab].map((status) => {
              const count = currentData.filter((r) => (r.status as string || "new") === status).length;
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    statusFilter === status
                      ? STATUS_COLORS[status] || "bg-white/20 text-white"
                      : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {status} ({count})
                </button>
              );
            })}
          </div>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1a1a1a] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 w-full sm:w-56"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        {(searchQuery || statusFilter !== "all") && (
          <p className="text-xs text-gray-500 mb-3">
            Showing {filteredData.length} of {currentData.length} entries
            {searchQuery && <span> for &quot;{searchQuery}&quot;</span>}
          </p>
        )}

        {/* Data Table */}
        {filteredData.length === 0 ? (
          <div className="bg-[#1a1a1a] rounded-xl p-12 text-center border border-white/10">
            <p className="text-gray-500">{currentData.length === 0 ? "No entries yet" : "No matching entries"}</p>
          </div>
        ) : (
          <div className="bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-left">
                    {activeTab === "student" && (
                      <>
                        <th className="px-4 py-3 font-medium">Parent</th>
                        <th className="px-4 py-3 font-medium">Child</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Phone</th>
                        <th className="px-4 py-3 font-medium">Programs</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Date</th>
                        <th className="px-4 py-3 font-medium">Actions</th>
                      </>
                    )}
                    {activeTab === "professional" && (
                      <>
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Phone</th>
                        <th className="px-4 py-3 font-medium">Organization</th>
                        <th className="px-4 py-3 font-medium">Programs</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Date</th>
                        <th className="px-4 py-3 font-medium">Actions</th>
                      </>
                    )}
                    {activeTab === "build" && (
                      <>
                        <th className="px-4 py-3 font-medium">Company</th>
                        <th className="px-4 py-3 font-medium">Contact</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Project Type</th>
                        <th className="px-4 py-3 font-medium">Budget</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Date</th>
                        <th className="px-4 py-3 font-medium">Actions</th>
                      </>
                    )}
                    {activeTab === "contact" && (
                      <>
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Message</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Date</th>
                        <th className="px-4 py-3 font-medium">Actions</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row) => (
                    <tr key={row.id as string} className="border-b border-white/5 hover:bg-white/5 cursor-pointer" onClick={() => { setDetailRow(row); setDetailType(activeTab); }}>
                      {activeTab === "student" && (
                        <>
                          <td className="px-4 py-3 font-medium">{row.parent_name as string}</td>
                          <td className="px-4 py-3">{row.child_name as string}</td>
                          <td className="px-4 py-3 text-gray-400">{row.parent_email as string}</td>
                          <td className="px-4 py-3 text-gray-400">{row.parent_phone as string}</td>
                          <td className="px-4 py-3 text-gray-400 max-w-[200px] truncate">
                            {Array.isArray(row.programs) ? (row.programs as string[]).join(", ") : (row.programs as string)}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[(row.status as string) || "new"] || STATUS_COLORS.new}`}>
                              {(row.status as string) || "new"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-xs">
                            {new Date(row.created_at as string).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            <div className="flex gap-2">
                              <select
                                value={(row.status as string) || "new"}
                                onChange={(e) => updateStatus("student", row.id as string, e.target.value)}
                                className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-xs text-white [&>option]:text-black [&>option]:bg-white"
                              >
                                {STATUS_OPTIONS.student.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                              <button
                                onClick={() => { setEmailTo(row.parent_email as string); setEmailSubject(""); setEmailBody(""); setShowEmailModal(true); }}
                                className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
                              >
                                Email
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                      {activeTab === "professional" && (
                        <>
                          <td className="px-4 py-3 font-medium">{row.full_name as string}</td>
                          <td className="px-4 py-3 text-gray-400">{row.email as string}</td>
                          <td className="px-4 py-3 text-gray-400">{row.phone as string}</td>
                          <td className="px-4 py-3 text-gray-400">{(row.organization as string) || "—"}</td>
                          <td className="px-4 py-3 text-gray-400 max-w-[200px] truncate">
                            {Array.isArray(row.programs) ? (row.programs as string[]).join(", ") : (row.programs as string)}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[(row.status as string) || "new"] || STATUS_COLORS.new}`}>
                              {(row.status as string) || "new"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-xs">
                            {new Date(row.created_at as string).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            <div className="flex gap-2">
                              <select
                                value={(row.status as string) || "new"}
                                onChange={(e) => updateStatus("professional", row.id as string, e.target.value)}
                                className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-xs text-white [&>option]:text-black [&>option]:bg-white"
                              >
                                {STATUS_OPTIONS.professional.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                              <button
                                onClick={() => { setEmailTo(row.email as string); setEmailSubject(""); setEmailBody(""); setShowEmailModal(true); }}
                                className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
                              >
                                Email
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                      {activeTab === "build" && (
                        <>
                          <td className="px-4 py-3 font-medium">{row.company_name as string}</td>
                          <td className="px-4 py-3">{row.full_name as string}</td>
                          <td className="px-4 py-3 text-gray-400">{row.email as string}</td>
                          <td className="px-4 py-3 text-gray-400">{row.project_type as string}</td>
                          <td className="px-4 py-3 text-gray-400">{row.budget as string}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[(row.status as string) || "new"] || STATUS_COLORS.new}`}>
                              {(row.status as string) || "new"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-xs">
                            {new Date(row.created_at as string).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            <div className="flex gap-2">
                              <select
                                value={(row.status as string) || "new"}
                                onChange={(e) => updateStatus("build", row.id as string, e.target.value)}
                                className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-xs text-white [&>option]:text-black [&>option]:bg-white"
                              >
                                {STATUS_OPTIONS.build.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                              <button
                                onClick={() => { setEmailTo(row.email as string); setEmailSubject(""); setEmailBody(""); setShowEmailModal(true); }}
                                className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
                              >
                                Email
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                      {activeTab === "contact" && (
                        <>
                          <td className="px-4 py-3 font-medium">{row.name as string}</td>
                          <td className="px-4 py-3 text-gray-400">{row.email as string}</td>
                          <td className="px-4 py-3 text-gray-400 max-w-[300px] truncate">{row.message as string}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[(row.status as string) || "new"] || STATUS_COLORS.new}`}>
                              {(row.status as string) || "new"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-xs">
                            {new Date(row.created_at as string).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            <div className="flex gap-2">
                              <select
                                value={(row.status as string) || "new"}
                                onChange={(e) => updateStatus("contact", row.id as string, e.target.value)}
                                className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-xs text-white [&>option]:text-black [&>option]:bg-white"
                              >
                                {STATUS_OPTIONS.contact.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                              <button
                                onClick={() => { setEmailTo(row.email as string); setEmailSubject("Re: Your message to BlackBox Tech"); setEmailBody(""); setShowEmailModal(true); }}
                                className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
                              >
                                Email
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {detailRow && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setDetailRow(null)}>
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">
                {detailType === "student" && "Student Registration Details"}
                {detailType === "professional" && "Professional Registration Details"}
                {detailType === "build" && "Build Request Details"}
                {detailType === "contact" && "Contact Message Details"}
              </h2>
              <button onClick={() => setDetailRow(null)} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="space-y-4">
              {detailType === "student" && (
                <>
                  <DetailSection title="Parent / Guardian">
                    <DetailRow label="Name" value={detailRow.parent_name as string} />
                    <DetailRow label="Email" value={detailRow.parent_email as string} />
                    <DetailRow label="Phone" value={detailRow.parent_phone as string} />
                  </DetailSection>
                  <DetailSection title="Child Details">
                    <DetailRow label="Name" value={detailRow.child_name as string} />
                    <DetailRow label="Age" value={detailRow.child_age as string} />
                    <DetailRow label="Gender" value={detailRow.child_gender as string} />
                    <DetailRow label="Experience Level" value={detailRow.child_level as string} />
                  </DetailSection>
                  <DetailSection title="Training Preferences">
                    <DetailRow label="Programs" value={Array.isArray(detailRow.programs) ? (detailRow.programs as string[]).join(", ") : (detailRow.programs as string)} />
                    <DetailRow label="Preferred Schedule" value={detailRow.schedule as string} />
                    <DetailRow label="Preferred Time" value={detailRow.preferred_time as string} />
                    <DetailRow label="Training Mode" value={(detailRow.training_mode as string) === "virtual" ? "Virtual (Online)" : "Physical (In-Person)"} />
                    <DetailRow label="Payment Plan" value={detailRow.payment_plan as string} />
                    <DetailRow label="Preferred Start Date" value={detailRow.start_date as string} />
                    {detailRow.notes ? <DetailRow label="Notes" value={detailRow.notes as string} /> : null}
                  </DetailSection>
                </>
              )}
              {detailType === "professional" && (
                <>
                  <DetailSection title="Personal Details">
                    <DetailRow label="Full Name" value={detailRow.full_name as string} />
                    <DetailRow label="Email" value={detailRow.email as string} />
                    <DetailRow label="Phone" value={detailRow.phone as string} />
                    <DetailRow label="Gender" value={detailRow.gender as string} />
                    <DetailRow label="Date of Birth" value={detailRow.dob as string} />
                  </DetailSection>
                  <DetailSection title="Professional Information">
                    <DetailRow label="Organization" value={(detailRow.organization as string) || "N/A"} />
                    <DetailRow label="Job Title" value={(detailRow.job_title as string) || "N/A"} />
                  </DetailSection>
                  <DetailSection title="Training Preferences">
                    <DetailRow label="Programs" value={Array.isArray(detailRow.programs) ? (detailRow.programs as string[]).join(", ") : (detailRow.programs as string)} />
                    <DetailRow label="Preferred Schedule" value={detailRow.schedule as string} />
                    <DetailRow label="Preferred Time" value={detailRow.preferred_time as string} />
                    <DetailRow label="Experience Level" value={detailRow.experience_level as string} />
                    <DetailRow label="Training Mode" value={(detailRow.training_mode as string) === "virtual" ? "Virtual (Online)" : "Physical (In-Person)"} />
                    <DetailRow label="Payment Preference" value={detailRow.payment_preference as string} />
                    {detailRow.additional_info ? <DetailRow label="Additional Info" value={detailRow.additional_info as string} /> : null}
                  </DetailSection>
                </>
              )}
              {detailType === "build" && (
                <>
                  <DetailSection title="Business Details">
                    <DetailRow label="Company Name" value={detailRow.company_name as string} />
                    <DetailRow label="Contact Name" value={detailRow.full_name as string} />
                    <DetailRow label="Email" value={detailRow.email as string} />
                    <DetailRow label="Phone" value={detailRow.phone as string} />
                  </DetailSection>
                  <DetailSection title="Project Details">
                    <DetailRow label="Project Type" value={detailRow.project_type as string} />
                    <DetailRow label="Budget Range" value={detailRow.budget as string} />
                    <DetailRow label="Expected Timeline" value={detailRow.timeline as string} />
                    <DetailRow label="Description" value={detailRow.description as string} />
                    {detailRow.additional_requirements ? <DetailRow label="Additional Requirements" value={detailRow.additional_requirements as string} /> : null}
                    {Array.isArray(detailRow.file_urls) && (detailRow.file_urls as string[]).length > 0 ? (
                      <div className="mt-2">
                        <p className="text-sm font-semibold text-white/60 mb-2">Attached Files</p>
                        <div className="space-y-1.5">
                          {(detailRow.file_urls as string[]).map((url: string, idx: number) => {
                            const names = detailRow.files ? (detailRow.files as string).split(", ") : [];
                            const name = names[idx] || `File ${idx + 1}`;
                            return (
                              <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm text-crimson-200 hover:text-white">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                <span className="truncate">{name}</span>
                                <span className="ml-auto text-xs text-white/30">Open</span>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    ) : (detailRow.files ? <DetailRow label="Attached Files" value={detailRow.files as string} /> : null)}
                  </DetailSection>
                </>
              )}
              {detailType === "contact" && (
                <DetailSection title="Message">
                  <DetailRow label="Name" value={detailRow.name as string} />
                  <DetailRow label="Email" value={detailRow.email as string} />
                  <DetailRow label="Message" value={detailRow.message as string} />
                </DetailSection>
              )}
              <DetailSection title="Meta">
                <DetailRow label="Status" value={(detailRow.status as string) || "new"} />
                <DetailRow label="Submitted" value={new Date(detailRow.created_at as string).toLocaleString()} />
              </DetailSection>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setDetailRow(null)} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-colors">Close</button>
              <button
                onClick={() => {
                  const email = (detailRow.parent_email || detailRow.email || (detailRow as Record<string, unknown>).email) as string;
                  setEmailTo(email); setEmailSubject(""); setEmailBody(""); setShowEmailModal(true); setDetailRow(null);
                }}
                className="flex-1 bg-[#fb4545dc] hover:bg-[#fb4545dc]/80 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Send Email</h2>
              <button onClick={() => setShowEmailModal(false)} className="text-gray-400 hover:text-white">
                &times;
              </button>
            </div>
            {emailSuccess ? (
              <div className="text-center py-8">
                <p className="text-green-400 text-lg font-semibold">Email sent successfully!</p>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="Recipient email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#fb4545dc] mb-3"
                />
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Subject"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#fb4545dc] mb-3"
                />
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Write your message..."
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#fb4545dc] mb-4 resize-none"
                />
                {emailError && <p className="text-red-400 text-sm mb-3">{emailError}</p>}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendEmail}
                    disabled={sendingEmail || !emailTo || !emailSubject || !emailBody}
                    className="flex-1 bg-[#fb4545dc] hover:bg-[#fb4545dc]/80 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {sendingEmail ? "Sending..." : "Send"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
    </>
  );
}
