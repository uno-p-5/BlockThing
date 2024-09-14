STREAM_PAGE= """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Streaming API Test</title>
</head>
<body>
  <h1>Test Streaming API</h1>
  <button id="startButton">Start Streaming</button>
  <div id="output"></div>

  <script>
    document.getElementById('startButton').addEventListener('click', async () => {
      const outputElement = document.getElementById('output');
      outputElement.innerHTML = '';

      try {
        const response = await fetch('http://localhost:8080/llm/o1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: 'Write a paragraph about no-code tools to build in 2021.',
          }),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = streamDone;

          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            console.log('Chunk received:', chunk);
            // Append each chunk to the output div
            outputElement.innerHTML += chunk;
          }
        }

        console.log('Streaming complete');
      } catch (error) {
        console.error('Error fetching and streaming:', error);
        outputElement.innerHTML = 'Error streaming data';
      }
    });
  </script>
</body>
</html>"""