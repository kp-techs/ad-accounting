import { useState } from "react";

function useToggle(): [boolean, () => void] {
  const [value, setValue] = useState(false);

  function toggle() {
    setValue(!value);
  }

  return [value, toggle];
}

export default useToggle;
