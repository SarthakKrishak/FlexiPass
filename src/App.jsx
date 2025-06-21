import { useState, useEffect, useRef, useMemo } from "react";
import { Copy, Shield, Key, Check, RefreshCw, Zap, Clock } from "lucide-react";

const STORAGE_KEY = "flexipass_history";
const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 30 * 6;

const App = () => {
  const [length, setLength] = useState(12);
  const [numAllowed, setNumAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [uppercaseAllowed, setUppercaseAllowed] = useState(true);
  const [lowercaseAllowed, setLowercaseAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState([]);

  const passwordRef = useRef(null);

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const generatePassword = (initHistory = history) => {
    let chars = "";
    if (uppercaseAllowed) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercaseAllowed) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numAllowed) chars += "0123456789";
    if (charAllowed) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(pass);
    setStrength(calculateStrength(pass));

    const now = Date.now();
    const updatedHistory = [
      { password: pass, timestamp: now },
      ...initHistory,
    ].slice(0, 50);
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  // On mount: load history and generate
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const now = Date.now();
    const fresh = stored.filter((item) => now - item.timestamp < SIX_MONTHS_MS);
    setHistory(fresh);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    generatePassword(fresh);
  }, []);

  // Debounce password generation on settings change
  useEffect(() => {
    const timeout = setTimeout(() => {
      generatePassword();
    }, 150);
    return () => clearTimeout(timeout);
  }, [length, numAllowed, charAllowed, uppercaseAllowed, lowercaseAllowed]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest("#history-button") &&
        !e.target.closest("#history-dropdown")
      ) {
        setHistoryOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const copyToClipboard = async (text = password) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      passwordRef.current?.select();
      document.execCommand("copy");
    } finally {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStrengthColor = () =>
    strength <= 2
      ? "bg-red-500"
      : strength <= 4
      ? "bg-yellow-500"
      : "bg-green-500";

  const getStrengthText = () =>
    strength <= 2 ? "Weak" : strength <= 4 ? "Medium" : "Strong";

  const sliderBackground = useMemo(() => {
    const percent = ((length - 6) / 44) * 100;
    return `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percent}%, #475569 ${percent}%, #475569 100%)`;
  }, [length]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="w-full bg-slate-950/70 backdrop-blur-md shadow-lg border-b border-white/10 py-4 px-6 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-semibold tracking-wide">
              FlexiPass
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm relative">
            {/* History Dropdown */}
            <div className="relative">
              <button
                id="history-button"
                onClick={() => setHistoryOpen((prev) => !prev)}
                className="flex items-center gap-1 hover:text-blue-400 transition"
              >
                <Clock className="w-4 h-4" /> History
              </button>

              {historyOpen && (
                <div
                  id="history-dropdown"
                  className="absolute right-0 mt-4 w-72 max-h-64 overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-lg p-4 z-50"
                >
                  <h2 className="text-sm font-semibold mb-2 flex items-center gap-2 text-yellow-400">
                    <Clock className="w-4 h-4" /> Recent Passwords
                  </h2>
                  <ul className="space-y-2 text-sm">
                    {history.length === 0 ? (
                      <p className="text-slate-400">No previous passwords.</p>
                    ) : (
                      history.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between items-center bg-slate-800 px-3 py-2 rounded"
                        >
                          <span className="font-mono truncate">
                            {item.password}
                          </span>
                          <button
                            onClick={() => copyToClipboard(item.password)}
                            className="text-blue-400 hover:underline text-xs"
                          >
                            Copy
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* GitHub */}
            <a
              href="https://github.com/yourusername/flexipass"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 0C5.37 0 0 5.37 0 12a12.01 12.01 0 008.21 11.42c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.54-1.36-1.32-1.72-1.32-1.72-1.08-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.06 1.82 2.79 1.3 3.47.99.11-.77.42-1.3.76-1.6-2.67-.3-5.48-1.33-5.48-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.43 11.43 0 016 0C16.98 4.44 18 4.76 18 4.76c.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.6-2.81 5.61-5.49 5.91.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 mt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%239C92AC\\' fill-opacity=\\'0.05\\'%3E%3Ccircle cx=\\'30\\' cy=\\'30\\' r=\\'1\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              FlexiPass
            </h1>
            <p className="text-slate-400 text-lg mt-4">
              Generate secure, customizable passwords with enterprise-grade
              encryption standards
            </p>
          </div>
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Key className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-slate-300">
                  Generated Password
                </span>
              </div>

              <div className="relative">
                <input
                  ref={passwordRef}
                  type="text"
                  value={password}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-4 pr-14 text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Your secure password will appear here..."
                  readOnly
                />
                <button
                  onClick={() => copyToClipboard()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 group"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Copy className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  )}
                </button>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <span className="text-sm text-slate-400">Strength:</span>
                <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${getStrengthColor()}`}
                    style={{ width: `${(strength / 6) * 100}%` }}
                  ></div>
                </div>
                <span
                  className={`text-sm font-medium ${
                    strength <= 2
                      ? "text-red-400"
                      : strength <= 4
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {getStrengthText()}
                </span>
              </div>
            </div>

            {/* Length and Options */}
            <div className="space-y-6">
              <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-medium">
                    Password Length
                  </label>
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-mono text-sm">
                    {length}
                  </div>
                </div>
                <input
                  type="range"
                  min={6}
                  max={50}
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{ background: sliderBackground }}
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>6</span>
                  <span>50</span>
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Character Types
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Uppercase (A-Z)",
                      checked: uppercaseAllowed,
                      onChange: () => setUppercaseAllowed((p) => !p),
                    },
                    {
                      label: "Lowercase (a-z)",
                      checked: lowercaseAllowed,
                      onChange: () => setLowercaseAllowed((p) => !p),
                    },
                    {
                      label: "Numbers (0-9)",
                      checked: numAllowed,
                      onChange: () => setNumAllowed((p) => !p),
                    },
                    {
                      label: "Symbols (!@#$%)",
                      checked: charAllowed,
                      onChange: () => setCharAllowed((p) => !p),
                    },
                  ].map(({ label, checked, onChange }) => (
                    <label
                      key={label}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={onChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            checked
                              ? "bg-blue-600 border-blue-600"
                              : "border-slate-600 bg-transparent"
                          }`}
                        >
                          {checked && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                      <span className="text-slate-300 group-hover:text-white transition-colors">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => generatePassword()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <RefreshCw className="w-5 h-5" />
                Generate New Password
              </button>
            </div>

            {copied && (
              <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2">
                <Check className="w-4 h-4" />
                Password copied to clipboard!
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-950/80 border-t border-white/10 text-sm text-slate-400 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()}{" "}
            <a href="/" className="text-white font-semibold">
              FlexiPass
            </a>
            . All rights reserved.
          </div>
          <div className="flex gap-4">
            <span>
              Developed by{" "}
              <a
                href="https://linktr.ee/SarthakKrishak"
                target="_blank"
                className="hover:text-white transition"
              >
                Sarthak Krishak
              </a>
            </span>
          </div>
        </div>
      </footer>

      <style>{`
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  @keyframes animate-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-in {
    animation: animate-in 0.3s ease-out;
  }
  .slide-in-from-top-2 {
    animation: slide-in-from-top-2 0.3s ease-out;
  }
`}</style>
    </div>
  );
};

export default App;
