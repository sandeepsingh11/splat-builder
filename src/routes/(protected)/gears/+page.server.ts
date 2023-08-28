import { getUserGears } from "$lib/server/database";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    // get user's gears
    const gears = await getUserGears(locals.id);

    return {
        locals,
        gears
    }
};