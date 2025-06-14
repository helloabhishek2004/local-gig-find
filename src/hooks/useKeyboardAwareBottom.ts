
import { useEffect, useRef } from 'react';

/**
 * Hook for keeping the chat input visible above keyboard on mobile.
 * Sets the provided ref's paddingBottom/marginBottom to avoid overlap.
 *
 * @param containerRef  Ref to scrollable container (e.g. message list)
 * @param inputRef      Ref to the input area (bottom bar)
 */
export function useKeyboardAwareBottom(
  containerRef: React.RefObject<HTMLElement | null>,
  inputRef?: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    let prevPadding = '';
    // Try to use visualViewport API if available (for mobile browser keyboards)
    const onResize = () => {
      if (containerRef.current && window.visualViewport) {
        const visualHeight = window.visualViewport.height;
        const fullHeight = window.innerHeight;
        const keyboardHeight = fullHeight - visualHeight;
        // Only add padding if keyboard is visible (>0)
        prevPadding = (containerRef.current as HTMLElement).style.paddingBottom;
        (containerRef.current as HTMLElement).style.paddingBottom =
          keyboardHeight > 0 ? `${keyboardHeight + 10}px` : '';
        // Optionally: scroll to bottom on keyboard open
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    };
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', onResize);
      onResize(); // initial
    } else if (inputRef?.current) {
      // fallback: Focus on input, scroll container into view
      inputRef.current.addEventListener('focus', () => {
        containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
      });
    }
    return () => {
      if (window.visualViewport)
        window.visualViewport.removeEventListener('resize', onResize);
      if (containerRef.current) {
        (containerRef.current as HTMLElement).style.paddingBottom = prevPadding;
      }
    };
  }, [containerRef, inputRef]);
}
