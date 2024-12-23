import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type Props = {
  onClick?: () => void; // Define the onClick prop with an optional function type
  form?: string;
};

export default function SubmitButton({ onClick, form }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button form={form} onClick={onClick}>
      {pending ? "Saving..." : "Submit"}
    </Button>
  );
}
