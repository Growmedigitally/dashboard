import { theme } from 'antd'

export default () => {
    const { token } = theme.useToken();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="tumblr"><path fill="#37474F" d="M8.998 6.995v3.664c0 .924-.01 1.464.086 1.728.096.259.338.531.613.691a2.3 2.3 0 0 0 1.204.314c.811 0 1.296-.104 2.1-.629v2.405a8.956 8.956 0 0 1-1.838.636A7.542 7.542 0 0 1 9.369 16c-.733 0-1.169-.09-1.723-.273a4.131 4.131 0 0 1-1.443-.794c-.405-.34-.67-.703-.825-1.089-.158-.383-.232-.944-.232-1.679V6.558H2.999V4.291c.632-.207 1.332-.498 1.784-.879a4.43 4.43 0 0 0 1.07-1.378c.275-.528.462-1.211.566-2.034h2.579v4.001h4.003v2.994H8.998z"></path></svg>
    )
};