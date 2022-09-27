import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import styles from './GroupLayout.module.css';
import request from '../api/Api';


const GroupLayout = () => {
    const [open, setOpen] = useState(false);
    const [logs, setLogs] = useState([]);

    const getData = () => {
        if (open)
            return setOpen(false);

        request.get('/github')
            .then(response => setLogs(response.data))
            .catch(err => console.error(err));
        setOpen(true);
    }

    return (
        <>  
            <div className={open ? styles.logContainer : styles.hide}>
                <ul className={styles.ul}>
                    {logs.map((log, idx) => (
                        <li key={idx}>{log.message}<sup>{log.createdAt}</sup></li>
                    ))}
                </ul>
            </div>
            <div className={styles.container}>
                <button onClick={getData}>{open ? 'Close' : 'Github Log'}</button>
            </div>
            <Outlet />
        </>
    )
}

export default GroupLayout