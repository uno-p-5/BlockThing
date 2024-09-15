import Script from "next/script";

export function EditorScripts() {
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
    </>
  );
}
