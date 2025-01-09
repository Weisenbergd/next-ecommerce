import { Label } from "@/components/ui/label";

export default function StyledLabel({ ...props }) {
  return (
    <Label {...props} className="text-base">
      {props.children}
    </Label>
  );
}
