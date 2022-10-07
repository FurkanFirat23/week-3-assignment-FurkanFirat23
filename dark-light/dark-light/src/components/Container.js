import { useContext } from "react";
import Button from "./Button";

import ThemeContext from "../context/ThemeContext";

function Container() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <Button />
    </div>
  );
}

export default Container;
