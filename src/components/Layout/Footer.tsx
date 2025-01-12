import React from "react";
import FooterItem from "../Ultility/FooterItem";
import { v4 } from "uuid";
export default function Footer(): React.JSX.Element {
    return (<div className="hidden fixed bottom-0 left-0 bg-white h-fit max-h-[15%]  tb:flex mb:flex w-full justify-between items-center">
        <FooterItem key={v4()} text="home" type="all" icon="./assets/images/icon-home.svg" />
        <FooterItem key={v4()} text="archive" type="status" icon="./assets/images/icon-archive.svg" />
        <FooterItem key={v4()} text="search" type="search" icon="./assets/images/icon-search.svg" />
        <FooterItem key={v4()} text="tag" type="tag" icon="./assets/images/icon-tag.svg" />
        <FooterItem key={v4()} text="setting" type="setting" icon="./assets/images/icon-settings.svg" />
    </div>)
}