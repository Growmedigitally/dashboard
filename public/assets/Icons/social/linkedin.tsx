import { theme } from 'antd'

export default () => {
    const { token } = theme.useToken();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 128 128" id="linkedin"><rect width="128" height="128" fill="#0177b5" rx="24" ry="24"></rect><path fill="#fff" d="M92 32H36a4 4 0 0 0-4 4v56a4 4 0 0 0 4 4h56a4 4 0 0 0 4-4V36a4 4 0 0 0-4-4ZM52 86H42V56h10Zm-5-34a6 6 0 1 1 6-6 6 6 0 0 1-6 6Zm39 34H76V66c0-1.66-2.24-3-5-3-4 0-5 5.34-5 7v16H56V56h10v7c0-5 4.48-7 10-7a10 10 0 0 1 10 10Z"></path></svg>
    )
};