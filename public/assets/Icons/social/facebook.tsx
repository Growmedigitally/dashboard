import { theme } from 'antd'

export default () => {
    const { token } = theme.useToken();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 128 128" id="connection-76"><rect width="128" height="128" fill="#3d5a98" rx="24" ry="24"></rect><path fill="#fff" d="M92.47 32H35.53A3.53 3.53 0 0 0 32 35.53v56.94A3.53 3.53 0 0 0 35.53 96H66V70h-8v-8h8v-8c0-8.27 5.23-12.33 12.61-12.33A71.64 71.64 0 0 1 86 42v8h-5a4.83 4.83 0 0 0-5 5v7h10l-1 8h-9v26h16.47A3.53 3.53 0 0 0 96 92.47V35.53A3.53 3.53 0 0 0 92.47 32Z"></path></svg>
    )
};