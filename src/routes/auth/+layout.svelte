<script lang="ts">
	import Card from "../../components/ui/Card.svelte";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

<div class="container">
	<Card title="Register">
		<main>
			<slot />
		</main>
	</Card>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
	.card {
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
</style>
