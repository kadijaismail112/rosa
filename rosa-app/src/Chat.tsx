// chat takes args supabase client and session 

export default function Chat({ supabaseClient, session }) {
    return (
        <div>
            <h1>Chat</h1>
            <p>Logged in as {session.user.email}</p>
        </div>
    )
}