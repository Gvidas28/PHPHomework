import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../ContextProvider";

export default function GuestLayout() {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/conferences" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}
