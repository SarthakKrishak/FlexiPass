import { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 51);
    window.navigator.clipboard.writeText(password);
    alert("Copied");
  }, [password]);

  return (
    <div className="min-h-screen bg-zinc-800 text-white flex flex-col items-center px-4 py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 text-center">
        Password Generator
      </h1>

      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl flex flex-col gap-4">
        <div className="flex w-full rounded-lg overflow-hidden">
          <input
            type="text"
            value={password}
            className="bg-zinc-600 py-3 px-4 w-full sm:w-3/4 text-sm sm:text-base"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="bg-green-500 px-4 sm:px-6 text-sm sm:text-base w-1/3 sm:w-1/4 rounded-r-lg"
          >
            Copy
          </button>
        </div>

        <div className="bg-zinc-600 p-4 rounded-lg flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
            <label className="text-sm sm:text-base">Length: {length}</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => setNumAllowed((prev) => !prev)}
            />
            <label className="text-sm sm:text-base">Number</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label className="text-sm sm:text-base">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
