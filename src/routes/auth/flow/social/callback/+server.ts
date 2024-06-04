import { redirect } from "@sveltejs/kit";
import { supabase } from "../../../../../util/auth";

export const GET = async (event) => {
	const { url } = event;
	const code = url.searchParams.get("code") as string;
	const next = url.searchParams.get("next") ?? "/";

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			return new Response(redirect(303, `/${next.slice(1)}`));
		}
	}

	return new Response(redirect(303, "/?success=true"));
};
