// get the reference to the element and return a boolean if the user's scrolling has reached the bottom of the element's height
export const useDetectScrollBottom = (ref: React.RefObject<any>): boolean => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = (): void => {
      const bottomModal =
        ref.current.scrollHeight - ref.current.scrollTop ===
        ref.current.offsetHeight;
      setHasScrolledToBottom(bottomModal);
    };
    ref.current.addEventListener("scroll", handleScroll);
    return (): void => {
      ref.current.removeEventListener("scroll", handleScroll);
    };
  }, [ref.current]);
  return hasScrolledToBottom;
};
