export async function oidcRenewTokens(refresh_token: string) {
    return await fetch(`${process.env.OIDC_TOKEN_ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${process.env.OIDC_CLIENT_ID}:${process.env.OIDC_CLIENT_SECRET}`)}`,
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        })
    })
}