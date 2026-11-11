import { redirect } from "next/navigation";

// /items has no page of its own — the catalog lives on the home page.
export default function ItemsIndex() {
  redirect("/#catalog");
}
