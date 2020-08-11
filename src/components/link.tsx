import React, { useState, useEffect } from "react";
import "./link.scss";

interface ILinkProps {
  active: boolean;
  updatePromise: Promise<() => any>;
}

export default function Link(props: ILinkProps) {
  // TODO: Set this in central store and just display prop val here
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return <div className={getClass(active)} onClick={toggleStatus}></div>;

  function getClass(active: boolean): string {
    return "link-circle " + (active ? "on" : "off");
  }

  async function toggleStatus(event: React.MouseEvent) {
    // TODO: set this in store
    // setActive(!active);
    return await props.updatePromise;
  }
}
