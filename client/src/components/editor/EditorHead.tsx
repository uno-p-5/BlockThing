"use client";

import Script from "next/script";

export default function HeadContent() {
  return (
    <>
      {/* Blockly Scripts */}
      <Script src="/lib/blockly/blockly_compressed.js" />
      <Script src="/lib/blockly/blocks_compressed.js" />
      <Script src="/lib/blockly/msg/js/en.js" />
      <Script src="/lib/blockly/python_compressed.js" />

      {/* CodeMirror CSS */}
      <link
        rel="stylesheet"
        href="/lib/codemirror/codemirror.css"
      />
      <link
        rel="stylesheet"
        href="/lib/codemirror/fullscreen.css"
      />
      <link
        rel="stylesheet"
        href="/lib/codemirror/show-hint.css"
      />

      {/* CodeMirror Scripts */}
      <Script src="/lib/codemirror/codemirror.js" />
      <Script src="/lib/codemirror/show-hint.js" />
      <Script src="/lib/codemirror/python-hint.js" />
      <Script src="/lib/codemirror/fullscreen.js" />
      <Script src="/lib/codemirror/python.js" />

      {/* Skulpt Scripts */}
      <Script src="/lib/skulpt/dist/skulpt.js" />
      <Script src="/lib/skulpt/dist/skulpt-stdlib.js" />

      {/* BlockMirror CSS */}
      <link
        rel="stylesheet"
        href="/lib/block_mirror/block_mirror.css"
      />

      {/* BlockMirror Script */}
      <Script src="/lib/block_mirror/block_mirror.js" />
    </>
  );
}
