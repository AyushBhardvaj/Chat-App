import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({children, redirect, loading=false}) => {
    const {isAuthenticated} = useSelector(state => state.user)
    if (loading===false ) {
        if (isAuthenticated===true) {
            return children
        } else if (isAuthenticated===false) {
            return <Navigate to={redirect} replace />
        }
    }
    else {
        return "loading..."
    }

    // Go through the sixth video for complete understanding of protected route.
    return children
}