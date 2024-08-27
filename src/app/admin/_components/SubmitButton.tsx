import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface Props {
  onClick?: () => void; // Define the onClick prop with an optional function type
}

export default function SubmitButton({ onClick }: Props) {
  const { pending } = useFormStatus();
  return <Button onClick={onClick}>{pending ? "Saving..." : "Submit"}</Button>;
}
