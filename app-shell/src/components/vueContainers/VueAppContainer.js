import React, { useRef, useEffect } from "react";
import app from "vue/App";
const container = document.createElement("div");

function VueAppContainer() {
  const ref = useRef();
  useEffect(() => {
    const currentRef = ref.current;
    const vueInstance = app();

    if (currentRef) {
      currentRef.appendChild(container);
      vueInstance.$mount(container);
    }
    return () => {
      vueInstance.$destroy();
      container.remove();
    };
  }, [ref]);
  return <div ref={ref}></div>;
}

export default VueAppContainer;