import { useEffect, useState } from "react";
import ServerClient from "../ServerClient";
import { Link } from "react-router-dom";

export default function Conferences() {
    const [conferences, setConferences] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getConferences();
    }, []);

    const getConferences = () => {
        setLoading(true);

        ServerClient.get("/conferences")
            .then(({ data }) => {
                setLoading(false);
                setConferences(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onDelete = (conference) => {
        if (
            !window.confirm("Are you sure you want to delete this conference?")
        ) {
            return;
        }

        ServerClient.delete(`/conferences/${conference.id}`).then(() => {
            getConferences();
        });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Conferences</h1>
                <Link to={"/conferences/new"} className="btn-add">
                    Create new
                </Link>
            </div>
            <div className="card">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    <tbody>
                        {conferences.map((c) => (
                            <tr>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.description}</td>
                                <td>{c.location}</td>
                                <td>{c.date}</td>
                                <td>
                                    <Link
                                        to={"/conferences/" + c.id}
                                        className="btn-edit"
                                    >
                                        Edit
                                    </Link>
                                    &nbsp;
                                    <button
                                        className="btn-delete"
                                        onClick={(e) => onDelete(c)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
