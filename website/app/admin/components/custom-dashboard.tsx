import { ApiClient } from "adminjs"
import { useEffect, useState } from "react"
import { theme, Button, Box } from '@adminjs/design-system'

function CustomDashboard () {
    const [data, setData] = useState(null)
    const api = new ApiClient()

    useEffect(() => {
        api.getDashboard()
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    console.log("Data: ", data)

    return (
        <div className="flex flex-row">
            <Box variant="white">
                <p>Number of referrals: {data ? data ["userActivities"].length : 0}</p>
            </Box>

            <Box variant="white">
                <p>Number of total points from referrals: {data ? data["points"] : 0}</p>
            </Box>
        </div>
    )
}

export default CustomDashboard