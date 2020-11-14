import React, { useState, useEffect } from "react";
import { DateStr } from "../services/date-utils";
import "./css/link.scss";

interface ILinkProps {
  active: boolean;
  date: DateStr;
  callback: () => void;
}

export default function Link(props: ILinkProps) {
  // TODO: Set this in central store and just display prop val here
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return <div className={getClass(active)} onClick={toggleStatus}></div>;

  function getClass(active: boolean): string {
    return "link-circle " + (active ? "on" : "off") + ' ' + props.date;
  }

  function toggleStatus(event: React.MouseEvent) {
    // TODO: set this in store
    // setActive(!active);
    props.callback();
  }
}
