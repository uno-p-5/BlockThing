import * as SBDL from '@turbowarp/sbdl';

export async function POST(request: Request) {
    const req_data = await request.json();
    const id = req_data.id;

    /**
     * **Example Request:**
     * 
     * curl -X POST http://localhost:3000/api/sbdl \ 
     *   -H "Content-Type: application/json" \
     *   -d '{"id": "1049220990"}'
     */
    try {
        const res = await SBDL.downloadProjectFromID(id); 
        
        return Response.json({ 
            title: res.title,
            type: res.type,
            buf: res.arrayBuffer
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error }, { status: 500 });
    }
}