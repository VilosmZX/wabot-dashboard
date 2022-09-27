import React, { useEffect, useState, useRef, useCallback } from 'react'
import request from '../../api/Api';
import styles from './ChatLog.module.css';

const ChatLog = ({ jid }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef(null);

    const fetchData = useCallback(() => {
        setLoading(true);
        request.get(`/logs/${jid}`)
            .then(response => {
                setData(response.data);
                setLoading(false);
                containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.refresh}>
                <button disabled={loading} onClick={fetchData}>Refresh</button>
            </div>
            {loading && (
                <span>Loading chatlog...</span>
            )}
            {data.length ? (
                data.map((log) => (
                    <p>({log?.number}){log?.pushname}: {log?.conversation}</p>
                ))
            ) : (
                <span>Empty chat log</span>
            )}
        </div>
    )
}

export default ChatLog