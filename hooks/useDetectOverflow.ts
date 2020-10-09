// detect if the element's content fits the screen or if its in an overflow state
// optional param to pass in if we've already scrolled to the bottom of the element
export const useDetectContentOverflow = (
  ref: React.RefObject<any>,
  scrolledToBottom?: boolean,
): boolean => {
  const [isContentOverflow, setContentOverflow] = React.useState(false);
  React.useEffect(() => {
    if (ref.current.scrollHeight === ref.current.offsetHeight) {
      setContentOverflow(false);
      return;
    }
    if (scrolledToBottom) {
      setContentOverflow(false);
      return;
    }
    setContentOverflow(true);
  }, [scrolledToBottom, ref.current]);
  return isContentOverflow;
};
