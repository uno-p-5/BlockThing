import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter(); 


http.route({ 
    path: '/clerk', 
    method: 'POST', 
    handler: httpAction(async (ctx, request) => { 
        const res = await request.text();
        const headerPayload = request.headers; 

        try { 
            const result = await ctx.runAction(internal.clerk.fulfill, {
                payload: res, 
                headers: { 
                    'svix-id': headerPayload.get('svix-id')!, 
                    'svix-signature': headerPayload.get('svix-signature')!,
                    'svix-timestamp': headerPayload.get('svix-timestamp')!,
                }
            });

            switch(result.type) { 
                case 'user.created': 
                    await ctx.runMutation(internal.user.createUser, { 
                        user_id: result.data.id, 
                        email: result.data.email_addresses[0]?.email_address, 
                        name: result.data.first_name + ' ' + result.data.last_name,
                        pfp_url: result.data.image_url,
                    }); 
                case 'user.updated':
                    await ctx.runMutation(internal.user.update, { 
                        user_id: result.data.id, 
                        email: result.data.email_addresses[0]?.email_address, 
                        name: result.data.first_name + ' ' + result.data.last_name,
                        pfp_url: result.data.image_url,
                    });
                // case 'user.deleted':
                //     await ctx.runMutation(internal.user.remove, {
                //         userId: result.data.id || "Error",
                //     })
            }
            return new Response(null, { 
                status: 200
            })
        } catch (err) { 
            return new Response(`Webhook Error: ${err}`, { 
                status: 400
            })
        }
    })
})

export default http; 