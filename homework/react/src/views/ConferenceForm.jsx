import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServerClient from "../ServerClient";

export default function ConferenceForm() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [conference, setConference] = useState({
        id: null,
        name: "",
        description: "",
        location: "",
        date: "",
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            ServerClient.get(`/conferences/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setConference(data);
                })
                .catch(() => setLoading(false));
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (conference.id) {
            ServerClient.put(`/conferences/${conference.id}`, conference)
                .then(() => {
                    navigate("/conferences");
                })
                .catch((error) => {
                    console.log(error);
                    setErrors(error.response.data.errors);
                });
        } else {
            ServerClient.post("/conferences", conference)
                .then(() => {
                    navigate("/conferences");
                })
                .catch((error) => {
                    console.log(error);
                    setErrors(error.response.data.errors);
                });
        }
    };

    return (
        <div>
            {conference.id && (
                <h1>{`Update conference: ${conference.name}`}</h1>
            )}
            {!conference.id && <h1>New conference</h1>}
            <div className="card">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={conference.name}
                            placeholder="Name"
                            onChange={(e) =>
                                setConference({
                                    ...conference,
                                    name: e.target.value,
                                })
                            }
                        />
                        <input
                            value={conference.description}
                            placeholder="Description"
                            onChange={(e) =>
                                setConference({
                                    ...conference,
                                    description: e.target.value,
                                })
                            }
                        />
                        <input
                            value={conference.location}
                            placeholder="Location"
                            onChange={(e) =>
                                setConference({
                                    ...conference,
                                    location: e.target.value,
                                })
                            }
                        />
                        <input
                            value={conference.date}
                            placeholder="Date"
                            onChange={(e) =>
                                setConference({
                                    ...conference,
                                    date: e.target.value,
                                })
                            }
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </div>
    );
}
