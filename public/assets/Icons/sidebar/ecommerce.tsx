import { theme } from 'antd'

export default () => {
	const { token } = theme.useToken();
	return (
		<svg style={{ color: token.colorPrimary }} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 512 512" viewBox="0 0 512 512" width="256" height="256" ><linearGradient id="a" x1="40.596" x2="471.404" y1="470.404" y2="39.596" gradientTransform="matrix(1 0 0 -1 0 511)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#abdafb" className="stopColorabdafb svgShape"></stop><stop offset="1" stopColor="#638fff" className="stopColor638fff svgShape"></stop></linearGradient><path fill="url(#a)" d="M409.6,512H102.4c-28.277,0-51.2-22.923-51.2-51.2V51.2C51.2,22.923,74.123,0,102.4,0h307.2
			c28.277,0,51.2,22.923,51.2,51.2v409.6C460.8,489.077,437.877,512,409.6,512z"></path><linearGradient id="b" x1="144.548" x2="188.248" y1="289.649" y2="245.949" gradientTransform="matrix(1 0 0 -1 0 511)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#defcf2" className="stopColordefcf2 svgShape"></stop><stop offset="1" stopColor="#98e1fd" className="stopColor98e1fd svgShape"></stop></linearGradient><path fill="url(#b)" d="M153.592,294.407L153.592,294.407
					c-3.4,0-6.65-1.35-9.05-3.75l-25.588-25.612c-5-5-5-13.112,0-18.1c5-5,13.1-5,18.1,0l16.537,16.55l42.163-42.15
					c5-5,13.1-5,18.1,0c5,5,5,13.1,0,18.1l-51.212,51.212C160.242,293.058,156.992,294.407,153.592,294.407z"></path><linearGradient id="c" x1="278.951" x2="361.058" y1="296.058" y2="213.952" gradientTransform="matrix(1 0 0 -1 0 511)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#defcf2" className="stopColordefcf2 svgShape"></stop><stop offset="1" stopColor="#98e1fd" className="stopColor98e1fd svgShape"></stop></linearGradient><path fill="url(#c)" d="M384.005,268.795h-128
					c-7.075,0-12.8-5.725-12.8-12.8c0-7.075,5.725-12.8,12.8-12.8h128c7.075,0,12.8,5.725,12.8,12.8
					C396.805,263.07,391.079,268.795,384.005,268.795z"></path><linearGradient id="d" x1="278.951" x2="361.058" y1="424.058" y2="341.952" gradientTransform="matrix(1 0 0 -1 0 511)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#defcf2" className="stopColordefcf2 svgShape"></stop><stop offset="1" stopColor="#98e1fd" className="stopColor98e1fd svgShape"></stop></linearGradient><path fill="url(#d)" d="M384.005,140.795h-128
					c-7.075,0-12.8-5.725-12.8-12.8s5.725-12.8,12.8-12.8h128c7.075,0,12.8,5.725,12.8,12.8S391.079,140.795,384.005,140.795z"></path><linearGradient id="e" x1="144.952" x2="163.151" y1="392.136" y2="373.937" gradientTransform="matrix(1 0 0 -1 0 511)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#defcf2" className="stopColordefcf2 svgShape"></stop><stop offset="1" stopColor="#98e1fd" className="stopColor98e1fd svgShape"></stop></linearGradient><path fill="url(#e)" d="M154.117,140.795
					c-7.075,0-12.925-5.725-12.925-12.8s5.6-12.8,12.663-12.8h0.262c7.063,0,12.8,5.725,12.8,12.8S161.179,140.795,154.117,140.795z
					"></path><g fill="#000000" className="color000 svgShape"><linearGradient id="f" x1="278.951" x2="361.058" y1="168.058" y2="85.952" gradientTransform="matrix(1 0 0 -1 0 511)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#defcf2" className="stopColordefcf2 svgShape"></stop><stop offset="1" stopColor="#98e1fd" className="stopColor98e1fd svgShape"></stop></linearGradient><path fill="url(#f)" d="M384.005,396.795h-128
					c-7.075,0-12.8-5.725-12.8-12.8s5.725-12.8,12.8-12.8h128c7.075,0,12.8,5.725,12.8,12.8S391.079,396.795,384.005,396.795z"></path><linearGradient id="g" x1="144.952" x2="163.151" y1="136.136" y2="117.937" gradientTransform="matrix(1 0 0 -1 0 511)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#defcf2" className="stopColordefcf2 svgShape"></stop><stop offset="1" stopColor="#98e1fd" className="stopColor98e1fd svgShape"></stop></linearGradient><path fill="url(#g)" d="M154.117,396.795
					c-7.075,0-12.925-5.725-12.925-12.8s5.6-12.8,12.663-12.8h0.262c7.063,0,12.8,5.725,12.8,12.8S161.179,396.795,154.117,396.795z
					"></path></g></svg >
	)
};