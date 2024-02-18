import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import './App.css'

const SUPABASE_URL = "https://murmuncqoiskpgedjihz.supabase.co"
const SUPABASE_PUBLIC_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11cm11bmNxb2lza3BnZWRqaWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyMDA3MzEsImV4cCI6MjAyMzc3NjczMX0.humU7pw4UJRiPhxekypsrjew_xcQIYncJiyamrrHrIQ"
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY)


function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const loginWithFacebook = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook' 
    }) 
    
    if (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error logging out:', error.message);
    }
  };

  if (!session) {
    return (
      <div>
        <h1>Hi, I'm Rosa</h1>
        <p>Log in to get started. </p>
        <button onClick={loginWithFacebook}>Login with Facebook</button>
        {/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={["facebook"]}/> */}
      </div>
    )
  }
  else {
    return (
    <div>
      <div>Logged in!</div>
      <p>Hi, {session.user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
    )
  }
}

export default App
