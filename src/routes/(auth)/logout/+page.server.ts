import { deleteSession } from "$lib/Session";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({cookies}) => {
    const sid = cookies.get('sb_session');

    if (sid) {
        cookies.delete('sb_session');
        deleteSession(sid);
    }

    throw redirect(303, '/login');
  }