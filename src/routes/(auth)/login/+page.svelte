<script lang="ts">
    import type { ActionData } from './$types'

    export let form: ActionData
</script>

<div class="flex justify-center items-center min-h-screen">
    <div class="lg:w-4/12 md:w-8/12 w-11/12 bg-white my-4 p-6 rounded-lg shadow-md">
        <div id="login-header">
            <h1 class="mb-6 text-3xl font-bold text-center">Login</h1>
        </div>
        
        <form action="?/login" method="POST">
            {#if form?.credentials}
                <p class="text-red-500 mt-2 text-sm font-bold text-center">Incorrect credentials, try again</p>
            {/if}

            <div class="mb-5">
                <label class="block text-sm" for="username">Username</label>
                <input 
                    class="p-2.5 rounded-lg shadow-sm border-2 border-gray-300 focus:border-indigo-600 block mt-1 w-full" 
                    id="username" 
                    type="text" 
                    name="username" 
                    required
                    value=""
                >
            </div>

            <div class="mb-5">
                <label class="block text-sm" for="password">Password</label>
                <input 
                    class="p-2.5 rounded-lg shadow-sm border-2 border-gray-300 focus:border-indigo-600 block mt-1 w-full" 
                    id="password" 
                    type="password" 
                    name="password"
                    required
                    value=""
                >
            </div>

            <div class="mb-7">
                <div class="flex flex-wrap justify-between items-center">
                    <div class="flex items-center">
                        <input 
                            type="checkbox" 
                            name="remember" 
                            id="remember" 
                            class="mr-1 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        >
                        <label for="remember">Remember me</label>
                    </div>

                    <!-- <div>
                        <a 
                            href="/forgot-password" 
                            class="cursor:pointer text-indigo-800 hover:text-indigo-600 hover:underline transition-colors"
                        >Forgot password?
                        </a>
                    </div> -->
                </div>
            </div>

            <div class="mb-6">
                <button 
                    type="submit" 
                    class="w-full bg-indigo-700 px-4 py-2 border border-transparent rounded text-white hover:bg-indigo-600 focus:bg-indigo-600 focus:ring focus:ring-indigo-300 disabled:opacity-25 transition duration-150"
                >Login
                </button>
            </div>
        </form>

        <div class="text-center">
            <a 
                href="/register" 
                class="cursor:pointer text-indigo-800 hover:text-indigo-600 hover:underline transition-colors text-sm opacity-75"
            >No account? Register here
            </a>
        </div>
    </div>
</div>