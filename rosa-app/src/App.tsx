import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const SUPABASE_URL = "https://murmuncqoiskpgedjihz.supabase.co"
const SUPABASE_PUBLIC_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11cm11bmNxb2lza3BnZWRqaWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyMDA3MzEsImV4cCI6MjAyMzc3NjczMX0.humU7pw4UJRiPhxekypsrjew_xcQIYncJiyamrrHrIQ"
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY)


function App() {
  const [count, setCount] = useState(0)
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

  if (!session) {
    return (
      <div>
        <h1>Hi, I'm Rosa</h1>
        <p>Log in to get started. </p>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={["facebook"]}/>
      </div>
    )
  }
  else {
    return (<div>Logged in!</div>)
  }
}

export default App
