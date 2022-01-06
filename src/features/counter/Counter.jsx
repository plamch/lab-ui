import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount, incrementAsync, incrementIfOdd, selectCount } from './counterSlice'
import styles from './Counter.module.css'
import { Button, Spinner } from 'react-bootstrap'
import BeatLoader from 'react-spinners/BeatLoader'

export function Counter() {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState('2')

    const incrementValue = Number(incrementAmount) || 0

    // const Loader = () => <BeatLoader color="red" loading size={15} />

    return (
        <div>
            <div className={styles.row}>
                <button className={styles.button} aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    -
                </button>
                <span className={styles.value}>{count}</span>
                <button className={styles.button} aria-label="Increment value" onClick={() => dispatch(increment())}>
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
            <div className="test-button">
                <Button variant="primary" onClick={() => dispatch(increment())}>
                    Increment
                </Button>
            </div>
            <div>
                <Button variant="danger" onClick={() => dispatch(decrement())}>
                    Decrement
                </Button>
            </div>
            <div>
                <BeatLoader color="red" loading size={15} />{' '}
            </div>
        </div>
    )
}
