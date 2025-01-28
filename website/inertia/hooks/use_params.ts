import { useMemo } from "react"

export type UrlParams = {
    [key: string]: string
}

export function useParams(url: string): UrlParams {
    const params = useMemo(() => {
        const result: UrlParams = {}
        const urlParams = url.split("?")[1].split("&")

        urlParams.forEach((param) => result[param.split("=")[0]] = param.split("=")[1])

        return result
    }, [url])

    return params
}