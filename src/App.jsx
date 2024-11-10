import { useState, useCallback, useEffect,useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

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
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,51);
    window.navigator.clipboard.writeText(password);
  },[password]);

  return (
    <div className="w-full h-screen bg-zinc-800 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl">Password Generator</h1>
      <div className="rounded-lg overflow-hidden flex mt-6">
        <input
          type="text"
          value={password}
          className="bg-zinc-600 px-20 py-2"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyToClipboard} className="bg-green-500 px-3">
          Copy
        </button>
      </div>

      <div className="mt-4 bg-zinc-600 px-20 py-2 rounded-lg">
        <input
          type="range"
          min={6}
          max={50}
          value={length}
          className="cursor-pointer"
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
        <label> Length: {length}</label>

        <input
          className="ml-5"
          type="checkbox"
          defaultChecked={numAllowed}
          onChange={() => setNumAllowed((prev) => !prev)}
        />
        <label> Number </label>

        <input
          className="ml-5"
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={() => setCharAllowed((prev) => !prev)}
        />
        <label> Character</label>
      </div>
    </div>
  );
};

export default App;
