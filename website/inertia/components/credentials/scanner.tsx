import { Scanner } from '@yudiel/react-qr-scanner';

function CredentialScanner({
}) {
    return (
        <Scanner
            onScan={(data) => console.log(data)}
            styles={{ 
                video: {
                    height: '36em',
                    width: '100em',
                },
                container: {
                    height: '10em',
                    width: '20em',
                    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    // display: 'flex',
                },
            }}
        />
    )
}

export default CredentialScanner