import { Button } from "@/components/ui/button";

interface Props {
  type: string;
}

export default function ImageButtonAction(props: Props) {
  return (
    <div>
      <Button className="capitalize">{props.type} image</Button>
    </div>
  );
}
