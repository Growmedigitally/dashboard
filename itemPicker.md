//this file is used for importing images and json files

declaremodule'\*.png';

declaremodule'\*.jpg';

declaremodule'\*.json';

declaremodule'\*.svg';

importReact, { useEffect, useMemo } from'react'

importdynamicfrom'next/dynamic'

import\*asReactIconscifrom"react-icons/ci";

import\*asReactIconsfafrom"react-icons/fa";

import\*asReactIconsiofrom"react-icons/io";

import\*asReactIconsio5from"react-icons/io5";

import\*asReactIconsmdfrom"react-icons/md";

import\*asReactIconstifrom"react-icons/ti";

import\*asReactIconsgofrom"react-icons/go";

import\*asReactIconsfifrom"react-icons/fi";

import\*asReactIconsgifrom"react-icons/gi";

import\*asReactIconswifrom"react-icons/wi";

import\*asReactIconsdifrom"react-icons/di";

import\*asReactIconsaifrom"react-icons/ai";

import\*asReactIconsbsfrom"react-icons/bs";

import\*asReactIconsrifrom"react-icons/ri";

import\*asReactIconsfcfrom"react-icons/fc";

import\*asReactIconsgrfrom"react-icons/gr";

import\*asReactIconshifrom"react-icons/hi";

import\*asReactIconshi2from"react-icons/hi2";

import\*asReactIconssifrom"react-icons/si";

import\*asReactIconsslfrom"react-icons/sl";

import\*asReactIconsimfrom"react-icons/im";

import\*asReactIconsbifrom"react-icons/bi";

import\*asReactIconscgfrom"react-icons/cg";

import\*asReactIconsvscfrom"react-icons/vsc";

import\*asReactIconstbfrom"react-icons/tb";

import\*asReactIconstfifrom"react-icons/tfi";

import\*asReactIconsrxfrom"react-icons/rx";

importstylesfrom"@styles/components/templates/homePage/homePage.module.scss";

import\*asRiLibfrom"react-icons/lib";

consticonsList = { ci:ReactIconsci, fa:ReactIconsfa, io:ReactIconsio, io5:ReactIconsio5, md:ReactIconsmd, ti:ReactIconsti, go:ReactIconsgo, fi:ReactIconsfi, gi:ReactIconsgi, wi:ReactIconswi, di:ReactIconsdi, ai:ReactIconsai, bs:ReactIconsbs, ri:ReactIconsri, fc:ReactIconsfc, gr:ReactIconsgr, hi:ReactIconshi, hi2:ReactIconshi2, si:ReactIconssi, sl:ReactIconssl, im:ReactIconsim, bi:ReactIconsbi, cg:ReactIconscg, vsc:ReactIconsvsc, tb:ReactIconstb, tfi:ReactIconstfi, rx:ReactIconsrx, }

functionIconPicker() {

constRiLibCopy: any = RiLib;

letIconsList: any = RiLibCopy.IconsManifest;

console.log("IconsList", IconsList)

constIconFinder = ({ iconType }): JSX.Element=> {

constrenderIcons = useMemo(() => {

returnObject.keys(iconsList[iconType]).map((icon, index) => {

constIcon = iconsList[iconType][icon]

return <Iconkey={index} size={20} />

    })

    }, [])

return<divclassName={styles.icons}>{renderIcons}`</div>`

    }

return (

<div>

    {/*`<div className='icon-list-wrap'>`

    {JSON.stringify(ReactIconsci)}

    `<IconFinder iconType={ReactIconsci} />`

    `</div>` */}

    {IconsList.map((iconType, index:number) => {

return <React.Fragmentkey={index}>

    <divclassName='icon-list-wrap'>

    <IconFindericonType={iconType.id} />

    `</div>`

    `<br />`

    </React.Fragment>

    })}

</div>

    )

}

exportdefaultIconPicker
