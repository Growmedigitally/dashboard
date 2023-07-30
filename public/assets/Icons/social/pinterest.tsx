import { theme } from 'antd'

export default () => {
    const { token } = theme.useToken();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 128 128" id="photo"><rect width="128" height="128" fill="#bd081c" rx="24" ry="24"></rect><path fill="#fff" d="M64.49 31.83c-17.57 0-26.7 11.3-26.49 23.62.1 5.72 3.4 12.85 8.52 15.11.78.34 1.19.19 1.35-.52.13-.54.77-3.19 1.05-4.42a1.15 1.15 0 0 0-.3-1.12 15 15 0 0 1-3.18-8.9C45.3 47 52 38.66 63.54 38.66c10 0 17.12 6.53 17.29 15.87C81 65.08 75.58 72.4 68.34 72.4c-4 0-7-3.16-6.16-7.06 1.07-4.63 3.21-9.64 3.15-13-.05-3-1.78-5.5-5.25-5.5-4.09 0-7.3 4.06-7.2 9.48a13.73 13.73 0 0 0 1.32 5.79s-3.75 16.36-4.43 19.4c-1.17 5.16.4 13.53.54 14.27a.43.43 0 0 0 .78.2c.39-.51 5.13-7.5 6.42-12.55.46-1.83 2.37-9.28 2.37-9.28 1.38 2.43 5.29 4.48 9.41 4.48 12.28 0 20.95-10.82 20.71-24.27-.23-12.89-11.38-22.54-25.5-22.54"></path></svg>
    )
};