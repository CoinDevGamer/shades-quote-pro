import { createFileRoute } from "@tanstack/react-router";
import LoginScreen from "@/components/LoginScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in - Shades & Space" },
      { name: "description", content: "Staff sign-in for the Shades & Space quote studio." },
    ],
  }),
  component: LoginScreen,
});
