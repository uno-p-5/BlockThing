/**
 * Confused about this file? Yeah. Me too.
 *
 * References:
 * @see {@link https://stackoverflow.com/questions/72599597/what-is-proper-way-to-import-script-files-in-next-js}
 */

"use client";

import { useEffect, useRef } from "react";

import Script from "next/script";

import styles from "./editor.module.css";

declare global {
  interface Window {
    // trust me bro
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BlockMirror: any;
  }
}

export default function Page() {
  // Create a ref for the BlockMirror container
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
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* codemirror */}
      <Script
        src="codemirror/codemirror.js"
        strategy="afterInteractive"
      />
      <Script
        src="codemirror/show-hint.js"
        strategy="afterInteractive"
      />
      <Script
        src="codemirror/python-hint.js"
        strategy="afterInteractive"
      />
      <Script
        src="codemirror/fullscreen.js"
        strategy="afterInteractive"
      />
      <Script
        src="codemirror/python.js"
        strategy="afterInteractive"
      />

      {/* blockly */}

      <Script
        src="blockly/blockly_compressed.js"
        strategy="afterInteractive"
      />
      <Script
        src="blockly/blocks_compressed.js"
        strategy="afterInteractive"
      />
      <Script
        src="blockly/msg/js/en.js"
        strategy="afterInteractive"
      />
      <Script
        src="blockly/python_compressed.js"
        strategy="afterInteractive"
      />

      {/* skulpt */}
      <Script
        src="dist/skulpt.js"
        strategy="afterInteractive"
      />
      <Script
        src="dist/skulpt-stdlib.js"
        strategy="afterInteractive"
      />

      {/* block_mirror */}
      <Script
        src="dist/block_mirror.js"
        strategy="afterInteractive"
      />

      <main>
        <div
          id="blockmirror-editor"
          ref={blockMirrorRef}
          className={styles.active}
        />
      </main>
    </>
  );
}
