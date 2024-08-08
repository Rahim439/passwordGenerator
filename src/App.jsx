import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  console.log("re-render");
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Copy");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*()_+-=[]{}|\\:;<>,.?/";

    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length + 1);
      pass += str[randomIndex];
    }

    setPassword(pass);
  }, [length, number, character]);

  const refPassword = useRef(null);

  const copyPassword = useCallback(() => {
    if (buttonText === "Copy") {
      navigator.clipboard.writeText(password);
      refPassword.current.select();
      setButtonText("Copied");
    } else {
      setButtonText("Copy");
    }
  }, [buttonText]);
  useEffect(() => {
    passwordGenerator();
    console.log("length number char updated !!!");
    setButtonText("Copy");
  }, [length, number, character]);

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen bg-blue-500">
        <div className="w-full max-w-lg p-12 bg-white rounded-lg shadow-lg">
          <h1 className="mb-8 font-mono text-3xl font-bold text-center text-black">
            Password Generator
          </h1>
          <div className="flex flex-col items-center">
            <div className="flex w-full mb-6">
              <input
                type="text"
                value={password}
                placeholder="Password"
                readOnly
                ref={refPassword}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={copyPassword}
                className="px-4 py-2 text-white bg-blue-600 rounded-r-md hover:bg-blue-700"
              >
                {buttonText}
              </button>
            </div>
            <input
              type="range"
              min={8}
              max={50}
              //initial Value
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              className="w-full h-2 mb-6 bg-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
            <label className="mb-6 text-lg font-medium text-gray-800">
              Length: {length}
            </label>
            <div className="flex items-center mb-4 mr-16">
              <input
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
                type="checkbox"
                className="w-5 h-5 text-blue-600 form-checkbox"
              />
              <label className="ml-2 text-lg font-medium text-gray-800">
                Include Numbers
              </label>
            </div>
            <div className="flex items-center ">
              <input
                onChange={() => {
                  setChar((prev) => !prev);
                }}
                type="checkbox"
                className="w-5 h-5 ml-2 text-blue-600 form-checkbox"
              />
              <label className="ml-2 text-lg font-medium text-gray-800">
                Include Special Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
