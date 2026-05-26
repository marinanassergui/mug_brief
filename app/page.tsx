import { redirect } from "next/navigation";

/**
 * Root page automatically redirects to /briefing
 */
export default function Home() {
  redirect("/briefing");
}
