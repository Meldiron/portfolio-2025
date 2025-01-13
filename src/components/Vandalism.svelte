<script>
    let vandalising = false;
</script>

<section class="mt-6 max-w-2xl mx-auto px-6">
    <div class="flex flex-col min-[520px]:flex-row gap-6 mb-8">
        <img
          src="/logo.webp"
          alt="Face"
          width={100}
          height={100}
          class="rounded-full"
        />

      <div class="group flex flex-col justify-start w-fit">
        <h1 class="font-bold text-3xl mb-1">Matej Bačo</h1>
        <p class="text-[rgba(255,255,255,0.6)]">
          Engineering lead at <a
            class="hover-underline hover-underline-appwrite text-[#FD366E]"
            href="https://appwrite.io/"
            target="_blank">Appwrite</a
          >
        </p>

        {#if vandalising}
       <div class="flex items-center gap-2 mt-0.5">

        <button
        class="flex items-center gap-2 neutral-800 text-sm w-[fit-content] mt-2 border bg-transparent rounded-lg py-1.5 px-2"
        >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-3.5">
          <path fill-rule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z" clip-rule="evenodd" />
        </svg>
        </button>

        <button
        class="flex items-center gap-2 border-neutral-600 text-sm w-[fit-content] mt-2 border bg-transparent rounded-lg py-1.5 px-2"
        >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-3.5">
          <path fill-rule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

     

        {:else}
        <button
            on:click={() => vandalising = !vandalising}
            class="flex items-center gap-2 border-neutral-800 text-sm w-[fit-content] mt-2 border bg-transparent rounded-lg py-1 px-4"
            >      
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-3.5">
              <path fill-rule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z" clip-rule="evenodd" />
            </svg>
          <span>Vandalize</span>
        </button>
        {/if}
      </div>
    </div>
    <p class="max-w-md mb-4">
      I am impact-driven platform engineer from Czech Republic in love with
      everything open source.
    </p>

    <slot></slot>
  </section>