import { useState, useEffect } from "react";

const useSidebarState = (
  localStorageKey: string,
  defaultState: boolean = true,
): [boolean, VoidFunction] => {
  const getExpandedState = () => {
    const savedState = localStorage.getItem(localStorageKey);
    return savedState ? JSON.parse(savedState) : defaultState;
  };

  const setExpandedState = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(isExpanded));
  };

  const toggleSidebar = (): void => setIsExpanded((prevState) => !prevState);

  const [isExpanded, setIsExpanded] = useState<boolean>(() =>
    getExpandedState(),
  );
  useEffect(setExpandedState, [isExpanded, localStorageKey]);

  return [isExpanded, toggleSidebar];
};

export default useSidebarState;
