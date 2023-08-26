import bcrypt from 'bcrypt'
import { getUserByUsername, updateToken } from '$lib/server/database'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData()
        const username = data.get('username');
        const password = data.get('password');
        const remember = data.get('remember')

        if (
            typeof username !== 'string' ||
            typeof password !== 'string' ||
            !username ||
            !password
        ) {
            return fail(400, { invalid: true })
        }

        // verify credentials
        let user = await getUserByUsername(username);

        if (!user) return fail(400, { invalid: true });

        // check password
        const pwMatch = await bcrypt.compare(password, user.password);

        if (!pwMatch) return fail(400, { invalid: true });

        // generate and set a new token
        const newToken = crypto.randomUUID();
        await updateToken(user.id, newToken);
        
        // set cookie
        cookies.set('sb_session', newToken, {
            // send cookie for every page
            path: '/',
            // server side only cookie so you can't use `document.cookie`
            httpOnly: true,
            // only requests from same site can send cookies
            // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
            sameSite: 'strict',
            // only sent over HTTPS in production
            secure: process.env.NODE_ENV === 'production',
            // set cookie to expire after a month
            maxAge: 60 * 60 * 24 * 30,
        });

        // redirect the user
        throw redirect(302, '/dashboard')
    }
}


