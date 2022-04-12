import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import { toast } from 'react-toastify'

export function About() {
    const [greeting, setGreeting] = useState('hi')
    const [users, setUsers] = useState([])
    const [admins, setAdmins] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    // const [openGreeting, setOpenGreeting] = useState(false)
    const [openUsers, setOpenUsers] = useState(false)
    const [openAdmins, setOpenAdmins] = useState(false)

    const onCreateUserClick = async () => {
        const response = await fetch('http://localhost:4000/users', {
            method: 'post',
            body: JSON.stringify({ name, email }),
            headers: { 'content-type': 'application/json' },
        })

        const result = await response.json()
        console.log(result)

        if (result === 'Ok') {
            setName('')
            setEmail('')
            toast.success('User created')
            onShowUsersClick()
        } else {
            toast.error('Choose unique email')
        }
    }

    const onShowUsersClick = async () => {
        setOpenUsers(!openUsers)
        const allUsersResponse = await fetch('http://localhost:4000/users')
        const usersJson = await allUsersResponse.json()
        setUsers(usersJson)
    }

    const onShowAdminsClick = async () => {
        setOpenAdmins(!openAdmins)
        const allAdminsResponse = await fetch('http://localhost:4000/users/admins')
        const adminsJson = await allAdminsResponse.json()
        setAdmins(adminsJson)
    }

    // const onGetGreetingClick = async () => {
    //     setOpenGreeting(!openGreeting)
    //     const helloResponse = await fetch('http://localhost:4000/hello')
    //     const helloText = await helloResponse.json()
    //     setGreeting(helloText.allUsers)
    // }

    const onDeleteUserButtonClick =
        ({ id }) =>
        async () => {
            const response = await fetch(`http://localhost:4000/users?id=${id}`, {
                method: 'delete',
            })
        }

    return (
        <>
            <Helmet>
                <title>About Lab</title>
            </Helmet>
            <div className="test-buttons">
                <label>
                    Username:
                    <input type="text" name="profileName" onChange={(e) => setName(e.target.value)} value={name} />
                </label>
                <label>
                    Email:
                    <input type="email" name="profileEmail" onChange={(e) => setEmail(e.target.value)} value={email} />
                </label>
                <Button onClick={onCreateUserClick} className="fetch-button">
                    Create user
                </Button>
                <Button onClick={onShowUsersClick} className="fetch-button">
                    Show all users
                </Button>
                <Collapse in={openUsers}>
                    <div>
                        {users.map((user) => (
                            <p key={user.id}>
                                {user.name} &lt;{user.email}&gt;
                                <Button onClick={onDeleteUserButtonClick({ id: user.id })}>Delete</Button>
                            </p>
                        ))}
                    </div>
                </Collapse>
                <Button onClick={onShowAdminsClick} className="fetch-button">
                    Show admins
                </Button>
                <Collapse in={openAdmins}>
                    <div>
                        {admins.map((admin) => (
                            <p key={admin.id}>{admin.name}</p>
                        ))}
                    </div>
                </Collapse>
                {/* <Button onClick={onGetGreetingClick} className="fetch-button">
                    Click me
                </Button>
                <Collapse in={openGreeting}>
                    <div id="collapse-text">
                        {greeting?.map?.(({ email }) => (
                            <div key={email}>{email}</div>
                        ))}
                    </div>
                </Collapse> */}
            </div>
        </>
    )
}

// useEffect(() => {
//     const getGreeting = async () => {
//         const helloResponse = await fetch('http://localhost:4000/test/greeting?greet=bonjour')
//         const helloText = await helloResponse.json()
//         setGreeting(helloText.greeting)
//     }
//     getGreeting()
// }, [])
