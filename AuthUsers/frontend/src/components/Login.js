import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login() {
    const [user,setUsers] = useState([])
    const [username,setUserName ]= useState('')
    const [password,setPassword] = useState('')
    const navigate=useNavigate()
    useEffect(()=>{
        fetchUsers();
    },[])
        const fetchUsers=()=>{
            axios
            .get('http://localhost:3001/register')
            .then((res)=>{
                console.log(res.data);
                setUsers(res.data)
            })
        }
        const handleLog =async(event)=>{
            event.preventDefault();
            try{
                const res=await axios.post('http://localhost:3001/login',{username,password})
                const token=res.data.token
                setUserName('')
                setPassword('')
                alert("login successfull")
                fetchUsers();
                navigate('/account')
                window.location.reload()
                localStorage.setItem('token',token)
            }catch(error){
                console.log('Login error',error);
                alert("Invalid Credential")
            }
        }
  return (
    <div className='w-full h-screen flex'>
      <div className='w-[100%] h-[100%] bg-[#1a1a1a] text-white flex justify-center items-center'>
         <form action="" className='text-center border rounded-lg w-[550px] h-[400px] p-12 'onSubmit={handleLog}>
            <label htmlFor="">Username</label>
            <br/>
            <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'  
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e)=>setUserName(e.target.value)}
            />
            <br/><br/>
            <label htmlFor="">Password</label>
            <br/>
            <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}/>
            <br/><br/>
            <button className='w-[200px] h-[50px] border hover:bg-teal-900'  type='submit'>
            Login</button>
         </form> 
      </div>
    
    </div>
  )
}

export default Login
