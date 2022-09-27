import React, { useState, useEffect, useCallback, useRef } from 'react'
import styles from './AutoReplyPage.module.css';
import request from '../../api/Api';
import AutoReplyCard from '../../components/AutoReplyCard/AutoReplyCard';

const AutoReplyPage = () => {
    const [trigger, setTrigger] = useState(null);
    const [reply, setReply] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [data, setData] = useState([]);
    const focusRef = useRef(null);

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (!(trigger) || !(reply)) {
            setError(true);
            setErrorText('Trigger atau Reply kosong!');
            setLoading(false);
            const id = setTimeout(() => {
                setError(false);
            }, 3000);
            return () => clearTimeout(id);
        }
        request.get(`/autoreply?find=${trigger}`)
            .then((response) => {
                const { isExists } = response.data;
                if (isExists) {
                    setError(true);
                    setErrorText(`${trigger} sudah terdaftar dalam database`);
                } else {
                    request.post('/autoreply/add', {
                        trigger,
                        reply,
                    })
                        .then((response) => {
                            setError(true);
                            setErrorText(`${trigger} telah ditambahkan ke dalam database!`);
                            setTrigger('');
                            setReply('');
                            setData((prev) => [...prev, response.data]);
                            const id = setTimeout(() => {
                                setError(false);
                            }, 3000);
                            return () => clearTimeout(id);
                        })
                        .catch(err => console.error(err));
                }
            })
            .catch(err => console.error(err));    
        setLoading(false);
    }

    const fetchData = useCallback(() => {
        request.get('/autoreply/list')
            .then((response) => {
                setData(response.data);
            })
            .catch(err => console.error(err));
    });

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.reply}>
                <h1>Add new reply</h1>
                <form onSubmit={submit} className={styles.form}>
                    {error && (
                        <p style={{color: 'red'}}>{errorText}</p>
                    )}
                    <input value={trigger} ref={focusRef} onChange={(e) => setTrigger(e.target.value)} id='trigger' name='trigger' type={'text'} placeholder={'Trigger'}/>
                    <input value={reply} onChange={(e) => setReply(e.target.value)} id='reply' name='reply' type={'text'} placeholder={'Reply'}/>
                    <button disabled={loading} type="submit">Add</button>
                </form>
            </div>
            <div className={styles.allReply}>
                {!data.length && (
                    <span>No Auto Reply, tambahkan sekarang <button onClick={() => focusRef.current.focus()}>Buat autoreply pertamamu!</button></span>
                )}
                {data.map((autoreply, idx) => (
                    <AutoReplyCard key={idx} setData={setData} autoreply={autoreply} />
                ))}
            </div>
        </div>
    )
}

export default AutoReplyPage