import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'

export function About() {
    const [greeting, setGreeting] = useState('hi')
    // useEffect(() => {
    //     const getGreeting = async () => {
    //         const helloResponse = await fetch('http://localhost:4000/test/greeting?greet=bonjour')
    //         const helloText = await helloResponse.json()
    //         setGreeting(helloText.greeting)
    //     }
    //     getGreeting()
    // }, [])

    const onGetGreetingClick = async () => {
        const helloResponse = await fetch('http://localhost:4000/hello')
        const helloText = await helloResponse.json()
        setGreeting(helloText.allUsers)
    }

    return (
        <>
            <Helmet>
                <title>About Lab</title>
            </Helmet>
            <div>
                <button onClick={onGetGreetingClick}>Click me</button>
                <div>
                    {greeting?.map?.(({ email }) => (
                        <div key={email}>{email}</div>
                    ))}
                </div>
            </div>
        </>
    )
}
