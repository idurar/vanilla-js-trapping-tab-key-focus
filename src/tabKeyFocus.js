const trapTabKey = (element) => (e) => {
  const targedElement = element.startsWith(".") ? "class" : "id";
  let focusElement = "";
  if (targedElement === "class") {
    focusElement = document.querySelector(element);
  } else {
    focusElement = document.getElementById(element);
  }

  const FOCUSABLE_ELEMENTS = [
    "a[href]",
    "area[href]",
    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
    "select:not([disabled]):not([aria-hidden])",
    "textarea:not([disabled]):not([aria-hidden])",
    "button:not([disabled]):not([aria-hidden])",
    "iframe",
    "object",
    "embed",
    "[contenteditable]",
    '[tabindex]:not([tabindex^="-"])',
  ];

  const nodes = focusElement.querySelectorAll(FOCUSABLE_ELEMENTS);
  let focusableNodes = Array(...nodes);

  if (focusableNodes.length === 0) return;

  focusableNodes = focusableNodes.filter((node) => {
    return node.offsetParent !== null;
  });

  // if disableFocus is true
  if (!focusElement.contains(document.activeElement)) {
    focusableNodes[0].focus();
  } else {
    const focusedItemIndex = focusableNodes.indexOf(document.activeElement);

    if (e.shiftKey && focusedItemIndex === 0) {
      focusableNodes[focusableNodes.length - 1].focus();
      e.preventDefault();
    }

    if (
      !e.shiftKey &&
      focusableNodes.length > 0 &&
      focusedItemIndex === focusableNodes.length - 1
    ) {
      focusableNodes[0].focus();
      e.preventDefault();
    }
  }
};

const tabKeyFocus = (element) => {
  document.addEventListener("keydown", trapTabKey(element));
  // return (destroy = () => {
  //   document.removeEventListener("keydown", trapTabKey(element));
  // });
  return function destroy() {
    document.removeEventListener("keydown", trapTabKey(element));
  };
};

// for webpack es6 use uncomment the next line
// export default tabKeyFocus;
