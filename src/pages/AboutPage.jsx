import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Button, Collapse, Modal, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useGetUsersQuery, useCreateUserMutation } from '../services/users'

export function About() {
    const [greeting, setGreeting] = useState('hi')
    // const [users, setUsers] = useState([])
    const [admins, setAdmins] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    // const [openGreeting, setOpenGreeting] = useState(false)
    const [openUsers, setOpenUsers] = useState(false)
    const [openAdmins, setOpenAdmins] = useState(false)
    const [isEditUserModalVisible, setEditUserModalVisible] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState('')
    const [editNameField, setEditNameField] = useState('')
    const [editEmailField, setEditEmailField] = useState('')
    // const [isUserCreationLoading, setUserCreationLoading] = useState(false)

    const {
        data: usersData,
        isFetching: areUsersFetching,
        refetch: refetchUsers,
    } = useGetUsersQuery(null, { refetchOnMountOrArgChange: true })

    const [createUser, { isLoading: isUserCreationLoading }] = useCreateUserMutation()

    const findSelectedUser = (id) => usersData?.find((user) => user.id === id)

    const onCreateUserClick = async () => {
        const { error } = await createUser({ name, email })

        if (typeof error === 'undefined') {
            setName('')
            setEmail('')
            toast.success('User created')
            refetchUsers()
        } else {
            toast.error('Choose unique email')
        }
    }

    const onShowUsersClick = async () => {
        // setOpenUsers(true)
        // setUsersLoading(true)
        // const allUsersResponse = await fetch('http://localhost:4000/users')
        // const usersJson = await allUsersResponse.json()
        // setUsers(usersJson)
        // setUsersLoading(false)
        refetchUsers()
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

    const onEditUserButtonClick =
        ({ id }) =>
        () => {
            setSelectedUserId(id)
            const newSelectedUser = findSelectedUser(id)
            setEditNameField(newSelectedUser.name)
            setEditEmailField(newSelectedUser.email)
            setEditUserModalVisible(true)
        }

    const onDeleteUserButtonClick =
        ({ id }) =>
        async () => {
            const response = await fetch(`http://localhost:4000/users?id=${id}`, {
                method: 'delete',
            })
            refetchUsers()
        }

    const closeEditUserModal = () => {
        setEditUserModalVisible(false)
    }

    const onUserEditFormSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch(`http://localhost:4000/users/${selectedUserId}`, {
            method: 'put',
            body: JSON.stringify({ name: editNameField, email: editEmailField }),
            headers: { 'content-type': 'application/json' },
        })
    }

    const onUserCreateFormSubmit = async (event) => {
        event.preventDefault()
        onCreateUserClick()
    }

    return (
        <>
            <Helmet>
                <title>About Lab</title>
            </Helmet>
            <Modal show={isEditUserModalVisible} onHide={closeEditUserModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{findSelectedUser(selectedUserId)?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onUserEditFormSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                value={editNameField}
                                onChange={(event) => setEditNameField(event.target.value)}
                                type="text"
                                placeholder="Username"
                                isInvalid={editNameField.length === 0}
                            />
                            <Form.Control.Feedback type="invalid">Invalid username</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                value={editEmailField}
                                onChange={(event) => setEditEmailField(event.target.value)}
                                type="email"
                                placeholder="Enter email"
                                isInvalid={editEmailField.length === 0}
                            />
                            <Form.Control.Feedback type="invalid">Invalid email</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Apply
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeEditUserModal}>
                        Cancel
                    </Button>
                    {/* <Button variant="primary" onClick={onSaveUserButtonClick}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>
            <div className="test-buttons">
                <Form onSubmit={onUserCreateFormSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            type="text"
                            placeholder="Username"
                            isInvalid={name.length === 0}
                        />
                        <Form.Control.Feedback type="invalid">Invalid username</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            type="email"
                            placeholder="Enter email"
                            isInvalid={email.length === 0}
                        />
                        <Form.Control.Feedback type="invalid">Invalid email</Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mb-1">
                        Create
                    </Button>
                    {isUserCreationLoading && <p className="loader">Loading...</p>}
                </Form>
                <Button onClick={onShowUsersClick} className="fetch-button">
                    Show all users
                </Button>
                {/* <Collapse in={openUsers}> */}
                <div>
                    {areUsersFetching && <p className="loader">Fetching...</p>}
                    {usersData?.map((user) => (
                        <p key={user.id}>
                            {user.name} &lt;{user.email}&gt;
                            <Button variant="secondary" onClick={onEditUserButtonClick({ id: user.id })}>
                                Edit
                            </Button>
                            <Button variant="danger" onClick={onDeleteUserButtonClick({ id: user.id })}>
                                Delete
                            </Button>
                        </p>
                    ))}
                </div>
                {/* </Collapse> */}
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
