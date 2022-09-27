import React, { useState, useEffect, useCallback } from 'react'
import styles from './ParticipantCard.module.css';
import request from '../../api/Api';
import EachParticipantCard from '../EachParticipantCard/EachParticipantCard';


const ParticipantCard = ({ jid }) => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(() => {
        setLoading(true);
        request.get(`/chats/${jid}`)
            .then((response) => {
                setParticipants(response.data.participants);
                setLoading(false);
            })
            .catch(err => console.error(err));
    });

    useEffect(() => {
        fetchData();
    }, []);
        
    return (
        <div className={styles.container}>
            {loading ? (
                <span>Fetching Total Participant...</span>
            ) : (
                <div>
                    <div className={styles.total}> 
                        <span>Total Participant: {participants.length}</span>
                    </div>
                    {participants.map((participant, idx) => (
                        <EachParticipantCard key={idx} participant={participant} />
                    ))}
                </div>
            )}
            <div className={styles.refresh}>
                <button onClick={fetchData}>Refresh</button>
            </div>
        </div>
    )
}

export default ParticipantCard