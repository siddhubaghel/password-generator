import { useState,useCallback, useEffect,useRef } from "react"

const App = () => {
  
  const [length,setlength] = useState(10);
  const [NumAllow,NumSetAllow] = useState(false);
  const [CharAllow,CharSetAllow] = useState(false);
  const [password,setpassword] = useState("");


  const passwordref = useRef(null);
    
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRRSTUVWXYZabcdefghijklmnopqrstuvwxyz";    
 
   if(NumAllow) str+="0123456789";
   if(CharAllow) str+= "!@#$%^&*()-?{][}";

    for(let i =1;i<=length;i++){
          let char =  Math.floor(Math.random()*str.length + 1)

     pass += str.charAt(char);

    }
     setpassword(pass);
  }
  ,[length,NumAllow,CharAllow,setpassword])
  

  useEffect(()=>{passwordGenerator()},[length,NumAllow,CharAllow,passwordGenerator])

  const copypass = useCallback(()=>{
    passwordref.current?.select();
    // passwordref.current?.setSelectionRange(0,50)
    window.navigator.clipboard.writeText(password);
  },[password])

  return <>
  
<div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
 
 <h1 className="text-white text-center p-5 text-xl font-bold">Password Generator</h1>

<div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>

  <input type="text" 
    value={password}
    className="outline-none w-full py-2 my-5 rounded-lg"
    placeholder="password"
    ref={passwordref}
  />

  <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-lg" onClick={copypass}>copy</button>
</div> 

  <div className="flex text-sm gap-x-2">
    <div className="flex items-center gap-x-1">
      <input type="range"
      min={6}
      max={50}
      value={length}
      className="cursor-pointer"
      onChange={(e)=>setlength(e.target.value)} />

      <label htmlFor="Numbers">Length:{length}</label>
    </div>

    <div className="flex items-center gap-x-1">

   <input type="checkbox"
    defaultChecked={NumAllow}
    id="numberInput"
    onChange={()=> NumSetAllow((prev)=> !prev) }
   />
   <label htmlFor="numberInput"> Numbers</label>

    </div>

    
    <div className="flex items-center gap-x-1">

   <input type="checkbox"
    defaultChecked={NumAllow}
    id="numberInput"
    onChange={()=> CharSetAllow((prev)=> !prev) }
   />
   <label htmlFor="characterInput"> Characters</label>

    </div>

  </div>

</div>  

  </>
}

export default App