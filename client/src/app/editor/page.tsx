<<<<<<< HEAD
/* eslint-disable @next/next/no-css-tags */
=======
/**
 * Confused about this file? Yeah. Me too.
 *
 * References:
 * @see {@link https://stackoverflow.com/questions/72599597/what-is-proper-way-to-import-script-files-in-next-js}
 */
>>>>>>> 1107045784a3eb542cd6cdcea20fac64696191af

"use client";

import { useEffect, useRef } from "react";

<<<<<<< HEAD
import Head from "next/head";
import Script from "next/script";

=======
import Script from "next/script";

import styles from "./editor.module.css";

>>>>>>> 1107045784a3eb542cd6cdcea20fac64696191af
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
<<<<<<< HEAD
      <Head>
        {/* CodeMirror CSS */}
        <link
          rel="stylesheet"
          href="codemirror/codemirror.css"
        />
        <link
          rel="stylesheet"
          href="codemirror/fullscreen.css"
        />
        <link
          rel="stylesheet"
          href="codemirror/show-hint.css"
        />
        {/* BlockMirror CSS */}
        <link
          rel="stylesheet"
          href="block_mirror/block_mirror.css"
        />
      </Head>
      {/* CodeMirror */}
=======
>>>>>>> 1107045784a3eb542cd6cdcea20fac64696191af
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
<<<<<<< HEAD
      {/* Blockly */}
=======

>>>>>>> 1107045784a3eb542cd6cdcea20fac64696191af
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
<<<<<<< HEAD
=======

>>>>>>> 1107045784a3eb542cd6cdcea20fac64696191af
      <Script
        src="dist/skulpt.js"
        strategy="afterInteractive"
      />
      <Script
        src="dist/skulpt-stdlib.js"
        strategy="afterInteractive"
      />

<<<<<<< HEAD
      {/* BlockMirror */}
=======
>>>>>>> 1107045784a3eb542cd6cdcea20fac64696191af
      <Script
        src="dist/block_mirror.js"
        strategy="afterInteractive"
      />

      <main>
<<<<<<< HEAD
        <h1>Welcome to the Blockly and CodeMirror Integration!</h1>
        <div
          id="blockmirror-editor"
          ref={blockMirrorRef}
=======
        <div
          id="blockmirror-editor"
          ref={blockMirrorRef}
          className={styles.active}
>>>>>>> 1107045784a3eb542cd6cdcea20fac64696191af
        />
      </main>
    </>
  );
}
