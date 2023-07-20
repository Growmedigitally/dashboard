import { theme } from 'antd'

export default () => {
    const { token } = theme.useToken();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" data-name="Layer 1" viewBox="0 0 128 128" id="instagram"><defs><radialGradient id="a" cx="27.5" cy="121.5" r="148.5" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffd676"></stop><stop offset=".25" stop-color="#f2a454"></stop><stop offset=".38" stop-color="#f05c3c"></stop><stop offset=".7" stop-color="#c22f86"></stop><stop offset=".96" stop-color="#6666ad"></stop><stop offset=".99" stop-color="#5c6cb2"></stop></radialGradient><radialGradient id="d" cx="13.87" cy="303.38" r="185.63" xlink:href="#a"></radialGradient><clipPath id="b"><rect width="128" height="128" fill="none" rx="24" ry="24"></rect></clipPath><clipPath id="c"><circle cx="82" cy="209" r="5" fill="none"></circle></clipPath></defs><g clip-path="url(#b)"><circle cx="27.5" cy="121.5" r="148.5" fill="url(#a)"></circle></g><g clip-path="url(#c)"><circle cx="13.87" cy="303.38" r="185.63" fill="url(#d)"></circle></g><circle cx="82" cy="46" r="5" fill="#fff"></circle><path fill="#fff" d="M64 48a16 16 0 1 0 16 16 16 16 0 0 0-16-16Zm0 24a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z"></path><rect width="64" height="64" x="32" y="32" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="8" rx="12" ry="12"></rect></svg>
    )
};