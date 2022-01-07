import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount, incrementAsync, incrementIfOdd, selectCount } from './counterSlice'
import styles from './Counter.module.css'
import { Button } from 'react-bootstrap'
import BeatLoader from 'react-spinners/BeatLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { ToastContainer, toast, Slide, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import classnames from 'classnames'

const options = [
    { value: 'pathology', label: 'Патология' },
    { value: 'entomology', label: 'Ентомология' },
    { value: 'seeds', label: 'Семена' },
    { value: 'physiology', label: 'Физиология' },
    { value: 'water', label: 'Вода' },
]

export function Counter() {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState('2')

    const incrementValue = Number(incrementAmount) || 0

    const notifyAddition = () =>
        toast('You added 1 to the count', { autoClose: 3000, closeOnClick: true, draggable: true, transition: Slide })

    const notifySubtraction = () =>
        toast('You subtracted 1 from the count', {
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            transition: Flip,
        })

    const addition = () => {
        dispatch(increment())
        notifyAddition()
    }

    const subtraction = () => {
        dispatch(decrement())
        notifySubtraction()
    }

    return (
        <div>
            <div>
                <Select options={options} placeholder="Изберете анализ" isClearable isSearchable />
            </div>
            <div className={styles.row}>
                <button className={styles.button} aria-label="Decrement value" onClick={subtraction}>
                    -
                </button>
                <span className={styles.value}>{count}</span>
                <button className={styles.button} aria-label="Increment value" onClick={addition}>
                    +
                </button>
            </div>
            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <button className={styles.button} onClick={() => dispatch(incrementByAmount(incrementValue))}>
                    Add Amount
                </button>
                <button className={styles.asyncButton} onClick={() => dispatch(incrementAsync(incrementValue))}>
                    Add Async
                </button>
                <button className={styles.button} onClick={() => dispatch(incrementIfOdd(incrementValue))}>
                    Add If Odd
                </button>
            </div>
            <div className={classnames('test-buttons', 'math-operations-buttons')}>
                <Button variant="danger" onClick={subtraction}>
                    <FontAwesomeIcon icon={faMinus} />
                </Button>
                <Button variant="primary" onClick={addition}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
                <ToastContainer autoClose={3000} closeOnClick />
            </div>
            <div>
                <BeatLoader color="red" loading size={15} />
            </div>
        </div>
    )
}
