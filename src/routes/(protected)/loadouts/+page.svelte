<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<h2 class="text-2xl font-bold text-center mb-8">{ data.locals.username }'s loadouts</h2>

{#if data.loadouts.length > 0}
    <div class="grid grid-cols-1 w-full lg:w-10/12 xl:w-11/12 mx-auto mb-8 px-4 md:px-8">
        {#each data.loadouts as loadout}
            <div class="bg-gray-700 rounded-md mb-6 shadow-lg transform hover:-translate-y-2 transition-transform">
                <!-- title -->
                <div class="p-4 bg-purple-400 rounded-tl-md rounded-tr-md text-center text-lg font-semibold">
                    <h3>{ (loadout.title) ? loadout.title : '(no title)' }</h3>
                </div>

                <!-- game modes -->
                <div class="flex justify-center mt-2">
                    {#if loadout.rm}
                        <img 
                            src="/game_modes/rm.png" 
                            alt="Rainmaker" 
                            class="mx-2" 
                           style="width: 32px; height: 32px"
                    >
                    {/if}
                    
                    {#if loadout.cb}
                        <img 
                            src="/game_modes/cb.png" 
                            alt="Clam blitz"
                            class="mx-2" 
                            style="width: 32px; height: 32px"
                        >
                    {/if}
                    
                    {#if loadout.sz}
                        <img 
                            src="/game_modes/sz.png" 
                            alt="Splat zones"
                            class="mx-2" 
                            style="width: 32px; height: 32px"
                        >
                    {/if}
                
                    {#if loadout.tc}
                        <img 
                            src="/game_modes/tc.png" 
                            alt="Tower control"
                            class="mx-2" 
                            style="width: 32px; height: 32px"
                        >
                    {/if}
                </div>

                <!-- body -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                    <!-- weapon, sub special -->
                    <div class="mx-auto">
                        <img 
                            src="/weapon_flat/Path_Wst_{loadout.weaponName}.png" 
                            alt="{loadout.weaponLocalName}" 
                            class="mx-auto p-4"
                            style="width: 200px; height: 200px"
                        >
                        
                        <div class="grid grid-cols-2 gap-2 p-2">
                            <img 
                                src="/subspe/Wsp_{loadout.specialName}00.png" 
                                alt="{loadout.specialLocalName}"
                                class="mx-auto"
                                style="width: 64px; height: 64px"
                            >
                            
                            <img 
                                src="/subspe/Wsb_{loadout.subName}00.png" 
                                alt="{loadout.subLocalName}"
                                class="mx-auto"
                                style="width: 64px; height: 64px"
                            >
                        </div>
                    </div>

                    <!-- gears -->
                    {#each loadout.gears as gear}
                        <div class="p-4">
                            <img 
                                src="/gears/{(gear.gear) ?? 'Dummy'}.png" 
                                alt="" 
                                class="gear-img mx-auto"
                                style="width: 128px; height: 128px"
                            >

                            <div class="mx-auto p-2">
                                <img 
                                    src="/skills/{(gear.skill1) ?? 'Unknown'}.png" 
                                    alt="" 
                                    width="64px" 
                                    height="64px" 
                                    class="mx-auto"
                                >
                                <div class="flex justify-evenly">
                                    <img 
                                        src="/skills/{(gear.skill2) ?? 'Unknown'}.png" 
                                        alt="" 
                                        width="50px"
                                        height="50px"
                                        class="mx-auto"
                                    >
                                    <img 
                                        src="/skills/{(gear.skill3) ?? 'Unknown'}.png" 
                                        alt="" 
                                        width="50px"
                                        height="50px"
                                        class="mx-auto"
                                    >
                                    <img 
                                        src="/skills/{(gear.skill4) ?? 'Unknown'}.png" 
                                        alt="" 
                                        width="50px"
                                        height="50px"
                                        class="mx-auto"
                                    >
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <!-- desc -->
                <div>
                    <p class="bg-gray-100 p-3">{(loadout.description !== '') ? loadout.description : '(no description)'}</p>
                </div>
            </div>
        {/each}
    </div>
{:else}
    <p class="text-xl text-center italic font-semibold mt-8">You do not have any loadouts yet...<a href="/loadouts/build">Go build one!</a></p>
{/if}
