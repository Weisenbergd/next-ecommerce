export default function StyledLabelInputDiv({ ...props }) {
  // styling the div containing the label and input

  return (
    <div {...props} className="flex flex-col gap-1">
      {props.children}
    </div>
  );
}
