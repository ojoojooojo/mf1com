import { createFileRoute } from "@tanstack/react-router";
import { Block1ContentMf2 } from "@/components/course/Block1ContentMf2";
export const Route = createFileRoute("/tmp-preview")({ component: () => <Block1ContentMf2 /> });
