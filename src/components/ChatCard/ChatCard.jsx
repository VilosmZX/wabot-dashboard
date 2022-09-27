import { Link } from 'react-router-dom';
import styles from './ChatCard.module.css';
import { useEffect, useState } from 'react';

function ChatCard({ chat }) {
    const [favorited, setFavorited] = useState(false);
    const [trolled, setTrolled] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setTrolled(false);
        }, 3000);

        return () => clearTimeout(id);
    }, [trolled]);

    return (
        <div className={favorited ? styles.fav : ''}>
            <Link to={`/groups/${chat.id}`}>{chat.subject}</Link>
            <button onClick={() => setFavorited(!favorited)}>{favorited ? 'Remove Favorite' : 'Favorite'}</button>
            <button onClick={() => setTrolled(!trolled)}>{trolled ? 'Mimpi dek? OWKAOKWDOK' : 'Kick semua orang yang ada di group ini'}</button>
        </div>
    )
};

export default ChatCard;