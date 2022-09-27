import React from 'react';
import { useParams } from 'react-router-dom';
import ChatLog from '../../components/ChatLog/ChatLog';
import ParticipantCard from '../../components/ParticipantCard/ParticipantCard';
import styles from './GroupPage.module.css'

const GroupPage = () => {
    const { jid } = useParams();
    return (
        <div className={styles.gridContainer}>
            <ChatLog jid={jid} />
            <ParticipantCard jid={jid} />
        </div>
    );
};

export default GroupPage;