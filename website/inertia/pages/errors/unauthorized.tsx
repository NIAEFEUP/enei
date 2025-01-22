export default function Unauthorized({ error }: { error: any }) {
    return (JSON.stringify(error))
}