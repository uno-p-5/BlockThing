/* eslint-disable @next/next/no-css-tags */

"use client";

import { useEffect, useRef } from "react";

import Head from "next/head";
import Script from "next/script";

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
      {/* Blockly */}
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
      <Script
        src="dist/skulpt.js"
        strategy="afterInteractive"
      />
      <Script
        src="dist/skulpt-stdlib.js"
        strategy="afterInteractive"
      />

      {/* BlockMirror */}
      <Script
        src="dist/block_mirror.js"
        strategy="afterInteractive"
      />

      <main>
        <h1>Welcome to the Blockly and CodeMirror Integration!</h1>
        <div
          id="blockmirror-editor"
          ref={blockMirrorRef}
        />
      </main>
    </>
  );
}
