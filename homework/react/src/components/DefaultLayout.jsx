import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../ContextProvider";

export default function DefaultLayout() {
    const { user, token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/conferences">Conferences</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>User information</div>
                </header>
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
