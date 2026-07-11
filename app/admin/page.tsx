"use client";

import { useState, useEffect, useCallback } from "react";

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

// ─── Component ──────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
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
      if (res.ok) {
        setEmailSuccess(true);
        setTimeout(() => {
          setShowEmailModal(false);
          setEmailSuccess(false);
          setEmailTo("");
          setEmailSubject("");
          setEmailBody("");
        }, 1500);
      }
    } catch (err) {
      console.error("Send email error:", err);
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
      <div className="min-h-screen bg-[#111] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">BlackBox Tech Admin</h1>
            <p className="text-gray-400 text-sm">Enter your admin password to continue</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Admin password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#fb4545dc] mb-3"
            />
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

  // ─── Dashboard ─────────────────────────────────────────────────────────────────

  return (
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
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
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

        {/* Data Table */}
        {currentData.length === 0 ? (
          <div className="bg-[#1a1a1a] rounded-xl p-12 text-center border border-white/10">
            <p className="text-gray-500">No entries yet</p>
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
                  {currentData.map((row) => (
                    <tr key={row.id as string} className="border-b border-white/5 hover:bg-white/5">
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
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <select
                                value={(row.status as string) || "new"}
                                onChange={(e) => updateStatus("student", row.id as string, e.target.value)}
                                className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white"
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
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <select
                                value={(row.status as string) || "new"}
                                onChange={(e) => updateStatus("professional", row.id as string, e.target.value)}
                                className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white"
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
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <select
                                value={(row.status as string) || "new"}
                                onChange={(e) => updateStatus("build", row.id as string, e.target.value)}
                                className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white"
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
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <select
                                value={(row.status as string) || "new"}
                                onChange={(e) => updateStatus("contact", row.id as string, e.target.value)}
                                className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white"
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
  );
}
