import { redirect } from "@sveltejs/kit";
import { supabase } from "../../../../util/auth";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	gh: async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: "http://localhost:5173/auth/flow/social/callback",
			},
		});
		return redirect(301, new URL(data.url as string));
	},
	spotify: async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "spotify",
			options: {
				redirectTo: "http://localhost:5173/auth/flow/social/callback",
			},
		});
		return redirect(301, new URL(data.url as string));
	},
	notion: async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "notion",
			options: {
				redirectTo: "http://localhost:5173/auth/flow/social/callback",
			},
		});
		return redirect(301, new URL(data.url as string));
	},
} satisfies Actions;
