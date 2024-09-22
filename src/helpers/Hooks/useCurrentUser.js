import { useSelector } from "react-redux"


export default function useCurrentUser() {
    const user = useSelector((state) => state.user.currentUser)
    return user
}


