<script lang="ts">
	import Typography from "../../../components/ui/Typography.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
	let method: "email" | "phone" | "social";
	let identifier: string = "";

	$: {
		if (identifier.includes("@")) method = "email";
		else method = "phone";
	}
</script>

<form method="POST" action="./flow/{method}">
	<Typography>
		<label for="email">Email or Phone Number</label>
	</Typography>
	<input id="email" name={method} bind:value={identifier} />

	<button type="submit">Log In</button>
	<button style="secondary" formmethod="get" type="submit" on:click={() => (method = "social")}
		>Social Login</button
	>
	<slot />
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
	}

	label {
		margin-bottom: 0.5rem;
	}

	input {
		padding: 4px 20px 0;
		margin: 0.25em;
		width: 15em;
		border: 0;
		outline: 0;

		backdrop-filter: blur(16px) saturate(180%);
		-webkit-backdrop-filter: blur(16px) saturate(180%);
		background-color: rgba(41, 41, 41, 0.75);
		border-radius: 0.4rem;
		border: 1px solid rgba(255, 255, 255, 0.125);
		color: #eee;

		font-size: 18px;
		font-family: "Red Hat Text";
		font-weight: 400;
	}

	input::placeholder {
		color: #aaa;
	}

	button {
		padding: 0.5rem 1rem;
		margin: 0.5rem;
		border: 0;
		outline: 0;
		cursor: pointer;
		border-radius: 0.4rem;
		font-family: "Red Hat Text";
		font-weight: 400;
		background-color: rgb(118, 0, 255);
	}

	button[style="secondary"] {
		background-color: rgba(41, 41, 41, 0.75);
		color: #fff;
	}
</style>
