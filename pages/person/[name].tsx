import { useRouter } from "next/router";

const Person = () => {
  const {query} = useRouter();
  return <div>{query.name}</div>;
};

export default Person
