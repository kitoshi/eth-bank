/// <reference types="react-scripts" />

interface Window {
    ethereum: {
        isMetaMask?: boolean,
        host?: string,
        path?: string,
        sendAsync?: (request: unknown, callback: (error: unknown, response: unknown) => void) => void,
        send?: (request: unknown, callback: (error: unknown, response: unknown) => void) => void
    }
}
