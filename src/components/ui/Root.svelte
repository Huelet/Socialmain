<script lang="ts">
	import { onNavigate } from "$app/navigation";

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="root">
	<slot />
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;

		overflow: hidden;
		background: rgb(24, 23, 24);
		color: rgb(255, 255, 255);
	}

	:global(h1, h2, h3, h4) {
		font-family: "Red Hat Display", sans-serif;
	}

	:global(p, h5, h6) {
		font-family: "Red Hat Text", sans-serif;
	}

	@keyframes blur-in {
		from {
			opacity: 0;
			filter: blur(120px);
		}
	}

	@keyframes blur-out {
		to {
			opacity: 0;
			filter: blur(4px);
		}
	}

	:root::view-transition-old(root) {
		animation: 200ms linear both blur-out;
	}

	:root::view-transition-new(root) {
		animation: 200ms linear both blur-in;
	}
</style>
