<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { redirect } from "@sveltejs/kit";
	import { Close } from "../../../../components/icons";
	import Typography from "../../../../components/ui/Typography.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
	export let open: boolean = true;
	export let onClose: () => void;
	export let withCloseIcon: boolean = true;
	export let target: string = "body";
	export let element: string = "div";
	let ref: any;
	let portal: any;

	onClose = () => {
		redirect(200, "/auth/flow");
	};

	onMount(() => {
		if (typeof document !== "undefined") {
			portal = document.createElement("div");
			portal.className = "portal";

			if (target === "body") document.body.appendChild(portal);
			if (target.at(0) === "#" || target.at(0) === ".")
				document.querySelector(target)?.appendChild(portal);

			portal.appendChild(ref);
		}

		setInterval(() => {
			open && document.getElementById("main")?.classList.add("modal-open");
			!open && document.getElementById("main")?.classList.remove("modal-open");
		}, 1);
	});

	onDestroy(() => {
		if (typeof document !== "undefined") {
			if (target === "body") document.body.removeChild(portal);
			if (target.at(0) === "#" || target.at(0) === ".")
				document.querySelector(target)?.removeChild(portal);
		}
	});
</script>

<svelte:element this={element} bind:this={ref}>
	<div class="modal-outer {open || 'closed'}">
		<div class="modal-inner">
			{#if withCloseIcon}
				<div class="close-icon center" on:click={onClose} aria-label="Close">
					<span class="close-icon-inner">
						<Close fill="white" />
					</span>
				</div>
			{/if}
			<div class="modal-content">
				<Typography size="xl">Login with...</Typography>
				<form method="post">
					<div class="options">
						<button formaction="?/gh" class="button flex row">
							<div class="image"></div>
							<div class="text"><Typography size="md">GitHub</Typography></div>
						</button>
						<button formaction="?/spotify" class="button flex row">
							<div class="image"></div>
							<div class="text"><Typography size="md">Spotify</Typography></div>
						</button>
						<button formaction="?/notion" class="button flex row">
							<div class="image"></div>
							<div class="text"><Typography size="md">Notion</Typography></div>
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</svelte:element>

<style>
	:global(.modal-open) {
		filter: blur(1em);
	}

	:global(.modal-outer) {
		filter: blur(0) !important;
	}

	button {
		padding: 0.5rem 1rem;
		margin: 0.5rem;
		border: 0;
		outline: 0;
		cursor: pointer;
		border-radius: 0.4rem;
		background-color: rgba(41, 41, 41, 0.75);
	}

	.modal-outer.true {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		width: auto;
		height: auto;

		background: #000000;

		border-radius: 1em;

		z-index: 1000;
	}

	.modal-outer.closed {
		display: none;
	}

	.modal-content {
		display: flex;
		flex-direction: column;

		padding: 1em;
	}

	.close-icon {
		border: 1px solid white;
		border-radius: 50%;

		padding: 0.5em;
		margin: 0.5em;

		float: right;

		cursor: pointer;
	}

	.close-icon-inner {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.options {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
        padding: 0.5em;
	}
</style>
