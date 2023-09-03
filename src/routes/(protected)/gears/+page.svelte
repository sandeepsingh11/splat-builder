<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<h2 class="text-2xl font-bold text-center mb-8">{ data.locals.username }'s gears</h2>

{#if data.gears.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start w-full lg:w-10/12 xl:w-11/12 mx-auto mb-8 px-4 md:px-8">
        {#each data.gears as gear}
            <div class="bg-gray-700 rounded-md shadow-lg transform hover:-translate-y-2 transition-transform">
                <!-- title -->
                <div class="p-4 bg-purple-400 rounded-tl-md rounded-tr-md text-center text-lg font-semibold">
                    <h3>{ (gear.ug_title) ? gear.ug_title : '(no title)' }</h3>
                </div>
    
                <!-- gear -->
                <div class="p-4">
                    <img 
                        src="/gears/{ gear.g_name }.png" 
                        alt="{ gear.g_name_en }" 
                        class="gear-img mx-auto"
                    >
                </div>
    
                <!-- skills -->
                <div class="grid grid-cols-4 items-end">
                    <div class="mx-auto p-2">
                        <img 
                            src="/skills/{ gear.s1_name }.png"
                            alt="{ gear.s1_name }" 
                            width="64" 
                            height="64" 
                            class="mx-auto"
                        >
                    </div>
                    <div class="mx-auto p-2">
                        <img 
                            src="/skills/{ gear.s2_name }.png"
                            alt="{ gear.s2_name }" 
                            width="50" 
                            height="50" 
                            class="mx-auto"
                        >
                    </div>
                    <div class="mx-auto p-2">
                        <img 
                            src="/skills/{ gear.s3_name }.png"
                            alt="{ gear.s3_name }" 
                            width="50" 
                            height="50" 
                            class="mx-auto"
                        >
                    </div>
                    <div class="mx-auto p-2">
                        <img 
                            src="/skills/{ gear.s4_name }.png"
                            alt="{ gear.s4_name }" 
                            width="50" 
                            height="50" 
                            class="mx-auto"
                        >
                    </div>
                </div>
    
                <!-- desc -->
                <div>
                    <p class="bg-gray-100 p-3">{ (gear.ug_description) ? gear.ug_description : '(no description)' }</p>
                </div>

                <!-- edit and delete gear buttons -->
                <div class="flex justify-evenly">
                    <div class="w-full">
                        <a href="gears/build/edit" class="block">
                            <div class="bg-secondary-400 w-full py-2 rounded-bl-md text-center">Edit</div>
                        </a>
                    </div>
    
                    <form action="" method="post" class="w-full">
                        <button type="submit" class="bg-red-400 w-full py-2 rounded-br-md">Delete</button>
                    </form>
                </div>
            </div>
        {/each}
    </div>
{:else}
    <p class="text-xl text-center italic font-semibold mt-8">You do not have any gear yet...<a href="/gears/build">Go create one!</a></p>
{/if}
