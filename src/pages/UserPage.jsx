import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {

    const params = useParams();

    const [user, setUser] = useState({});



    useEffect(() => {
        
        fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
        .then((response) => response.json())
        .then((data) => setUser(data));

    }, []);

    return (
        <div>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
            <h2>{user.website}</h2>
            <h2>{user.username}</h2>
            <h2>{user?.address?.city}</h2>
        </div>
    )
}

export default UserPage;