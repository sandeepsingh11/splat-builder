import type { Handle } from "@sveltejs/kit";
import { getUserByToken } from "$lib/server/database";

export const handle: Handle = async ({ event, resolve }) => {
    const { cookies } = event;
    const token = cookies.get('sb_session');

    if (token) {
        const user = await getUserByToken(token);

        if (user) {
            event.locals.username = user.username;
            event.locals.id = user.id;
        }
        else {
            cookies.delete('sb_session');
        }
    }

    return await resolve(event);
}