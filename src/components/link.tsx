import React from "react";
import "./link.scss";

interface ILinkProps {
  active: boolean;
}

function link(props: ILinkProps) {
  return <div className={getClass(props.active)}></div>;
}

function getClass(active: boolean): string {
  return "link-circle " + (active ? "on" : "off");
}

export default link;
