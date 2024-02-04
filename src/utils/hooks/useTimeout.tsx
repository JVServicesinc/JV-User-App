import {useCallback, useEffect, useRef, useState} from 'react';
export type UseTimeoutOptions = {
  cancelOnUnmount?: boolean;
};
const defaultOptions = {
  cancelOnUnmount: true,
};

export const useTimeout = <T extends (...args: any[]) => any>(
  fn: T,
  milliseconds: number | null,
  options: UseTimeoutOptions = defaultOptions,
): [boolean, () => void] => {
  const opts = {...defaultOptions, ...(options || {})};
  const timeout = useRef<NodeJS.Timeout>();
  const callback = useRef<T>(fn);
  const [isCleared, setIsCleared] = useState<boolean>(false);
  // the clear method
  const clear = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      setIsCleared(true);
    }
  }, []);
  // if the provided function changes, change its reference
  useEffect(() => {
    if (typeof fn === 'function') {
      callback.current = fn;
    }
  }, [fn]);

  useEffect(() => {
    if (milliseconds !== null) {
      timeout.current = setTimeout(() => {
        callback.current();
      }, milliseconds);
    } else {
      clear();
    }
    return clear;
  }, [milliseconds]);
  
  useEffect(
    () => () => {
      if (opts.cancelOnUnmount) {
        clear();
      }
    },
    [],
  );
  return [isCleared, clear];
};
