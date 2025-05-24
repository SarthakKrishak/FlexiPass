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
    alert("Copied")
  },[password]);

  return (
    <div className="w-full h-screen bg-zinc-800 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl">Password Generator</h1>
      <div className="flex flex-col w-1/3 mt-6 bg-red-600">
        <div className="rounded-lg overflow-hidden flex w-full">
          <input
            type="text"
            value={password}
            className="bg-zinc-600 py-3 w-3/4 px-4"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyToClipboard} className="bg-green-500 px-6 rounded-r-lg w-1/4">
            Copy
          </button>
        </div>

        <div className="mt-4 bg-zinc-600 pl-6 py-3 rounded-lg flex items-center w-full gap-2">
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
    </div>
  );
};

export default App;
