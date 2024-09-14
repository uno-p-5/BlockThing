/**
 * Confused about this file? Yeah. Me too.
 *
 * References:
 * @see {@link https://stackoverflow.com/questions/72599597/what-is-proper-way-to-import-script-files-in-next-js}
 *
 * @see {@link ./EditorScripts.tsx} imported scripts
 * @see {@link ./editor.module.css} imported stylesheets
 * @see {@link client/public} static dist files?
 */

"use client";

import { useEffect, useRef } from "react";

import styles from "./editor.module.css";

declare global {
  interface Window {
    // trust me bro
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BlockMirror: any;
  }
}

export default function Page() {
  const blockMirrorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initializeBlockMirror = () => {
      if (blockMirrorRef.current && window.BlockMirror) {
        console.log("BlockMirror is available.");
        const configuration = {
          container: blockMirrorRef.current,
        };

        new window.BlockMirror(configuration);
      } else {
        console.log("BlockMirror not available yet.");
      }
    };

    const intervalId = setInterval(() => {
      if (window.BlockMirror) {
        initializeBlockMirror();
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div
        id="blockmirror-editor"
        ref={blockMirrorRef}
        className={styles.active}
      />
    </>
  );
}
