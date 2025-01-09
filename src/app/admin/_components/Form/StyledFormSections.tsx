export default function StyledFormSections({ ...props }) {
  // Styling between divs in a form

  return (
    <div {...props} className="">
      {props.children}
    </div>
  );
}
