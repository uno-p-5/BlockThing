"use strict";

import { Cursor } from "@/lib/types";
import { useEffect, useState } from "react";
import  webSocketService from "../lib/wsmanager";
import { randomUUID } from "crypto";

const Cursors = () => {

  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursors, setCursors] = useState<Cursor[]>([]);
  let uuid = randomUUID();

    useEffect(() => {
        let lastSentTime = 0; // Track the last time the message was sent
        const throttleDelay = 150; // Throttle delay in milliseconds (100 ms)
      
        const logCursorPosition = (event: MouseEvent) => {
          const { clientX, clientY } = event;
          const currentTime = Date.now();
      
          // Send message if the last message was sent more than `throttleDelay` ms ago
          if (currentTime - lastSentTime > throttleDelay) {
            lastSentTime = currentTime; 
            // webSocketService.sendMessage(clientX, clientY);
            setCursor({ x: clientX, y: clientY });  
          }
        };
      
        window.addEventListener("mousemove", logCursorPosition);
      
        return () => {
          window.removeEventListener("mousemove", logCursorPosition);
        };
      });
    
      useEffect(() => {
        // console.log(cursor);
        webSocketService.sendMessage(cursor.x, cursor.y, uuid);
      }, [cursor]);

      webSocketService.onMessage((data: any) => {
        console.log(data);
      });

    return ( 
        <div className="absolute h-screen w-screen pointer-events-none">
            {cursors.map((cursor, idx) => (
                <div
                    key={idx}
                    className="absolute"
                    style={{
                        top: cursor.y,
                        left: cursor.x,
                    }}
                >
                    <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                </div>
            ))}
        </div>
     );
}
 
export default Cursors;