/* eslint-disable max-len */
import React, { FC } from "react";

import close from "./close.svg";
import cart from "./cart.svg";
import closeLarge from "./clear.svg";
import share from "./share.svg";
import camera from "./camera.svg";
import expand from "./expand.svg";
import timer from "./timer.svg";
import info from "./info.svg";
import backArrow from "./backArrow.svg";
import instagram from "./instagram.svg";
import backNavigation from "./backNavigation.svg";
import next from "./next.svg";
import home from "./home.svg";
import dashboard from "@assets/Icons/sidebar/dashboard.svg";
import builder from "@assets/Icons/sidebar/builder.svg";
import analytics from "@assets/Icons/sidebar/analytics.svg";
import CRM from "@assets/Icons/sidebar/CRM.svg";
import ecommerce from "@assets/Icons/sidebar/ecommerce.svg";
import settings from "@assets/Icons/sidebar/settings.svg";
import reports from "@assets/Icons/sidebar/reports.svg";
import profile from "@assets/Icons/sidebar/profile.svg";
import notifications from "@assets/Icons/sidebar/notifications.svg";
import theme from "@assets/Icons/sidebar/theme.svg";
import collapsedMenu from "@assets/Icons/sidebar/collapsedMenu.svg";
import logout from "@assets/Icons/sidebar/logout.svg";
import light from "@assets/Icons/sidebar/light.svg";
import dark from "@assets/Icons/sidebar/dark.svg";
import help from "@assets/Icons/sidebar/help.svg";
import expandedMenu from "@assets/Icons/sidebar/expandedMenu.svg";
import query from "@assets/Icons/sidebar/query.svg";
import promotion from "@assets/Icons/sidebar/promotion.svg";
import note from "@assets/Icons/sidebar/note.svg";
import chat from "@assets/Icons/sidebar/chat.svg";
import PWA from "@assets/Icons/sidebar/PWA.svg";

const icons: any = {
    cart: cart,
    close: close,
    backArrow: backArrow,
    instagram: instagram,
    next: next,
    backNavigation: backNavigation,
    info: info,
    timer: timer,
    expand: expand,
    camera: camera,
    share: share,
    closeLarge: closeLarge,
    home: home,
    dashboard: dashboard,
    builder: builder,
    analytics: analytics,
    CRM: CRM,
    notifications: notifications,
    profile: profile,
    reports: reports,
    settings: settings,
    ecommerce: ecommerce,
    dark: dark,
    light: light,
    logout: logout,
    collapsedMenu: collapsedMenu,
    theme: theme,
    PWA: PWA,
    chat: chat,
    note: note,
    promotion: promotion,
    query: query,
    expandedMenu: expandedMenu,
    help: help,
};

type Props = {
    icon: any;
    alt?: string;
    color?: string;
    width?: number;
    height?: number;
    style?: any;
    background?: string;
    margin?: string;
    padding?: string;
    shape?: string; //circle or square
    onlySvg?: boolean
};
const getIcon = (icon: any) => icons[icon];

const SvgIcon: FC<Props> = ({ icon, color = 'inherit', width = 24, height = 24, shape = "", background = "unset", padding = "", margin = "", style, onlySvg = false }: Props) => {
    const CurrentIcon = getIcon(icon);

    const shapeCss = shape ? {
        background: '#dee1ec',
        borderRadius: shape == 'circle' ? '50%' : '6px',
        padding: padding || '5px',
        margin: margin || 'unset'
    } : {};

    return (
        <React.Fragment>
            {onlySvg ? <>
                <CurrentIcon />
            </> : <>
                <span className="svg-icon-wrap d-f-c" style={
                    {
                        'color': color,
                        'width': `${width}px`,
                        'height': `${height}px`,
                        'background': background,
                        ...shapeCss,
                        ...style
                    }}>
                    <CurrentIcon />
                </span>
            </>}
        </React.Fragment>
    );
}

export default SvgIcon;
