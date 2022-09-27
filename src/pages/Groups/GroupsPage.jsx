import { useState, useEffect } from "react";
import request from '../../api/Api';
import ChatCard from "../../components/ChatCard/ChatCard";
import SearchBar from "../../components/SearchBar/SearchBar";


function GroupsPage() {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLoading(true);
        request.get('/chats')
            .then((response) => { 
                setChats(response.data);
                setLoading(false);
            })
            .catch(err => console.error(err)); 
    }, []);

    return (
        <div>
            {loading ? (
                <span>Loading...</span>
            ) : (
                <>
                    <SearchBar setSearchTerm={setSearchTerm} />
                    {chats.filter((chat) => {
                        if (searchTerm === '') return chat;
                        else if (chat?.subject.toLowerCase().includes(searchTerm)) return chat;
                    }).length ? chats.filter((chat) => {
                        if (searchTerm === '') return chat;
                        else if (chat?.subject.toLowerCase().includes(searchTerm)) return chat;
                    }).map((chat, idx) => (
                        <ChatCard key={idx} chat={chat} />
                    )) : <p>{searchTerm} Not found :(</p>}
                </>
            )}
        </div>
    )
};

export default GroupsPage;