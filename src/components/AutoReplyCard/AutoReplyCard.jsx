import React, { useState, useEffect, useCallback } from 'react'
import styles from './AutoReplyCard.module.css';
import request from '../../api/Api';


const AutoReplyCard = ({ setData, autoreply }) => {

    const [edit, setEdit] = useState(false);
    const [trigger, setTrigger] = useState(autoreply.trigger);
    const [reply, setReply] = useState(autoreply.reply);

    const deleteData = () => {
        request.delete(`/autoreply/delete?id=${autoreply.id}`)
            .then((response) => {
                if (response.status !== 200)
                    alert('Tidak bisa delete item!');
            })
            .catch(err => console.error(err));
        setData((prev) => prev.filter((value) => value.id !== autoreply.id));
    };

    const updateData = (e) => {
        if (e.key === 'Enter') {
            request.patch(`/autoreply/update?id=${autoreply.id}`, {
                reply,
                trigger,
            })
                .then((response) => {
                    if (response.status !== 200)    
                        alert('Tidak bisa update autoreply');
                })
                .catch(err => console.error(err));
            setEdit(false);
        }
    }

    return (
        <div className={styles.container}>
            {!edit ? (
                <>
                    <span>Triger: {trigger}</span>
                    <span>Reply: {reply}</span>
                </>
            ) : (
                <>
                    <span>Trigger: <input value={trigger} onKeyDown={updateData} onChange={(e) => setTrigger(e.target.value)}/></span>
                    <span>Reply: <input value={reply} onKeyDown={updateData} onChange={(e) => setReply(e.target.value)}/></span><span>Press enter di input untuk apply update</span>
                </>
            )}
            <div>
                <button onClick={deleteData}>Delete</button>
                <button onClick={() => setEdit(!edit)}>{edit ? 'Cancel' : 'Edit'}</button>
            </div>
        </div>
    )
}

export default AutoReplyCard