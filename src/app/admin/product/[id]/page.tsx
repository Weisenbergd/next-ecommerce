interface Props {
  params: {
    id: string;
  };
  setSearchParams: () => {};
}

export default function page(props: Props) {
  console.log(props);

  return (
    <div>
      <h1>{props.params.id}</h1>
    </div>
  );
}
